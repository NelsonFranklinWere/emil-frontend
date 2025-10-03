import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-400 rounded-xl flex items-center justify-center">
                <span className="text-black font-heading font-bold text-lg">E</span>
              </div>
              <span className={`text-2xl font-heading font-bold ${
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
              <a href="#contact" className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Contact</a>
              <Link href="/create-job" className="btn-primary">
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
               Trusted by 500+ companies worldwide
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            AI-Powered
            <span className="block text-accent-400">Recruitment, Simplified.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Post jobs, let Emil AI screen applicants, and get instant reports in your inbox.
            Hire smarter, faster, and better.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/create-job" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </Link>
            <button className="btn-secondary text-lg px-8 py-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '500+', label: 'Companies' },
              { number: '50K+', label: 'Candidates Hired' },
              { number: '70%', label: 'Faster Hiring' },
              { number: '4.9/5', label: 'Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-white">{stat.number}</div>
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Everything You Need to Hire Better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From job posting to final hiring decision, Emil AI handles the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '📝',
                title: 'Smart Job Posting',
                description: 'Easily create and manage job postings with AI-optimized templates'
              },
              {
                icon: '🤖',
                title: 'AI Screening',
                description: 'Automatically parse CVs and score candidates based on your requirements'
              },
              {
                icon: '📅',
                title: 'Automated Scheduling',
                description: 'Seamless Google Meet integration for interview scheduling'
              },
              {
                icon: '📊',
                title: 'Smart Reports',
                description: 'Get detailed analytics and reports delivered to HR and managers'
              }
            ].map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              How Emil AI Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Post Job', desc: 'Company creates job posting with requirements' },
              { step: '02', title: 'Applicants Apply', desc: 'Candidates apply via email or generated link' },
              { step: '03', title: 'AI Screening', desc: 'Emil AI parses CVs and scores candidates' },
              { step: '04', title: 'Get Results', desc: 'Receive reports and schedule interviews' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-heading font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Free Plan',
                price: '$0',
                description: 'Perfect for small teams getting started',
                features: ['1 Active Job Posting', 'Up to 20 Applicants', 'Basic AI Screening', 'Email Support']
              },
              {
                name: 'Pro Plan',
                price: '$99',
                description: 'Pay-as-you-go for growing businesses',
                features: ['Unlimited Job Postings', 'Unlimited Applicants', 'Advanced AI Screening', 'Priority Support', 'Custom Reports', 'API Access']
              }
            ].map((plan, index) => (
              <div key={index} className={`card relative ${
                index === 1 ? 'ring-2 ring-accent-400 transform scale-105' : ''
              }`}>
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-accent-400 text-black px-3 py-1 rounded-bl-lg rounded-tr-2xl text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-heading font-bold text-gray-900 mb-4">{plan.price}<span className="text-lg text-gray-600">/month</span></div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                  index === 1 ? 'btn-primary' : 'btn-secondary'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-blue">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of companies using Emil AI to hire better candidates faster.
          </p>
          <Link href="/create-job" className="btn-primary text-lg px-8 py-4 inline-block">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-heading font-bold">E</span>
                </div>
                <span className="text-xl font-heading font-bold">Emil AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered recruitment platform for modern businesses.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Status'] }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-heading font-bold mb-4">{column.title}</h4>
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
          </div>
        </div>
      </footer>
    </div>
  );
}