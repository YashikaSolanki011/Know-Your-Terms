// src/pages/SummaryPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Gavel } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const SummaryPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f3e9d2] to-[#fffbe6] px-4 py-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full bg-[#fffbe6] border border-[#CDA047] text-[#CDA047] font-semibold text-xs tracking-wide uppercase shadow-sm">
            Document Analysis
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
          What’s in Your Document?
        </h1>
        <p className="text-lg font-body text-[#5c4a1a] leading-relaxed max-w-2xl mx-auto">
          Upload your legal document and let our AI simplify it into clear,
          accessible guidance.
        </p>
      </motion.div>

      {/* Upload Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card
          variant="elevated"
          className="flex flex-col items-center text-center py-12 px-6 group hover:scale-[1.02] transform transition-all duration-300 border border-[#CDA047]/30"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="mx-auto text-[#CDA047] mb-4 w-12 h-12" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Upload Your Document Here
          </h2>
          <p className="text-sm text-[#5c4a1a] mb-6">
            Drag & drop your document, or click below to upload.
          </p>

          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
          />
          <label 
            htmlFor="file-upload" 
            className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer bg-[#CDA047] hover:bg-[#b38a3e] text-white px-6 py-3 shadow-lg border-2 border-[#CDA047] hover:border-[#b38a3e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDA047]"
          >
            Choose File
          </label>

          {file && (
            <p className="mt-4 text-sm text-[#5c4a1a] font-medium">
              Selected: {file.name}
            </p>
          )}
        </Card>
      </motion.div>

      {/* Summarize Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-10"
      >
        <Button className="flex items-center gap-2 bg-[#CDA047] hover:bg-[#b38a3e] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 border-2 border-[#CDA047] hover:border-[#b38a3e]">
          <Gavel size={20} />
          Summarize Document
        </Button>
      </motion.div>
    </div>
  );
};

export default SummaryPage;
