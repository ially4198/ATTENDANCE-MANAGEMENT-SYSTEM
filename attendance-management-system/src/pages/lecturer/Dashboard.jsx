const LecturerDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lecturer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Courses</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Students</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Attendance Rate</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">92%</p>
        </div>
      </div>
    </div>
  )
}

export default LecturerDashboard
