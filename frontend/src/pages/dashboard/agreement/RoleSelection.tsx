import { motion } from "framer-motion";
import { GraduationCap, Building2, User, ChevronDown, ChevronUp } from "lucide-react";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const exampleAgreements: Record<string, string[]> = {
  student: [
    "Internship Agreement",
    "Offer Letter / Employment Contract",
    "Freelance Project Contract",
    "NDA (Non-Disclosure Agreement)"
  ],
  business: [
    "MoA / LLP Agreement",
    "Vendor / Client Contract",
    "Employment Agreement",
    "Service Agreement",
    "IP Assignment Agreement"
  ],
  citizen: [
    "Rental / Lease Agreement",
    "Loan Agreement",
    "Sale Agreement (Property/Vehicle)",
    "Will / Inheritance Agreement",
    "Power of Attorney"
  ],
};

const roles = [
    {
    id: "business",
    title: "Business",
    description:
      "Utilize powerful features to grow and manage your business effectively.",
    icon: <Building2 className="w-10 h-10" />,
  },
  {
    id: "citizen",
    title: "Citizen",
    description:
      "Engage with your community and access public services with ease.",
    icon: <User className="w-10 h-10" />,
  },
  {
    id: "student",
    title: "Student",
    description:
      "Access educational resources and tools tailored for your learning journey.",
    icon: <GraduationCap className="w-10 h-10" />,
  }
];

