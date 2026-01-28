import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'

const Sidebar = () => {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setIsCollapsed(true)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isAuthenticated || location.pathname === '/login') {
    return null
  }

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
          { label: 'Departments', path: '/admin/departments', icon: '🏢' },
          { label: 'Manage Users', path: '/admin/manage-users', icon: '👥' },
        ]
      case 'lecturer':
        return [
          { label: 'Dashboard', path: '/lecturer/dashboard', icon: '📊' },
          { label: 'Attendance', path: '/lecturer/attendance', icon: '📋' },
          { label: 'Courses', path: '/lecturer/courses', icon: '📚' },
          { label: 'Reports', path: '/lecturer/reports', icon: '📈' },
        ]
      case 'student':
        return [
          { label: 'Dashboard', path: '/student/dashboard', icon: '📊' },
          { label: 'Attendance History', path: '/student/attendance-history', icon: '📋' },
          { label: 'Course Registration', path: '/student/course-registration', icon: '📚' },
        ]
      default:
        return []
    }
  }

  const menuItems = getMenuItems()
  const getRoleLabel = () => {
    switch (user?.role) {
      case 'admin':
        return 'Administrator'
      case 'lecturer':
        return 'Lecturer'
      case 'student':
        return 'Student'
      default:
        return user?.role
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-lg flex flex-col transition-transform duration-300 z-40 ${
          isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64'} md:w-64`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
              📋
            </div>
            {!isCollapsed && (
              <div className="animate-in fade-in duration-200">
                <h1 className="text-lg font-bold text-white">AMS</h1>
                <p className="text-xs text-slate-400">Attendance System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setIsCollapsed(true)}
                title={isCollapsed ? item.label : ''}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="font-medium text-sm">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1 h-6 bg-blue-300 rounded-full"></span>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-lg transition-opacity">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer Info */}
        <div className={`p-4 border-t border-slate-700 bg-slate-900 ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed && (
            <div className="text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Role</p>
              <p className="text-slate-300 font-medium mb-3">{getRoleLabel()}</p>
              <p className="font-semibold text-slate-300 mt-3">Version 1.0.0</p>
              <p className="text-slate-500 text-xs mt-2">© 2026 AMS</p>
            </div>
          )}
          {isCollapsed && (
            <div className="text-center text-xs text-slate-400">
              <p className="text-lg mb-2">v1</p>
            </div>
          )}
        </div>

        {/* Toggle Button (Mobile) */}
        {isMobile && (
          <div className="border-t border-slate-700 p-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full text-center text-slate-300 hover:text-white transition-colors text-lg"
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar
