import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from '../../config/axiosConfig';
import HeaderTrans from "../../Header/HeaderTrans";
import styles from './Viaje.module.css';
import { useAuth } from "../../context/authContext";
import ModalImage from "react-modal-image"; // 👈 Importación añadida

const Viaje = () => {
  const { user } = useAuth();
  const [viajes, setViajes] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  const navigate = useNavigate();
  const idTransportista = user?.usuario?.idUsuario;

  const fetchViajes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/user/viajes-por-carroceria/${idTransportista}`);
      if (response.data) {
        if (response.data.length === 0) {
          setErrorMessage("No se encontraron viajes con el estado 4 para este transportista.");
          setErrorDetails("Este transportista no tiene viajes pendientes con estado 4.");
        } else {
          setViajes(response.data);
        }
      } else {
        setErrorMessage("No se encontraron viajes para este transportista.");
        setErrorDetails("La respuesta no contiene datos de viajes.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Error al cargar los viajes. Código de estado: ${error.response.status}`);
        setErrorDetails(`Detalles del error: ${error.response.data || error.response.statusText}`);
      } else if (error.request) {
        setErrorMessage("No se recibió respuesta del servidor.");
        setErrorDetails(`Detalles del error: ${error.request}`);
      } else {
        setErrorMessage("Hubo un problema al realizar la solicitud.");
        setErrorDetails(`Detalles del error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchViajes();
  }, [idTransportista]);

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

  const aceptarViaje = () => {
    navigate('/GuiaServicio');
  };

  if (errorMessage) {
    return (
      <>
        <HeaderTrans />
        <div className={styles.containerPrincipal}>
          <h3>Viajes Solicitados</h3>
          <p className={styles.errorMessage}>{errorMessage}</p>
          {errorDetails && <pre className={styles.errorDetails}>{errorDetails}</pre>}
        </div>
      </>
    );
  }

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

            {/* Mostrar Imágenes del Viaje */}
            <div className={styles.imagen}>
              {Array.isArray(viaje.imagenes) && viaje.imagenes.length > 0 ? (
                <div className={styles.imageGrid}>
                  {viaje.imagenes.map((url, idx) =>
                    url?.trim() !== "" ? (
                      <ModalImage
                        key={idx}
                        small={url}
                        large={url}
                        alt={`Evidencia ${idx + 1}`}
                        hideDownload={false}
                        hideZoom={false}
                        showRotate={true}
                      />
                    ) : null
                  )}
                </div>
              ) : (
                <p>No hay imágenes disponibles.</p>
              )}
            </div>

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
