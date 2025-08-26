import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Help: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is NCO-2015 and how does this tool help?",
      answer: "NCO-2015 is the National Classification of Occupation system with 3,600+ civilian occupations across 52 sectors. Our AI tool transforms the traditional manual keyword search into intelligent semantic search, making job classification faster and more accurate."
    },
    {
      question: "How does the semantic search work?",
      answer: "Our AI uses advanced natural language processing (NLP) models like BERT to understand the context and meaning of job descriptions. Instead of exact keyword matching, it finds semantically similar occupations with confidence scores."
    },
    {
      question: "What types of users can access this system?",
      answer: "The system supports three user roles: Enumerators (basic search and data entry), Data Analysts (advanced analytics and reporting), and Administrators (full system management and user control)."
    },
    {
      question: "How accurate is the AI classification?",
      answer: "Our system provides confidence scores for each match. High confidence (80%+) matches are typically very accurate. The system continuously learns and improves from user feedback and manual corrections."
    },
    {
      question: "Can I search in regional languages?",
      answer: "Yes! The system supports Hindi and major regional languages. You can enter job descriptions in your preferred language, and the AI will find appropriate NCO codes."
    },
    {
      question: "How do I upload and clean my dataset?",
      answer: "Navigate to Data Cleaning section, upload your CSV/Excel file, and the system will automatically detect anomalies, duplicates, and inconsistencies. You'll get a detailed report of issues found and fixes applied."
    },
    {
      question: "What file formats are supported for data upload?",
      answer: "We support CSV, Excel (.xlsx, .xls), and JSON formats. The system can handle files up to 100MB with automatic format detection and validation."
    },
    {
      question: "How can I export search results or datasets?",
      answer: "You can export data in multiple formats (CSV, Excel, JSON) from any section. Use the Export button available on result pages, data tables, and analytics dashboards."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we follow government-grade security standards. All data is encrypted in transit and at rest. Access is role-based, and we maintain complete audit trails of all system activities."
    },
    {
      question: "How do I get support or report issues?",
      answer: "Use the Contact page for support requests, or email support@mospi.gov.in. For urgent technical issues, system administrators can access priority support channels."
    }
  ];

  const quickGuides = [
    {
      title: "Getting Started",
      steps: [
        "Create an account by registering with your email and role",
        "Verify your email and complete profile setup",
        "Explore the dashboard to understand key metrics",
        "Try the job search with sample queries"
      ]
    },
    {
      title: "Searching for Job Codes",
      steps: [
        "Go to 'Job Search' from the main navigation",
        "Enter job title or description in natural language",
        "Review results sorted by confidence score",
        "Click 'View Details' for full job information"
      ]
    },
    {
      title: "Data Upload & Cleaning",
      steps: [
        "Navigate to 'Data Cleaning' section",
        "Upload your CSV or Excel file",
        "Wait for automatic processing and validation",
        "Download the cleaned dataset with summary report"
      ]
    },
    {
      title: "Using Analytics Dashboard",
      steps: [
        "Access 'Reports & Analytics' from navigation",
        "Select date range and filters",
        "View charts for trends and patterns",
        "Export reports for external use"
      ]
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#00295d] mb-4">Help & Documentation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using the NCO AI Classification system.
          </p>
        </div>

        {/* Quick Start Guides */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#00295d] mb-8">Quick Start Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickGuides.map((guide, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-[#00295d] mb-4">{guide.title}</h3>
                <ol className="space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <span className="bg-[#00295d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#00295d] mb-8">Feature Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "Semantic Search", description: "AI-powered job classification with natural language understanding and confidence scoring." },
              { icon: "📊", title: "Data Analytics", description: "Comprehensive dashboards with real-time insights, trends, and performance metrics." },
              { icon: "🧹", title: "Data Cleaning", description: "Automated anomaly detection, duplicate removal, and data validation processes." },
              { icon: "🌐", title: "Multi-language", description: "Support for Hindi and regional languages with automatic translation capabilities." },
              { icon: "👥", title: "Role Management", description: "Different access levels for enumerators, analysts, and administrators." },
              { icon: "🔒", title: "Security", description: "Government-grade security with encryption, audit trails, and access controls." }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[#00295d] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#00295d] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8 text-center border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-[#00295d] mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is ready to assist you with any questions or technical issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-[#00295d] hover:bg-[#003b85] transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@mospi.gov.in"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Help;
