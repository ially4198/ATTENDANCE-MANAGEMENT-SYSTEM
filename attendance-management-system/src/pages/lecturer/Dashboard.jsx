import { useState } from 'react'

const LecturerDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Courses data
  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      students: 45,
      semester: 'Spring 2026',
      sessions: 28,
      avgAttendance: 92,
      lastClass: '2026-01-24',
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures',
      students: 38,
      semester: 'Spring 2026',
      sessions: 26,
      avgAttendance: 88,
      lastClass: '2026-01-23',
    },
    {
      id: 3,
      code: 'CS301',
      name: 'Algorithms',
      students: 32,
      semester: 'Spring 2026',
      sessions: 24,
      avgAttendance: 85,
      lastClass: '2026-01-22',
    },
    {
      id: 4,
      code: 'CS401',
      name: 'Database Systems',
      students: 28,
      semester: 'Spring 2026',
      sessions: 20,
      avgAttendance: 89,
      lastClass: '2026-01-25',
    },
    {
      id: 5,
      code: 'CS501',
      name: 'Web Development',
      students: 42,
      semester: 'Spring 2026',
      sessions: 26,
      avgAttendance: 94,
      lastClass: '2026-01-24',
    },
  ]

  // Recent attendance activity
  const recentActivity = [
    {
      id: 1,
      course: 'Introduction to Programming',
      date: '2026-01-25',
      present: 43,
      absent: 2,
      rate: '95%',
      icon: '✓',
      color: 'bg-green-100',
    },
    {
      id: 2,
      course: 'Web Development',
      date: '2026-01-24',
      present: 40,
      absent: 2,
      rate: '95%',
      icon: '✓',
      color: 'bg-green-100',
    },
    {
      id: 3,
      course: 'Data Structures',
      date: '2026-01-23',
      present: 35,
      absent: 3,
      rate: '92%',
      icon: '✓',
      color: 'bg-green-100',
    },
    {
      id: 4,
      course: 'Algorithms',
      date: '2026-01-22',
      present: 29,
      absent: 3,
      rate: '91%',
      icon: '⚠',
      color: 'bg-yellow-100',
    },
    {
      id: 5,
      course: 'Database Systems',
      date: '2026-01-20',
      present: 26,
      absent: 2,
      rate: '93%',
      icon: '✓',
      color: 'bg-green-100',
    },
  ]

  // Calculate total stats
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0)
  const totalCourses = courses.length
  const avgAttendance = Math.round(courses.reduce((sum, course) => sum + course.avgAttendance, 0) / courses.length)
  const totalSessions = courses.reduce((sum, course) => sum + course.sessions, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your teaching overview.</p>
      </div>

      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Courses */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700 mb-1">Total Courses</p>
              <p className="text-3xl font-bold text-blue-600">{totalCourses}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200 text-xs text-blue-700 font-medium">
            Spring 2026
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-2xl p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-emerald-600">{totalStudents}</p>
            </div>
            <div className="text-3xl">👨‍🎓</div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-200 text-xs text-emerald-700 font-medium">
            Across all courses
          </div>
        </div>

        {/* Average Attendance */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Avg Attendance</p>
              <p className="text-3xl font-bold text-purple-600">{avgAttendance}%</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-200 text-xs text-purple-700 font-medium">
            Overall rate
          </div>
        </div>

        {/* Total Sessions */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-700 mb-1">Total Sessions</p>
              <p className="text-3xl font-bold text-amber-600">{totalSessions}</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
          <div className="mt-4 pt-4 border-t border-amber-200 text-xs text-amber-700 font-medium">
            Conducted
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Courses Section */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assigned Courses</h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
                className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                        {course.code}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                    </div>
                    <p className="text-xs text-gray-600">{course.semester}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      selectedCourse?.id === course.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{course.students}</p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{course.sessions}</p>
                    <p className="text-xs text-gray-600">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{course.avgAttendance}%</p>
                    <p className="text-xs text-gray-600">Attendance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Last Class</p>
                    <p className="text-xs font-semibold text-gray-900">
                      {new Date(course.lastClass).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedCourse?.id === course.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
                      📋 View Attendance
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attendance Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                <div className={`${activity.color} w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.course}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      {activity.rate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    ✓ {activity.present} • ✗ {activity.absent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <span>📝</span> Mark Attendance
          </button>
          <button className="px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <span>📊</span> View Reports
          </button>
          <button className="px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <span>📢</span> Send Notice
          </button>
          <button className="px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <span>⚙️</span> Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default LecturerDashboard
