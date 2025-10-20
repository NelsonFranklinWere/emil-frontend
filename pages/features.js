export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Screening",
      description: "Advanced NLP algorithms analyze resumes and score candidates objectively",
      details: [
        "Natural language processing for CV analysis",
        "Bias-free candidate scoring",
        "Skills matching and gap analysis",
        "Cultural fit assessment"
      ]
    },
    {
      icon: "📝",
      title: "Smart Job Posting",
      description: "AI-optimized job descriptions that attract the right candidates",
      details: [
        "Automated job description generation",
        "SEO optimization for job boards",
        "Multi-platform distribution",
        "A/B testing for job posts"
      ]
    },
    {
      icon: "📅",
      title: "Automated Scheduling",
      description: "Seamless calendar integration and interview coordination",
      details: [
        "Google Calendar integration",
        "Automated interview invites",
        "Time zone handling",
        "Reminder notifications"
      ]
    },
    {
      icon: "📊",
      title: "Analytics & Reporting",
      description: "Comprehensive insights and metrics for better hiring decisions",
      details: [
        "Real-time hiring metrics",
        "Diversity and inclusion reports",
        "Time-to-hire analytics",
        "Cost-per-hire tracking"
      ]
    },
    {
      icon: "🔗",
      title: "Integrations",
      description: "Connect with your existing HR tools and workflows",
      details: [
        "ATS integrations",
        "Slack notifications",
        "Email automation",
        "API access"
      ]
    },
    {
      icon: "🛡️",
      title: "Security & Compliance",
      description: "Enterprise-grade security with full compliance support",
      details: [
        "GDPR compliance",
        "Data encryption",
        "Access controls",
        "Audit trails"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Features</h1>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">Everything you need to hire better, faster. Our comprehensive suite of AI-powered tools streamlines your entire recruitment process.</p>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, j) => (
                    <li key={j} className="text-sm text-gray-500 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Job Creation", desc: "Describe your role and requirements" },
                { step: "2", title: "AI Optimization", desc: "Our AI enhances your job posting" },
                { step: "3", title: "Candidate Screening", desc: "AI analyzes and scores applicants" },
                { step: "4", title: "Interview Scheduling", desc: "Automated coordination and setup" }
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Emil AI?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Speed</h3>
                <p className="text-gray-600">Reduce time-to-hire by 85% with automated processes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accuracy</h3>
                <p className="text-gray-600">90%+ accuracy in candidate matching and screening</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cost-Effective</h3>
                <p className="text-gray-600">Save 60% on recruitment costs with our AI platform</p>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Capabilities</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    GPT-4 powered natural language processing
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Custom ML models for your industry
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Real-time bias detection and correction
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Continuous learning and improvement
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Integration Options</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    RESTful API with comprehensive documentation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Webhook support for real-time updates
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Pre-built connectors for popular ATS systems
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Custom integration support available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience These Features?</h2>
            <p className="text-gray-600 text-lg">Get started with Emil AI and see how our features can transform your hiring process.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">strivego4@gmail.com</p>
              <a href="mailto:strivego4@gmail.com" className="text-blue-600 hover:text-blue-800 text-sm">Get in touch</a>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">+254 743 869 564</p>
              <a href="tel:+254743869564" className="text-green-600 hover:text-green-800 text-sm">Call now</a>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-2">+254 743 869 564</p>
              <a href="https://wa.me/254743869564" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 text-sm">Chat with us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


