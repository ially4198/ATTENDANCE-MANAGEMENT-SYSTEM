import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'

// Pages
import NotFound from '../pages/NotFound'
import Login from '../pages/auth/Login'

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard'
import Departments from '../pages/admin/Departments'
import ManageUsers from '../pages/admin/ManageUsers'

// Lecturer Pages
import LecturerDashboard from '../pages/lecturer/Dashboard'
import Attendance from '../pages/lecturer/Attendance'
import Courses from '../pages/lecturer/Courses'
import Reports from '../pages/lecturer/Reports'

// Student Pages
import StudentDashboard from '../pages/student/Dashboard'
import AttendanceHistory from '../pages/student/AttendanceHistory'
import CourseRegistration from '../pages/student/CourseRegistration'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="departments" element={<Departments />} />
        <Route path="manage-users" element={<ManageUsers />} />
      </Route>

      {/* Lecturer Routes */}
      <Route path="/lecturer" element={<ProtectedRoute role="lecturer" />}>
        <Route index element={<LecturerDashboard />} />
        <Route path="dashboard" element={<LecturerDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="courses" element={<Courses />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={<ProtectedRoute role="student" />}>
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="attendance-history" element={<AttendanceHistory />} />
        <Route path="course-registration" element={<CourseRegistration />} />
      </Route>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
