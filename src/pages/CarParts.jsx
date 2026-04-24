import './CarParts.css'
import { useState, useEffect } from 'react'

function CarParts() {
  const [parts, setParts] = useState([])
  const [visible, setVisible] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL, {
      headers: {
        'X-Access-Key': import.meta.env.VITE_JSONBIN_ACCESS_KEY
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar los datos')
        return res.json()
      })
      .then(data => {
        setParts(data.record.articles)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered = parts.filter(part =>
    part.articleNo.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', color:'#fff' }}>
      <div style={{ width:'48px', height:'48px', border:'4px solid #374151', borderTopColor:'#6d28d9', borderRadius:'50%', animation:'spin 0.8s linear infinite', marginBottom:'1rem' }}></div>
      <p style={{ color:'#9ca3af' }}>Cargando repuestos desde la API...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (error) return <p style={{ color:'#fff', textAlign:'center', marginTop:'2rem' }}>Error: {error}</p>

  return (
    <main className="carparts">
      <h2>Repuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre o código..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p>No se encontraron repuestos.</p>
      ) : (
        <>
          <ul>
            {filtered.slice(0, visible).map((part, index) => (
              <li key={index}>
                <img src={part.s3image} alt={part.articleProductName} />
                <p>{part.articleNo}</p>
                <p>{part.articleProductName}</p>
                <p>{part.supplierName}</p>
              </li>
            ))}
          </ul>
          {visible < filtered.length && (
            <button onClick={() => setVisible(visible + 10)}>
              Ver más ({filtered.length - visible} restantes)
            </button>
          )}
        </>
      )}
    </main>
  )
}

export default CarParts