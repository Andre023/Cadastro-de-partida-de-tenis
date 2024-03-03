import { Link } from "react-router-dom"
import ThemeToggle from './ThemeToggle';
import './menu.css'

const Menu = () => {
    return (
        <div className="menu-container">
            <div className="theme-toggle-container">
                <ThemeToggle />
            </div>
            <h2>Agendador de partidas</h2>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/clientes">Clientes</Link></li>
                <li><Link to="/quadras">Quadras</Link></li>
                <li><Link to="/partidas">Partidas</Link></li>
            </ul>
        </div>
    )
}

export default Menu
