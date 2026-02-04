import { useState } from 'react'

const CourseRegistration = () => {
  const [registeredCourses, setRegisteredCourses] = useState(['CS101', 'MATH101'])
  const [semesterFilter, setSemesterFilter] = useState('Spring 2026')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [academicLevelFilter, setAcademicLevelFilter] = useState('all')
  const [successMessage, setSuccessMessage] = useState('')

  // Mock available courses
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      department: 'Computer Science',
      credits: 3,
      academicLevel: '100',
      instructor: 'Dr. James Wilson',
      capacity: 50,
      enrolled: 42,
      semester: 'Spring 2026',
      schedule: 'Mon, Wed 10:00-11:30',
      description: 'Learn programming basics with Python',
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures',
      department: 'Computer Science',
      credits: 4,
      academicLevel: '200',
      instructor: 'Prof. Sarah Johnson',
      capacity: 40,
      enrolled: 35,
      semester: 'Spring 2026',
      schedule: 'Tue, Thu 14:00-15:30',
      description: 'Study arrays, linked lists, trees, and graphs',
    },
    {
      id: 3,
      code: 'CS301',
      name: 'Algorithms',
      department: 'Computer Science',
      credits: 4,
      academicLevel: '300',
      instructor: 'Dr. Michael Brown',
      capacity: 35,
      enrolled: 30,
      semester: 'Spring 2026',
      schedule: 'Mon, Wed, Fri 11:00-12:00',
      description: 'Analysis and design of algorithms',
    },
    {
      id: 4,
      code: 'CS401',
      name: 'Database Systems',
      department: 'Computer Science',
      credits: 3,
      academicLevel: '400',
      instructor: 'Prof. Robert Martinez',
      capacity: 30,
      enrolled: 25,
      semester: 'Spring 2026',
      schedule: 'Tue, Thu 10:00-11:30',
      description: 'Relational databases and SQL',
    },
    {
      id: 5,
      code: 'MATH101',
      name: 'Calculus I',
      department: 'Mathematics',
      credits: 4,
      academicLevel: '100',
      instructor: 'Dr. Emily Davis',
      capacity: 60,
      enrolled: 52,
      semester: 'Spring 2026',
      schedule: 'Mon, Wed, Fri 09:00-10:00',
      description: 'Limits, derivatives, and integrals',
    },
    {
      id: 6,
      code: 'MATH201',
      name: 'Linear Algebra',
      department: 'Mathematics',
      credits: 4,
      academicLevel: '200',
      instructor: 'Prof. William Harris',
      capacity: 45,
      enrolled: 38,
      semester: 'Spring 2026',
      schedule: 'Tue, Thu 13:00-14:30',
      description: 'Vectors, matrices, and eigenvalues',
    },
    {
      id: 7,
      code: 'ENG101',
      name: 'English Composition',
      department: 'Literature & Languages',
      credits: 3,
      academicLevel: '100',
      instructor: 'Dr. Jessica Anderson',
      capacity: 25,
      enrolled: 20,
      semester: 'Spring 2026',
      schedule: 'Mon, Wed 13:00-14:30',
      description: 'Academic writing and communication',
    },
    {
      id: 8,
      code: 'PHY101',
      name: 'Physics I',
      department: 'Physics',
      credits: 4,
      academicLevel: '100',
      instructor: 'Prof. David Lee',
      capacity: 40,
      enrolled: 38,
      semester: 'Spring 2026',
      schedule: 'Tue, Thu, Fri 09:00-10:00',
      description: 'Mechanics and motion',
    },
  ])

  // Filter courses
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSemester = course.semester === semesterFilter
    const matchesDepartment = departmentFilter === 'all' || course.department === departmentFilter
    const matchesAcademicLevel = academicLevelFilter === 'all' || course.academicLevel === academicLevelFilter
    return matchesSemester && matchesDepartment && matchesAcademicLevel
  })

  // Handle course registration
  const handleRegister = (courseCode) => {
    if (!registeredCourses.includes(courseCode)) {
      setRegisteredCourses([...registeredCourses, courseCode])
      setSuccessMessage(`✓ Successfully registered for ${courseCode}!`)
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  // Handle course deregistration
  const handleDeregister = (courseCode) => {
    setRegisteredCourses(registeredCourses.filter((code) => code !== courseCode))
  }

  // Get unique departments
  const departments = ['all', ...new Set(availableCourses.map((c) => c.department))]

  // Calculate stats
  const totalCredits = availableCourses
    .filter((c) => registeredCourses.includes(c.code))
    .reduce((sum, c) => sum + c.credits, 0)

  const isRegistered = (courseCode) => registeredCourses.includes(courseCode)

  const getAvailabilityColor = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90) return 'text-red-700'
    if (percentage >= 75) return 'text-amber-700'
    return 'text-green-700'
  }

  const getAvailabilityBg = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90) return 'bg-red-50 border-red-200'
    if (percentage >= 75) return 'bg-amber-50 border-amber-200'
    return 'bg-green-50 border-green-200'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Course Registration</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Browse and register for courses for this semester</p>
      </div>

      {/* Registration Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Registered Courses */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700 mb-1">Registered Courses</p>
              <p className="text-3xl font-bold text-blue-600">{registeredCourses.length}</p>
            </div>
            <div className="text-3xl">✓</div>
          </div>
        </div>

        {/* Total Credits */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Total Credits</p>
              <p className="text-3xl font-bold text-purple-600">{totalCredits}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>

        {/* Available Courses */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-1">Available to Register</p>
              <p className="text-3xl font-bold text-emerald-600">
                {filteredCourses.filter((c) => !isRegistered(c.code)).length}
              </p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-sm text-green-700 font-semibold">{successMessage}</p>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Department Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Semester
            </label>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            >
              <option value="Fall 2025">First Semester</option>
              <option value="Spring 2026">Second Semester</option>
              
            </select>
          </div>

          {/* Academic Level Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Academic Level
            </label>
            <select
              value={academicLevelFilter}
              onChange={(e) => setAcademicLevelFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            >
              <option value="all">All Levels</option>
              <option value="100">Level 100</option>
              <option value="200">Level 200</option>
              <option value="300">Level 300</option>
              <option value="400">Level 400</option>
              <option value="500">Level 500</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="md:hidden p-4 space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="border-2 border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                      {course.code}
                    </span>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{course.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{course.description}</p>
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
                    {course.credits}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                  <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">{course.academicLevel}</span>
                  <span>{course.instructor}</span>
                </div>
                <div>
                  {isRegistered(course.code) ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        disabled
                        className="px-3 py-2 bg-green-100 text-green-700 font-semibold rounded-lg text-sm cursor-default"
                      >
                        ✓ Registered
                      </button>
                      <button
                        onClick={() => handleDeregister(course.code)}
                        className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRegister(course.code)}
                      disabled={course.enrolled >= course.capacity}
                      className={`w-full px-4 py-2 font-semibold rounded-lg text-sm transition-all ${
                        course.enrolled >= course.capacity
                          ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {course.enrolled >= course.capacity ? 'Full' : '+ Register'}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-600 font-medium">No courses available for the selected filters</p>
            </div>
          )}
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[760px]">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Course Code</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Course Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Instructor</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Credits</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Level</th>
                {/* <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Enrollment</th> */}
                {/* <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Schedule</th> */}
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    {/* Course Code */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                        {course.code}
                      </span>
                    </td>

                    {/* Course Name */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{course.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{course.description}</p>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{course.instructor}</p>
                    </td>

                    {/* Credits */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
                        {course.credits}
                      </div>
                    </td>

                    {/* Academic Level */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        {course.academicLevel}
                      </span>
                    </td>

                    {/* Enrollment Status */}
                    {/* <td className="px-6 py-4">
                      <div className={`border-2 rounded-lg p-3 ${getAvailabilityBg(course.enrolled, course.capacity)}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-gray-700">
                              {course.enrolled}/{course.capacity}
                            </p>
                            <p className="text-xs text-gray-600">
                              {course.capacity - course.enrolled} available
                            </p>
                          </div>
                          <span className={`text-lg font-bold ${getAvailabilityColor(course.enrolled, course.capacity)}`}>
                            {Math.round((course.enrolled / course.capacity) * 100)}%
                          </span>
                        </div>
                      </div>
                    </td> */}

                    {/* Schedule */}
                    {/* <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{course.schedule}</p>
                    </td> */}

                    {/* Action Button */}
                    <td className="px-6 py-4">
                      {isRegistered(course.code) ? (
                        <div className="flex gap-2">
                          <button
                            disabled
                            className="px-3 py-2 bg-green-100 text-green-700 font-semibold rounded-lg text-sm cursor-default"
                          >
                            ✓ Registered
                          </button>
                          <button
                            onClick={() => handleDeregister(course.code)}
                            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg text-sm transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegister(course.code)}
                          disabled={course.enrolled >= course.capacity}
                          className={`px-4 py-2 font-semibold rounded-lg text-sm transition-all ${
                            course.enrolled >= course.capacity
                              ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {course.enrolled >= course.capacity ? 'Full' : '+ Register'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <p className="text-gray-600 font-medium">No courses available for the selected filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span>ℹ️</span> Course Registration Information
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">Credit Limit</p>
              <p className="text-sm text-blue-800">Normal course load is 12-18 credits per semester. Contact your advisor for exceptions.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">Course Capacity</p>
              <p className="text-sm text-blue-800">Courses are filled on a first-come, first-served basis. Register early to secure your preferred courses.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">Add/Drop Deadline</p>
              <p className="text-sm text-blue-800">You may add or drop courses until the published deadline. Late changes require instructor approval.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseRegistration
