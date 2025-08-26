import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Government Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 h-2"></div>
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">Government of India</div>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="text-sm">Ministry of Statistics and Programme Implementation</div>
          </div>
          <div className="text-sm font-medium">Digital India Initiative</div>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 py-20 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-8">
            <span className="text-sm font-semibold tracking-widest uppercase text-blue-800">
              About the Project
            </span>
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            AI-enabled Semantic Search for NCO
          </h1>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing the National Classification of Occupation with advanced AI and semantic search capabilities 
            for enhanced government survey efficiency and data quality.
          </p>
          
          {/* Key Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg">
              <div className="text-3xl font-bold text-blue-900">3,600+</div>
              <div className="text-sm text-slate-600 font-medium">NCO-2015 Codes</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg">
              <div className="text-3xl font-bold text-green-700">99%+</div>
              <div className="text-sm text-slate-600 font-medium">Classification Accuracy</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
              <div className="text-3xl font-bold text-purple-700">90%</div>
              <div className="text-sm text-slate-600 font-medium">Time Reduction</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg">
              <div className="text-3xl font-bold text-orange-700">52</div>
              <div className="text-sm text-slate-600 font-medium">Sector Coverage</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 space-y-24">
        {/* Project Overview */}
        <section className="relative">
          <div className="bg-blue-100 border border-blue-200 rounded-3xl p-8 lg:p-12 text-gray-900 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-blue-900">Project Overview</h3>
                <div className="space-y-6 text-blue-800 leading-relaxed">
                  <p className="text-lg">
                    The National Classification of Occupation (NCO) is a standardized system for classifying occupations in India,
                    meticulously aligned with the International Standard Classification of Occupations (ISCO-08). The current version, NCO-2015,
                    encompasses detailed descriptions of 3,600+ civilian occupations across 52 sectors, structured through an
                    sophisticated 8-digit hierarchical classification system.
                  </p>
                  <p className="text-lg">
                    Our revolutionary AI-powered solution transforms the traditional keyword-based search paradigm into an intelligent semantic search
                    ecosystem that comprehends context, synonyms, and complex job relationships, making occupation classification exponentially faster,
                    more accurate, and infinitely scalable for nationwide deployment.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-md">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🧠</div>
                    <h4 className="text-xl font-bold text-blue-900">AI Classification Engine</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Processing Speed</span>
                      <span className="text-green-600 font-bold">0.3s</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Accuracy Rate</span>
                      <span className="text-green-600 font-bold">99.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Coverage</span>
                      <span className="text-green-600 font-bold">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-green-800">
                Advanced Capabilities
              </span>
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Feature Ecosystem</h3>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto">
              Built with enterprise-grade technologies and government-standard security protocols.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                title: 'Semantic Search Intelligence', 
                description: 'Advanced NLP and deep learning algorithms to understand job descriptions and find relevant NCO codes with confidence scores and contextual reasoning.', 
                icon: '🧠',
              },
              { 
                title: 'Automated Data Processing', 
                description: 'Intelligent ingestion and indexing of NCO-2015 data with hierarchical structure preservation and real-time updates.', 
                icon: '⚙️',
              },
              { 
                title: 'Multi-language Support', 
                description: 'Comprehensive support for Hindi, English, and regional languages to enable truly nationwide accessibility and adoption.', 
                icon: '🌐',
              },
              { 
                title: 'Administrative Dashboard', 
                description: 'Comprehensive management panel for data updates, user management, system monitoring, and performance analytics.', 
                icon: '📊',
              },
              { 
                title: 'Enterprise API Integration', 
                description: 'RESTful APIs with authentication and rate limiting for seamless integration with existing MoSPI survey applications.', 
                icon: '🔗',
              },
              { 
                title: 'Comprehensive Audit Trail', 
                description: 'Complete logging of search history, manual overrides, system usage, and compliance tracking for full accountability.', 
                icon: '📋',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg shadow-sm mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                
                {/* Feature Status */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Status</span>
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    ✅ Operational
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expected Impact */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 border border-orange-200 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-orange-800">
                Transformational Impact
              </span>
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Expected National Impact</h3>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto">
              Revolutionizing government data collection and policy-making through intelligent automation.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: 'Enhanced Operational Efficiency', 
                desc: 'Dramatically reduce manual effort for enumerators while significantly increasing classification accuracy across all government surveys and data collection initiatives.',
                icon: '🚀',
              },
              { 
                title: 'Superior Data Quality Standards', 
                desc: 'Ensure consistent classification standards across all regions, leading to better policy planning, evidence-based governance, and informed decision-making.',
                icon: '🎯',
              },
              { 
                title: 'Significant Cost Optimization', 
                desc: 'Minimize training time and resource allocation while accelerating survey preparation, data collection processes, and project deployment timelines.',
                icon: '💰',
              },
              { 
                title: 'Future-Ready Scalability', 
                desc: 'Enable intelligent, automated systems for national classification tasks that can seamlessly adapt to evolving job markets and emerging occupations.',
                icon: '📈',
              },
            ].map((impact) => (
              <div key={impact.title} className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-lg shadow-sm mb-4 group-hover:bg-gray-700 transition-colors duration-300">
                  <span className="text-xl">{impact.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{impact.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{impact.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 border border-purple-200 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-purple-800">
                Technology Foundation
              </span>
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Enterprise-Grade Technology Stack</h3>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto">
              Built on proven technologies with government-standard security and reliability protocols.
            </p>
          </div>
          
          <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8 lg:p-12 text-gray-900 shadow-lg">

            
            <div className="mt-12 text-center">
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Government Compliance & Security</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                  <div className="text-3xl mb-3">🔐</div>
                  <div className="font-semibold mb-2 text-gray-900">Data Security</div>
                  <div className="text-sm text-gray-600">End-to-end encryption and secure protocols</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                  <div className="text-3xl mb-3">✅</div>
                  <div className="font-semibold mb-2 text-gray-900">MoSPI Compliance</div>
                  <div className="text-sm text-gray-600">Meets all ministry standards and requirements</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                  <div className="text-3xl mb-3">🌐</div>
                  <div className="font-semibold mb-2 text-gray-900">Scalable Infrastructure</div>
                  <div className="text-sm text-gray-600">Cloud-native architecture for nationwide deployment</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
