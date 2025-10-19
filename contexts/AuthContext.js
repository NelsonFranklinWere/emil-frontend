import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { login as apiLogin, register as apiRegister, registerCompany as apiRegisterCompany, authenticateWithGoogle as apiGoogleAuth, getCurrentUser } from '../lib/api'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing token on app load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('emilai_token')
        if (token) {
          // You could validate the token here with the backend
          // For now, we'll assume it's valid if it exists
          const userData = JSON.parse(localStorage.getItem('emilai_user') || '{}')
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        localStorage.removeItem('emilai_token')
        localStorage.removeItem('emilai_user')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials)
      if (response.token) {
        const userData = {
          id: response.user?.id,
          email: response.user?.email,
          name: response.user?.name,
          companyName: response.user?.companyName,
          role: response.user?.role || 'HR_MANAGER',
          emailVerified: response.user?.emailVerified,
          profilePictureUrl: response.user?.profilePictureUrl
        }
        
        localStorage.setItem('emilai_token', response.token)
        localStorage.setItem('emilai_user', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      }
      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData)
      if (response.token) {
        const user = {
          id: response.user?.id,
          email: response.user?.email,
          name: response.user?.name,
          role: response.user?.role || 'HR_MANAGER'
        }
        
        localStorage.setItem('emilai_token', response.token)
        localStorage.setItem('emilai_user', JSON.stringify(user))
        setUser(user)
        return { success: true }
      }
      return { success: false, error: 'Registration failed' }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: error.message || 'Registration failed' }
    }
  }

  const registerCompany = async (companyData) => {
    try {
      const response = await apiRegisterCompany(companyData)
      if (response.token) {
        const user = {
          id: response.user?.id,
          email: response.user?.email,
          name: response.user?.name,
          companyName: response.user?.companyName,
          role: response.user?.role || 'HR_MANAGER',
          emailVerified: response.user?.emailVerified
        }
        
        localStorage.setItem('emilai_token', response.token)
        localStorage.setItem('emilai_user', JSON.stringify(user))
        setUser(user)
        return { success: true }
      }
      return { success: false, error: 'Company registration failed' }
    } catch (error) {
      console.error('Company registration error:', error)
      return { success: false, error: error.message || 'Company registration failed' }
    }
  }

  const authenticateWithGoogle = async (googleData) => {
    try {
      const response = await apiGoogleAuth(googleData)
      if (response.token) {
        const user = {
          id: response.user?.id,
          email: response.user?.email,
          name: response.user?.name,
          companyName: response.user?.companyName,
          role: response.user?.role || 'HR_MANAGER',
          emailVerified: response.user?.emailVerified,
          profilePictureUrl: response.user?.profilePictureUrl
        }
        
        localStorage.setItem('emilai_token', response.token)
        localStorage.setItem('emilai_user', JSON.stringify(user))
        setUser(user)
        return { success: true }
      }
      return { success: false, error: 'Google authentication failed' }
    } catch (error) {
      console.error('Google authentication error:', error)
      return { success: false, error: error.message || 'Google authentication failed' }
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem('emilai_token')
      localStorage.removeItem('emilai_user')
      setUser(null)
      router.push('/auth/signin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const requireAuth = (redirectTo = '/auth/signin') => {
    if (!user) {
      router.push(redirectTo)
      return false
    }
    return true
  }

  const requireRole = (allowedRoles, redirectTo = '/dashboard') => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.push(redirectTo)
      return false
    }
    return true
  }

  const value = {
    user,
    loading,
    login,
    register,
    registerCompany,
    authenticateWithGoogle,
    logout,
    requireAuth,
    requireRole,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isHRManager: user?.role === 'HR_MANAGER',
    isRecruiter: user?.role === 'RECRUITER'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
