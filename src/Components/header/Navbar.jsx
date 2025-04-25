import React from "react";
import { Link } from "react-router-dom"; // Usamos Link de react-router-dom para manejar rutas
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"; // Agregamos el CDN aquí

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">Uber</div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Empresa</Link>
          </li>
          <li className="nav-item">
            <Link to="/security" className="nav-link">Seguridad</Link>
          </li>
          <li className="nav-item">
            <Link to="/help" className="nav-link">Ayuda</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <div className="nav-buttons">
          <button className="language-btn">
            <i className="fas fa-globe"></i> ES
          </button>
          <button className="products-btn">
            <i className="fas fa-th"></i> Productos
          </button>
          <button className="login-btn">Iniciar sesión</button>
          <button className="signup-btn">Regístrate</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
