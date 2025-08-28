// import type { BusinessOutput } from '../../types';

// const BusinessSummary: React.FC<{ aiRawOutput: BusinessOutput }> = ({ aiRawOutput }) => {
//   return (
//     <div className="bg-white rounded-2xl p-6 space-y-8 border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Contract Summary</h2>
//       <p className="text-gray-700">{aiRawOutput.about}</p>

//       {/* Clauses */}
//       <div>
//         <h3 className="text-lg font-semibold border-b pb-2">Clauses</h3>
//         <div className="space-y-6 mt-4">
//           {aiRawOutput.clauses.map((clause, i) => (
//             <div key={i} className="border-l-4 border-blue-500 pl-4">
//               <h4 className="font-semibold text-gray-800">{clause.title}</h4>
//               <p className="text-gray-700">{clause.explanation}</p>
//               <div className="flex flex-col mt-2 text-sm">
//                 <span className="text-red-600">⚠ Risk: {clause.risk}</span>
//                 <span className="text-green-600">💡 Improvement: {clause.improvement}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Financials */}
//       <div>
//         <h3 className="text-lg font-semibold border-b pb-2">Financials</h3>
//         <div className="mt-3 text-gray-700 space-y-2">
//           <p><b>Total Fee:</b> {aiRawOutput.financials.totalFee}</p>
//           <ul className="list-disc pl-6">
//             {aiRawOutput.financials.paymentMilestones.map((m, i) => (
//               <li key={i}>{m}</li>
//             ))}
//           </ul>
//           <p><b>Late Fee:</b> {aiRawOutput.financials.lateFee}</p>
//         </div>
//       </div>

//       {/* Compliance */}
//       <div>
//         <h3 className="text-lg font-semibold border-b pb-2">Compliance Notes</h3>
//         <ul className="list-disc pl-6 mt-3 text-gray-700">
//           {aiRawOutput.keyComplianceNotes.map((c, i) => (
//             <li key={i}>{c}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Final Assessment */}
//       <div className="border rounded-lg p-4 bg-gray-50">
//         <p><b>Overall Risk:</b> {aiRawOutput.finalAssessment.overallRisk}</p>
//         <p className="text-gray-600 mt-1">{aiRawOutput.finalAssessment.comment}</p>
//       </div>
//     </div>
//   );
// };

// export default BusinessSummary;



// import type { BusinessOutput } from '../../types';
// import { ShieldAlert, Lightbulb, CheckCircle2 } from "lucide-react";

// const BusinessSummary: React.FC<{ aiRawOutput: BusinessOutput }> = ({ aiRawOutput }) => {
//   return (
//     <div className="bg-white shadow-sm rounded-2xl p-10 space-y-12">
//       {/* Title */}
//       <h2 className="text-4xl font-bold text-gray-900 border-b pb-6">Business Contract Summary</h2>

//       {/* About */}
//       <p className="text-lg text-gray-700 leading-relaxed">{aiRawOutput.about}</p>

//       {/* Clauses */}
//       <div>
//         <h3 className="text-2xl font-semibold text-gray-800 mb-6">📑 Clauses</h3>
//         <div className="space-y-8">
//           {aiRawOutput.clauses.map((clause, i) => (
//             <div key={i} className="border-l-4 border-blue-500 pl-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-2">{clause.title}</h4>
//               <p className="text-lg text-gray-600 leading-relaxed mb-4">{clause.explanation}</p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
//                   <ShieldAlert className="text-red-600 w-6 h-6 mt-1" />
//                   <p className="text-base text-red-700 leading-relaxed">
//                     <b>Risk:</b> {clause.risk}
//                   </p>
//                 </div>
//                 <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
//                   <Lightbulb className="text-green-600 w-6 h-6 mt-1" />
//                   <p className="text-base text-green-700 leading-relaxed">
//                     <b>Improvement:</b> {clause.improvement}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Financials */}
//       <div>
//         <h3 className="text-2xl font-semibold text-gray-800 mb-6">💰 Financials</h3>
//         <p className="text-lg mb-3"><b>Total Fee:</b> {aiRawOutput.financials.totalFee}</p>

