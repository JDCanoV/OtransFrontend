// src/Header.js
import React from 'react';
import './header.css'; // Si tienes un CSS específico para el header

import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    };
    const goToRegister = () => {
        navigate("/register");
    };

  return (
  <header>
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">Otrans</div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#" className="nav-link">Empresa</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Seguridad</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Ayuda</a>
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
            <button onClick={goToLogin}>Iniciar sesión</button>
            <button className="signup-btn">Regístrate</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;


