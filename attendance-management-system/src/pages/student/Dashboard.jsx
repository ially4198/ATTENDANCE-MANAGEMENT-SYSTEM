const StudentDashboard = () => {
  // Mock student data
  const studentInfo = {
    name: 'John Doe',
    matric: 'MAT001',
    gpa: 3.75,
  }

  // Mock course enrollment data with attendance
  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      instructor: 'Dr. James Wilson',
      sessions: 28,
      attended: 25,
      percentage: 89,
      status: 'good',
      credits: 3,
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures',
      instructor: 'Prof. Sarah Johnson',
      sessions: 26,
      attended: 20,
      percentage: 77,
      status: 'warning',
      credits: 4,
    },
    {
      id: 3,
      code: 'CS301',
      name: 'Algorithms',
      instructor: 'Dr. Michael Brown',
      sessions: 24,
      attended: 17,
      percentage: 71,
      status: 'critical',
      credits: 4,
    },
    {
      id: 4,
      code: 'MATH101',
      name: 'Calculus I',
      instructor: 'Prof. Emily Davis',
      sessions: 30,
      attended: 28,
      percentage: 93,
      status: 'good',
      credits: 4,
    },
  ]

  // Calculate overall stats
  const totalCourses = courses.length
  const totalSessions = courses.reduce((sum, c) => sum + c.sessions, 0)
  const totalAttended = courses.reduce((sum, c) => sum + c.attended, 0)
  const overallAttendance = Math.round((totalAttended / totalSessions) * 100)
  const atRiskCourses = courses.filter((c) => c.percentage < 75).length
  const goodStandingCourses = courses.filter((c) => c.percentage >= 80).length

  // Get status color and icon
  const getStatusStyle = (status) => {
    switch (status) {
      case 'good':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          badge: 'bg-green-100 text-green-800 border-green-200',
          icon: '✓',
        }
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: '⚠',
        }
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-800 border-red-200',
          icon: '✗',
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          badge: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '•',
        }
    }
  }

  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return 'text-green-700'
    if (percentage >= 75) return 'text-amber-700'
    return 'text-red-700'
  }

  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 75) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Welcome back, {studentInfo.name}!</h1>
        <p className="text-gray-600 mt-2">Here's your academic attendance status for this semester</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Courses */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700 mb-1">Enrolled Courses</p>
              <p className="text-3xl font-bold text-blue-600">{totalCourses}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200 text-xs text-blue-700 font-medium">
            {goodStandingCourses} in good standing
          </div>
        </div>

        {/* Overall Attendance */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-2xl p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-1">Overall Attendance</p>
              <p className={`text-3xl font-bold ${getAttendanceColor(overallAttendance)}`}>
                {overallAttendance}%
              </p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-200 text-xs text-emerald-700 font-medium">
            {totalAttended} of {totalSessions} classes
          </div>
        </div>

        {/* At Risk Courses */}
        <div className={`bg-gradient-to-br ${atRiskCourses > 0 ? 'from-red-50 to-red-100 border-2 border-red-200' : 'from-green-50 to-green-100 border-2 border-green-200'} rounded-2xl p-6 transition-all hover:shadow-md`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-semibold ${atRiskCourses > 0 ? 'text-red-700' : 'text-green-700'} mb-1`}>
                At Risk Courses
              </p>
              <p className={`text-3xl font-bold ${atRiskCourses > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {atRiskCourses}
              </p>
            </div>
            <div className="text-3xl">{atRiskCourses > 0 ? '⚠️' : '✓'}</div>
          </div>
          <div className={`mt-4 pt-4 border-t ${atRiskCourses > 0 ? 'border-red-200 text-red-700' : 'border-green-200 text-green-700'} text-xs font-medium`}>
            {atRiskCourses > 0 ? 'Need improvement' : 'All courses on track'}
          </div>
        </div>

        {/* GPA */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Current GPA</p>
              <p className="text-3xl font-bold text-purple-600">{studentInfo.gpa}</p>
            </div>
            <div className="text-3xl">🎓</div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-200 text-xs text-purple-700 font-medium">
            {studentInfo.matric}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {atRiskCourses > 0 && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🚨</span> Attendance Alert
          </h2>
          <p className="text-red-100 mb-6">
            You have {atRiskCourses} course(s) with attendance below 75%. This may affect your exam eligibility.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses
              .filter((c) => c.percentage < 75)
              .map((course) => (
                <div key={course.id} className="bg-white bg-opacity-15 rounded-lg p-4 border border-white border-opacity-30">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{course.code} - {course.name}</p>
                      <p className="text-sm text-red-100 mt-1">
                        {course.attended}/{course.sessions} classes attended
                      </p>
                    </div>
                    <span className="text-2xl font-bold">{course.percentage}%</span>
                  </div>
                  <p className="text-xs text-red-100 mt-2">
                    Need {Math.ceil((75 * course.sessions) / 100) - course.attended} more class(es) to reach 75%
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => {
            const style = getStatusStyle(course.status)
            return (
              <div
                key={course.id}
                className={`${style.bg} border-2 ${style.border} rounded-2xl p-6 transition-all hover:shadow-md`}
              >
                {/* Course Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                        {course.code}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${style.badge}`}>
                        <span>{style.icon}</span>
                        {course.status === 'good'
                          ? 'Good'
                          : course.status === 'warning'
                          ? 'Warning'
                          : 'Critical'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Instructor: {course.instructor}</p>
                  </div>
                </div>

                {/* Attendance Stats */}
                <div className="border-t border-current border-opacity-20 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-900">Attendance Progress</span>
                    <span className={`text-lg font-bold ${getAttendanceColor(course.percentage)}`}>
                      {course.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${getProgressBarColor(course.percentage)}`}
                      style={{ width: `${course.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-3 gap-3 py-3 border-t border-current border-opacity-20">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{course.attended}</p>
                    <p className="text-xs text-gray-600">Attended</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{course.sessions - course.attended}</p>
                    <p className="text-xs text-gray-600">Missed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{course.credits}</p>
                    <p className="text-xs text-gray-600">Credits</p>
                  </div>
                </div>

                {/* Course Action */}
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
                  📋 View Details
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span>ℹ️</span> Important Information
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">Attendance Requirement</p>
              <p className="text-sm text-blue-800">You must maintain at least 75% attendance in each course to be eligible for final examinations.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">Exam Eligibility</p>
              <p className="text-sm text-blue-800">Students below the 75% threshold will not be permitted to sit for final exams in those courses.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">Support Available</p>
              <p className="text-sm text-blue-800">Contact your course instructors or the Student Affairs office for assistance with attendance issues.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
