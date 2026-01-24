const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Departments</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Courses</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">45</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
