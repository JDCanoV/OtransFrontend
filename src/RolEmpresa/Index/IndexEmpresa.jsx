import React from 'react';
import './IndexEmpresa.css';  // Archivo CSS normal (no módulo)
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../../Header/HeaderLogin";
import Carga from '../../Imagenes/Carga.png';  // Ajusta la ruta según tu estructura

const IndexEmpresa = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderLogin />

      <div className="otrans-landing">
        <section className="hero">
          <div className="hero-text">
            <h2>Optimiza el Transporte de Tu Carga con Otrans</h2> 
            <p className="sub">
              Con Otrans, tu empresa podrá mejorar la eficiencia en la gestión logística, conectando con una red de transportistas disponibles en todo el país, segura, todo desde un solo lugar.
            </p>

            <div className="buttons">
              <button 
                className="btn-primary" 
                onClick={() => navigate("/RegisterEmpresa")}
              >
                Registrarte
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => navigate("/login")}
              >
                ¿Ya tienes una cuenta? Iniciar sesión
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img src={Carga} alt="Carga" />
          </div>
        </section>

        <section className="requirements">
          <h3>Beneficios clave para tu empresa</h3>
          <div className="requirements-list">
            <ul>
              <li>✓ Acceso a una red amplia de transportistas</li>
              <li>✓ Administra tus pedidos, rutas y pagos de manera fácil y eficiente a través de nuestra plataforma.</li>
              <li>✓ Obtén tarifas transparentes y servicios de calidad, optimizando costos en cada traslado.</li>
              <li>✓ La plataforma cuenta con un sistema de validación para garantizar que los transportistas cumplen con los estándares legales y técnicos.</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndexEmpresa;
