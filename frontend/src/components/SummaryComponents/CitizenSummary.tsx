import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/common/Card";

type TabType = "risk" | "recommendation";

interface APIData {
  aiRawOutput: {
    about: string;
    benefits: string[];
    risks: string[];
    clarity: { score: number; comment: string };
    fairness: { score: number; comment: string };
    repaymentDetails: {
      emiAmount: string;
      totalRepayment: string;
      interestExtra: string;
      note: string;
    };
    suggestions: string[];
    analogy: string;
  };
}

const CitizenSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("risk");
  const [data, setData] = useState<APIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mocki.io/v1/79719d08-cfac-4cdd-a8cf-78655959c197")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching summary:", err);
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
          Citizen Dashboard
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
          Document Insights for Citizens
        </h1>
        <p className="text-md md:text-lg font-body text-[#5c4a1a] leading-relaxed max-w-3xl mx-auto">
          Get a clear explanation of your document along with risk score and
          AI-powered recommendations.
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
            className="h-[500px] p-6 flex flex-col border border-[#CDA047]/30 bg-[#fffbe6] shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#CDA047]">
                Docs Explain
              </h2>
              <div className="flex items-center gap-3 text-[#CDA047] text-sm">
                <span className="cursor-pointer">🌐</span>
                <span className="cursor-pointer">⧉</span>
              </div>
            </div>

            <div className="flex-1 bg-[#fdf6e3] rounded-lg border border-[#CDA047]/20 p-4 text-sm text-gray-700 overflow-y-auto">
              {loading ? (
                <p>Loading document summary...</p>
              ) : data ? (
                <>
                  <p className="mb-3">{data.aiRawOutput.about}</p>
                  <h3 className="font-semibold text-[#CDA047] mt-2">Analogy</h3>
                  <p className="text-sm mb-3">{data.aiRawOutput.analogy}</p>

                  <h3 className="font-semibold text-green-700 mt-2">Benefits</h3>
                  <ul className="list-disc list-inside text-sm mb-3">
                    {data.aiRawOutput.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <h3 className="font-semibold text-red-600 mt-2">Risks</h3>
                  <ul className="list-disc list-inside text-sm">
                    {data.aiRawOutput.risks.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-red-600">Failed to load summary.</p>
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
            className="h-[500px] p-4 border border-[#CDA047]/30 bg-[#fffbe6] shadow-md flex flex-col"
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
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  {loading ? (
                    <p>Loading risk assessment...</p>
                  ) : data ? (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-[#CDA047] mb-4">
                        Document Risk Assessment
                      </h3>
                      <div className="mb-4">
                        <span className="text-6xl font-bold text-[#b38a3e]">
                          {data.aiRawOutput.clarity.score}
                        </span>
                        <p className="text-sm text-gray-600 mt-2">
                          Risk Level: {data.aiRawOutput.clarity.comment}
                        </p>
                      </div>
                      <div className="bg-[#fdf6e3] rounded-lg p-3 text-xs text-gray-700">
                        Fairness Score: {data.aiRawOutput.fairness.score}/10 –{" "}
                        {data.aiRawOutput.fairness.comment}
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-600">Failed to load risk data.</p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="recommendation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-[#CDA047] mb-4">
                    AI Recommendations
                  </h3>
                  <div className="flex-1 bg-[#fdf6e3] rounded-lg p-4 text-sm text-gray-700 leading-relaxed overflow-y-auto">
                    {loading ? (
                      <p>Loading recommendations...</p>
                    ) : data ? (
                      <ul className="list-disc list-inside space-y-2">
                        {data.aiRawOutput.suggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-red-600">
                        Failed to load recommendations.
                      </p>
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

export default CitizenSummary;
