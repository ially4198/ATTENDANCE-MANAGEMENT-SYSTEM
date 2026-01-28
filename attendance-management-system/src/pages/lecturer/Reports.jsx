import { useState } from 'react'

const Reports = () => {
  const [selectedCourse, setSelectedCourse] = useState('CS101')
  const [downloadMessage, setDownloadMessage] = useState('')

  // Mock courses
  const courses = [
    { id: 'CS101', name: 'Introduction to Programming' },
    { id: 'CS201', name: 'Data Structures' },
    { id: 'CS301', name: 'Algorithms' },
    { id: 'CS401', name: 'Database Systems' },
    { id: 'CS501', name: 'Web Development' },
  ]

  // Mock attendance report data
  const reportData = [
    { id: 1, matric: 'MAT001', name: 'Alice Johnson', present: 25, absent: 3, percentage: 89, eligible: true },
    { id: 2, matric: 'MAT002', name: 'Bob Smith', present: 26, absent: 2, percentage: 93, eligible: true },
    { id: 3, matric: 'MAT003', name: 'Charlie Brown', present: 18, absent: 10, percentage: 64, eligible: false },
    { id: 4, matric: 'MAT004', name: 'Diana Davis', present: 27, absent: 1, percentage: 96, eligible: true },
    { id: 5, matric: 'MAT005', name: 'Ethan Wilson', present: 24, absent: 4, percentage: 86, eligible: true },
    { id: 6, matric: 'MAT006', name: 'Fiona Garcia', present: 17, absent: 11, percentage: 61, eligible: false },
    { id: 7, matric: 'MAT007', name: 'George Martinez', present: 25, absent: 3, percentage: 89, eligible: true },
    { id: 8, matric: 'MAT008', name: 'Hannah Lee', present: 28, absent: 0, percentage: 100, eligible: true },
    { id: 9, matric: 'MAT009', name: 'Ivan Rodriguez', present: 23, absent: 5, percentage: 82, eligible: true },
    { id: 10, matric: 'MAT010', name: 'Julia Taylor', present: 16, absent: 12, percentage: 57, eligible: false },
    { id: 11, matric: 'MAT011', name: 'Kevin Anderson', present: 26, absent: 2, percentage: 93, eligible: true },
    { id: 12, matric: 'MAT012', name: 'Laura Thomas', present: 27, absent: 1, percentage: 96, eligible: true },
  ]

  // Calculate overall stats
  const totalStudents = reportData.length
  const eligibleStudents = reportData.filter((s) => s.eligible).length
  const ineligibleStudents = totalStudents - eligibleStudents
  const avgAttendance = Math.round(
    reportData.reduce((sum, s) => sum + s.percentage, 0) / totalStudents
  )
  const totalSessions = 28

  // Handle PDF download
  const handleDownloadPDF = () => {
    setDownloadMessage('')
    // Simulate download
    setTimeout(() => {
      setDownloadMessage('✓ PDF report downloaded successfully!')
      setTimeout(() => setDownloadMessage(''), 3000)
    }, 600)
  }

  // Handle Excel download
  const handleDownloadExcel = () => {
    setDownloadMessage('')
    // Simulate download
    setTimeout(() => {
      setDownloadMessage('✓ Excel report downloaded successfully!')
      setTimeout(() => setDownloadMessage(''), 3000)
    }, 600)
  }

  const getEligibilityColor = (eligible) => {
    return eligible
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200'
  }

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) return 'text-green-700'
    if (percentage >= 70) return 'text-amber-700'
    return 'text-red-700'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Attendance Reports</h1>
          <p className="text-gray-600 mt-2">View and download detailed attendance reports</p>
        </div>
      </div>

      {/* Course Selection */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Select Course
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 max-w-md"
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.id} - {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        {/* Eligible Students */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700 mb-1">Eligible</p>
              <p className="text-3xl font-bold text-green-600">{eligibleStudents}</p>
            </div>
            <div className="text-4xl">✓</div>
          </div>
        </div>

        {/* Ineligible Students */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-700 mb-1">Ineligible</p>
              <p className="text-3xl font-bold text-red-600">{ineligibleStudents}</p>
            </div>
            <div className="text-4xl">✗</div>
          </div>
        </div>

        {/* Average Attendance */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Avg Attendance</p>
              <p className="text-3xl font-bold text-purple-600">{avgAttendance}%</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Download Reports</h2>
        <p className="text-blue-100 mb-6">Export attendance data for record keeping and analysis</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span className="text-2xl">📄</span> Download PDF
          </button>
          <button
            onClick={handleDownloadExcel}
            className="flex-1 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span className="text-2xl">📊</span> Download Excel
          </button>
        </div>
      </div>

      {/* Download Message */}
      {downloadMessage && (
        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-sm text-green-700 font-semibold">{downloadMessage}</p>
        </div>
      )}

      {/* Session Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Report Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
            <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Reporting Period</p>
            <p className="text-2xl font-bold text-gray-900">Spring 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Eligibility Threshold</p>
            <p className="text-2xl font-bold text-gray-900">75%</p>
          </div>
        </div>
      </div>

      {/* Attendance Details Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b-2 border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <h2 className="text-xl font-bold text-gray-900">Detailed Student Report</h2>
          <p className="text-sm text-gray-600 mt-1">
            Students with less than 75% attendance are ineligible for final examination
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Matric Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student Name</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Present</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Absent</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Attendance %</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Eligibility</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {reportData.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
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

                  {/* Present Count */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                      {student.present}
                    </div>
                  </td>

                  {/* Absent Count */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold text-sm">
                      {student.absent}
                    </div>
                  </td>

                  {/* Attendance Percentage */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full ${
                            student.percentage >= 80
                              ? 'bg-green-500'
                              : student.percentage >= 70
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${student.percentage}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${getPercentageColor(student.percentage)}`}>
                        {student.percentage}%
                      </span>
                    </div>
                  </td>

                  {/* Eligibility Badge */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${getEligibilityColor(
                        student.eligible
                      )}`}
                    >
                      <span>{student.eligible ? '✓' : '✗'}</span>
                      {student.eligible ? 'Eligible' : 'Ineligible'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Note:</span> Eligibility is based on attendance threshold of 75%. Students below this threshold cannot sit for final examinations.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-amber-900 mb-4">Attendance Color Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 border-2 border-green-300 flex items-center justify-center">
              <span className="text-lg">🟢</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">80% or Higher</p>
              <p className="text-xs text-amber-800">Good attendance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-amber-100 border-2 border-amber-300 flex items-center justify-center">
              <span className="text-lg">🟡</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">70-79%</p>
              <p className="text-xs text-amber-800">Average attendance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-100 border-2 border-red-300 flex items-center justify-center">
              <span className="text-lg">🔴</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">Below 70%</p>
              <p className="text-xs text-amber-800">Below threshold</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
