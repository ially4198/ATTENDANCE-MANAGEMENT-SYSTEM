import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from './Loader'

const ProtectedRoute = ({ role }) => {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/student" replace />
  }

  if (role && user?.role !== role) {
    const target = user?.role ? `/login/${user.role}` : '/login/student'
    return <Navigate to={target} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
