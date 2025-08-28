// import React from "react";
// import {
//   CheckCircle,
//   AlertTriangle,
//   Scale,
//   Lightbulb,
//   FileText,
//   Info,
// } from "lucide-react";
// import ScoreCircle from "./Scores";

// interface CitizenOutput {
//   about: string;
//   benefits: string[];
//   risks: string[];
//   clarity: { score: number; comment: string };
//   fairness: { score: number; comment: string };
//   repaymentDetails: {
//     emiAmount: string;
//     totalRepayment: string;
//     interestExtra: string;
//     note: string;
//   };
//   suggestions: string[];
//   analogy: string;
// }

// const CitizenSummary: React.FC<{ aiRawOutput: CitizenOutput }> = ({
//   aiRawOutput,
// }) => {
//   return (
//     <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8 border border-gray-100">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <FileText className="w-7 h-7 text-blue-600" />
//         <h2 className="text-2xl font-bold text-gray-900">
//           Citizen Contract Summary
//         </h2>
//       </div>

//       {/* About */}
//       <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
//         {aiRawOutput.about}
//       </p>

//       {/* Benefits & Risks */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-green-50 p-5 rounded-xl border border-green-100">
//           <div className="flex items-center gap-2 mb-3">
//             <CheckCircle className="text-green-600 w-5 h-5" />
//             <h3 className="text-lg font-semibold text-green-700">Benefits</h3>
//           </div>
//           <ul className="list-disc pl-6 space-y-1 text-gray-700">
//             {aiRawOutput.benefits.map((b, i) => (
//               <li key={i}>{b}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-red-50 p-5 rounded-xl border border-red-100">
//           <div className="flex items-center gap-2 mb-3">
//             <AlertTriangle className="text-red-600 w-5 h-5" />
//             <h3 className="text-lg font-semibold text-red-700">Risks</h3>
//           </div>
//           <ul className="list-disc pl-6 space-y-1 text-gray-700">
//             {aiRawOutput.risks.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Scores */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="p-5 rounded-xl border shadow-sm bg-gray-50">
//           <p className="font-semibold text-gray-800">
//             Clarity Score:{" "}
//             <span className="text-blue-600">{aiRawOutput.clarity.score}/10</span>
//           </p>
//           <p className="text-gray-600 text-sm">{aiRawOutput.clarity.comment}</p>
//         </div>
//         <div className="p-5 rounded-xl border shadow-sm bg-gray-50">
//           <p className="font-semibold text-gray-800">
//             Fairness Score:{" "}
//             <span className="text-blue-600">
//               {aiRawOutput.fairness.score}/10
//             </span>
//           </p>
//           <p className="text-gray-600 text-sm">{aiRawOutput.fairness.comment}</p>
//         </div>
//       </div>


//       <ScoreCircle
//         label="Clarity"
//         score={aiRawOutput.clarity.score}
//         comment={aiRawOutput.clarity.comment}
//       />
//       <ScoreCircle
//         label="Fairness"
//         score={aiRawOutput.fairness.score}
//         comment={aiRawOutput.fairness.comment}
//       />


//       {/* Repayment Details */}
//       <div className="p-5 rounded-xl border bg-white shadow-sm">
//         <div className="flex items-center gap-2 mb-2">
//           <Scale className="w-5 h-5 text-purple-600" />
//           <h3 className="text-lg font-semibold text-gray-800">
//             Repayment Details
//           </h3>
//         </div>
//         <p className="text-gray-600">{aiRawOutput.repaymentDetails.note}</p>
//       </div>

//       {/* Suggestions */}
//       <div className="p-5 rounded-xl border bg-blue-50 border-blue-100">
//         <div className="flex items-center gap-2 mb-2">
//           <Lightbulb className="w-5 h-5 text-blue-600" />
//           <h3 className="text-lg font-semibold text-blue-700">Suggestions</h3>
//         </div>
//         <ul className="list-disc pl-6 space-y-1 text-gray-700">
//           {aiRawOutput.suggestions.map((s, i) => (
//             <li key={i}>{s}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Analogy */}
//       <div className="italic text-gray-700 flex items-start gap-2">
//         <Info className="w-5 h-5 text-gray-500 mt-1" />
//         <p>Analogy: {aiRawOutput.analogy}</p>
//       </div>
//     </div>
//   );
// };

