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
      <nav class="navbar">
        <div class="nav-left">
          <div class="logo">Uber</div>
          <ul class="nav-menu">
            <li class="nav-item">
              <a href="#" class="nav-link">Empresa</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Seguridad</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Ayuda</a>
            </li>
          </ul>
        </div>
        <div class="nav-right">
          <div class="nav-buttons">
            <button class="language-btn">
              <i className="fas fa-globe"></i> ES
            </button>
            <button class="products-btn">
              <i className="fas fa-th"></i> Productos
            </button>
            <button onClick={goToLogin}>Iniciar sesión</button>
            <button class="signup-btn">Regístrate</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;