//         <div className="space-y-4 pl-4 border-l-2 border-gray-300">
//           {aiRawOutput.financials.paymentMilestones.map((m, i) => (
//             <div key={i} className="flex items-center gap-3">
//               <CheckCircle2 className="text-blue-600 w-6 h-6" />
//               <span className="text-lg text-gray-700 leading-relaxed">{m}</span>
//             </div>
//           ))}
//         </div>

//         <p className="mt-4 text-lg"><b>Late Fee:</b> {aiRawOutput.financials.lateFee}</p>
//       </div>

//       {/* Compliance Notes */}
//       <div>
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">📌 Compliance Notes</h3>
//         <div className="flex flex-wrap gap-3">
//           {aiRawOutput.keyComplianceNotes.map((c, i) => (
//             <span 
//               key={i} 
//               className="px-4 py-2 bg-gray-100 text-gray-800 text-base rounded-full border"
//             >
//               {c}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Final Assessment */}
//       <div className="p-8 rounded-xl bg-gray-50 border">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Final Assessment</h3>
//         <p>
//           <span 
//             className={`px-4 py-2 rounded-full text-base font-medium ${
//               aiRawOutput.finalAssessment.overallRisk === "High"
//                 ? "bg-red-100 text-red-700"
//                 : aiRawOutput.finalAssessment.overallRisk === "Medium"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : "bg-green-100 text-green-700"
//             }`}
//           >
//             {aiRawOutput.finalAssessment.overallRisk}
//           </span>
//         </p>
//         <p className="text-lg text-gray-700 mt-4 leading-relaxed">{aiRawOutput.finalAssessment.comment}</p>
//       </div>
//     </div>
//   );
// };

// export default BusinessSummary;






//  row
import type { BusinessOutput } from '../../types';
import { ShieldAlert, Lightbulb, CheckCircle2 } from "lucide-react";

const BusinessSummary: React.FC<{ aiRawOutput: BusinessOutput }> = ({ aiRawOutput }) => {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-8 space-y-10">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Business Contract Summary</h2>

      {/* About */}
      <p className="text-gray-700 leading-relaxed">{aiRawOutput.about}</p>

      {/* Clauses */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📑 Clauses</h3>
        <div className="space-y-6">
          {aiRawOutput.clauses.map((clause, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">{clause.title}</h4>
              <p className="text-gray-600 mb-3">{clause.explanation}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 bg-red-50 p-4 rounded-lg">
                  <ShieldAlert className="text-red-600 w-6 h-6 mt-1" />
                  <p className="text-sm leading-relaxed text-red-700">
                    <b>Risk:</b> {clause.risk}
                  </p>
                </div>
                <div className="flex items-start gap-2 bg-green-50 p-4 rounded-lg">
                  <Lightbulb className="text-green-600 w-6 h-6 mt-1" />
                  <p className="text-sm leading-relaxed text-green-700">
                    <b>Improvement:</b> {clause.improvement}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Financials */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">💰 Financials</h3>
        <p className="mb-2"><b>Total Fee:</b> {aiRawOutput.financials.totalFee}</p>

        <div className="space-y-3 pl-3 border-l-2 border-gray-300">
          {aiRawOutput.financials.paymentMilestones.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="text-blue-600 w-5 h-5" />
              <span className="text-gray-700">{m}</span>
            </div>
          ))}
        </div>

        <p className="mt-3"><b>Late Fee:</b> {aiRawOutput.financials.lateFee}</p>
      </div>

      {/* Compliance Notes */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">📌 Compliance Notes</h3>
        <div className="flex flex-wrap gap-2">
          {aiRawOutput.keyComplianceNotes.map((c, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Final Assessment */}
      <div className="p-6 rounded-xl bg-gray-50 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Final Assessment</h3>
        <p>
          <span 
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              aiRawOutput.finalAssessment.overallRisk === "High"
                ? "bg-red-100 text-red-700"
                : aiRawOutput.finalAssessment.overallRisk === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {aiRawOutput.finalAssessment.overallRisk}
          </span>
        </p>
        <p className="text-gray-700 mt-2">{aiRawOutput.finalAssessment.comment}</p>
      </div>

      {/* Footer Branding (Web) */}
      <footer className="pt-6 mt-8 border-t border-gray-200 text-center text-xs text-gray-500">
        Generated by <span className="font-semibold">Know Your Terms</span>
      </footer>
    </div>
  );
};

export default BusinessSummary;
