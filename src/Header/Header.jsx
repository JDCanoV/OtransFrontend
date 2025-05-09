// src/Header.js
import React from 'react';
import './header.css'; // Si tienes un CSS específico para el header

import { useNavigate } from 'react-router-dom';
import logo from '../../src/Imagenes/Otrans.png';
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
         <button className="logo-btn" onClick={() => navigate('/')}>
                      <img src={logo} alt="Logo Otrans" className="logo-img" />
                    </button>
        <div className="nav-left">
          <div className="logo">Otrans</div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#" className="nav-link">Empresa</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Transportista</a>
            </li>
           
          </ul>
        </div>
        <div className="nav-right">
          <div className="nav-buttons">
          
            <button onClick={goToLogin}>Iniciar sesión</button>
            <button className="signup-btn">Regístrate</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;