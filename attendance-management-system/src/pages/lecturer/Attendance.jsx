import { useState } from 'react'

const Attendance = () => {
  const [selectedCourse, setSelectedCourse] = useState('CS101')
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0])
  const [saveMessage, setSaveMessage] = useState('')

  // Mock courses
  const courses = [
    { id: 'CS101', name: 'Introduction to Programming', students: 45 },
    { id: 'CS201', name: 'Data Structures', students: 38 },
    { id: 'CS301', name: 'Algorithms', students: 32 },
    { id: 'CS401', name: 'Database Systems', students: 28 },
    { id: 'CS501', name: 'Web Development', students: 42 },
  ]

  // Mock students for selected course
  const [studentAttendance, setStudentAttendance] = useState([
    { id: 1, matric: 'MAT001', name: 'Alice Johnson', present: true },
    { id: 2, matric: 'MAT002', name: 'Bob Smith', present: true },
    { id: 3, matric: 'MAT003', name: 'Charlie Brown', present: false },
    { id: 4, matric: 'MAT004', name: 'Diana Davis', present: true },
    { id: 5, matric: 'MAT005', name: 'Ethan Wilson', present: true },
    { id: 6, matric: 'MAT006', name: 'Fiona Garcia', present: false },
    { id: 7, matric: 'MAT007', name: 'George Martinez', present: true },
    { id: 8, matric: 'MAT008', name: 'Hannah Lee', present: true },
    { id: 9, matric: 'MAT009', name: 'Ivan Rodriguez', present: true },
    { id: 10, matric: 'MAT010', name: 'Julia Taylor', present: false },
    { id: 11, matric: 'MAT011', name: 'Kevin Anderson', present: true },
    { id: 12, matric: 'MAT012', name: 'Laura Thomas', present: true },
    { id: 13, matric: 'MAT013', name: 'Mike Jackson', present: true },
    { id: 14, matric: 'MAT014', name: 'Nina White', present: false },
    { id: 15, matric: 'MAT015', name: 'Oscar Harris', present: true },
  ])

  // Handle attendance toggle
  const toggleAttendance = (studentId) => {
    setStudentAttendance(
      studentAttendance.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      )
    )
  }

  // Handle mark all present
  const markAllPresent = () => {
    setStudentAttendance(studentAttendance.map((student) => ({ ...student, present: true })))
  }

  // Handle mark all absent
  const markAllAbsent = () => {
    setStudentAttendance(studentAttendance.map((student) => ({ ...student, present: false })))
  }

  // Handle save attendance
  const handleSaveAttendance = () => {
    setSaveMessage('')
    const presentCount = studentAttendance.filter((s) => s.present).length
    const totalCount = studentAttendance.length
    
    // Simulate API call
    setTimeout(() => {
      setSaveMessage(`✓ Attendance saved! ${presentCount}/${totalCount} students marked present.`)
      setTimeout(() => setSaveMessage(''), 3000)
    }, 500)
  }

  // Calculate statistics
  const presentCount = studentAttendance.filter((s) => s.present).length
  const absentCount = studentAttendance.filter((s) => !s.present).length
  const attendanceRate = Math.round((presentCount / studentAttendance.length) * 100)
  const selectedCourseData = courses.find((c) => c.id === selectedCourse)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Mark Attendance</h1>
        <p className="text-gray-600 mt-2">Quickly mark student attendance for your course</p>
      </div>

      {/* Course Selection and Date */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.id} - {course.name}
                </option>
              ))}
            </select>
            {selectedCourseData && (
              <p className="text-xs text-gray-600 mt-2">
                {selectedCourseData.students} students enrolled
              </p>
            )}
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Attendance Date
            </label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      {/* Attendance Summary & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Present Count */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700 mb-1">Present</p>
              <p className="text-3xl font-bold text-green-600">{presentCount}</p>
            </div>
            <div className="text-4xl">✓</div>
          </div>
        </div>

        {/* Absent Count */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-700 mb-1">Absent</p>
              <p className="text-3xl font-bold text-red-600">{absentCount}</p>
            </div>
            <div className="text-4xl">✗</div>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Attendance Rate</p>
              <p className="text-3xl font-bold text-purple-600">{attendanceRate}%</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <button
          onClick={markAllPresent}
          className="flex-1 px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded-lg transition-colors text-sm"
        >
          Mark All Present
        </button>
        <button
          onClick={markAllAbsent}
          className="flex-1 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition-colors text-sm"
        >
          Mark All Absent
        </button>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-sm text-green-700 font-semibold">{saveMessage}</p>
        </div>
      )}

      {/* Students Attendance Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Mark</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Matric Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student Name</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {studentAttendance.map((student, idx) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={student.present}
                      onChange={() => toggleAttendance(student.id)}
                      className="w-5 h-5 rounded cursor-pointer accent-blue-600"
                    />
                  </td>

                  {/* Matric Number */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">
                      {student.matric}
                    </span>
                  </td>

                  {/* Student Name */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${
                        student.present
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      <span>{student.present ? '✓' : '✗'}</span>
                      {student.present ? 'Present' : 'Absent'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Save Button */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Total Students: <span className="font-bold text-gray-900">{studentAttendance.length}</span>
            </p>
          </div>
          <button
            onClick={handleSaveAttendance}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg text-lg"
          >
            💾 Save Attendance
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-3">Quick Tips</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>✓ Click the checkbox next to a student's name to mark them present</li>
          <li>✓ Use "Mark All Present" or "Mark All Absent" for quick bulk actions</li>
          <li>✓ The attendance rate updates automatically as you mark students</li>
          <li>✓ Click "Save Attendance" to permanently record the attendance</li>
        </ul>
      </div>
    </div>
  )
}

export default Attendance
