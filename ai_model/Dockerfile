FROM python:3.11-slim

# System dependencies for OCR, PDF, and image processing
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000
ENV PORT=8000

CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]