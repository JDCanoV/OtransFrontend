import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import styles from './Ofrecemos.module.css';


const Ofrecemos= () => {
  return ( 
  <>
      <HeaderEmpresa />
    
    <div className={styles.container}>
      {/* Imagen de portada */}
      <div className={styles.headerImage}>
        <h1 className={styles.headerTitle}>Quiénes somos</h1>
      </div>

      {/* Sección introductoria */}
      <section className={styles.intro}>
        <h2>Trabajamos por Colombia y la movilidad sostenible</h2>
        <p>
          Movilizamos comunidades con compromiso, pasión y responsabilidad. Somos Otrans, y creemos que cada kilómetro debe ser una oportunidad de cambio. Nos impulsa el futuro del transporte limpio, seguro y humano.
        </p>
      </section>

      {/* Sección de columnas con imagen y texto */}
      <section className={styles.columnSection}>
        <div className={styles.column}>
          <img src="/imagenes/Camionero.png" alt="Imagen Colombia" />
          <p>Comprometidos con el país y sus regiones. Transportamos progreso con cada viaje.</p>
        </div>
        <div className={styles.column}>
          <img src="/imagenes/Camionero.png" alt="Sostenibilidad" />
          <p>Sostenibilidad como pilar de nuestro futuro. Operamos con responsabilidad ambiental.</p>
        </div>
      </section>

      {/* Sección de información de Otrans */}
      <section className={styles.infoOtrans}>
        <h2>Información de Otrans</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>IMAGEN 1</div>
          <div className={styles.card}>IMAGEN 2</div>
          <div className={styles.card}>IMAGEN 3</div>
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