// export default CitizenSummary;






import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Lightbulb, FileText } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CitizenSummaryProps = {
  title: string; // e.g. "Marriage Agreement Summary"
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

export default function CitizenSummary({ aiRawOutput }: { aiRawOutput: CitizenSummaryProps }) {
  return (
    <motion.div
      className="border rounded-2xl shadow-sm bg-white p-6 space-y-8 text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Page Title */}
      <header className="border-b pb-3 mb-4">
        <h1 className="text-xl font-bold text-gray-900">
          {aiRawOutput.title}
        </h1>
      </header>

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold text-blue-600 flex items-center mb-2">
          <FileText className="w-5 h-5 mr-2" /> About
        </h2>
        <p className="text-gray-700 leading-relaxed">{aiRawOutput.about}</p>
      </section>

      {/* Benefits & Risks side by side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits */}
        <div>
          <h2 className="text-lg font-semibold text-green-600 flex items-center mb-2">
            <CheckCircle className="w-5 h-5 mr-2" /> Benefits
          </h2>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            {aiRawOutput.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div>
          <h2 className="text-lg font-semibold text-red-600 flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 mr-2" /> Risks
          </h2>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            {aiRawOutput.risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scores */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Clarity */}
        <div className="flex flex-col items-center space-y-3 p-4 border rounded-lg shadow-sm">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={aiRawOutput.clarity.score * 10}
              text={`${aiRawOutput.clarity.score}/10`}
              styles={buildStyles({
                pathColor: "#2563eb", // blue
                textColor: "#1e3a8a",
                trailColor: "#e5e7eb",
              })}
            />
          </div>
          <h3 className="font-medium text-blue-600">Clarity Score</h3>
          <p className="text-sm text-gray-600 text-center">
            {aiRawOutput.clarity.comment}
          </p>
        </div>

        {/* Fairness */}
        <div className="flex flex-col items-center space-y-3 p-4 border rounded-lg shadow-sm">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={aiRawOutput.fairness.score * 10}
              text={`${aiRawOutput.fairness.score}/10`}
              styles={buildStyles({
                pathColor: "#16a34a", // green
                textColor: "#14532d",
                trailColor: "#e5e7eb",
              })}
            />
          </div>
          <h3 className="font-medium text-green-600">Fairness Score</h3>
          <p className="text-sm text-gray-600 text-center">
            {aiRawOutput.fairness.comment}
          </p>
        </div>
      </section>

      {/* Repayment Details */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Repayment Details
        </h2>
        <p className="text-sm text-gray-600">
          {aiRawOutput.repaymentDetails.note} <br />
          EMI: {aiRawOutput.repaymentDetails.emiAmount}, Total: {aiRawOutput.repaymentDetails.totalRepayment}, Interest:{" "}
          {aiRawOutput.repaymentDetails.interestExtra}
        </p>
      </section>

      {/* Suggestions */}
      <section>
        <h2 className="text-lg font-semibold text-yellow-600 flex items-center mb-2">
          <Lightbulb className="w-5 h-5 mr-2" /> Suggestions
        </h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          {aiRawOutput.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      {/* Analogy */}
      <section className="bg-gray-50 border-l-4 border-blue-400 p-4 rounded-md">
        <p className="italic text-gray-700">“{aiRawOutput.analogy}”</p>
      </section>

            {/* Footer Branding (Web) */}
      <footer className="pt-6 mt-8 border-t border-gray-200 text-center text-xs text-gray-500">
        Generated by <span className="font-semibold">Know Your Terms</span>
      </footer>
    </motion.div>
  );
}




// import { motion } from "framer-motion";
// import { CheckCircle, AlertTriangle, Lightbulb, FileText } from "lucide-react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// type CitizenSummaryProps = {
//   about: string;
//   benefits: string[];
//   risks: string[];
//   clarity: { score: number; comment: string };
//   fairness: { score: number; comment: string };
//   repaymentDetails: {
//     emiAmount: string;
//     totalRepayment: string;
//     interestExtra: string;
//     note: string;
//   };
//   suggestions: string[];
//   analogy: string;
// };

// export default function CitizenSummary({ aiRawOutput }: { aiRawOutput: CitizenSummaryProps }) {

//   return (
//     <motion.div
//       className="space-y-8 text-neutral-800"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       {/* About */}
//       <section className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
//         <h2 className="text-lg font-semibold text-blue-700 flex items-center mb-2">
//           <FileText className="w-5 h-5 mr-2 text-blue-500" /> About
//         </h2>
//         <p className="text-neutral-700 leading-relaxed">{aiRawOutput.about}</p>
//       </section>

//       {/* Benefits */}
//       <section className="bg-green-50/60 rounded-xl p-4 border border-green-100">
//         <h2 className="text-lg font-semibold text-green-700 flex items-center mb-2">
//           <CheckCircle className="w-5 h-5 mr-2 text-green-500" /> Benefits
//         </h2>
//         <ul className="list-disc ml-6 space-y-1 text-neutral-700">
//           {aiRawOutput.benefits.map((b, i) => (
//             <li key={i}>{b}</li>
//           ))}
//         </ul>
//       </section>

//       {/* Risks */}
//       <section className="bg-red-50/60 rounded-xl p-4 border border-red-100">
//         <h2 className="text-lg font-semibold text-red-700 flex items-center mb-2">
//           <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> Risks
//         </h2>
//         <ul className="list-disc ml-6 space-y-1 text-neutral-700">
//           {aiRawOutput.risks.map((r, i) => (
//             <li key={i}>{r}</li>
//           ))}
//         </ul>
//       </section>

//       {/* Scores */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="flex flex-col items-center space-y-3">
//           <div className="w-20 h-20">
//             <CircularProgressbar
//               value={aiRawOutput.clarity.score * 10}
//               text={`${aiRawOutput.clarity.score}/10`}
//               styles={buildStyles({
//                 pathColor: "#3b82f6", // subtle blue
//                 textColor: "#1e293b",
//                 trailColor: "#e0e7ef",
//               })}
//             />
//           </div>
//           <p className="text-sm text-neutral-600 text-center">{aiRawOutput.clarity.comment}</p>
//         </div>
//         <div className="flex flex-col items-center space-y-3">
//           <div className="w-20 h-20">
//             <CircularProgressbar
//               value={aiRawOutput.fairness.score * 10}
//               text={`${aiRawOutput.fairness.score}/10`}
//               styles={buildStyles({
//                 pathColor: "#22c55e", // subtle green
//                 textColor: "#14532d",
//                 trailColor: "#e0e7ef",
//               })}
//             />
//           </div>
//           <p className="text-sm text-neutral-600 text-center">{aiRawOutput.fairness.comment}</p>
//         </div>
//       </section>

//       {/* Repayment Details */}
//       <section className="bg-purple-50/60 rounded-xl p-4 border border-purple-100">
//         <h2 className="text-lg font-semibold text-purple-700 mb-2">
//           Repayment Details
//         </h2>
//         <p className="text-sm text-neutral-600">
//           {aiRawOutput.repaymentDetails.note} <br />
//           <span className="font-medium">EMI:</span> {aiRawOutput.repaymentDetails.emiAmount}, <span className="font-medium">Total:</span> {aiRawOutput.repaymentDetails.totalRepayment}, <span className="font-medium">Interest:</span> {aiRawOutput.repaymentDetails.interestExtra}
//         </p>
//       </section>

//       {/* Suggestions */}
//       <section className="bg-yellow-50/60 rounded-xl p-4 border border-yellow-100">
//         <h2 className="text-lg font-semibold text-yellow-700 flex items-center mb-2">
//           <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" /> Suggestions
//         </h2>
//         <ul className="list-disc ml-6 space-y-1 text-neutral-700">
//           {aiRawOutput.suggestions.map((s, i) => (
//             <li key={i}>{s}</li>
//           ))}
//         </ul>
//       </section>

//       {/* Analogy */}
//       <section className="bg-sky-50 border-l-4 border-sky-400 p-4 rounded-md">
//         <p className="italic text-sky-700">“{aiRawOutput.analogy}”</p>
//       </section>
//     </motion.div>
//   );
// }
