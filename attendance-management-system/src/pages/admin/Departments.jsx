import { useState } from 'react'

const Departments = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Computer Science',
      head: 'Dr. James Wilson',
      email: 'james.wilson@university.edu',
      students: 234,
      lecturers: 12,
      courses: 18,
      createdDate: '2023-06-15',
    },
    {
      id: 2,
      name: 'Mathematics',
      head: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      students: 156,
      lecturers: 8,
      courses: 14,
      createdDate: '2023-07-20',
    },
    {
      id: 3,
      name: 'Physics',
      head: 'Prof. Michael Brown',
      email: 'michael.brown@university.edu',
      students: 189,
      lecturers: 10,
      courses: 16,
      createdDate: '2023-08-10',
    },
    {
      id: 4,
      name: 'Literature & Languages',
      head: 'Dr. Emily Davis',
      email: 'emily.davis@university.edu',
      students: 142,
      lecturers: 9,
      courses: 12,
      createdDate: '2023-09-05',
    },
    {
      id: 5,
      name: 'Engineering',
      head: 'Prof. Robert Martinez',
      email: 'robert.martinez@university.edu',
      students: 267,
      lecturers: 15,
      courses: 20,
      createdDate: '2023-10-12',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    email: '',
  })

  // Filter departments
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.head && formData.email) {
      if (editingId) {
        // Update existing department
        setDepartments(
          departments.map((dept) =>
            dept.id === editingId
              ? { ...dept, ...formData }
              : dept
          )
        )
        setEditingId(null)
      } else {
        // Create new department
        const newDept = {
          id: Math.max(...departments.map((d) => d.id), 0) + 1,
          ...formData,
          students: 0,
          lecturers: 0,
          courses: 0,
          createdDate: new Date().toISOString().split('T')[0],
        }
        setDepartments([...departments, newDept])
      }
      setFormData({ name: '', head: '', email: '' })
      setShowForm(false)
    }
  }

  // Handle edit
  const handleEdit = (dept) => {
    setFormData({ name: dept.name, head: dept.head, email: dept.email })
    setEditingId(dept.id)
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter((dept) => dept.id !== id))
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', head: '', email: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-2">Manage academic departments and their information</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            + Add Department
          </button>
        )}
      </div>

      {/* Add/Edit Department Form */}
      {showForm && (
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingId ? 'Edit Department' : 'Add New Department'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Department Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Department Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Computer Science"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  required
                />
              </div>

              {/* Department Head */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Department Head
                </label>
                <input
                  type="text"
                  value={formData.head}
                  onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                  placeholder="e.g., Dr. James Wilson"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="dept@university.edu"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all"
              >
                {editingId ? 'Update Department' : 'Create Department'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by department name, head, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          />
          <span className="absolute right-4 top-3 text-gray-400 text-lg">🔍</span>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing <span className="font-semibold text-gray-900">{filteredDepartments.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{departments.length}</span> departments
        </p>
      </div>

      {/* Departments Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Department</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Head</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Students</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Lecturers</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Courses</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50 transition-colors">
                    {/* Department Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {dept.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{dept.name}</p>
                          <p className="text-xs text-gray-500">
                            Created {new Date(dept.createdDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department Head */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{dept.head}</p>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{dept.email}</p>
                    </td>

                    {/* Students Count */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                        {dept.students}
                      </div>
                    </td>

                    {/* Lecturers Count */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                        {dept.lecturers}
                      </div>
                    </td>

                    {/* Courses Count */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
                        {dept.courses}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(dept)}
                          title="Edit department"
                          className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(dept.id)}
                          title="Delete department"
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <p className="text-gray-600 font-medium">No departments found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Departments
