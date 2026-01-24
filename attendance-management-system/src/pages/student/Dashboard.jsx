const StudentDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Enrolled Courses</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Overall Attendance</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">85%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Classes Attended</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">68/80</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
