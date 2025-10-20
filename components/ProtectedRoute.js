import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/auth/signin',
  requireAuth = true 
}) {
  const { user, loading, isAuthenticated, requireAuth: authRequireAuth, requireRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (requireAuth && allowedRoles.length > 0 && user) {
      if (!allowedRoles.includes(user.role)) {
        // If user is trying to access admin routes but not admin, redirect to dashboard
        if (router.pathname.startsWith('/admin')) {
          router.push('/dashboard')
          return
        }
        // For other role restrictions, redirect to dashboard
        router.push('/dashboard')
        return
      }
    }
  }, [user, loading, isAuthenticated, requireAuth, allowedRoles, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-black font-bold text-2xl">E</span>
          </div>
          <div className="text-white text-lg font-medium mb-2">Emil AI</div>
          <div className="text-white/60">Loading your dashboard...</div>
          <div className="mt-4">
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (requireAuth && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return children
}
