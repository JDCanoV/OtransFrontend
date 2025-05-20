import React, { useState } from "react";
import Header from "../Header/Header";
import styles from './Ofertas.module.css';
import Joel from '../../src/Imagenes/Joel.png';
import tatis from '../../src/Imagenes/tatis.jpeg';
import furgon from '../../src/Imagenes/furgon.jpeg';

import { useNavigate } from "react-router-dom";
const Ofertas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
 const navigate = useNavigate();
  const images = [
    "imagen1.jpg", "imagen2.jpg", "imagen3.jpg", "imagen4.jpg",
    "imagen5.jpg", "imagen6.jpg", "imagen7.jpg", "imagen8.jpg",
    "imagen9.jpg", "imagen10.jpg"
  ];

  const totalImages = images.length;
  const imagesToShow = 3; // Muestra tres imágenes a la vez

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + imagesToShow) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - imagesToShow + totalImages) % totalImages);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Ofertas de OTRANS</h2>
        <p className={styles.subtitle}>Descubre los beneficios que tenemos para Empresas y transportistas</p>

        <button className={styles.exploraButton}>EXPLORA OTRANS</button>

        <div className={styles.flotasContainer}>
          <p className={styles.flotasTitle}>Flota</p>
          <div className={styles.sliderContainer}>
            <button className={styles.arrowButton} onClick={prevImage}>
              <span>&lt;</span> {/* Flecha izquierda */}
            </button>
            <div className={styles.slider}>
              <div className={styles.imageCard}>
                <img src={Joel} alt="Carro 1" className={styles.image} />
              </div>
              <div className={styles.imageCard}>
                <img src={tatis} alt="Carro 2" className={styles.image} />
              </div>
              <div className={styles.imageCard}>
                <img src={furgon} alt="Carro 3" className={styles.image} />
              </div>
            </div>
            <button className={styles.arrowButton} onClick={nextImage}>
              <span>&gt;</span> {/* Flecha derecha */}
            </button>
          </div>
        </div>

        <div className=".registerContainer">
      <button 
        className="btn-primary" 
        onClick={() => navigate("/RegisterTransportista")}
      >
        Registrate para conducir
      </button>
      <button 
        className="btn-secondary" 
        onClick={() => navigate("/login")}
      >
        Inicia sesion 
      </button>
    </div>
      </div>
    </>
  );
};

export default Ofertas;
