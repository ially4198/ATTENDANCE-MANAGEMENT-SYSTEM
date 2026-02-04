import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email')
      return false
    }
    setEmailError('')
    return true
  }

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required')
      return false
    }
    if (value.length < 4) {
      setPasswordError('Password must be at least 4 characters')
      return false
    }
    setPasswordError('')
    return true
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (emailError) validateEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (passwordError) validatePassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (!isEmailValid || !isPasswordValid) {
      return
    }

    setIsLoading(true)
    try {
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'admin',
      }
      await new Promise(resolve => setTimeout(resolve, 600))
      login(userData)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">⚙️</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Sign in to your administrator account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700 font-medium flex items-start gap-2">
                <span className="text-red-600 text-lg leading-none mt-0.5">⚠️</span>
                <span>{error}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                placeholder="admin@university.edu"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  emailError
                    ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-300 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-200'
                }`}
              />
              {emailError && (
                <p className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                  <span>✕</span> {emailError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  passwordError
                    ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-300 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-200'
                }`}
              />
              {passwordError && (
                <p className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                  <span>✕</span> {passwordError}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-600 leading-relaxed">
              Demo mode: Use any email and password (minimum 4 characters)
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          © 2026 Attendance Management System. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
