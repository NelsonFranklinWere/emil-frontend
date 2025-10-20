export default function Testimonials() {
  const data = [
    { name: 'TechCorp', quote: 'We moved from weeks to days.', metric: '70% faster' },
    { name: 'Startup Plus', quote: 'Precision screening saved hours.', metric: '+90% match' },
    { name: 'GrowthInc', quote: 'Reports & scheduling automated.', metric: '20+ hrs saved' },
  ]
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Testimonials</h1>
        <p className="text-white/80">What customers say about Emil AI.</p>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {data.map((t, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <div className="text-2xl font-bold text-gray-900">{t.metric}</div>
              <p className="text-gray-700 italic my-3">“{t.quote}”</p>
              <div className="text-gray-500 text-sm">{t.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


