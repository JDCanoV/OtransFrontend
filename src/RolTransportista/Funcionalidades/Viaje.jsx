import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import HeaderTrans from "../../Header/HeaderTrans";
import styles from './Viaje.module.css';

const Viaje = () => {
  const [viajes, setViajes] = useState([
    { 
      id: 1, 
      origen: "", 
      destino: "", 
      empresa: "", 
      precio: "", 
      tipoCarga: ""
    },
    { 
      id: 2, 
      origen: "", 
      destino: "", 
      empresa: "", 
      precio: "", 
      tipoCarga: "" 
    },
    { 
      id: 3, 
      origen: "", 
      destino: "", 
      empresa: "", 
      precio: "", 
      tipoCarga: "" 
    },
    { 
      id: 4, 
      origen: "", 
      destino: "", 
      empresa: "", 
      precio: "", 
      tipoCarga: "" 
    },
    { 
      id: 5, 
      origen: "", 
      destino: "", 
      empresa: "", 
      precio: "", 
      tipoCarga: "" 
    },
  ]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const navigate = useNavigate();  // Hook para la redirección

  const siguienteViaje = () => {
    if (indiceActual < viajes.length - 1) {
      setIndiceActual(indiceActual + 1);
    }
  };

  const anteriorViaje = () => {
    if (indiceActual > 0) {
      setIndiceActual(indiceActual - 1);
    }
  };

  const confirmarCancelar = () => {
    setMostrarConfirmacion(true);
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(false);
  };

  const eliminarViaje = () => {
    const nuevosViajes = viajes.filter((_, idx) => idx !== indiceActual);
    setViajes(nuevosViajes);
    setMostrarConfirmacion(false);
    if (indiceActual >= nuevosViajes.length) {
      setIndiceActual(Math.max(0, nuevosViajes.length - 1));
    }
  };

  // Función para redirigir al hacer clic en "Aceptar"
  const aceptarViaje = () => {
    navigate('/GuiaServicio');  // Redirige a la ruta '/guia-servicio'
  };

  if (viajes.length === 0) {
    return (
      <>
        <HeaderTrans />
        <div className={styles.containerPrincipal}>
          <h3>Viajes Solicitados</h3>
          <p>No hay viajes solicitados.</p>
        </div>
      </>
    );
  }

  const viaje = viajes[indiceActual];

  return (
    <>
      <HeaderTrans />
      <div className={styles.containerPrincipal}>
        <h3>Viajes Solicitados</h3>

        <div className={styles.carruselUnico}>
          <button
            className={styles.arrowLeft}
            onClick={anteriorViaje}
            disabled={indiceActual === 0}
          >
            ←
          </button>

          <div className={styles.card}>
            <p className={styles.titulo}>Viaje {viaje.id}</p>
            <div className={styles.imagen}>Imagen carga</div>

            <p className={styles.origenDestino}>Origen:</p>
            <div className={styles.labelInfo}>{viaje.origen || "Por definir..."}</div>

            <p className={styles.origenDestino}>Destino:</p>
            <div className={styles.labelInfo}>{viaje.destino || "Por definir..."}</div>

            <p className={styles.origenDestino}>Empresa:</p>
            <div className={styles.labelInfo}>{viaje.empresa || "Por definir..."}</div>

            <p className={styles.origenDestino}>Precio:</p>
            <div className={styles.labelInfo}>{viaje.precio || "Por definir..."}</div>

            <p className={styles.origenDestino}>Tipo de carga:</p>
            <div className={styles.labelInfo}>{viaje.tipoCarga || "Por definir..."}</div>

            <div className={styles.botones}>
              <button className={styles.cancelar} onClick={confirmarCancelar}>
                Cancelar
              </button>
              <button className={styles.Aceptar} onClick={aceptarViaje}>Aceptar</button>
            </div>
          </div>

          <button
            className={styles.arrowRight}
            onClick={siguienteViaje}
            disabled={indiceActual === viajes.length - 1}
          >
            →
          </button>
        </div>

        {mostrarConfirmacion && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <p>¿Seguro que desea cancelar la solicitud?</p>
              <div className={styles.popupButtons}>
                <button className={styles.si} onClick={eliminarViaje}>Sí</button>
                <button className={styles.no} onClick={cancelarEliminacion}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Viaje;
