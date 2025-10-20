import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faPaperPlane, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import WhatsAppButton from './WhatsAppButton'

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      {/* AI gradient grid background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0.5px,transparent_1px),linear-gradient(to_bottom,transparent_0.5px,transparent_1px)] bg-[size:60px_60px] opacity-10" />
        <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 h-[40rem] w-[40rem] bg-gradient-to-br from-amber-400/10 to-rose-500/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'backdrop-blur-xl bg-white/5 border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center shadow-glow group-hover:scale-105 transition">
                <span className="text-black font-extrabold">E</span>
              </div>
              <span className="font-semibold tracking-tight text-white/90">Emil AI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-white/80 hover:text-white">Features</Link>
              <Link href="/pricing" className="text-white/80 hover:text-white">Pricing</Link>
              <Link href="/testimonials" className="text-white/80 hover:text-white">Testimonials</Link>
              <Link href="/about" className="text-white/80 hover:text-white">About</Link>
              <Link href="/contact" className="text-white/80 hover:text-white">Contact</Link>
              <Link href="/dashboard" className="btn-secondary">Dashboard</Link>
              <Link href="/create-job" className="btn-primary">Create Job</Link>
              <Link href="/admin" className="btn-secondary">Admin</Link>
            </nav>
            <button aria-label="Menu" className="md:hidden w-10 h-10 grid place-items-center rounded-lg bg-white/10 border border-white/10">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 bg-gradient-to-b from-transparent to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center shadow-glow">
                  <span className="text-black font-extrabold">E</span>
                </div>
                <span className="font-semibold tracking-tight text-white/90">Emil AI</span>
              </div>
              <p className="text-white/60 text-sm leading-6 mb-4">
                AI-powered recruitment platform helping teams hire faster with confidence.
              </p>
              <div className="flex items-center gap-3">
                <a aria-label="LinkedIn" href="#" className="w-9 h-9 rounded-lg grid place-items-center bg-white/10 hover:bg-white/20 border border-white/10">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a aria-label="Twitter" href="#" className="w-9 h-9 rounded-lg grid place-items-center bg-white/10 hover:bg-white/20 border border-white/10">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a aria-label="GitHub" href="#" className="w-9 h-9 rounded-lg grid place-items-center bg-white/10 hover:bg-white/20 border border-white/10">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white/90 font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/create-job" className="hover:text-white">Create Job</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white/90 font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white/90 font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">Docs</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h4 className="text-white/90 font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📞</span>
                  </div>
                  <a href="tel:+254743869564" className="hover:text-white">+254 743 869 564</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✉️</span>
                  </div>
                  <a href="mailto:strivego4@gmail.com" className="hover:text-white">strivego4@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📍</span>
                  </div>
                  <span>Nairobi, Kenya - Mombasa Road</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="text-white/90 font-medium mb-3">Stay in the loop</h5>
                <p className="text-white/60 text-sm mb-4">Get product updates and best practices in your inbox.</p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input aria-label="Email" type="email" placeholder="you@company.com" className="form-input bg-white/5 border-white/10 text-white placeholder-white/40" />
                  <button className="btn-primary">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Subscribe
                  </button>
                </form>
                <p className="text-white/40 text-xs mt-2">We care about your data in our <a href="#" className="underline hover:text-white">privacy policy</a>.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Emil AI. All rights reserved.</p>
            <div className="flex items-center gap-6 text-white/50 text-xs">
              <a href="#" className="hover:text-white flex items-center gap-2"><FontAwesomeIcon icon={faShieldHalved} /> Security</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}


