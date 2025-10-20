export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Sales</h1>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">We'll help tailor Emil AI to your hiring process. Get personalized recommendations and see how we can transform your recruitment.</p>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <form className="space-y-6" action="mailto:strivego4@gmail.com" method="post" encType="text/plain">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    className="form-input" 
                    name="firstName"
                    placeholder="First name" 
                    required 
                  />
                  <input 
                    className="form-input" 
                    name="lastName"
                    placeholder="Last name" 
                    required 
                  />
                </div>
                <input 
                  className="form-input" 
                  name="email"
                  placeholder="Work email" 
                  type="email" 
                  required 
                />
                <input 
                  className="form-input" 
                  name="company"
                  placeholder="Company name" 
                  required 
                />
                <select className="form-input" name="companySize">
                  <option>Company size</option>
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-1000 employees</option>
                  <option>1000+ employees</option>
                </select>
                <select className="form-input" name="inquiry">
                  <option>How can we help?</option>
                  <option>General inquiry</option>
                  <option>Product demo</option>
                  <option>Pricing information</option>
                  <option>Technical support</option>
                  <option>Partnership opportunity</option>
                </select>
                <textarea 
                  className="form-input" 
                  name="message"
                  placeholder="Tell us about your hiring challenges..." 
                  rows={4}
                />
                <button className="btn-primary w-full">Send Message</button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-1">strivego4@gmail.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-green-600 text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-1">+254 743 869 564</p>
                      <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EAT</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-purple-600 text-xl">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-gray-600 mb-1">+254 743 869 564</p>
                      <p className="text-sm text-gray-500">Instant responses via WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Offices</h3>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Nairobi, Kenya</h4>
                    <p className="text-gray-600 text-sm">Mombasa Road</p>
                    <p className="text-gray-600 text-sm">Nairobi, Kenya</p>
                    <p className="text-sm text-blue-600 mt-2">📞 +254 743 869 564</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">How quickly can we get started?</h3>
                  <p className="text-gray-600 text-sm">Most teams are up and running within 24-48 hours. We provide onboarding support and training.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Do you offer custom integrations?</h3>
                  <p className="text-gray-600 text-sm">Yes, our Enterprise plan includes custom integrations with your existing HR systems.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What's your data security like?</h3>
                  <p className="text-gray-600 text-sm">We're SOC 2 compliant with enterprise-grade encryption and security measures.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Can we try before buying?</h3>
                  <p className="text-gray-600 text-sm">Absolutely! We offer a 14-day free trial with full access to all features.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Hiring?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of companies already using Emil AI to streamline their recruitment process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all">
                Start Free Trial
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-3 rounded-xl font-semibold transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


