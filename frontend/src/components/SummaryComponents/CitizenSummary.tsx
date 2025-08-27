import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/common/Card";

const CitizenPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'risk' | 'recommendation'>('risk');
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
          Get a clear explanation of your document along with risk score and AI-powered recommendations.
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
              {/* Placeholder content */}
              <p>
                Upload and summarize your document to view an AI-generated plain
                language explanation here.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Right: Risk Score & Recommendations Tabbed Component */}
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
                onClick={() => setActiveTab('risk')}
                className={`flex-1 py-2 px-4 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === 'risk'
                    ? 'text-[#CDA047] border-b-2 border-[#CDA047] bg-[#fdf6e3]'
                    : 'text-gray-600 hover:text-[#CDA047]'
                }`}
              >
                Risk Score
              </button>
              <button
                onClick={() => setActiveTab('recommendation')}
                className={`flex-1 py-2 px-4 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === 'recommendation'
                    ? 'text-[#CDA047] border-b-2 border-[#CDA047] bg-[#fdf6e3]'
                    : 'text-gray-600 hover:text-[#CDA047]'
                }`}
              >
                Recommendation
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex flex-col">
              {activeTab === 'risk' ? (
                <motion.div
                  key="risk"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#CDA047] mb-4">
                      Document Risk Assessment
                    </h3>
                    <div className="mb-4">
                      <span className="text-6xl font-bold text-[#b38a3e]">--</span>
                      <p className="text-sm text-gray-600 mt-2">
                        Risk Level: Pending Analysis
                      </p>
                    </div>
                    <div className="bg-[#fdf6e3] rounded-lg p-3 text-xs text-gray-700">
                      Upload and analyze your document to see the risk assessment
                    </div>
                  </div>
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
                    <p>
                      Once your document is analyzed, AI recommendations will be
                      displayed here to guide your decision-making.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="text-xs text-gray-500">
                        • Key risks identified
                      </div>
                      <div className="text-xs text-gray-500">
                        • Suggested actions
                      </div>
                      <div className="text-xs text-gray-500">
                        • Alternative options
                      </div>
                    </div>
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

export default CitizenPage;
