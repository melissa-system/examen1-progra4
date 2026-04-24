import './Navbar.css'
import { Link } from '@tanstack/react-router'

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/carparts">Repuestos</Link>
    </nav>
  )
}
export default Navbar