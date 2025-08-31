import { Link } from "react-router-dom";
import gemini from "../../assets/gemini.png";
import indiankanoon from "../../assets/indiankanoon.png";
import vertexAi from "../../assets/vertex.webp";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full bg-white">
      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto py-20 bg-white rounded-3xl mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard icon="📝" title="Agreement Summary" desc="AI extracts and simplifies long agreements into clear bullet points." />
          <FeatureCard icon="🤖" title="Legal Chatbot" desc="Ask document-related questions and get instant, reliable answers." />
          <FeatureCard icon="⚖️" title="Case Summary" desc="Integrated with IndianKanoon API for quick case law insights." />
          <FeatureCard icon="🌐" title="Language Translation" desc="Translate agreements into regional languages instantly." />
          <FeatureCard icon="📚" title="Agreement Process Guides" desc="Step-by-step instructions for creating or understanding agreements." />
          <FeatureCard icon="📝" title="Template Creation" desc="Ready-to-use templates for rent, job, loan, and business contracts." />
          <FeatureCard icon="🎬" title="Visual/Video Summary" desc="Explain agreements using AI-generated videos for better clarity." />
          <FeatureCard icon="🔍" title="Document Review" desc="Spot hidden clauses, risky terms, and missing essentials." />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 bg-[#e8eaf6] rounded-3xl shadow mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <Step icon="📤" number="1" title="Upload" desc="Upload your PDF, DOCX, or scanned agreement." />
          <Step icon="🤖" number="2" title="AI Processing" desc="Our AI + Gemini extracts text, applies NLP, and summarizes in plain language." />
          <Step icon="✨" number="3" title="Get Insights" desc="Receive summary, risks, translations, or even a fresh document template." />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 text-center bg-white rounded-3xl shadow mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Powered By</h2>
        <p className="text-lg text-gray-700 mb-8">
          Built on modern AI and cloud technologies for speed, security, and scale.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <TechBadge imgSrc={gemini} name="Google Gemini API" />
          <TechBadge imgSrc="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-vertical.png" name="Firebase Authentication" />
          <TechBadge imgSrc="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png" name="Firebase Database" />
          <TechBadge imgSrc="https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png" name="Google Translate API" />
          <TechBadge imgSrc={vertexAi} name="Vertex AI" />
          <TechBadge imgSrc={indiankanoon} name="IndianKanoon API" />
        </div>
      </section>

      {/* Audience Section */}
      <section className="w-full max-w-6xl mx-auto py-20 rounded-3xl mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">Who Is It For?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <AudienceCard icon="🎓" title="Students" desc="Learn legal basics and understand agreements easily." />
          <AudienceCard icon="🧑‍💼" title="Business Owners" desc="Simplify contracts and reduce legal risks." />
          <AudienceCard icon="👩‍⚖️" title="Judges" desc="Quickly review and summarize case documents." />
          <AudienceCard icon="📰" title="Journalists" desc="Analyze legal docs for accurate reporting." />
          <AudienceCard icon="🧑‍🎓" title="Law Students" desc="Study real agreements and case summaries." />
          <AudienceCard icon="🧑‍🤝‍🧑" title="Citizens" desc="Understand your rights in plain language." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 text-center bg-white rounded-3xl shadow mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Get Started Today</h2>
        <p className="text-lg text-gray-700 mb-8">Upload your first document and see the power of AI simplify the law for you.</p>
        <Link
          to="/dashboard"
          className="bg-gradient-to-br from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] text-gray-800 hover:bg-[#e0e7ef] focus:ring-[#b1b4b6] border border-[#b1b4b6] hover:from-[#e0e7ef] hover:via-[#f3f4f6] hover:to-[#f9fafb] font-bold px-8 py-3 rounded-full shadow-lg transition text-lg tracking-wide"
        >
          Try Demo →
        </Link>
      </section>
    </main>
  );
}

/* -------------------- Reusable Components -------------------- */
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-[#f5f7fa] shadow rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition border border-[#e0e3ef]">
      <div className="w-14 h-14 flex items-center justify-center mb-4 text-3xl bg-white rounded-full border border-[#e0e3ef] shadow-sm">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  );
}

function Step({ icon, number, title, desc }: { icon: React.ReactNode; number: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border-4 border-[#1a237e] shadow text-3xl">{icon}</div>
        <span className="absolute -bottom-3 -right-3 w-7 h-7 flex items-center justify-center rounded-full bg-[#1a237e] text-white text-base font-bold border-2 border-white shadow">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  );
}

function TechBadge({ imgSrc, name }: { imgSrc: string; name: string }) {
  return (
    <span className="flex items-center gap-2 px-4 py-2 bg-[#e8eaf6] rounded-full border border-[#c5cae9] text-sm font-medium shadow-sm text-black">
      <img src={imgSrc} alt={name + ' logo'} className="w-6 h-6 object-contain rounded bg-white" />
      {name}
    </span>
  );
}

function AudienceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-[#f5f7fa] shadow rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition border border-[#e0e3ef]">
      <div className="w-12 h-12 flex items-center justify-center mb-3 text-2xl bg-white rounded-full border border-[#e0e3ef] shadow-sm">{icon}</div>
      <h3 className="text-lg font-semibold text-black mb-1">{title}</h3>
      <p className="text-gray-700 text-xs">{desc}</p>
    </div>
  );
}
