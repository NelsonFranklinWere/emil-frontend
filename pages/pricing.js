export default function Pricing() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pricing</h1>
        <p className="text-white/80">Simple, transparent plans that scale with you.</p>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[{name:'Starter',price:'$20/mo'},{name:'Pro',price:'$85/mo'},{name:'Enterprise',price:'Custom'}].map((p, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
              <div className="text-3xl font-extrabold text-gray-900 mb-4">{p.price}</div>
              <button className="btn-primary">Choose {p.name}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


