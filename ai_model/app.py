# app.py
from flask import Flask, render_template, request, send_file
import pdfplumber, docx, pytesseract, cv2, numpy as np, os, re, fitz
from PIL import Image
from werkzeug.utils import secure_filename
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from transformers import pipeline
from flask import jsonify

# ---------------------------
# Initialize Flask & config
# ---------------------------
app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ---------------------------
# Model: Zero-shot classifier
# ---------------------------
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=-1  # CPU, set 0 if GPU available
)

POSITIVE_LABELS = [
    "agreement",
    "legal contract",
    "rental agreement",
    "lease agreement",
    "service agreement",
    "tenant-landlord agreement",
    "terms and conditions"
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
    """Combine extracted text parts, ignoring None/empty."""
    return "\n".join([p for p in parts if p])

def chunk_text(text, max_words=300):
    """Split long text into smaller chunks for classification."""
    words = text.split()
    return [" ".join(words[i:i+max_words]) for i in range(0, len(words), max_words)]

def heuristic_score(text):
    """Heuristic: check if contract/agreements keywords appear."""
    t = (text or "").lower()
    found = sum(1 for k in SECTION_CUES if re.search(r"\b" + re.escape(k) + r"\b", t))
    return found / max(1, len(SECTION_CUES))

def classify_agreement(text):
    """
    Run classification + heuristic checks.
    Returns (bool, details dict).
    """
    details = {
        "chunks": 0, "votes": 0, "vote_ratio": 0.0,
        "heuristic": 0.0, "avg_chunk_score": 0.0, "reason": ""
    }

    if not text.strip():
        details["reason"] = "empty_text"
        return False, details

    chunks = chunk_text(text, max_words=300)
    details["chunks"] = len(chunks)
    if not chunks:
        details["reason"] = "no_chunks"
        return False, details

    votes, per_chunk_scores = 0, []
    CHUNK_THRESHOLD = 0.5  # adjust if too strict/loose

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

    # Acceptance condition
    accept = (ratio >= 0.4) or (heur >= 0.4)
    if not accept:
        details["reason"] = "low_confidence"
    return accept, details

# ---------------------------
# Text Extractors
# ---------------------------
def extract_pdf(filepath):
    """Try pdfplumber first, then fallback to OCR."""
    try:
        with pdfplumber.open(filepath) as pdf:
            return safe_join_text([p.extract_text() for p in pdf.pages])
    except Exception:
        pass

    # OCR fallback
    try:
        doc = fitz.open(filepath)
        texts = []
        for p in doc:
            pix = p.get_pixmap(dpi=200)
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            texts.append(pytesseract.image_to_string(img))
        return "\n".join(texts)
    except Exception:
        return ""

def extract_docx(filepath):
    try:
        doc = docx.Document(filepath)
        return "\n".join(p.text for p in doc.paragraphs if p.text)
    except Exception:
        return ""

def extract_image(filepath):
    try:
        img = cv2.imread(filepath)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        scanned = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                        cv2.THRESH_BINARY, 31, 10)
        return pytesseract.image_to_string(Image.fromarray(scanned))
    except Exception:
        return ""

# ---------------------------
# Routes
# ---------------------------
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return "No file uploaded", 400
    file = request.files["file"]
    if file.filename == "":
        return "No file selected", 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Choose extractor
    if filename.lower().endswith(".pdf"):
        text = extract_pdf(filepath)
    elif filename.lower().endswith(".docx"):
        text = extract_docx(filepath)
    elif filename.lower().endswith((".png", ".jpg", ".jpeg")):
        text = extract_image(filepath)
    else:
        return "Unsupported file type", 400

    # Classify
    is_ok, details = classify_agreement(text)

    if not is_ok:
        return (
            f"❌ Rejected: Not a valid agreement. "
            f"(votes: {details['votes']}/{details['chunks']}, "
            f"ratio={details['vote_ratio']}, heuristic={details['heuristic']}, "
            f"avg_score={details['avg_chunk_score']}). Reason={details['reason']}"
        ), 400

    return render_template("result.html", text=text, filename=filename)


@app.route("/uploads", methods=["POST"])
def api_upload():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Choose extractor
    if filename.lower().endswith(".pdf"):
        text = extract_pdf(filepath)
    elif filename.lower().endswith(".docx"):
        text = extract_docx(filepath)
    elif filename.lower().endswith((".png", ".jpg", ".jpeg")):
        text = extract_image(filepath)
    else:
        return jsonify({"error": "Unsupported file type"}), 400

    # Classify
    is_ok, details = classify_agreement(text)

    # if not is_ok:
    #     return jsonify({
    #         "valid": False,
    #         "filename": filename,
    #         "reason": details["reason"],
    #         "votes": details["votes"],
    #         "chunks": details["chunks"],
    #         "vote_ratio": details["vote_ratio"],
    #         "heuristic": details["heuristic"],
    #         "avg_score": details["avg_chunk_score"]
    #     }), 400

    return jsonify({
        # "valid": True,
        # "filename": filename,
        "extracted_text": text
        # "classification_details": details
    })

# ---------------------------
# Export Endpoints
# ---------------------------
@app.route("/export/pdf", methods=["POST"])
def export_pdf():
    text = request.form["text"]
    output_path = os.path.join(app.config["UPLOAD_FOLDER"], "output.pdf")
    doc = SimpleDocTemplate(output_path)
    styles = getSampleStyleSheet()
    story = [Paragraph(line, styles["Normal"]) for line in text.split("\n")]
    doc.build(story)
    return send_file(output_path, as_attachment=True)

@app.route("/export/docx", methods=["POST"])
def export_docx():
    text = request.form["text"]
    output_path = os.path.join(app.config["UPLOAD_FOLDER"], "output.docx")
    d = docx.Document()
    for line in text.split("\n"):
        d.add_paragraph(line)
    d.save(output_path)
    return send_file(output_path, as_attachment=True)

# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
