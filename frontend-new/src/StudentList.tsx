import { useState, useEffect } from 'react'

interface Student {
  id: number;
  name: string;
  grade: string;
  class: string;
}

function StudentList() {
  // State to store students from backend
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect runs when component mounts (loads)
  useEffect(() => {
    // Fetch students from backend
    fetchStudents()
  }, []) // Empty array = run only once on mount

  const fetchStudents = async () => {
    try {
      setLoading(true)
      // Call our backend API
      const response = await fetch('http://localhost:3000/api/students')
      const data = await response.json()
      
      if (data.success) {
        setStudents(data.data)
      } else {
        setError('Failed to load students')
      }
    } catch (err) {
      setError('Error connecting to backend: ' + err)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading students from backend... 🔄</p>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div style={{ padding: '20px', color: '#ff6b6b' }}>
        <p>❌ {error}</p>
        <button onClick={fetchStudents}>Try Again</button>
      </div>
    )
  }

  // Show students
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#61dafb' }}>
        📚 Students from Backend API
      </h2>
      <p style={{ color: '#888' }}>
        Fetched {students.length} students from http://localhost:3000/api/students
      </p>
      
      <div style={{ 
        display: 'grid', 
        gap: '15px', 
        marginTop: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
      }}>
        {students.map((student) => (
          <div 
            key={student.id}
            style={{
              border: '2px solid #61dafb',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#1a1a1a'
            }}
          >
            <h3 style={{ marginTop: 0, color: '#61dafb' }}>
              {student.name}
            </h3>
            <p style={{ margin: '5px 0' }}>
              <strong>Grade:</strong> {student.grade}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Class:</strong> {student.class}
            </p>
          </div>
        ))}
      </div>

      <button 
        onClick={fetchStudents}
        style={{ 
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1em'
        }}
      >
        🔄 Refresh Data
      </button>
    </div>
  )
}

export default StudentList