const RoleSelection = () => {
  // All examples open by default
  const [expandedRoles, setExpandedRoles] = useState<string[]>(roles.map(r => r.id));
  const navigate = useNavigate();
  const handleSelect = (roleId: string) => {
    navigate(`/dashboard/agreement/summary?targetGroup=${roleId}`);
  };
  // Toggle open/close for each role
  const handleToggle = (roleId: string) => {
    setExpandedRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-semibold text-xs tracking-wide uppercase shadow-sm bg-white">
            User Role Selection
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
          Choose Your Role
        </h1>
        <p className="text-lg font-body text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Select the option that best describes you to access personalized features and content.
        </p>
      </motion.div>

      {/* Role Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col items-center text-center p-6">
              <div className="flex flex-col items-center gap-4 h-full">
                <div className="p-6 rounded-full border shadow-sm bg-white">
                  {role.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{role.title}</h2>
                <p className="text-sm text-gray-600">{role.description}</p>

                {/* Example agreements preview */}
                <span
                  className="w-full text-left text-gray-700 py-2 cursor-pointer select-none"
                  onClick={() => handleToggle(role.id)}
                >
                  {expandedRoles.includes(role.id) ? "Hide Examples" : "Show Examples"} {expandedRoles.includes(role.id) ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />}
                </span>

                {expandedRoles.includes(role.id) && (
                  <ul className="text-left text-sm text-gray-700 w-full list-disc pl-5 border border-gray-100 rounded bg-gray-50 py-2 mt-1">
                    {exampleAgreements[role.id].map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                )}

                <Button
                  className="mt-2 w-full"
                  onClick={() => handleSelect(role.id)}
                >
                  Continue as {role.title}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 text-center max-w-2xl"
      >
        <p className="text-gray-600 font-body text-sm leading-relaxed">
          Not sure which role fits you best? Each role comes with tailored features and content. 
          You can always change your selection later in your profile settings.
        </p>
        <div className="mt-6">
          <a 
            href="/help" 
            className="text-gray-700 font-semibold hover:text-gray-900 transition-colors duration-300 text-sm border-b border-gray-300 hover:border-gray-700 pb-1"
          >
            Need help choosing? Learn more about each role →
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;






// import { motion } from "framer-motion";
// import { GraduationCap, Building2, User, FileText } from "lucide-react";
// import Card from "../../../components/common/Card";
// import Button from "../../../components/common/Button";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// // Example agreements per role
// const exampleAgreements: Record<string, string[]> = {
//   student: [
//     "Internship Agreement",
//     "Offer Letter / Employment Contract",
//     "Freelance Project Contract",
//     "NDA (Non-Disclosure Agreement)"
//   ],
//   business: [
//     "MoA / LLP Agreement",
//     "Vendor / Client Contract",
//     "Employment Agreement",
//     "Service Agreement",
//     "IP Assignment Agreement"
//   ],
//   citizen: [
//     "Rental / Lease Agreement",
//     "Loan Agreement",
//     "Sale Agreement (Property/Vehicle)",
//     "Will / Inheritance Agreement",
//     "Power of Attorney"
//   ],
// };

// const roles = [
//   {
//     id: "student",
//     title: "Students & Young Professionals",
//     description:
//       "For internships, freelance projects, and first job contracts.",
//     icon: <GraduationCap className="w-10 h-10 text-[#CDA047]" />,
//   },
//   {
//     id: "business",
//     title: "Small Business Owners",
//     description:
//       "For entrepreneurs, startups, and SMEs handling vendor or client contracts.",
//     icon: <Building2 className="w-10 h-10 text-[#F6A507]" />,
//   },
//   {
//     id: "citizen",
//     title: "Citizens",
//     description:
//       "For everyday agreements like rental, loan, and property documents.",
//     icon: <User className="w-10 h-10 text-[#CDA047]" />,
//   },
// ];

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [expandedRole, setExpandedRole] = useState<string | null>(null);

//   const handleSelect = (roleId: string) => {
//     navigate(`/dashboard/agreement/summary?targetGroup=${roleId}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center px-4 py-20">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-gray-900">
//           Dashboard – Agreements & Services
//         </h1>
//         <p className="text-lg text-gray-600 mt-3">
//           Access Agreement Summaries, Process Agreements, Case Summaries, and Chatbot help – all in one place.
//         </p>
//       </motion.div>

//       {/* Features Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full max-w-6xl">
//         {["Agreement Summary", "Process Agreement", "Case Summary", "Chatbot"].map((feature, i) => (
//           <motion.div
//             key={feature}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//           >
//             <Card className="flex flex-col items-center text-center p-6 h-full shadow-md hover:shadow-lg transition rounded-2xl">
//               <FileText className="w-12 h-12 text-[#CDA047] mb-4" />
//               <h3 className="text-lg font-semibold">{feature}</h3>
//               <p className="text-sm text-gray-600 mt-2">
//                 Quick access to {feature.toLowerCase()} in one click.
//               </p>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       {/* Role Selection */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
//         {roles.map((role, index) => (
//           <motion.div
//             key={role.id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2 }}
//             className="h-full"
//           >
//             <Card className="h-full flex flex-col items-center text-center p-6">
//               <div className="flex flex-col items-center gap-4 h-full">
//                 <div className="bg-[#fffbe6] p-6 rounded-full border shadow-sm">
//                   {role.icon}
//                 </div>
//                 <h2 className="text-xl font-semibold">{role.title}</h2>
//                 <p className="text-sm text-gray-600">{role.description}</p>

//                 {/* Example agreements preview */}
//                 <Button
//                   className="mt-4 w-full bg-[#CDA047] hover:bg-[#b38a3e] text-white rounded-full py-2"
//                   onClick={() =>
//                     setExpandedRole(expandedRole === role.id ? null : role.id)
//                   }
//                 >
//                   {expandedRole === role.id ? "Hide Examples" : "Show Examples"}
//                 </Button>

//                 {expandedRole === role.id && (
//                   <ul className="mt-4 text-left text-sm text-gray-700 w-full list-disc pl-5">
//                     {exampleAgreements[role.id].map((doc, i) => (
//                       <li key={i}>{doc}</li>
//                     ))}
//                   </ul>
//                 )}

//                 <Button
//                   className="mt-6 w-full border-2 border-[#CDA047] text-[#CDA047] hover:bg-[#fff7db]"
//                   onClick={() => handleSelect(role.id)}
//                 >
//                   Continue as {role.title}
//                 </Button>
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
