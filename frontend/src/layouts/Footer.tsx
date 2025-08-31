import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import logo from '../assets/logo2.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#e8eaf6] via-[#f5f7fa] to-white border-t-2 border-[#1a237e]">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Know Your Terms Logo" className="h-14 w-14 mr-3  " />
              <div>
                <h2 className="text-xl font-bold text-[#1a237e]">Know Your Terms</h2>
                <p className="text-[#283593] text-sm font-semibold">AI Legal Document Platform</p>
              </div>
            </div>
            <p className="text-[#283593] text-sm leading-relaxed">
              Simplifying legal documents—agreements, contracts, and more—into clear, actionable guidance for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#1a237e] font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-[#283593] text-sm">
              <li><a href="/" className="hover:text-[#1a237e] transition">Home</a></li>
              <li><a href="/about" className="hover:text-[#1a237e] transition">About</a></li>
              <li><a href="/help" className="hover:text-[#1a237e] transition">User Guide</a></li>
              <li><a href="/dashboard" className="hover:text-[#1a237e] transition">Dashboard</a></li>
              <li><a href="/contact" className="hover:text-[#1a237e] transition">Contact</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-[#1a237e] font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-3 text-[#283593] text-sm">
              <li>AI Summarization</li>
              <li>Agreement Templates</li>
              <li>Case Law Insights</li>
              <li>Document Review</li>
              <li>Chatbot Support</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-[#1a237e] font-semibold text-lg mb-4">Contact</h3>
            <p className="text-[#283593] text-sm mb-4 flex items-center gap-2">
              <Mail size={16} className="text-[#1a237e]" /> support@knowyourterms.ai
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#283593] hover:text-[#1a237e] transition">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#283593] hover:text-[#1a237e] transition">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#283593] hover:text-[#1a237e] transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-2 border-[#1a237e]/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-[#283593] text-sm font-medium mb-2">
              © {new Date().getFullYear()} Know Your Terms. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[#283593] text-xs">
              <span>Last Updated: August 2025</span>
              <span>•</span>
              <span>Version 1.0</span>
              <span>•</span>
              <span>Best viewed in Chrome, Firefox, Safari</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-[#1a237e] text-sm font-semibold flex items-center gap-1">
              🤖 <span>Powered by AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Know Your Terms Logo" className="h-6 w-6 rounded" />
              <span className="text-[#1a237e] text-sm font-medium">Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
