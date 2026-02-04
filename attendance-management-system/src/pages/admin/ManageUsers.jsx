import { useState } from 'react'

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkTab, setBulkTab] = useState('csv') // 'csv' or 'text'
  const [csvFile, setCsvFile] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [bulkPreview, setBulkPreview] = useState([])
  const [bulkErrors, setBulkErrors] = useState([])
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student', department: '', academicLevel: '100' })
  const [editUser, setEditUser] = useState(null)
  const departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Electrical Engineering' },
    { id: 3, name: 'Mechanical Engineering' }
  ]
  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@university.edu',
      role: 'student',
      department: 'Computer Science',
      academicLevel: '200',
      status: 'active',
      joinDate: '2025-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@university.edu',
      role: 'lecturer',
      department: 'Mathematics',
      status: 'active',
      joinDate: '2024-08-20',
    },
    {
      id: 3,
      name: 'Robert Wilson',
      email: 'robert.wilson@university.edu',
      role: 'student',
      department: 'Engineering',
      academicLevel: '300',
      status: 'active',
      joinDate: '2025-01-10',
    },
    {
      id: 4,
      name: 'Emily Brown',
      email: 'emily.brown@university.edu',
      role: 'lecturer',
      department: 'Physics',
      status: 'inactive',
      joinDate: '2024-09-05',
    },
    {
      id: 5,
      name: 'Michael Johnson',
      email: 'michael.johnson@university.edu',
      role: 'student',
      department: 'Business',
      academicLevel: '100',
      status: 'active',
      joinDate: '2025-01-18',
    },
    {
      id: 6,
      name: 'Sarah Davis',
      email: 'sarah.davis@university.edu',
      role: 'lecturer',
      department: 'Literature',
      status: 'active',
      joinDate: '2024-07-12',
    },
  ])

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Handle create user
  const handleCreateUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        id: users.length + 1,
        ...newUser,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      }
      setUsers([...users, user])
      setNewUser({ name: '', email: '', role: 'student', department: '', academicLevel: '100' })
      setShowModal(false)
    }
  }

  // Handle deactivate user
  const handleToggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
      )
    )
  }

  // Handle delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleEditClick = (user) => {
    setEditUser({ ...user })
    setShowEditModal(true)
  }

  const handleUpdateUser = () => {
    if (!editUser?.name || !editUser?.email) return

    setUsers(
      users.map((user) =>
        user.id === editUser.id
          ? {
            ...user,
            name: editUser.name,
            email: editUser.email,
            role: editUser.role,
            department: editUser.department,
            academicLevel: editUser.role === 'student' ? editUser.academicLevel || '100' : '',
          }
          : user
      )
    )

    setShowEditModal(false)
    setEditUser(null)
  }

  // Parse CSV data
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
    const parsedUsers = []
    const errors = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(',').map((v) => v.trim())
      const user = {}

      headers.forEach((header, idx) => {
        user[header] = values[idx]
      })

      // Validate required fields
      if (!user.name || !user.email) {
        errors.push(`Row ${i + 1}: Missing name or email`)
        continue
      }

      // Set defaults
      user.role = (user.role || 'student').toLowerCase()
      if (!['student', 'lecturer', 'admin'].includes(user.role)) {
        errors.push(`Row ${i + 1}: Invalid role "${user.role}"`)
        continue
      }

      user.department = user.department || ''
      user.academicLevel = user.academiclevel || (user.role === 'student' ? '100' : '')

      parsedUsers.push(user)
    }

    return { parsedUsers, errors }
  }

  // Parse text input (JSON or newline-separated format)
  const parseTextInput = (text) => {
    const errors = []
    const parsedUsers = []

    try {
      // Try JSON format first
      if (text.trim().startsWith('[')) {
        const users = JSON.parse(text)
        if (!Array.isArray(users)) {
          errors.push('Invalid JSON format: expected an array')
          return { parsedUsers: [], errors }
        }

        users.forEach((user, idx) => {
          if (!user.name || !user.email) {
            errors.push(`User ${idx + 1}: Missing name or email`)
            return
          }

          const role = (user.role || 'student').toLowerCase()
          if (!['student', 'lecturer', 'admin'].includes(role)) {
            errors.push(`User ${idx + 1}: Invalid role "${role}"`)
            return
          }

          parsedUsers.push({
            name: user.name,
            email: user.email,
            role: role,
            department: user.department || '',
            academicLevel: user.academicLevel || (role === 'student' ? '100' : ''),
          })
        })
      } else {
        // Parse line-by-line format (name|email|role|department|academicLevel)
        const lines = text
          .trim()
          .split('\n')
          .filter((l) => l.trim())

        lines.forEach((line, idx) => {
          const parts = line.split('|').map((p) => p.trim())
          if (parts.length < 2) {
            errors.push(`Line ${idx + 1}: Format should be name|email|role|department|academicLevel`)
            return
          }

          const [name, email, role = 'student', department = '', academicLevel = '100'] = parts

          if (!name || !email) {
            errors.push(`Line ${idx + 1}: Missing name or email`)
            return
          }

          const validRole = role.toLowerCase()
          if (!['student', 'lecturer', 'admin'].includes(validRole)) {
            errors.push(`Line ${idx + 1}: Invalid role "${validRole}"`)
            return
          }

          parsedUsers.push({
            name,
            email,
            role: validRole,
            department,
            academicLevel: validRole === 'student' ? academicLevel : '',
          })
        })
      }
    } catch (error) {
      errors.push(`JSON Parse Error: ${error.message}`)
    }

    return { parsedUsers, errors }
  }

  // Handle CSV file upload
  const handleCSVUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const csvText = event.target.result
      const { parsedUsers, errors } = parseCSV(csvText)
      setBulkPreview(parsedUsers)
      setBulkErrors(errors)
    }
    reader.readAsText(file)
  }

  // Handle text input preview
  const handleTextInputPreview = () => {
    const { parsedUsers, errors } = parseTextInput(textInput)
    setBulkPreview(parsedUsers)
    setBulkErrors(errors)
  }

  // Handle bulk create
  const handleBulkCreate = () => {
    if (bulkPreview.length === 0) {
      setBulkErrors(['No users to create'])
      return
    }

    const newUsers = bulkPreview.map((user, idx) => ({
      id: users.length + idx + 1,
      ...user,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
    }))

    setUsers([...users, ...newUsers])

    // Reset states
    setCsvFile(null)
    setTextInput('')
    setBulkPreview([])
    setBulkErrors([])
    setShowBulkModal(false)
    setBulkTab('csv')
  }

  const getRoleEmoji = (role) => {
    switch (role) {
      case 'student':
        return '👨‍🎓'
      case 'lecturer':
        return '👨‍🏫'
      case 'admin':
        return '⚙️'
      default:
        return '👤'
    }
  }

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200'
  }

  const getDepartmentOptions = (currentDepartment) => {
    const options = departments.map((dept) => dept.name)
    if (currentDepartment && !options.includes(currentDepartment)) {
      return [currentDepartment, ...options]
    }
    return options
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-2">View and manage system users</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            📥 Bulk Create
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            + Create User
          </button>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            />
            <span className="absolute right-4 top-3 text-gray-400">🔍</span>
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="lecturer">Lecturers</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{users.length}</span> users
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Role</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Department</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Academic Level</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Join Date</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getRoleEmoji(user.role)}</span>
                        <span className="text-sm font-medium text-gray-700 capitalize">{user.role}</span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{user.department}</span>
                    </td>

                    {/* Academic Level */}
                    <td className="px-6 py-4">
                      {user.role === 'student' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                          Level {user.academicLevel}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                          user.status
                        )}`}
                      >
                        <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>●</span>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{new Date(user.joinDate).toLocaleDateString()}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          title="Edit user"
                          className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                          onClick={() => handleEditClick(user)}
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          title={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
                          className={`p-2 rounded-lg transition-colors ${user.status === 'active'
                            ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                            : 'bg-green-100 hover:bg-green-200 text-green-700'
                            }`}
                        >
                          {user.status === 'active' ? '⏸️' : '▶️'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete user"
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
                    <p className="text-gray-600 font-medium">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New User</h2>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="user@university.edu"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Department Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
                {/* <input
                  type="text"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  placeholder="e.g., Computer Science"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />  */}
                <select
                  value={newUser.department}
                  onChange={(e) =>
                    setNewUser({ ...newUser, department: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white"
                >
                  <option value="" disabled>
                    Select a department
                  </option>

                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Level - Only for Students */}
              {newUser.role === 'student' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Academic Level</label>
                  <select
                    value={newUser.academicLevel || '100'}
                    onChange={(e) => setNewUser({ ...newUser, academicLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  >
                    <option value="100">Level 100 </option>
                    <option value="200">Level 200 </option>
                    <option value="300">Level 300 </option>
                    <option value="400">Level 400 </option>
                    <option value="500">Level 500 </option>
                  </select>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h2>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  placeholder="user@university.edu"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                <select
                  value={editUser.role}
                  onChange={(e) => {
                    const role = e.target.value
                    setEditUser({
                      ...editUser,
                      role,
                      academicLevel: role === 'student' ? editUser.academicLevel || '100' : '',
                    })
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Department Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
                <select
                  value={editUser.department}
                  onChange={(e) => setEditUser({ ...editUser, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white"
                >
                  <option value="" disabled>
                    Select a department
                  </option>

                  {getDepartmentOptions(editUser.department).map((deptName) => (
                    <option key={deptName} value={deptName}>
                      {deptName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Level - Only for Students */}
              {editUser.role === 'student' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Academic Level</label>
                  <select
                    value={editUser.academicLevel || '100'}
                    onChange={(e) => setEditUser({ ...editUser, academicLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  >
                    <option value="100">Level 100 </option>
                    <option value="200">Level 200 </option>
                    <option value="300">Level 300 </option>
                    <option value="400">Level 400 </option>
                    <option value="500">Level 500 </option>
                  </select>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setEditUser(null)
                }}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Create Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bulk Create Users</h2>
              <button
                onClick={() => {
                  setShowBulkModal(false)
                  setCsvFile(null)
                  setTextInput('')
                  setBulkPreview([])
                  setBulkErrors([])
                }}
                className="text-2xl text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
              <button
                onClick={() => setBulkTab('csv')}
                className={`py-3 px-6 font-semibold border-b-2 transition-colors ${bulkTab === 'csv'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
              >
                📄 CSV Upload
              </button>
              <button
                onClick={() => setBulkTab('text')}
                className={`py-3 px-6 font-semibold border-b-2 transition-colors ${bulkTab === 'text'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
              >
                ✏️ Text Input
              </button>
            </div>

            {/* CSV Upload Tab */}
            {bulkTab === 'csv' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Upload CSV File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <div className="text-4xl mb-2">📁</div>
                      <p className="font-semibold text-gray-900">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">CSV files only</p>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    <strong>CSV Format:</strong> name,email,role,department,academicLevel
                  </p>
                </div>
              </div>
            )}

            {/* Text Input Tab */}
            {bulkTab === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Paste User Data
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={`Format 1: name|email|role|department|academicLevel
John Doe|john@university.edu|student|Computer Science|100
Jane Smith|jane@university.edu|lecturer|Mathematics|

Format 2: JSON array
[{"name":"John Doe","email":"john@university.edu","role":"student","department":"CS","academicLevel":"100"}]`}
                    className="w-full h-48 px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  />
                  <button
                    onClick={handleTextInputPreview}
                    className="mt-3 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
            )}

            {/* Errors Section */}
            {bulkErrors.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="font-semibold text-red-900 mb-2">⚠️ Validation Errors:</p>
                <ul className="space-y-1">
                  {bulkErrors.map((error, idx) => (
                    <li key={idx} className="text-sm text-red-700">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preview Section */}
            {bulkPreview.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold text-gray-900 mb-3">
                  Preview: {bulkPreview.length} user{bulkPreview.length !== 1 ? 's' : ''} to create
                </p>
                <div className="max-h-64 overflow-y-auto border-2 border-gray-200 rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr className="border-b-2 border-gray-200">
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Name</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Email</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Role</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Department</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bulkPreview.map((user, idx) => (
                        <tr key={idx} className="hover:bg-blue-50">
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold capitalize">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-2">{user.department}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowBulkModal(false)
                  setCsvFile(null)
                  setTextInput('')
                  setBulkPreview([])
                  setBulkErrors([])
                }}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkCreate}
                disabled={bulkPreview.length === 0}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${bulkPreview.length > 0
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Create {bulkPreview.length} User{bulkPreview.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageUsers
