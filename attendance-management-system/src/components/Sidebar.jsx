import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || location.pathname === '/login') {
    return null
  }

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Departments', path: '/admin/departments' },
          { label: 'Manage Users', path: '/admin/manage-users' },
        ]
      case 'lecturer':
        return [
          { label: 'Dashboard', path: '/lecturer/dashboard' },
          { label: 'Attendance', path: '/lecturer/attendance' },
          { label: 'Courses', path: '/lecturer/courses' },
          { label: 'Reports', path: '/lecturer/reports' },
        ]
      case 'student':
        return [
          { label: 'Dashboard', path: '/student/dashboard' },
          { label: 'Attendance History', path: '/student/attendance-history' },
          { label: 'Course Registration', path: '/student/course-registration' },
        ]
      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">AMS</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 transition ${
              location.pathname === item.path
                ? 'bg-blue-600 border-l-4 border-blue-400'
                : 'hover:bg-gray-800'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
