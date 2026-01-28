const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Students',
      value: '342',
      icon: '👨‍🎓',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      accentColor: 'text-blue-600',
    },
    {
      label: 'Total Lecturers',
      value: '48',
      icon: '👨‍🏫',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      accentColor: 'text-emerald-600',
    },
    {
      label: 'Total Courses',
      value: '56',
      icon: '📚',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      accentColor: 'text-purple-600',
    },
    {
      label: 'Departments',
      value: '12',
      icon: '🏢',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      accentColor: 'text-amber-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your system overview.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} border-2 ${stat.borderColor} rounded-2xl p-6 transition-all hover:shadow-md hover:scale-105`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-semibold ${stat.textColor} mb-1`}>
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${stat.accentColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className={`mt-4 pt-4 border-t ${stat.borderColor} text-xs ${stat.textColor} font-medium`}>
              Updated today
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[
              { action: 'New student registered', time: '2 hours ago', icon: '✓', color: 'bg-green-100' },
              { action: 'Attendance record updated', time: '4 hours ago', icon: '📝', color: 'bg-blue-100' },
              { action: 'Course created: Advanced Java', time: '1 day ago', icon: '📚', color: 'bg-purple-100' },
              { action: 'Department updated', time: '2 days ago', icon: '🏢', color: 'bg-amber-100' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                <div className={`${activity.color} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-4">System Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Server Health</span>
                <span className="text-green-200 text-sm font-semibold">Online</span>
              </div>
              <div className="w-full bg-blue-500 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Database</span>
                <span className="text-green-200 text-sm font-semibold">Connected</span>
              </div>
              <div className="w-full bg-blue-500 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{width: '98%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">System Load</span>
                <span className="text-yellow-200 text-sm font-semibold">45%</span>
              </div>
              <div className="w-full bg-blue-500 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
