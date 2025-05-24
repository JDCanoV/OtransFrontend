import React from 'react';
import styles from './InfoTransportista.module.css';
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../../Header/HeaderLogin";
import Camionero from '../../Imagenes/Camionero.png';

const InfoTransportista = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderLogin/>
      <div className={styles.otransLanding}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2>Conduce</h2>
            <h2>
              hacia tu proxima <br /> oportunidad con <span>Otrans</span>
            </h2>
            <p className={styles.sub}>Recoje cargas donde estes, cuando quieras</p>
            <p className={styles.description}>
              Únete a la red de transportistas que ya están optimizando su tiempo y aumentando sus
              ingresos con la plataforma que conecta empresas con camiones disponibles en todo el país.
            </p>
            <div className={styles.buttons}>
              <button 
                className={styles.btnPrimary} 
                onClick={() => navigate("/RegisterTransportista")}
              >
                Registrarte
              </button>
              <button 
                className={styles.btnSecondary} 
                onClick={() => navigate("/login")}
              >
                ¿Ya tienes una cuenta? Iniciar sesión
              </button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src={Camionero} alt="Carro 1" className={styles.image} />
          </div>
        </section>

        <section className={styles.requirements}>
          <h3>Que necesitas para registrarte y disfrutar de Otrans</h3>
          <div className={styles.requirementsList}>
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

export default InfoTransportista;
