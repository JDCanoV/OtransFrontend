import React from "react";
import Header from "../Header/Header";
import styles from './Ofrecemos.module.css';
import sostenibilidad from '../../src/Imagenes/sostenible.jpeg';
import Grupo from '../../src/Imagenes/Grupo.png';

const Ofrecemos = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>

        {/* Imagen de portada */}
        <div className={styles.headerImage}>
          <h1 className={styles.headerTitle}>Quiénes somos</h1>
        </div>

        {/* Título con engranaje */}
        <section className={styles.intro}>
          <div className={styles.titleWithIcon}>
            <img
              src="/Ruedas.png"
              alt="Engranaje ecológico"
              className={styles.iconSpin}
            />
            <h2>Trabajamos por Colombia</h2>
          </div>
          <p className={styles.subtitle}>Conectamos carga, confianza y compromiso.</p>
        </section>

        {/* Imagen + texto sostenibilidad */}
        <section className={styles.emotiveSection}>
          <div className={styles.emotiveContent}>
            <img
              src={sostenibilidad}
              alt="Logo Otrans"
              className={styles.emotiveImage}
            />
            <div className={styles.emotiveText}>
              <h3>Sostenibilidad y eficiencia logística</h3>
              <p>
                Más del <strong>90% de la carga terrestre en Colombia</strong> se mueve por carretera. En Otrans conectamos a
                empresas con transportistas certificados, ofreciendo trazabilidad, seguridad y velocidad en los envíos. 
                Nuestra plataforma reduce tiempos de gestión en un <strong>45%</strong> y optimiza rutas mediante tecnología de geolocalización.
              </p>
              <p>
                Impulsamos un transporte responsable, promoviendo el uso de vehículos en regla y generando oportunidades económicas para cientos de conductores independientes.
              </p>
            </div>
          </div>
        </section>

        {/* Información de Otrans */}
        <section className={styles.infoOtrans}>
          <h2>Información de Otrans</h2>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
          
              <h4>Registro Seguro</h4>
              <p>Empresas y transportistas pueden registrarse en minutos. Todos los datos y documentos son verificados por nuestro equipo de soporte.</p>
            </div>
            <div className={styles.card}>
            
              <h4>Rutas Inteligentes</h4>
              <p>Visualiza rutas, cotiza precios y gestiona el estado del viaje en tiempo real. Todo desde una sola plataforma web y móvil.</p>
            </div>
            <div className={styles.card}>
            
              <h4>Pagos Digitales</h4>
              <p>Pagos 100% seguros a través de tarjeta, PSE, Nequi o Daviplata. Transportistas reciben sus ganancias directamente.</p>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className={styles.infoOtrans}>
          <h2>Nuestro Equipo</h2>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <img src={Grupo} alt="Equipo 1" />
             
            </div>
            <div className={styles.card}>
              <img src={Grupo} alt="Equipo 2" />
             
            </div>
            <div className={styles.card}>
              <img src={Grupo}alt="Equipo 3" />
             
            </div>
          </div>
          <p className={styles.textoFinal}>
            Somos una red de soluciones de transporte comprometida con conectar personas, ideas y oportunidades en todo el territorio nacional.
          </p>
        </section>
      </div>
    </>
  );
};

export default Ofrecemos;
