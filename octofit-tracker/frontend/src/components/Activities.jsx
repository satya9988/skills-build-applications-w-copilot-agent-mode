import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Codespace API endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/activities
  const codespaceUrl = `https://${process.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/activities`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setActivities(Array.isArray(data.activities) ? data.activities : [])
        setError(null)
      } catch (err) {
        setError(err.message)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }
    fetchActivities()
  }, [])

  if (loading) return <div className="component"><p>Loading activities...</p></div>
  if (error) return <div className="component"><p style={{color:'red'}}>Error: {error}</p></div>

  return (
    <div className="component">
      <h2>Activities</h2>
      <p>{activities.length} activity(ies)</p>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th style={{border:'1px solid #ccc', padding:'8px'}}>Name</th>
            <th style={{border:'1px solid #ccc', padding:'8px'}}>Type</th>
            <th style={{border:'1px solid #ccc', padding:'8px'}}>Cal/Hour</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity._id}>
              <td style={{border:'1px solid #ccc', padding:'8px'}}>{activity.name}</td>
              <td style={{border:'1px solid #ccc', padding:'8px'}}>{activity.type}</td>
              <td style={{border:'1px solid #ccc', padding:'8px'}}>{activity.caloriesPerHour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
