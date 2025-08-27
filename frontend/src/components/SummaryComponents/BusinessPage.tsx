// src/pages/BusinessPage.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/common/Card";

interface Clause {
  title: string;
  explanation: string;
  risk: string;
  improvement: string;
}

interface ApiResponse {
  data: {
    aiRawOutput: {
      about: string;
      clauses: Clause[];
      financials: {
        totalFee: string;
        paymentMilestones: string[];
        lateFee: string;
      };
      keyComplianceNotes: string[];
      finalAssessment: {
        overallRisk: string;
        comment: string;
      };
    };
  };
}

const BusinessPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"risk" | "recommendation">("risk");
  const [content, setContent] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch("https://mocki.io/v1/3856af15-1ac9-4f4a-a529-fa79a7d3bf0a")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error fetching business data:", err));
  }, []);

  const aiData = content?.data?.aiRawOutput;

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
          Business Dashboard
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
          Document Insights for Businesses
        </h1>
        <p className="text-md md:text-lg font-body text-[#5c4a1a] leading-relaxed max-w-3xl mx-auto">
          Understand your agreements with clarity — risks, obligations, and
          AI-powered recommendations tailored for business owners.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left: Docs Explain */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 flex flex-col"
        >
          <Card
            variant="elevated"
            className="p-6 flex flex-col border border-[#CDA047]/30 bg-[#fffbe6] shadow-md flex-1"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Docs Explain
              </h2>
              <div className="flex items-center gap-3 text-[#CDA047] text-sm">
                <span className="cursor-pointer">🌐</span>
                <span className="cursor-pointer">⧉</span>
              </div>
            </div>
            <div className="flex-1 bg-[#fdf6e3] rounded-lg border border-[#CDA047]/20 p-4 text-sm text-gray-700 overflow-y-auto space-y-6">
              {!aiData ? (
                <p>Fetching business document insights...</p>
              ) : (
                <>
                  {/* About */}
                  <p className="mb-2">{aiData.about}</p>

                  {/* Clauses as cards */}
                  <div className="space-y-4">
                    {aiData.clauses.map((clause, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-[#CDA047]/20 bg-white shadow-sm"
                      >
                        <h3 className="font-semibold text-[#b38a3e] text-lg">
                          {clause.title}
                        </h3>
                        <p className="text-gray-700 text-sm mt-2">
                          <strong>Explanation:</strong> {clause.explanation}
                        </p>
                        <p className="text-red-700 text-sm mt-2">
                          <strong>Risk:</strong> {clause.risk}
                        </p>
                        <p className="text-green-700 text-sm mt-2">
                          <strong>Improvement:</strong> {clause.improvement}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Financials */}
                  <div className="p-4 rounded-lg border border-[#CDA047]/20 bg-white shadow-sm">
                    <h3 className="font-semibold text-[#b38a3e] text-lg mb-2">
                      Financials
                    </h3>
                    <p>
                      <strong>Total Fee:</strong> {aiData.financials.totalFee}
                    </p>
                    <ul className="list-disc ml-5 text-sm mt-2">
                      {aiData.financials.paymentMilestones.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                    <p className="mt-2">
                      <strong>Late Fee:</strong> {aiData.financials.lateFee}
                    </p>
                  </div>

                  {/* Compliance */}
                  <div className="p-4 rounded-lg border border-[#CDA047]/20 bg-white shadow-sm">
                    <h3 className="font-semibold text-[#b38a3e] text-lg mb-2">
                      Key Compliance Notes
                    </h3>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                      {aiData.keyComplianceNotes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Right: Risk Score & Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <Card
            variant="elevated"
            className="p-4 border border-[#CDA047]/30 bg-[#fffbe6] shadow-md flex flex-col flex-1"
          >
            {/* Tab Headers */}
            <div className="flex border-b border-[#CDA047]/20 mb-4">
              <button
                onClick={() => setActiveTab("risk")}
                className={`flex-1 py-2 px-4 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === "risk"
                    ? "text-[#CDA047] border-b-2 border-[#CDA047] bg-[#fdf6e3]"
                    : "text-gray-600 hover:text-[#CDA047]"
                }`}
              >
                Risk Score
              </button>
              <button
                onClick={() => setActiveTab("recommendation")}
                className={`flex-1 py-2 px-4 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === "recommendation"
                    ? "text-[#CDA047] border-b-2 border-[#CDA047] bg-[#fdf6e3]"
                    : "text-gray-600 hover:text-[#CDA047]"
                }`}
              >
                Recommendation
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              {activeTab === "risk" ? (
                <motion.div
                  key="risk"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-start"
                >
                  {!aiData ? (
                    <p>Loading risk assessment...</p>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-[#CDA047] mb-4">
                        Document Risk Assessment
                      </h3>
                      <div className="mb-4">
                        <span className="text-6xl font-bold text-[#b38a3e]">
                          {aiData.finalAssessment.overallRisk}
                        </span>
                        <p className="text-sm text-gray-600 mt-2">
                          {aiData.finalAssessment.comment}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="recommendation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-[#CDA047] mb-4">
                    AI Recommendations
                  </h3>
                  <div className="bg-[#fdf6e3] rounded-lg p-4 text-sm text-gray-700 leading-relaxed flex-1 overflow-y-auto">
                    {!aiData ? (
                      <p>Loading recommendations...</p>
                    ) : (
                      <>
                        <ul className="list-disc ml-5 space-y-2">
                          {aiData.clauses.map((clause, i) => (
                            <li key={i}>{clause.improvement}</li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <h4 className="font-semibold text-[#b38a3e]">
                            Compliance Reminders
                          </h4>
                          <ul className="list-disc ml-5 text-sm space-y-1">
                            {aiData.keyComplianceNotes.map((note, i) => (
                              <li key={i}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessPage;
