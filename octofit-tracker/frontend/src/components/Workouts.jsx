import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Codespace API endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts
  const codespaceUrl = `https://${process.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/workouts`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setWorkouts(Array.isArray(data.workouts) ? data.workouts : [])
        setError(null)
      } catch (err) {
        setError(err.message)
        setWorkouts([])
      } finally {
        setLoading(false)
      }
    }
    fetchWorkouts()
  }, [])

  if (loading) return <div className="component"><p>Loading workouts...</p></div>
  if (error) return <div className="component"><p style={{color:'red'}}>Error: {error}</p></div>

  return (
    <div className="component">
      <h2>Workouts</h2>
      <p>{workouts.length} workout(s)</p>
      <ul>
        {workouts.map(workout => (
          <li key={workout._id}>
            <strong>{workout.user?.name || 'Unknown'}</strong> - {workout.activity?.name || 'Unknown'} for {workout.durationMinutes} min
            <span style={{fontSize:'0.9em', color:'#666'}}> on {new Date(workout.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Workouts
