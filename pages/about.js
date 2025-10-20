export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Emil AI</h1>
          <p className="text-white/80 text-lg">AI-powered recruitment platform that helps teams hire faster with higher confidence.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">We streamline hiring with an AI-first pipeline: from job intake and sourcing to screening, scheduling, and reporting. Our goal is to reduce time-to-hire while improving candidate quality and fairness.</p>
              <p className="text-gray-600 leading-relaxed">Founded in 2024, Emil AI was born from the frustration of traditional hiring processes that were slow, biased, and inefficient. We believe that AI can make recruitment more human, not less.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed mb-6">To become the world's most trusted AI recruitment platform, helping companies find the right talent faster while ensuring fair, unbiased hiring practices.</p>
              <p className="text-gray-600 leading-relaxed">We envision a future where every hire is the right hire, where diversity and inclusion are naturally achieved through intelligent systems.</p>
            </div>
          </div>

          {/* What We Do */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Do</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Screening</h3>
                <p className="text-gray-600">Advanced NLP algorithms analyze resumes and score candidates objectively.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Optimization</h3>
                <p className="text-gray-600">AI-optimized job descriptions that attract the right candidates.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
                <p className="text-gray-600">Automated calendar integration and interview coordination.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600">Comprehensive reports and insights for better hiring decisions.</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">EM</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Engineering Team</h3>
                <p className="text-gray-600">AI/ML engineers building the future of recruitment technology.</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">PM</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Team</h3>
                <p className="text-gray-600">Product managers ensuring our solutions meet real-world needs.</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">CS</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Success</h3>
                <p className="text-gray-600">Dedicated support team helping you maximize your hiring success.</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fairness First</h3>
                <p className="text-gray-600">We build AI systems that eliminate bias and promote diversity in hiring.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
                <p className="text-gray-600">Our AI decisions are explainable and auditable for complete trust.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">We continuously push the boundaries of what's possible in recruitment.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-gray-600">Companies Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Candidates Hired</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-gray-600">Faster Hiring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">4.7/5</div>
                <div className="text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg">Ready to transform your hiring process? Contact us today.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">strivego4@gmail.com</p>
              <a href="mailto:strivego4@gmail.com" className="text-blue-600 hover:text-blue-800 text-sm">Send us an email</a>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">+254 743 869 564</p>
              <a href="tel:+254743869564" className="text-green-600 hover:text-green-800 text-sm">Call us now</a>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Nairobi, Kenya</p>
              <p className="text-gray-500 text-sm">Mombasa Road</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


