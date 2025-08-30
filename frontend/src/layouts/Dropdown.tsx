import { motion, AnimatePresence } from "framer-motion";
import { t } from "i18next";

const LanguageDropdown = ({ show, onEnter, onLeave, onChange }: {
    show: boolean;
    onEnter: () => void;
    onLeave: () => void;
    onChange: (lng: string) => void;
  }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-32 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {/* All Indian languages from i18n */}
          <button onClick={() => onChange("en")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{("English")}</button>
          <button onClick={() => onChange("hi")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Hindi")}</button>
          <button onClick={() => onChange("bn")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Bengali")}</button>
          <button onClick={() => onChange("ta")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Tamil")}</button>
          <button onClick={() => onChange("te")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Telugu")}</button>
          <button onClick={() => onChange("mr")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Marathi")}</button>
          <button onClick={() => onChange("gu")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Gujarati")}</button>
          <button onClick={() => onChange("kn")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Kannada")}</button>
          <button onClick={() => onChange("ml")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Malayalam")}</button>
          <button onClick={() => onChange("pa")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Punjabi")}</button>
          <button onClick={() => onChange("or")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Odia")}</button>
          <button onClick={() => onChange("ur")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Urdu")}</button>
          <button onClick={() => onChange("as")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Assamese")}</button>
          <button onClick={() => onChange("mai")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Maithili")}</button>
          <button onClick={() => onChange("sat")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Santali")}</button>
          <button onClick={() => onChange("ks")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Kashmiri")}</button>
          <button onClick={() => onChange("ne")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Nepali")}</button>
          <button onClick={() => onChange("kok")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Konkani")}</button>
          <button onClick={() => onChange("sd")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Sindhi")}</button>
          <button onClick={() => onChange("doi")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Dogri")}</button>
          <button onClick={() => onChange("mni")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Manipuri")}</button>
          <button onClick={() => onChange("brx")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Bodo")}</button>
          <button onClick={() => onChange("sa")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >{t("Sanskrit")}</button>
        </motion.div>
      )}
    </AnimatePresence>
);


const solutionsDropdown = [
  {
    title: "Agreement Summary",
    desc: "Instantly grasp the main points, obligations, and risks in any contract or agreement.",
    icon: "📄",
    href: "/dashboard/role-selection",
  },
  {
    title: "Process Agreement",
    desc: "Guided, step-by-step workflow for drafting, reviewing, and executing agreements with confidence.",
    icon: "📝",
    href: "/dashboard/process/summary",
  },
  {
    title: "Case Summary",
    desc: "Effortlessly search, review, and analyze landmark legal cases for actionable insights.",
    icon: "⚖️",
    href: "/dashboard/case/case-details",
  },
  {
    title: "Chatbot Assistant",
    desc: "Ask legal questions and receive instant, AI-powered guidance and explanations.",
    icon: "🤖",
    href: "/chatbot",
  },
];

const solutionsDropdown2 = [
  {
    title: "Citizens",
    desc: "Get simple, clear legal summaries and actionable advice for everyday agreements.",
    icon: "🧑‍🤝‍🧑",
    href: "/citizen-solutions"
  },
  {
    title: "Small Business Owners",
    desc: "Professional compliance checks, risk analysis, and improvement tips for business contracts.",
    icon: "🧑‍💼",
    href: "/business-solutions"
  },
  {
    title: "Students & Professionals",
    desc: "Understand internships, job offers, and freelance contracts with student-friendly guidance.",
    icon: "🎓",
    href: "/student-solutions"
  }
];

export { LanguageDropdown, solutionsDropdown };





















      {/* Mobile Menu */}
      {/* <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[60px] left-0 w-full bg-white shadow-xl rounded-b-2xl z-40 flex flex-col items-left px-6 py-6 gap-2 sm:hidden"
          >
            <a href="/" className="text-base font-semibold hover:text-[#CDA047] transition" onClick={() => setMobileMenu(false)}>Home</a>
            <a href="/about-us" className="text-base font-semibold hover:text-[#CDA047] transition" onClick={() => setMobileMenu(false)}>About</a>
            <div className="w-full flex flex-col items-center">
              <button
                className="w-full flex items-left justify-left text-base font-semibold hover:text-[#CDA047] transition gap-1 focus:outline-none cursor-pointer"
                onClick={() => setMobileSolutions((prev) => !prev)}
              >
                Solutions
                <svg className={`w-3 h-3 ml-1 mt-1.5 transition-transform duration-200 ${mobileSolutions ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileSolutions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="w-full flex flex-col items-center overflow-hidden"
                  >
                    {solutionsDropdown.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:text-[#CDA047]"
                        onClick={() => { setMobileMenu(false); setMobileSolutions(false); }}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="/products" className="text-base font-semibold hover:text-[#CDA047] transition" onClick={() => setMobileMenu(false)}>Products</a>
          </motion.div>
        )}
      </AnimatePresence> */}