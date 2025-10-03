import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Error Graphic */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
            <span className="text-4xl">😕</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4">404</h1>
        
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
          Oops, page not found
        </h2>
        
        <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link href="/" className="btn-primary inline-block">
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary inline-block"
          >
            Go Back
          </button>
        </div>
        
        {/* Support Link */}
        <div className="mt-12">
          <p className="text-white/50 text-sm">
            Need help? <a href="mailto:support@emilai.com" className="text-accent-400 hover:text-accent-300 underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}