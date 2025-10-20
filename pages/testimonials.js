export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp',
      quote: 'Emil AI reduced our hiring time by 70%. We went from 3 weeks to 5 days average hiring cycle. The AI screening is incredibly accurate and saves us countless hours.',
      metric: '70% faster',
      avatar: 'https://i.pravatar.cc/160?img=1',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Talent Acquisition Manager',
      company: 'Startup Plus',
      quote: 'The precision screening saved us hours of manual work. We\'re seeing 90% better candidate matches than our previous manual screening process.',
      metric: '+90% match',
      avatar: 'https://i.pravatar.cc/160?img=2',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Recruitment Manager',
      company: 'GrowthInc',
      quote: 'Automated scheduling and reports saved our team 20+ hours per week. It\'s a game changer for busy HR teams. The analytics are incredibly insightful.',
      metric: '20+ hrs saved',
      avatar: 'https://i.pravatar.cc/160?img=3',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'VP of People',
      company: 'ScaleFast',
      quote: 'The AI-powered job descriptions are phenomenal. We\'re attracting much higher quality candidates and our diversity metrics have improved significantly.',
      metric: '+40% quality',
      avatar: 'https://i.pravatar.cc/160?img=4',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Head of Talent',
      company: 'InnovateLabs',
      quote: 'The integration with our existing ATS was seamless. Emil AI has become an essential part of our hiring workflow. Highly recommend!',
      metric: '100% adoption',
      avatar: 'https://i.pravatar.cc/160?img=5',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'CEO',
      company: 'DataFlow',
      quote: 'The cost savings alone justify the investment. We\'ve reduced our cost-per-hire by 60% while improving candidate quality. Amazing results.',
      metric: '60% cost reduction',
      avatar: 'https://i.pravatar.cc/160?img=6',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Candidates Hired', icon: '👥' },
    { number: '20+', label: 'Companies Served', icon: '🏢' },
    { number: '85%', label: 'Faster Hiring', icon: '⚡' },
    { number: '4.9/5', label: 'Customer Rating', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Testimonials</h1>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">What our customers say about Emil AI. Real stories from real companies achieving real results.</p>
      </section>

      {/* Main Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{testimonial.metric}</div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact in Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">TechCorp: Scaling Engineering Team</h3>
                <p className="text-gray-600 mb-4">
                  "We needed to hire 50 engineers in 3 months. Emil AI helped us screen 2,000+ applications 
                  and identify the top 10% candidates. We completed our hiring goal 2 weeks early."
                </p>
                <div className="flex items-center">
                  <img src="https://i.pravatar.cc/160?img=1" alt="Sarah Johnson" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">HR Director, TechCorp</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Startup Plus: Diversity & Inclusion</h3>
                <p className="text-gray-600 mb-4">
                  "Emil AI helped us achieve 40% more diverse hires while reducing bias in our screening process. 
                  The AI ensures we're evaluating candidates fairly and objectively."
                </p>
                <div className="flex items-center">
                  <img src="https://i.pravatar.cc/160?img=2" alt="Michael Chen" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Michael Chen</div>
                    <div className="text-sm text-gray-600">Talent Acquisition Manager, Startup Plus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {['TechCorp', 'Startup Plus', 'GrowthInc', 'InnovateLabs'].map((company, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-gray-400">{company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-gray-600 text-lg">Get started with Emil AI and transform your hiring process today.</p>
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


