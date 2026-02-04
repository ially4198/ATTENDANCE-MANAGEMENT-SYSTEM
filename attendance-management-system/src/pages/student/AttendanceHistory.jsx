import { useState } from 'react'

const AttendanceHistory = () => {
  const [courseFilter, setCourseFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState('all')

  // Mock attendance records
  const [attendanceRecords] = useState([
    {
      id: 1,
      date: '2026-01-24',
      courseCode: 'CS101',
      courseName: 'Introduction to Programming',
      status: 'present',
      // timeIn: '09:55',
      // timeOut: '11:30',
    },
    {
      id: 2,
      date: '2026-01-22',
      courseCode: 'MATH101',
      courseName: 'Calculus I',
      status: 'present',
      // timeIn: '09:02',
      // timeOut: '10:00',
    },
    {
      id: 3,
      date: '2026-01-21',
      courseCode: 'CS201',
      courseName: 'Data Structures',
      status: 'present',
      // timeIn: '14:05',
      // timeOut: '15:30',
    },
    {
      id: 4,
      date: '2026-01-20',
      courseCode: 'MATH101',
      courseName: 'Calculus I',
      status: 'absent',
      // timeIn: null,
      // timeOut: null,
    },
    {
      id: 5,
      date: '2026-01-17',
      courseCode: 'CS101',
      courseName: 'Introduction to Programming',
      status: 'present',
      // timeIn: '09:58',
      // timeOut: '11:30',
    },
    {
      id: 6,
      date: '2026-01-15',
      courseCode: 'CS201',
      courseName: 'Data Structures',
      status: 'present',
      // timeIn: '14:00',
      // timeOut: '15:30',
    },
    {
      id: 7,
      date: '2026-01-14',
      courseCode: 'MATH101',
      courseName: 'Calculus I',
      status: 'present',
      // timeIn: '09:10',
      // timeOut: '10:00',
    },
    {
      id: 8,
      date: '2026-01-13',
      courseCode: 'CS101',
      courseName: 'Introduction to Programming',
      status: 'absent',
      // timeIn: null,
      // timeOut: null,
    },
    {
      id: 9,
      date: '2026-01-10',
      courseCode: 'CS201',
      courseName: 'Data Structures',
      status: 'present',
      // timeIn: '14:02',
      // timeOut: '15:30',
    },
    {
      id: 10,
      date: '2026-01-08',
      courseCode: 'MATH101',
      courseName: 'Calculus I',
      status: 'present',
      // timeIn: '09:05',
      // timeOut: '10:00',
    },
    {
      id: 11,
      date: '2025-12-20',
      courseCode: 'CS101',
      courseName: 'Introduction to Programming',
      status: 'present',
      // timeIn: '09:50',
      // timeOut: '11:30',
    },
    {
      id: 12,
      date: '2025-12-18',
      courseCode: 'CS201',
      courseName: 'Data Structures',
      status: 'present',
      // timeIn: '14:01',
      // timeOut: '15:30',
    },
  ])

  // Get unique courses
  const courses = [...new Set(attendanceRecords.map((r) => ({ code: r.courseCode, name: r.courseName })))]

  // Filter records
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesCourse = courseFilter === 'all' || record.courseCode === courseFilter
    const recordMonth = new Date(record.date).toLocaleString('en-US', { month: '2-digit', year: 'numeric' })
    const matchesMonth = monthFilter === 'all' || recordMonth === monthFilter
    return matchesCourse && matchesMonth
  })

  // Calculate statistics
  const calculateStats = (records) => {
    if (records.length === 0) return { present: 0, absent: 0, percentage: 0 }
    const present = records.filter((r) => r.status === 'present').length
    const absent = records.filter((r) => r.status === 'absent').length
    const percentage = Math.round((present / records.length) * 100)
    return { present, absent, percentage }
  }

  const stats = calculateStats(filteredRecords)

  // Calculate stats by course
  const statsByCourse = courses.map((course) => {
    const courseRecords = attendanceRecords.filter((r) => r.courseCode === course.code)
    return {
      ...course,
      ...calculateStats(courseRecords),
    }
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }

  // Get unique months from records
  const months = [...new Set(attendanceRecords.map((r) => new Date(r.date).toLocaleString('en-US', { month: '2-digit', year: 'numeric' })))]
    .sort()
    .reverse()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Attendance History</h1>
        <p className="text-gray-600 mt-2">View your attendance records across all enrolled courses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Attendance */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
          <p className="text-sm font-semibold text-blue-700 mb-1">Overall Attendance</p>
          <p className="text-3xl font-bold text-blue-600">{stats.percentage}%</p>
          <p className="text-xs text-blue-600 mt-2">{stats.present} present, {stats.absent} absent</p>
        </div>

        {/* Total Classes */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6">
          <p className="text-sm font-semibold text-purple-700 mb-1">Total Classes</p>
          <p className="text-3xl font-bold text-purple-600">{filteredRecords.length}</p>
          <p className="text-xs text-purple-600 mt-2">In selected period</p>
        </div>

        {/* Present Count */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
          <p className="text-sm font-semibold text-green-700 mb-1">Present</p>
          <p className="text-3xl font-bold text-green-600">{stats.present}</p>
          <p className="text-xs text-green-600 mt-2">Classes attended</p>
        </div>

        {/* Absent Count */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6">
          <p className="text-sm font-semibold text-red-700 mb-1">Absent</p>
          <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
          <p className="text-xs text-red-600 mt-2">Classes missed</p>
        </div>
      </div>

      {/* Course-wise Attendance */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Attendance by Course</h2>
        <div className="space-y-4">
          {statsByCourse.map((course) => (
            <div key={course.code} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">{course.code}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{course.name}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{course.percentage}%</p>
                  <p className="text-xs text-gray-600">{course.present}/{course.present + course.absent} classes</p>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${course.percentage >= 75 ? 'bg-green-500' : course.percentage >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.max(course.percentage, 5)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Course</label>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Month</label>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            >
              <option value="all">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {new Date(month + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Course</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                {/* <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Check In</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Check Out</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Duration</th> */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const duration = record.status === 'present' && record.timeIn && record.timeOut
                    ? (() => {
                        const [inHour, inMin] = record.timeIn.split(':').map(Number)
                        const [outHour, outMin] = record.timeOut.split(':').map(Number)
                        const minutes = (outHour * 60 + outMin) - (inHour * 60 + inMin)
                        const hours = Math.floor(minutes / 60)
                        const mins = minutes % 60
                        return `${hours}h ${mins}m`
                      })()
                    : '-'

                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      {/* Date */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">{formatDate(record.date)}</p>
                      </td>

                      {/* Course */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{record.courseCode}</p>
                          <p className="text-xs text-gray-600 mt-1">{record.courseName}</p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        {record.status === 'present' ? (
                          <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-100 border-2 border-green-300 rounded-lg">
                            <span className="text-lg">✓</span>
                            <span className="text-sm font-bold text-green-700">Present</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 border-2 border-red-300 rounded-lg">
                            <span className="text-lg">✕</span>
                            <span className="text-sm font-bold text-red-700">Absent</span>
                          </div>
                        )}
                      </td>

                      {/* Check In */}
                      {/* <td className="px-6 py-4">
                        {record.timeIn ? (
                          <p className="text-sm text-gray-700 font-medium">{record.timeIn}</p>
                        ) : (
                          <p className="text-sm text-gray-500">-</p>
                        )}
                      </td> */}

                      {/* Check Out */}
                      {/* <td className="px-6 py-4">
                        {record.timeOut ? (
                          <p className="text-sm text-gray-700 font-medium">{record.timeOut}</p>
                        ) : (
                          <p className="text-sm text-gray-500">-</p>
                        )}
                      </td> */}

                      {/* Duration */}
                      {/* <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 font-medium">{duration}</p>
                      </td> */}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <p className="text-gray-600 font-medium">No attendance records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
          <span>⚠️</span> Attendance Policy
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-amber-600 font-bold mt-0.5">•</span>
            <div>
              <p className="text-sm font-semibold text-amber-900">Minimum Attendance Requirement</p>
              <p className="text-sm text-amber-800">You must maintain at least 75% attendance to be eligible for course completion.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-amber-600 font-bold mt-0.5">•</span>
            <div>
              <p className="text-sm font-semibold text-amber-900">Excused Absences</p>
              <p className="text-sm text-amber-800">Medical certificates or exceptional circumstances must be reported to your instructor within 48 hours.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-amber-600 font-bold mt-0.5">•</span>
            <div>
              <p className="text-sm font-semibold text-amber-900">Questions?</p>
              <p className="text-sm text-amber-800">Contact your course instructor or the academic office for concerns about your attendance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceHistory
