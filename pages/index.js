import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "James Mwangi",
      role: "HR Director, TechCorp",
      content: "Emil AI reduced our hiring time by 70%. We went from 3 weeks to 5 days average hiring cycle.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Musando",
      role: "Talent Acquisition, Startup TechPlus",
      content: "The AI screening is incredibly accurate. We're seeing 90% better candidate matches than manual screening.",
      avatar: "👨‍💼"
    },
    {
      name: "Emily Irungu",
      role: "Recruitment Manager, GrowthInc",
      content: "Automated scheduling and reports saved our team 20+ hours per week. Game changer for busy HR teams.",
      avatar: "👩‍🎓"
    }
  ];

  // Features with icons
  const features = [
    {
      icon: '📝',
      title: 'Smart Job Posting',
      description: 'AI-optimized job descriptions that attract the right candidates',
      details: 'Generate compelling job posts, optimize for SEO, and distribute across multiple platforms automatically.'
    },
    {
      icon: '🤖',
      title: 'AI Candidate Screening',
      description: 'Automated CV parsing and intelligent scoring',
      details: 'Uses advanced NLP to analyze resumes, match skills, and rank candidates based on your requirements.'
    },
    {
      icon: '📅',
      title: 'Automated Scheduling',
      description: 'Seamless calendar integration and interview coordination',
      details: 'Sync with Google Calendar, auto-send invites, and manage interview slots without the back-and-forth.'
    },
    {
      icon: '📊',
      title: 'Smart Analytics & Reports',
      description: 'Real-time insights and comprehensive hiring metrics',
      details: 'Get detailed reports on candidate pipeline, diversity metrics, time-to-hire, and cost-per-hire.'
    }
  ];

  // Company logos (placeholder)
  const companies = [
    { name: "TechCorp", logo: "tC" },
    { name: "Startup TechPlus", logo: "💡" },
    { name: "GrowthInc", logo: "📈" },
    { name: "InnovateLabs", logo: "🔬" },
    { name: "ScaleFast", logo: "⚡" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-lg">E</span>
              </div>
              <span className={`text-2xl font-bold ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>Emil AI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Features</a>
              <a href="#pricing" className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Pricing</a>
              <a href="#testimonials" className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Testimonials</a>
              <a href="#contact" className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Contact</a>
              <Link href="/create-job" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg shadow transition-all duration-200">
                Start Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className={`p-2 rounded-lg ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-white/90 text-sm font-medium">
               Trusted by 20+ companies in Kenya
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            AI-Powered
            <span className="block text-yellow-400">Recruitment, Simplified.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Post jobs, let Emil AI screen applicants, and get instant reports in your inbox.
            Hire smarter, faster, and better with cutting-edge artificial intelligence.
          </p>

          {/* AI Demo Video Placeholder */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI Screening in Action</h3>
                  <p className="text-white/60">Watch how Emil AI analyzes resumes and scores candidates in real-time</p>
                  <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition-all duration-200">
                    ▶️ Play Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/create-job" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg shadow transition-all duration-200 transform hover:scale-105 text-lg">
              Start Free Trial
            </Link>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg shadow transition-all duration-200 transform hover:scale-105 text-lg flex items-center">
              <span className="mr-2">🤖</span>
              Try AI Screening Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 font-bold px-8 py-4 rounded-lg shadow transition-all duration-200 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See Demo
            </button>
          </div>

          {/* Social Proof - Company Logos */}
          <div className="mb-16">
            <p className="text-white/60 text-sm mb-6">TRUSTED BY INNOVATIVE COMPANIES</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {companies.map((company, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                  <span className="text-2xl">{company.logo}</span>
                  <span className="font-semibold">{company.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '20+', label: 'Companies' },
              { number: '500+', label: 'Candidates Hired' },
              { number: '85%', label: 'Faster Hiring' },
              { number: '4.7/5', label: 'Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Hire Better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From job posting to final hiring decision, Emil AI handles the heavy lifting with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
                  {feature.details}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Powered by Cutting-Edge Technology</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { name: "OpenAI GPT-4", icon: "🧠" },
                { name: "Google Gemini", icon: "🔮" },
                { name: "HuggingFace", icon: "🤗" },
                { name: "Google Calendar", icon: "📅" },
                { name: "Gmail API", icon: "📧" }
              ].map((tech, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-xl">{tech.icon}</span>
                  <span className="font-medium text-gray-700">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What HR Professionals Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="mt-4 text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your team. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="card text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-4">$20<span className="text-lg text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">Perfect for small teams getting started</p>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1 Active Job Posting</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 500 Applicants</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic AI Screening</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email Support</span>
                </div>
              </div>
              
              <Link href="/create-job" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-bold transition-colors block text-center">
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="card text-center relative ring-2 ring-yellow-400 transform scale-105">
              <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 rounded-bl-lg rounded-tr-2xl text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-4">$85<span className="text-lg text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">Pay-as-you-go for growing businesses</p>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited Job Postings</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited Applicants</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced AI Screening</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority Support</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom Reports</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>API Access</span>
                </div>
              </div>
              
              <Link href="/create-job" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-bold transition-colors block text-center">
                Start Pro Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="card text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-900 mb-4">Custom</div>
              <p className="text-gray-600 mb-6">For large organizations with complex needs</p>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Everything in Pro</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated Account Manager</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom AI Models</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>SSO & Advanced Security</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom Integrations</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

     {/* Contact/Demo Section */}
<section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
      Ready to Transform Your Hiring?
    </h2>
    <p className="text-xl text-white/80 mb-8">
      See how Emil AI can revolutionize your recruitment process. Book a personalized demo today.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
      <Link 
        href="/dashboard"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg shadow transition-all duration-200 transform hover:scale-105 text-lg inline-block text-center"
      >
        📅 Book a Demo
      </Link>
      <Link 
        href="/contact-sales"
        className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-lg shadow transition-all duration-200 text-lg inline-block text-center"
      >
        💬 Chat with Sales
      </Link>
    </div>
    
    <p className="text-white/60 text-sm">
      Or start instantly with our <Link href="/create-job" className="text-yellow-400 hover:text-yellow-300 underline">free trial</Link>
    </p>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">E</span>
                </div>
                <span className="text-xl font-bold">Emil AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered recruitment platform for modern businesses.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/stivego-company-729746386/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </a>
                <a href="https://www.tiktok.com/@strivego" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">T</span>
                  🐦
                </a>
                <a href="https://www.facebook.com/profile.php?id=61581393475109" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  💻
                </a>
              </div>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API', 'Integrations'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Support', links: ['Help Center', 'Documentation', 'Status', 'Community'] }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-bold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Emil AI. All rights reserved.</p>
            <p className="mt-2">contact@emilai.com</p>
            <p className="mt-2 text-sm">
              Powered by <span className="text-yellow-400">Strive Go Team</span> • Building the future of recruitment
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}