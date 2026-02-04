import { useState } from 'react'

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      description: 'Learn the fundamentals of programming with Python',
      credits: 3,
      students: 45,
      semester: 'Spring 2026',
      academicLevel: '100',
      status: 'active',
      sessions: 28,
      createdDate: '2025-01-15',
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures',
      description: 'Advanced concepts in data structures and algorithms',
      credits: 4,
      students: 38,
      semester: 'Spring 2026',
      academicLevel: '200',
      status: 'active',
      sessions: 26,
      createdDate: '2025-01-10',
    },
    {
      id: 3,
      code: 'CS301',
      name: 'Algorithms',
      description: 'Study of computational algorithms and complexity',
      credits: 4,
      students: 32,
      semester: 'Spring 2026',
      academicLevel: '300',
      status: 'active',
      sessions: 24,
      createdDate: '2024-12-20',
    },
    {
      id: 4,
      code: 'CS401',
      name: 'Database Systems',
      description: 'Relational databases and SQL fundamentals',
      credits: 3,
      students: 28,
      semester: 'Spring 2026',
      academicLevel: '400',
      status: 'active',
      sessions: 20,
      createdDate: '2024-12-10',
    },
    {
      id: 5,
      code: 'CS501',
      name: 'Web Development',
      description: 'Full-stack web development with modern frameworks',
      credits: 4,
      students: 42,
      semester: 'Spring 2026',
      academicLevel: '500',
      status: 'active',
      sessions: 26,
      createdDate: '2025-01-05',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    credits: '3',
    semester: 'Spring 2026',
    academicLevel: '100',
  })

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handle create/update course
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.code && formData.name) {
      if (editingId) {
        // Update existing course
        setCourses(
          courses.map((course) =>
            course.id === editingId
              ? { ...course, ...formData }
              : course
          )
        )
        setEditingId(null)
      } else {
        // Create new course
        const newCourse = {
          id: Math.max(...courses.map((c) => c.id), 0) + 1,
          ...formData,
          students: 0,
          sessions: 0,
          status: 'active',
          createdDate: new Date().toISOString().split('T')[0],
        }
        setCourses([...courses, newCourse])
      }
      setFormData({ code: '', name: '', description: '', credits: '3', semester: 'Spring 2026', academicLevel: '100' })
      setShowModal(false)
    }
  }

  // Handle edit
  const handleEdit = (course) => {
    setFormData({
      code: course.code,
      name: course.name,
      description: course.description,
      credits: course.credits.toString(),
      semester: course.semester,
      academicLevel: course.academicLevel,
    })
    setEditingId(course.id)
    setShowModal(true)
  }

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ code: '', name: '', description: '', credits: '3', semester: 'Spring 2026', academicLevel: '100' })
  }

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">Manage and view your assigned courses</p>
        </div>
        {!showModal && (
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            + Create Course
          </button>
        )}
      </div>

      {/* Create/Edit Course Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Course' : 'Create New Course'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Course Code and Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Course Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., CS101"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    required
                  />
                </div>

                {/* Credits */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Credits
                  </label>
                  <select
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  >
                    <option value="1">1 Credit</option>
                    <option value="2">2 Credits</option>
                    <option value="3">3 Credits</option>
                    <option value="4">4 Credits</option>
                    <option value="5">5 Credits</option>
                  </select>
                </div>
              </div>

              {/* Course Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Introduction to Programming"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the course"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 resize-none"
                />
              </div>

              {/* Semester */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Semester
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                >
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                  <option value="Summer 2026">Summer 2026</option>
                  <option value="Fall 2026">Fall 2026</option>
                </select>
              </div>

              {/* Academic Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Academic Level
                </label>
                <select
                  value={formData.academicLevel}
                  onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  required
                >
                  <option value="100">Level 100 (First Year)</option>
                  <option value="200">Level 200 (Second Year)</option>
                  <option value="300">Level 300 (Third Year)</option>
                  <option value="400">Level 400 (Fourth Year)</option>
                  <option value="500">Level 500 (Postgraduate)</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
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
                  {editingId ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by course code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            />
            <span className="absolute right-4 top-3 text-gray-400 text-lg">🔍</span>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          >
            <option value="all">All Courses</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{courses.length}</span> courses
        </p>
      </div>

      {/* Courses Grid/Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all"
            >
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                      {course.code}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-lg border ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                </div>
              </div>

              {/* Course Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

              {/* Course Stats */}
              <div className="grid grid-cols-5 gap-2 py-4 border-y border-gray-200 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{course.credits}</p>
                  <p className="text-xs text-gray-600">Credits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{course.students}</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{course.sessions}</p>
                  <p className="text-xs text-gray-600">Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{course.semester}</p>
                  <p className="text-xs text-gray-600">Semester</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-indigo-600">L{course.academicLevel}</p>
                  <p className="text-xs text-gray-600">Level</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <span>✏️</span> Edit
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold transition-colors text-sm flex items-center justify-center gap-2">
                  <span>📊</span> Attendance
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex-1 px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <span>🗑️</span> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 font-medium">No courses found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
