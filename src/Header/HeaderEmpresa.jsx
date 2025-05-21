import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './HeaderEmpresa.css';
import logo from '../../src/Imagenes/Otrans.png';
import avatarIcon from '../../src/Imagenes/AvatarIcon.png';
import { useAuth } from "../context/authContext";

  // Asegúrate de importar el Footer aquí

const HeaderEmpresa = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const { user, logout } = useAuth();
const correo = user?.usuario?.correo;
const nombre = user?.usuario?.nombre;
const apellido = user?.usuario?.apellido;

  const navigate = useNavigate();

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="nav-left">
            <button className="logo-btn" onClick={() => navigate('/')}>
              <img src={logo} alt="Logo Otrans" className="logo-img" />
            </button>
            <button className="nav-btn" onClick={() => navigate('/solicitarServicio')}>
              Solicitar Servicio
            </button>
            <button className="nav-btn" onClick={() => navigate('/viajes')}>
              Viaje
            </button>
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

            <div className="avatar-section">
              <button className="avatar-btn" onClick={() => setIsAvatarOpen(!isAvatarOpen)}>
                <img src={avatarIcon} alt="Avatar" className="avatar-icon" />
              </button>
              {isAvatarOpen && (
                <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="avatar-header">
                    <img src={avatarIcon} alt="Avatar" className="avatar-circle" />
                    <div className="avatar-info">
                      <p className="avatar-name">
                        {nombre && apellido ? `${nombre} ${apellido}` : "Nombre no disponible"}
                      </p>
                      <p className="avatar-email">{correo || "Correo no disponible"}</p>
                    </div>
                  </div>
                  <hr />
                  <Link to="/historial-pagos" className="modal-item">Historial de Pagos</Link>
                  <Link to="/calificaciones" className="modal-item">Calificaciones</Link>
                  <Link to="/gestion-cuenta" className="modal-item">Gestión de Cuenta</Link>
                  <Link
                    to="#"
                    className="modal-item"
                    onClick={async () => {
                      await logout();  // Llamar al logout desde el AuthContext
                      navigate("/");  // Redirigir a la página de login
                    }}
                  >
                    Cerrar Sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

 
    </div>
  );
};

export default HeaderEmpresa;
