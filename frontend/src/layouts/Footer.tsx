import React from 'react';
import logo2 from '../assets/react.svg'; // Adjust the path as necessary
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-blue-900 border-t border-blue-200">
      {/* Government Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 h-1"></div>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-4">
          
          {/* About Section with Logo */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-8">
              {/* DAsort Logo */}
              <div className="flex items-center">
                <div>
                  <img src={logo2} alt="DAsort Logo" className="h-16 w-16 mb-2" />
                  <p className="text-blue-200 text-sm font-medium">AI Classification Portal</p>
                  <p className="text-gray-300 text-xs">Government of India</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-md">
              AI-powered semantic search platform for National Classification of Occupation (NCO-2015), 
              developed by the Ministry of Statistics and Programme Implementation under Digital India Initiative.
            </p>
          
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>Home</li>
              <li>About Project</li>
              <li>Classification Portal</li>
              <li>User Guide</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Copyright Policy</li>
              <li>Disclaimer</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Policy</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>MoSPI Official</li>
              <li>India.gov.in</li>
              <li>Digital India</li>
              <li>RTI</li>
              <li>Grievance Portal</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-gray-300 text-sm font-medium mb-2">
                © 2025 Ministry of Statistics and Programme Implementation, Government of India
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-xs">
                <span>Last Updated: August 2025</span>
                <span>•</span>
                <span>Version 1.0</span>
                <span>•</span>
                <span>Best viewed in Chrome, Firefox, Safari</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-blue-200 text-sm font-semibold">
                🇮🇳 भारत सरकार
              </div>
              <div className="flex items-center space-x-2">
                <img src={logo2} alt="DAsort Logo" className="h-6 w-6" />
                <span className="text-blue-200 text-sm font-medium">Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
