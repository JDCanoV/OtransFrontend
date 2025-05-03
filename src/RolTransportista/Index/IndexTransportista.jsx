import React from 'react';
import './IndexTransportista.css';
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../../Header/HeaderLogin";
const IndexTransportista = () => {
  return (
    <>
        <HeaderLogin/>
    <div className="otrans-landing">
      <section className="hero">
        <div className="hero-text">
          <h2>Conduce</h2>
          <h2>
            hacia tu proxima <br /> oportunidad con <span>Otrans</span>
          </h2>
          <p className="sub">Recoje cargas donde estes, cuando quieras</p>
          <p className="description">
            Únete a la red de transportistas que ya están optimizando su tiempo y aumentando sus
            ingresos con la plataforma que conecta empresas con camiones disponibles en todo el país.
          </p>
          <div className="buttons">
            <button className="btn-primary">Registrarte para conducir</button>
            <button className="btn-secondary">¿Ya tienes una cuenta? Iniciar sesión</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">Imagen</div>
        </div>
      </section>

      <section className="requirements">
        <h3>Que necesitas para registrarte y disfrutar de Otrans</h3>
        <div className="requirements-list">
          <ul>
            <li>✓ Ser mayor de 18 años</li>
            <li>✓ Certificado de antecedentes (policívos o de tránsito)</li>
          </ul>
          <ul>
            <li>📄 Licencia de conducción vigente</li>
            <li>📄 Soat vigente</li>
            <li>📄 Tarjeta de propiedad del vehículo actual</li>
            <li>📄 Revisión técnico-mecánica vigentes</li>
          </ul>
        </div>
      </section>
    </div>
    </>
  );
};

export default IndexTransportista;
