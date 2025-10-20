import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DemoLogin() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDemoLogin = async () => {
    setLoading(true);
    setMessage('Logging in with demo account...');
    
    try {
      const result = await login({
        email: 'demo@example.com',
        password: 'demo123'
      });

      if (result.success) {
        setMessage('✅ Successfully logged in! Redirecting...');
        setTimeout(() => {
          router.push('/create-job');
        }, 1500);
      } else {
        setMessage(`❌ Login failed: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Already Logged In!</h2>
            <p className="text-white/60 mb-6">You're already authenticated with the demo account.</p>
            <div className="space-y-3">
              <Link href="/create-job" className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300">
                Create Job
              </Link>
              <Link href="/dashboard" className="block w-full bg-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/20 transition-all duration-300">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-black font-bold text-2xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Emil AI</h1>
          <p className="text-white/60 mb-8">Demo Account Login</p>

          <div className="bg-blue-900/30 border border-blue-600 p-4 rounded-lg mb-6">
            <h3 className="text-blue-300 font-semibold mb-2">Demo Credentials</h3>
            <div className="text-sm text-blue-200 space-y-1">
              <div><strong>Email:</strong> demo@example.com</div>
              <div><strong>Password:</strong> demo123</div>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Logging in...
              </div>
            ) : (
              'Login with Demo Account'
            )}
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes('✅') ? 'bg-green-900/30 border border-green-600 text-green-300' :
              message.includes('❌') ? 'bg-red-900/30 border border-red-600 text-red-300' :
              'bg-yellow-900/30 border border-yellow-600 text-yellow-300'
            }`}>
              {message}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/40 text-sm">
              Need a real account? 
              <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 ml-1">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
