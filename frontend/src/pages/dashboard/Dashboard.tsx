// Icon emojis used for dashboard features
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
  const features = [
    {
      name: "Agreement Summary",
      description: "Quickly understand key points of contracts and agreements.",
      icon: "📄",
      path: "/dashboard/role-selection",
    },
    {
      name: "Agreement Process",
      description: "Step-by-step guidance for drafting and executing agreements.",
      icon: "📝",
      path: "/dashboard/process/summary",
    },
    {
      name: "Case Summary",
      description: "Search, review, and analyze landmark legal cases.",
      icon: "⚖️",
      path: "/dashboard/case/case-details",
    },
    {
      name: "Chatbot Assistant",
      description: "Ask questions and get instant legal insights.",
      icon: "🤖",
      path: "/chatbot",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8 pt-28">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-black tracking-tight">
          ⚖️ Legal Dashboard
        </h1>
        <p className="text-gray-700 text-lg mt-2">
          Access all your legal tools and services in one place
        </p>
        <div className="mt-4 w-20 border-b-2 border-[#CDA047] mx-auto"></div>
      </header>

      {/* Features Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => navigate(feature.path)}
            className="cursor-pointer border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all bg-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">{feature.icon}</span>
              <h2 className="text-xl font-semibold text-gray-900">
                {feature.name}
              </h2>
            </div>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
