import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from '../../config/axiosConfig';  // Aquí importas tu configuración de axios
import HeaderTrans from "../../Header/HeaderTrans";
import styles from './Viaje.module.css';
import { useAuth } from "../../context/authContext";

const Viaje = () => {
  const { user } = useAuth(); // Usamos el hook useAuth para obtener el usuario
  const [viajes, setViajes] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Estado para gestionar la carga
  const [errorMessage, setErrorMessage] = useState("");  // Estado para manejar errores
  const [errorDetails, setErrorDetails] = useState("");  // Detalles del error

  const navigate = useNavigate();
  const transportistaId = 1;  // Puedes obtener este valor de tu contexto o algún otro lugar


  // Verifica que el usuario esté autenticado y que el idUsuario esté disponible
  const idTransportista = user?.idUsuario; // Usamos el idUsuario del contexto
  console.log("ID Transportista:", idTransportista); // Depuración
  // Función para obtener los viajes desde la API
  const fetchViajes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/user/viajes-por-carroceria/${idTransportista}`);
      
      // Si la respuesta tiene datos
      if (response.data) {
        if (response.data.length === 0) {
          setErrorMessage("No se encontraron viajes con el estado 4 para este transportista.");
          setErrorDetails("Este transportista no tiene viajes pendientes con estado 4.");
        } else {
          setViajes(response.data);  // Asigna los viajes obtenidos
        }
      } else {
        setErrorMessage("No se encontraron viajes para este transportista.");
        setErrorDetails("La respuesta no contiene datos de viajes.");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // Si la API responde con un error
        setErrorMessage(`Error al cargar los viajes. Código de estado: ${error.response.status}`);
        setErrorDetails(`Detalles del error: ${error.response.data || error.response.statusText}`);
      } else if (error.request) {
        // Si la solicitud fue realizada pero no hay respuesta del servidor
        setErrorMessage("No se recibió respuesta del servidor.");
        setErrorDetails(`Detalles del error: ${error.request}`);
      } else {
        // Otro tipo de error
        setErrorMessage("Hubo un problema al realizar la solicitud.");
        setErrorDetails(`Detalles del error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchViajes();
  }, [transportistaId]);  // Se ejecuta cada vez que cambie transportistaId

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
