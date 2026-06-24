import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/leaderboard`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setLeaderboard(Array.isArray(data.leaderboard) ? data.leaderboard : [])
        setError(null)
      } catch (err) {
        setError(err.message)
        setLeaderboard([])
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [])

  if (loading) return <div className="component"><p>Loading leaderboard...</p></div>
  if (error) return <div className="component"><p style={{color:'red'}}>Error: {error}</p></div>

  return (
    <div className="component">
      <h2>Leaderboard</h2>
      <p>{leaderboard.length} team(s) ranked</p>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th style={{border:'1px solid #ccc', padding:'8px'}}>Rank</th>
            <th style={{border:'1px solid #ccc', padding:'8px'}}>Team</th>
            <th style={{border:'1px solid #ccc', padding:'8px'}}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(entry => (
            <tr key={entry._id}>
              <td style={{border:'1px solid #ccc', padding:'8px'}}>{entry.rank}</td>
              <td style={{border:'1px solid #ccc', padding:'8px'}}>{entry.team?.name || 'Unknown'}</td>
              <td style={{border:'1px solid #ccc', padding:'8px'}}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
