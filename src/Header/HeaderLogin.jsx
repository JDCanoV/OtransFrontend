import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './HeaderLogin.css'; // Asegúrate de importar el CSS
import logo from '../../src/Imagenes/Otrans.png'; // Importa la imagen

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const navigate = useNavigate();
  return (
    <header className="headerl">
      <div className="logo-container">
        {/* Usa Link para hacer el logo clickeable y redirigir */}
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo Otrans" className="logo" />
        </Link>
      </div>
      <div className="slogan-container">
        <p className="slogan">Movilizamos al mundo, es nuestra esencia, está en nuestras venas.</p>
      </div>
      <div className="nav-right">
            <div className="dropdown">
              <button
                className={`nav-btn dropdown-toggle ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Quiénes somos <span className="arrow-down">▼</span>
              </button>

              {isMenuOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => navigate('/Ofrecemos')}>
                    Lo que ofrecemos
                  </button>
                  <button className="dropdown-item" onClick={() => navigate('/Ofertas')}>
                    Cómo funciona Otrans
                  </button>
                </div>
              )}
            </div>
            </div>
      
    </header>
    
  );
};

export default Header;
