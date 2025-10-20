export default function Contact() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Sales</h1>
        <p className="text-white/80">We’ll help tailor Emil AI to your hiring process.</p>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-xl mx-auto bg-gray-50 border border-gray-100 rounded-2xl p-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input className="form-input" placeholder="Full name" />
            <input className="form-input" placeholder="Work email" type="email" />
            <input className="form-input" placeholder="Company" />
            <textarea className="form-input" placeholder="How can we help?" rows={4} />
            <button className="btn-primary w-full">Send</button>
          </form>
        </div>
      </section>
    </div>
  )
}


