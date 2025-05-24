// src/Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/Imagenes/Otrans.png";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <button className="logo-btn" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo Otrans" className="logo-img" />
        </button>

        <div className="nav-left">
          <div className="logo">Otrans</div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/InfoEmpresa")}>
                Empresa
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => navigate("/InfoTransportista")}
              >
                Transportista
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <div className="nav-buttons">
            <button onClick={goToLogin}>Iniciar sesión</button>
            <button onClick={goToRegister}>Registrarse</button>
          </div>

          <div className="dropdown">
            <button
              className={`nav-btn dropdown-toggle ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Quiénes somos <span className="arrow-down">▼</span>
            </button>

            {isMenuOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/Ofrecemos")}
                >
                  Lo que ofrecemos
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/Ofertas")}
                >
                  Cómo funciona Otrans
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
