import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Codespace API endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/users
  const codespaceUrl = `https://${process.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/users`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setUsers(Array.isArray(data.users) ? data.users : [])
        setError(null)
      } catch (err) {
        setError(err.message)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <div className="component"><p>Loading users...</p></div>
  if (error) return <div className="component"><p style={{color:'red'}}>Error: {error}</p></div>

  return (
    <div className="component">
      <h2>Users</h2>
      <p>{users.length} user(s)</p>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>{user.name}</strong> - {user.email}
            {user.team?.name && <span> (Team: {user.team.name})</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
