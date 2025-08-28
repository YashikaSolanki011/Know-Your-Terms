import React from "react";

interface Clause {
  title: string;
  explanation: string;
  example: string;
  questionsToAsk: string[];
}

interface StudentOutput {
  about: string;
  clauses: Clause[];
  keyLegalNotes: string[];
  finalTips: string[];
}

const StudentSummary: React.FC<{ aiRawOutput: StudentOutput }> = ({ aiRawOutput }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          🎓 Student / Internship Agreement Summary
        </h2>
        <p className="mt-2 text-gray-600 text-lg">{aiRawOutput.about}</p>
      </div>

      {/* Clauses */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📑 Important Clauses</h3>
        <div className="space-y-6">
          {aiRawOutput.clauses.map((clause, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg text-indigo-700">{clause.title}</h4>
              <p className="text-gray-700 mt-2">{clause.explanation}</p>
              <p className="italic text-gray-600 mt-1">
                <span className="font-medium">Example:</span> {clause.example}
              </p>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                {clause.questionsToAsk.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Legal Notes */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">⚖️ Key Legal Notes</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {aiRawOutput.keyLegalNotes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>

      {/* Final Tips */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">💡 Final Tips</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {aiRawOutput.finalTips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentSummary;
