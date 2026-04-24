import { useState, useEffect } from 'react'

function CarParts() {
  const [parts, setParts] = useState([])
  const [visible, setVisible] = useState(10)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL, {
      headers: {
        'X-Access-Key': import.meta.env.VITE_JSONBIN_ACCESS_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setParts(data.record.articles)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando repuestos desde la API...</p>

  return (
    <main>
      <h2>Repuestos</h2>
      <ul>
        {parts.slice(0, visible).map((part, index) => (
          <li key={index}>{part.articleNo} - {part.supplierName}</li>
        ))}
      </ul>
      {visible < parts.length && (
        <button onClick={() => setVisible(visible + 10)}>
          Ver más ({parts.length - visible} restantes)
        </button>
      )}
    </main>
  )
}

export default CarParts