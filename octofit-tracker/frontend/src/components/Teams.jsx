import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/teams`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setTeams(Array.isArray(data.teams) ? data.teams : [])
        setError(null)
      } catch (err) {
        setError(err.message)
        setTeams([])
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  if (loading) return <div className="component"><p>Loading teams...</p></div>
  if (error) return <div className="component"><p style={{color:'red'}}>Error: {error}</p></div>

  return (
    <div className="component">
      <h2>Teams</h2>
      <p>{teams.length} team(s)</p>
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <strong>{team.name}</strong>
            {team.members?.length > 0 && (
              <ul>
                {team.members.map(member => (
                  <li key={member._id}>{member.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Teams
