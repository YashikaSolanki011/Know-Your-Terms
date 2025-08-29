import { motion } from "framer-motion";
import { GraduationCap, Building2, User } from "lucide-react";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "student",
    title: "Student",
    description:
      "Access educational resources and tools tailored for your learning journey.",
    icon: <GraduationCap className="w-10 h-10 text-[#CDA047]" />,
  },
  {
    id: "business",
    title: "Business",
    description:
      "Utilize powerful features to grow and manage your business effectively.",
    icon: <Building2 className="w-10 h-10 text-[#F6A507]" />,
  },
  {
    id: "citizen",
    title: "Citizen",
    description:
      "Engage with your community and access public services with ease.",
    icon: <User className="w-10 h-10 text-[#CDA047]" />,
  },
];

const RoleSelection = () => {
  const navigate = useNavigate();
  const handleSelect = (roleId: string) => {
    // Redirect to summary page with role as param or state
    navigate(`/dashboard/agreement/summary?targetGroup=${roleId}`);
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
          <div className="inline-block px-4 py-2 rounded-full bg-[#fffbe6] border border-[#CDA047] text-[#CDA047] font-semibold text-xs tracking-wide uppercase shadow-sm">
            User Role Selection
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
          Choose Your Role
        </h1>
        <p className="text-lg font-body text-[#5c4a1a] leading-relaxed max-w-2xl mx-auto">
          Select the option that best describes you to access personalized features and content.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="h-full"
          >
            <Card 
              variant="elevated" 
              className="h-full flex flex-col items-center text-center group"
            >
              <div className="flex flex-col items-center gap-6 h-full">
                <div className="bg-[#fffbe6] p-6 rounded-full shadow-sm border border-[#CDA047]/20 group-hover:border-[#CDA047]/60 transition-all duration-300">
                  {role.icon}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                      {role.title}
                    </h2>
                    <p className="text-[#5c4a1a] mb-6 text-sm leading-relaxed font-body">
                      {role.description}
                    </p>
                  </div>
                  <Button
                    className="bg-[#CDA047] hover:bg-[#b38a3e] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 border-2 border-[#CDA047] hover:border-[#b38a3e] w-full"
                    onClick={() => handleSelect(role.id)}
                  >
                    Select {role.title}
                  </Button>
                </div>
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
        <p className="text-[#5c4a1a] font-body text-sm leading-relaxed">
          Not sure which role fits you best? Each role comes with tailored features and content. 
          You can always change your selection later in your profile settings.
        </p>
        <div className="mt-6">
          <a 
            href="/help" 
            className="text-[#CDA047] font-semibold hover:text-[#b38a3e] transition-colors duration-300 text-sm border-b border-[#CDA047]/30 hover:border-[#CDA047] pb-1"
          >
            Need help choosing? Learn more about each role →
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;