import React from 'react';
import styles from './Calificaciones.module.css';
import { useNavigate } from "react-router-dom";
import HeaderEmpresa from "../../Header/HeaderEmpresa";

const Calificaciones = () => {
  const calificaciones = [
    { estrellas: 3.5, nombre: 'Usuario 1', comentario: 'Caja para escribir un comentario del servicio' },
    { estrellas: 5, nombre: 'Usuario 2', comentario: 'Excelente servicio, muy rápido y eficiente.' },
    { estrellas: 4, nombre: 'Usuario 3', comentario: 'Buen servicio, pero algo costoso.' },
  ];

  return (
    <>
      <HeaderEmpresa />
    <div className={styles.container}>
      <h2 className={styles.title}>Calificaciones de la Empresa</h2>
      {calificaciones.map((calificacion, index) => (
        <div key={index} className={styles.calificacionCard}>
          <div className={styles.estrellas}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < calificacion.estrellas ? styles.starFilled : styles.starEmpty}>★</span>
            ))}
            <span className={styles.puntaje}>{calificacion.estrellas}</span>
          </div>
          <div className={styles.usuario}>
            <p className={styles.nombreUsuario}>{calificacion.nombre}</p>
            <textarea className={styles.comentario} defaultValue={calificacion.comentario} readOnly />
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Calificaciones;
