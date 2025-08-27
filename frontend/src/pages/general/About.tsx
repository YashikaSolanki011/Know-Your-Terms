import { motion } from "framer-motion";
import { BookText, FileSearch, MessageCircle, ClipboardCheck, Brain, ArrowRight } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const features = [
  {
    title: "Summarization",
    description:
      "Automatically condense long legal documents into clear, digestible summaries that are easy to understand.",
    icon: <BookText className="w-10 h-10 text-[#CDA047]" />,
  },
  {
    title: "Process Detail",
    description:
      "Break down the detailed processes and clauses step by step, ensuring transparency for users.",
    icon: <ClipboardCheck className="w-10 h-10 text-[#F6A507]" />,
  },
  {
    title: "Case Study",
    description:
      "Provide real-world scenarios and examples that showcase how similar documents affect individuals and businesses.",
    icon: <FileSearch className="w-10 h-10 text-[#CDA047]" />,
  },
  {
    title: "Review Docs",
    description:
      "Upload and review your own documents with instant AI-powered analysis and simplified explanations.",
    icon: <Brain className="w-10 h-10 text-[#F6A507]" />,
  },
  {
    title: "Chatbot / Estimation",
    description:
      "Engage with an interactive chatbot to clarify doubts, get cost estimations, and receive tailored legal insights.",
    icon: <MessageCircle className="w-10 h-10 text-[#CDA047]" />,
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f3e9d2] to-[#fffbe6] py-28 px-4 md:px-20">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full bg-[#fffbe6] border border-[#CDA047] text-[#CDA047] font-semibold text-xs tracking-wide uppercase shadow-sm">
            AI-Powered Legal Document Analysis
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
          About Our Project
        </h1>
        <p className="text-lg font-body text-[#5c4a1a] leading-relaxed max-w-4xl mx-auto">
          <strong>Generative AI for Demystifying Legal Documents</strong> is an AI-driven solution that simplifies complex legal documents into clear, accessible guidance—empowering individuals and businesses to make informed decisions with confidence.
        </p>
      </motion.div>

      {/* Challenge Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-16 bg-white shadow-xl rounded-2xl p-8 border border-[#f3e9d2]"
      >
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">Challenge</h2>
        <p className="text-gray-700 font-body leading-relaxed">
          Legal documents like rental agreements, loan contracts, and terms of service are filled with jargon that is often incomprehensible to the average person. This creates an imbalance of knowledge, leaving individuals vulnerable to unfavorable terms and financial risks. We aim to bridge this gap by making legal language understandable for all.
        </p>
      </motion.div>

      {/* Objective Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-16 bg-white shadow-xl rounded-2xl p-8 border border-[#f3e9d2]"
      >
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">Objective</h2>
        <p className="text-gray-700 font-body leading-relaxed">
          Our goal is to build a reliable, safe, and supportive AI-powered platform that offers legal document simplification using Google Cloud's generative AI. By providing summaries, clause explanations, and interactive Q&A, we empower users to protect themselves from legal and financial risks while making informed choices.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-900 mb-12">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card className="p-6 h-full flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition duration-300 bg-white border border-[#f3e9d2] rounded-2xl">
                <div className="mb-6 bg-[#fffbe6] p-4 rounded-full border border-[#CDA047] shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-body text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-[#CDA047] to-[#F6A507] rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-heading font-bold text-white mb-4">
          Ready to Simplify Your Legal Documents?
        </h2>
        <p className="text-white/90 font-body text-lg mb-8 leading-relaxed">
          Join thousands of users who are making informed decisions with AI-powered legal document analysis.
        </p>
        <Button className="bg-white text-[#CDA047] hover:bg-gray-100 font-bold px-8 py-3 rounded-full shadow-lg transition text-lg tracking-wide border-2 border-white inline-flex items-center gap-2">
          <span className="text-[#CDA047]">Start Analyzing Documents</span>
          <ArrowRight className="w-5 h-5 text-[#CDA047]" />
        </Button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
