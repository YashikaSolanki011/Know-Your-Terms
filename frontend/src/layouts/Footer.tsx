// src/components/common/Footer.tsx
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import logo from '../assets/logo2.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#b1b4b6] via-[#e2d0a6] to-[#efe19e] border-t-2 border-[#CDA047]">
      {/* Government Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 h-1"></div>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <img src={logo} alt="Know Your Terms Logo" className="h-20 w-16 mr-3" />
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">Know Your Terms</h2>
                  <p className="text-[#CDA047] text-sm font-semibold">AI Legal Document Platform</p>
                </div>
              </div>
            </div>
            <p className="text-[#5c4a1a] font-body text-sm leading-relaxed">
              AI-powered platform for simplifying complex legal documents like rental agreements, 
              loan contracts, and terms of service into clear, easy-to-understand guidance.
            </p>
          </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-heading font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3 text-[#5c4a1a] font-body text-sm">
            <li><a href="/" className="hover:text-[#CDA047] transition duration-300">Home</a></li>
            <li><a href="/about" className="hover:text-[#CDA047] transition duration-300">About Project</a></li>
            <li><a href="/help" className="hover:text-[#CDA047] transition duration-300">User Guide</a></li>
            <li><a href="/dashboard" className="hover:text-[#CDA047] transition duration-300">Dashboard</a></li>
            <li><a href="/contact" className="hover:text-[#CDA047] transition duration-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-gray-900 font-heading font-semibold text-lg mb-4">Our Features</h3>
          <ul className="space-y-3 text-[#5c4a1a] font-body text-sm">
            <li>AI Document Summarization</li>
            <li>Process Detail Analysis</li>
            <li>Real-world Case Studies</li>
            <li>Document Review & Upload</li>
            <li>Interactive Chatbot Support</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-gray-900 font-heading font-semibold text-lg mb-4">Get in Touch</h3>
          <p className="text-[#5c4a1a] font-body text-sm mb-4 flex items-center gap-2">
            <Mail size={16} className="text-[#CDA047]" /> support@knowyourterms.ai
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
               className="text-[#5c4a1a] hover:text-[#CDA047] transition duration-300">
              <Twitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
               className="text-[#5c4a1a] hover:text-[#CDA047] transition duration-300">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-[#5c4a1a] hover:text-[#CDA047] transition duration-300">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t-2 border-[#CDA047]/20 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-[#5c4a1a] font-body text-sm font-medium mb-2">
              © {new Date().getFullYear()} Know Your Terms - AI Legal Document Platform. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 text-xs">
              <span>Last Updated: August 2025</span>
              <span>•</span>
              <span>Version 1.0</span>
              <span>•</span>
              <span>Best viewed in Chrome, Firefox, Safari</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-[#CDA047] text-sm font-semibold">
              🤖 Powered by AI
            </div>
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Know Your Terms Logo" className="h-6 w-6" />
              <span className="text-[#CDA047] text-sm font-medium">Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </footer>
  );
}
