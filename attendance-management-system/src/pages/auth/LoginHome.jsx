import { useNavigate } from 'react-router-dom'

const LoginHome = () => {
  const navigate = useNavigate()

  const loginOptions = [
    {
      role: 'student',
      label: 'Student',
      icon: '👨‍🎓',
      description: 'Access your courses and attendance',
      color: 'from-blue-600 to-blue-700',
      path: '/login/student',
    },
    {
      role: 'lecturer',
      label: 'Lecturer',
      icon: '👨‍🏫',
      description: 'Manage attendance and courses',
      color: 'from-amber-600 to-amber-700',
      path: '/login/lecturer',
    },
    {
      role: 'admin',
      label: 'Administrator',
      icon: '⚙️',
      description: 'System administration',
      color: 'from-slate-700 to-slate-800',
      path: '/login/admin',
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-bold">📋</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Attendance Management System
          </h1>
          <p className="text-gray-600 text-base font-medium">
            Select your role to sign in to your account
          </p>
        </div>

        {/* Login Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loginOptions.map((option) => (
            <button
              key={option.role}
              onClick={() => navigate(option.path)}
              className="group relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                {/* Icon */}
                <div className="text-5xl">{option.icon}</div>

                {/* Label */}
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {option.label}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {option.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 text-lg text-gray-400 group-hover:text-gray-600 transition-colors transform group-hover:translate-x-1 duration-300">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="text-sm font-bold text-blue-900 mb-2">Demo Information</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                This is a demo system. You can sign in with any email address and password (minimum 4 characters) for testing purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-12">
          © 2026 Attendance Management System. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default LoginHome
