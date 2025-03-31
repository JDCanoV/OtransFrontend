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
     <div>
        <button onClick={goToLogin}>Iniciar sesión</button>
        <button onClick={goToRegister}>Regístrate</button>
     </div>
    </header>
  );
}

export default Header;


