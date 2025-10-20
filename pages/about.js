export default function About() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Emil AI</h1>
          <p className="text-white/80 text-lg">AI-powered recruitment platform that helps teams hire faster with higher confidence.</p>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">We streamline hiring with an AI-first pipeline: from job intake and sourcing to screening, scheduling, and reporting. Our goal is to reduce time-to-hire while improving candidate quality and fairness.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What We Do</h2>
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
              <li>AI-optimized job descriptions and distribution</li>
              <li>Automated CV parsing, scoring, and shortlisting</li>
              <li>Calendar-integrated interview scheduling</li>
              <li>Daily/weekly analytics and HR reports</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}


