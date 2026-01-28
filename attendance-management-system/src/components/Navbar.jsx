import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleEmoji = (role) => {
    switch (role) {
      case 'admin':
        return '⚙️'
      case 'lecturer':
        return '👨‍🏫'
      case 'student':
        return '👨‍🎓'
      default:
        return '👤'
    }
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrator'
      case 'lecturer':
        return 'Lecturer'
      case 'student':
        return 'Student'
      default:
        return role
    }
  }

  return (
    <nav className="bg-white border-b-2 border-gray-200 px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
      {/* Left: Logo/Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white font-bold text-lg">📋</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-sm font-bold text-gray-900">AMS</h1>
          <p className="text-xs text-gray-500">Attendance Management System</p>
        </div>
      </div>

      {/* Right: User Profile & Logout */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Quick User Info - Mobile Only */}
        <div className="sm:hidden text-right">
          <p className="text-xs font-semibold text-gray-900">{user?.name?.split(' ')[0] || 'User'}</p>
          <p className="text-xs text-gray-500">{getRoleLabel(user?.role)}</p>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="User profile menu"
            aria-expanded={showDropdown}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{getRoleLabel(user?.role)}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
              {getRoleEmoji(user?.role)}
            </div>
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 hidden sm:block ${showDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in duration-200">
              {/* User Info Section */}
              <div className="px-4 py-4 border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                <p className="text-sm font-bold text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-600 mt-1">{user?.email || 'No email'}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg">{getRoleEmoji(user?.role)}</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
                    {getRoleLabel(user?.role)}
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3 font-medium">
                  <span>⚙️</span> Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3 font-medium">
                  <span>🔔</span> Notifications
                </button>
              </div>

              {/* Logout Section */}
              <div className="border-t-2 border-gray-200 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors flex items-center gap-3 font-bold"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
