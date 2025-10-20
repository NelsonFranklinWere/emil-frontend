export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$20',
      period: '/month',
      description: 'Perfect for small teams getting started',
      features: [
        '1 Active Job Posting',
        'Up to 500 Applicants',
        'Basic AI Screening',
        'Email Support',
        'Standard Analytics',
        'Mobile App Access'
      ],
      popular: false,
      cta: 'Start Free Trial',
      color: 'gray'
    },
    {
      name: 'Pro',
      price: '$85',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        'Unlimited Job Postings',
        'Unlimited Applicants',
        'Advanced AI Screening',
        'Priority Support',
        'Custom Reports',
        'API Access',
        'Team Collaboration',
        'Advanced Analytics'
      ],
      popular: true,
      cta: 'Start Pro Trial',
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Pro',
        'Dedicated Account Manager',
        'Custom AI Models',
        'SSO & Advanced Security',
        'Custom Integrations',
        'White-label Options',
        'SLA Guarantee',
        'On-premise Deployment'
      ],
      popular: false,
      cta: 'Contact Sales',
      color: 'purple'
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, save 20% when you pay annually. Contact us for Enterprise pricing."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pricing</h1>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">Simple, transparent plans that scale with you. No hidden fees, no surprises.</p>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, i) => (
              <div key={i} className={`relative bg-white border-2 rounded-2xl p-8 ${
                plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {plan.price}
                    <span className="text-lg text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Plan Comparison</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Starter</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: 'Job Postings', starter: '1', pro: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'Applicants', starter: '500', pro: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'AI Screening', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
                    { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
                    { feature: 'API Access', starter: 'No', pro: 'Yes', enterprise: 'Yes' },
                    { feature: 'Custom Integrations', starter: 'No', pro: 'Limited', enterprise: 'Full' }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">{row.starter}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">{row.pro}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of companies already using Emil AI to streamline their hiring process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all">
                Start Free Trial
              </button>
              <a href="mailto:strivego4@gmail.com" className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-3 rounded-xl font-semibold transition-all">
                Contact Sales
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help Choosing?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">strivego4@gmail.com</p>
                <a href="mailto:strivego4@gmail.com" className="text-blue-600 hover:text-blue-800 text-sm">Get in touch</a>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">+254 743 869 564</p>
                <a href="tel:+254743869564" className="text-green-600 hover:text-green-800 text-sm">Call now</a>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-2">+254 743 869 564</p>
                <a href="https://wa.me/254743869564" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 text-sm">Chat with us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


