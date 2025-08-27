import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/common/Card";

interface Clause {
  title: string;
  explanation: string;
  example: string;
  questionsToAsk: string[];
}

interface ApiData {
  aiRawOutput: {
    about: string;
    clauses: Clause[];
    keyLegalNotes: string[];
    finalTips: string[];
  };
}

const StudentPage: React.FC = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mocki.io/v1/4bf0d986-dc9e-422c-bbb7-93c9340284f9")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full px-6 py-28 bg-gradient-to-br from-[#f8fafc] via-[#f3e9d2] to-[#fffbe6]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-[#fffbe6] border border-[#CDA047] text-[#CDA047] font-semibold text-xs tracking-wide uppercase shadow-sm mb-4">
          Student Dashboard
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
          Internship Agreement Insights
        </h1>
        <p className="text-md md:text-lg font-body text-[#5c4a1a] leading-relaxed max-w-3xl mx-auto">
          Understand your internship agreement with clear AI-powered
          explanations, key notes, and practical tips.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left: Docs Explain */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <Card
            variant="elevated"
            className="p-6 flex flex-col border border-[#CDA047]/30 bg-[#fffbe6] shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#CDA047]">
                Agreement Summary
              </h2>
              <div className="flex items-center gap-3 text-[#CDA047] text-sm">
                <span className="cursor-pointer">🌐</span>
                <span className="cursor-pointer">⧉</span>
              </div>
            </div>

            <div className="flex-1 bg-[#fdf6e3] rounded-lg border border-[#CDA047]/20 p-4 text-sm text-gray-700 overflow-y-auto space-y-6">
              {loading ? (
                <p>Loading agreement...</p>
              ) : data ? (
                <>
                  {/* About Section */}
                  <div>
                    <h3 className="text-md font-semibold text-[#b38a3e] mb-2">
                      About
                    </h3>
                    <p>{data.aiRawOutput.about}</p>
                  </div>

                  {/* Clauses */}
                  <div>
                    <h3 className="text-md font-semibold text-[#b38a3e] mb-2">
                      Key Clauses
                    </h3>
                    <div className="space-y-4">
                      {data.aiRawOutput.clauses.map((clause, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-[#CDA047]/20 bg-white shadow-sm"
                        >
                          <h4 className="font-semibold text-[#CDA047]">
                            {clause.title}
                          </h4>
                          <p className="text-sm text-gray-700 mt-1">
                            {clause.explanation}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 italic">
                            Example: {clause.example}
                          </p>
                          <ul className="list-disc list-inside text-xs text-gray-600 mt-2">
                            {clause.questionsToAsk.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p>No agreement data available.</p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Right: Notes & Tips */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <Card
            variant="elevated"
            className="p-4 border border-[#CDA047]/30 bg-[#fffbe6] shadow-md flex flex-col"
          >
            {loading ? (
              <p>Loading insights...</p>
            ) : data ? (
              <div className="flex flex-col flex-1 space-y-6 overflow-y-auto">
                {/* Key Legal Notes */}
                <div>
                  <h3 className="text-lg font-semibold text-[#CDA047] mb-3">
                    Key Legal Notes
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {data.aiRawOutput.keyLegalNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>

                {/* Final Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-[#CDA047] mb-3">
                    Final Tips
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {data.aiRawOutput.finalTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>No insights available.</p>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentPage;
