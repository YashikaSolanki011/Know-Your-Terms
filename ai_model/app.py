# app.py
from flask import Flask, render_template, request, send_file, jsonify
import pdfplumber, docx, pytesseract, cv2, numpy as np, re, fitz, io
from PIL import Image
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from transformers import pipeline

# ---------------------------
# Initialize Flask
# ---------------------------
app = Flask(__name__)

# ---------------------------
# Model: Zero-shot classifier
# ---------------------------
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=-1  # CPU, set 0 if GPU available
)

POSITIVE_LABELS = [
    "agreement", "legal contract", "rental agreement", "lease agreement",
    "service agreement", "tenant-landlord agreement", "terms and conditions"
]

SECTION_CUES = [
    "agreement", "security deposit", "rental period", "payment terms",
    "termination", "arbitration", "jurisdiction",
    "witness", "signatory", "governing law", "parties", "definitions"
]

# ---------------------------
# Helpers
# ---------------------------
def safe_join_text(parts):
    return "\n".join([p for p in parts if p])

def chunk_text(text, max_words=300):
    words = text.split()
    return [" ".join(words[i:i+max_words]) for i in range(0, len(words), max_words)]

def heuristic_score(text):
    t = (text or "").lower()
    found = sum(1 for k in SECTION_CUES if re.search(r"\b" + re.escape(k) + r"\b", t))
    return found / max(1, len(SECTION_CUES))

def classify_agreement(text):
    details = {
        "chunks": 0, "votes": 0, "vote_ratio": 0.0,
        "heuristic": 0.0, "avg_chunk_score": 0.0, "reason": ""
    }

    if not text.strip():
        details["reason"] = "empty_text"
        return False, details

    chunks = chunk_text(text, max_words=300)
    details["chunks"] = len(chunks)

    votes, per_chunk_scores = 0, []
    CHUNK_THRESHOLD = 0.5

    for ch in chunks:
        try:
            res = classifier(
                ch, candidate_labels=POSITIVE_LABELS,
                multi_label=True, hypothesis_template="This text is about {}."
            )
            best = max(res["scores"]) if res["scores"] else 0.0
        except Exception:
            best = 0.0

        per_chunk_scores.append(best)
        if best >= CHUNK_THRESHOLD:
            votes += 1

    ratio = votes / len(chunks)
    heur = heuristic_score(text)

    details.update({
        "votes": votes,
        "vote_ratio": round(ratio, 3),
        "heuristic": round(heur, 3),
        "avg_chunk_score": round(sum(per_chunk_scores) / max(1, len(per_chunk_scores)), 3)
    })

    accept = (ratio >= 0.4) or (heur >= 0.4)
    if not accept:
        details["reason"] = "low_confidence"
    return accept, details

# ---------------------------
# Text Extractors (in-memory)
# ---------------------------
def extract_pdf(file_stream):
    try:
        with pdfplumber.open(file_stream) as pdf:
            return safe_join_text([p.extract_text() for p in pdf.pages])
    except Exception:
        try:
            doc = fitz.open(stream=file_stream.read(), filetype="pdf")
            texts = []
            for p in doc:
                pix = p.get_pixmap(dpi=200)
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                texts.append(pytesseract.image_to_string(img))
            return "\n".join(texts)
        except Exception:
            return ""

def extract_docx(file_stream):
    try:
        doc = docx.Document(io.BytesIO(file_stream.read()))
        return "\n".join(p.text for p in doc.paragraphs if p.text)
    except Exception:
        return ""

def extract_image(file_stream):
    try:
        img = Image.open(file_stream).convert("RGB")
        return pytesseract.image_to_string(img)
    except Exception:
        return ""

# ---------------------------
# Routes
# ---------------------------
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/active", methods=["GET"])
def active():
    return "active"

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return "No file uploaded", 400
    file = request.files["file"]
    if file.filename == "":
        return "No file selected", 400

    filename = file.filename.lower()
    text = ""

    if filename.endswith(".pdf"):
        text = extract_pdf(file.stream)
    elif filename.endswith(".docx"):
        text = extract_docx(file.stream)
    elif filename.endswith((".png", ".jpg", ".jpeg")):
        text = extract_image(file.stream)
    else:
        return "Unsupported file type", 400

    is_ok, details = classify_agreement(text)

    if not is_ok:
        return (
            f"❌ Rejected: Not a valid agreement. "
            f"(votes: {details['votes']}/{details['chunks']}, "
            f"ratio={details['vote_ratio']}, heuristic={details['heuristic']}, "
            f"avg_score={details['avg_chunk_score']}). Reason={details['reason']}"
        ), 400

    return render_template("result.html", text=text, filename=file.filename)

@app.route("/uploads", methods=["POST"])
def api_upload():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = file.filename.lower()
    text = ""

    if filename.endswith(".pdf"):
        text = extract_pdf(file.stream)
    elif filename.endswith(".docx"):
        text = extract_docx(file.stream)
    elif filename.endswith((".png", ".jpg", ".jpeg")):
        text = extract_image(file.stream)
    else:
        return jsonify({"error": "Unsupported file type"}), 400

    return jsonify({"extracted_text": text})

# ---------------------------
# Export Endpoints
# ---------------------------
@app.route("/export/pdf", methods=["POST"])
def export_pdf():
    text = request.form["text"]
    output = io.BytesIO()
    doc = SimpleDocTemplate(output)
    styles = getSampleStyleSheet()
    story = [Paragraph(line, styles["Normal"]) for line in text.split("\n")]
    doc.build(story)
    output.seek(0)
    return send_file(output, as_attachment=True, download_name="output.pdf")

@app.route("/export/docx", methods=["POST"])
def export_docx():
    text = request.form["text"]
    output = io.BytesIO()
    d = docx.Document()
    for line in text.split("\n"):
        d.add_paragraph(line)
    d.save(output)
    output.seek(0)
    return send_file(output, as_attachment=True, download_name="output.docx")

# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
