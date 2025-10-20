export default function Features() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Features</h1>
        <p className="text-white/80">Everything you need to hire better, faster.</p>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {["Job Intake","AI Screening","Scheduling"].map((title, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">Powerful tools to optimize your pipeline from posting to offer.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


