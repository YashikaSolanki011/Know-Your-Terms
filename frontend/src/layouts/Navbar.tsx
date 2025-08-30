import { useState, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import i18n from "../utils/i18n";
import { useTranslation } from "react-i18next";
import {LanguageDropdown, solutionsDropdown} from "./Dropdown";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ArrowRight } from "lucide-react";
import { getCurrentUserAsync } from "../store/authSlice";
import Button from "../components/common/Button";


const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showSolutions, setShowSolutions] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  // const [mobileSolutions, setMobileSolutions] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showLanguage, setShowLanguage] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(getAuth());
    localStorage.removeItem("idToken");
    dispatch(getCurrentUserAsync());
    navigate("/login");
  };

  // Desktop: Flicker-free dropdown
  const handleSolutionsEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowSolutions(true);
  };
  const handleSolutionsLeave = () => {
    timeoutRef.current = setTimeout(() => setShowSolutions(false), 150);
  };

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] mx-auto z-50 bg-white text-black shadow-xl rounded-2xl flex items-center justify-between px-4 sm:px-8 py-3"
    >
      {/* Logo */}
      <div className="flex items-center">
        <a href="/">
          <img
            className="h-10 w-auto object-cover cursor-pointer"
            src="/logo.png"
            alt="Know Your Term logo"
            loading="lazy"
          />
        </a>
      </div>

      {/* Hamburger for small screens */}
      <div className="flex items-center gap-2">
        {/* Contact Us button for desktop */}
        <div className="block sm:hidden">
          <a  
            href="/contact-us"
            style={{ backgroundColor: '#CDA047', color: '#fff' }}
            className="font-semibold rounded-full px-6 py-2 transition"
          >
            {t("Contact Us")}
          </a>
        </div>
        {/* Toggle button for mobile */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none cursor-pointer"
          onClick={() => setMobileMenu((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-black rounded transition-all duration-300 ${mobileMenu ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-black rounded mt-1.5 transition-all duration-300 ${mobileMenu ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-black rounded mt-1.5 transition-all duration-300 ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden sm:flex items-center gap-8">
        {/* Language Selector with dropdown */}
        <div className="relative"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setShowLanguage(true);
          }}
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => setShowLanguage(false), 150);
          }}
          tabIndex={0}
        >
          <button
            className="text-base font-semibold hover:text-[#CDA047] transition flex items-center gap-1 focus:outline-none cursor-pointer"
            aria-haspopup="true"
            aria-expanded={showLanguage}
          >
            {t("Language")}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <LanguageDropdown
            show={showLanguage}
            onEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setShowLanguage(true);
            }}
            onLeave={() => {
              timeoutRef.current = setTimeout(() => setShowLanguage(false), 150);
            }}
            onChange={(lng: string) => {
              i18n.changeLanguage(lng);
              setShowLanguage(false);
            }}
          />
        </div>

        <a href="/about" className="text-base font-semibold hover:text-[#CDA047] transition">{t("About")}</a>
        {/* Solutions with Flicker-Free Dropdown & Animation */}
        <div
          className="relative"
          onMouseEnter={handleSolutionsEnter}
          onMouseLeave={handleSolutionsLeave}
          tabIndex={0}
        >
          <button
            className="text-base font-semibold hover:text-[#CDA047] transition flex items-center gap-1 focus:outline-none cursor-pointer"
            aria-haspopup="true"
            aria-expanded={showSolutions}
          >
            {t("Solutions")}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {showSolutions && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute right-1/2 -translate-x-1/2 top-12 w-[700px] bg-white shadow-2xl rounded-xl p-8 z-50 border border-gray-100 flex flex-row gap-8"
                onMouseLeave={handleSolutionsLeave}
              >
                {/* Solutions List */}
                <div className="flex-1 grid grid-cols-2 gap-6">
                  {solutionsDropdown.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="flex items-start gap-3 mb-2 cursor-pointer hover:bg-gradient-to-br hover:from-[#e5e7eb] hover:via-[#f3f4f6] hover:to-[#f9fafb] group-hover:text-[#CDA047] hover:text-[#CDA047] p-3 rounded-lg transition group"
                    >
                      <span className="text-xl group-hover:scale-110 transition group-hover:text-[#CDA047]">{item.icon}</span>
                      <div className="group-hover:text-[#CDA047] hover:text-[#CDA047]">
                        <div className="font-semibold text-gray-900 group-hover:text-[#CDA047] hover:text-[#CDA047]">{item.title}</div>
                        <div className="text-gray-500 text-sm group-hover:text-[#CDA047] hover:text-[#CDA047]">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isAuthenticated && <a href="/dashboard" className="text-base font-semibold hover:text-[#CDA047] transition">{t("Dashboard")}</a>}
      </nav>

      <div className="hidden sm:block">
        {isAuthenticated ? (
          <div className="relative group">
            <Button
              type="button"
              variant="danger"

              onClick={handleLogout}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>


    </div>
  );
};

export default Navbar;



