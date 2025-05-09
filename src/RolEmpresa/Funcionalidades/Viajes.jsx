import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig"; // Ya incluye el token con el interceptor
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import styles from './Viajes.module.css';

const Viajes = () => {
  const [vistaActual, setVistaActual] = useState('solicitados');
  const [viajes, setViajes] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [viajeAEliminar, setViajeAEliminar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viajeEnModal, setViajeEnModal] = useState(null);
  const [estadoViaje, setEstadoViaje] = useState("recoleccion");
  const [calificacion, setCalificacion] = useState(0);
  const [reseña, setReseña] = useState("");
  const navigate = useNavigate();

  // ✅ Traer datos del backend
  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const idUsuario = user?.usuario?.idUsuario;  // Obtener el idUsuario del sessionStorage

        console.log("idUsuario desde sessionStorage:", idUsuario);
        
        if (!idUsuario) {
          console.error("No se encontró el idUsuario en los datos del usuario");
          return;
        }

        const response = await axios.get(`/User/listarViaje/${idUsuario}`);  // Pasamos el idUsuario como parámetro a la API
        console.log("🔄 Datos de viajes recibidos:", response.data);

        const viajesDesdeApi = response.data.map(v => ({
          id: v.idViaje,
          origen: v.origen,
          destino: v.destino,
          estado: mapearEstado(v.idEstado),
          transportista: v.idTransportista || "Por definir",
          nombreT: v.nombreTransportista,
          estadoVisible: false
        }));

        setViajes(viajesDesdeApi);
      } catch (error) {
        console.error("Error al obtener viajes", error);
      }
    };

    obtenerViajes();
  }, []); // Se ejecuta una vez cuando el componente se monta

  // Asocia los valores de los estados a sus respectivos nombres
  const mapearEstado = (idEstado) => {
    switch (idEstado) {
      case 4: return "solicitados";    // Estado 2 es Solicitado
      case 5: return "aceptados";      // Estado 3 es Aceptado
      case 6: return "recoleccion";   // Estado 4 es Recolección
      case 7: return "encamino";      // Estado 5 es En Camino
      case 8: return "finalizado";    // Estado 6 es Finalizado
      default: return "pendiente";    // Cualquier otro valor es pendiente
    }
  };

  const confirmarCancelar = (viajeId) => {
    setViajeAEliminar(viajeId);
    setMostrarConfirmacion(true);
  };

  const cancelarEliminacion = () => setMostrarConfirmacion(false);

  const eliminarViaje = () => {
    setViajes(viajes.filter((viaje) => viaje.id !== viajeAEliminar));
    setMostrarConfirmacion(false);
    if (indiceActual >= viajes.length - 1) {
      setIndiceActual(Math.max(0, viajes.length - 2));
    }
  };

  const verMas = (viajeId) => navigate(`/detalle/${viajeId}`);

  const abrirModalEstado = (viaje) => {
    setViajeEnModal(viaje);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setViajeEnModal(null);
  };

  const guardarCalificacion = () => {
    console.log("Calificación guardada:", calificacion, reseña);
    setModalVisible(false);
  };

  if (viajes.length === 0) {
    return (
      <>
        <HeaderEmpresa />
        <div className={styles.containerPrincipal}>
          <h3>Viajes Solicitados</h3>
          <p>No hay viajes solicitados para tu empresa.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderEmpresa />
      <div className={styles.containerPrincipal}>
        <h3>Viajes Solicitados</h3>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tabButton} ${vistaActual === 'solicitados' ? styles.activeTab : ''}`} onClick={() => setVistaActual('solicitados')}>
            Viajes Solicitados
          </button>
          <button className={`${styles.tabButton} ${vistaActual === 'aceptados' ? styles.activeTab : ''}`} onClick={() => setVistaActual('aceptados')}>
            Viajes Aceptados
          </button>
          <button className={`${styles.tabButton} ${vistaActual === 'estados' ? styles.activeTab : ''}`} onClick={() => setVistaActual('estados')}>
            Estados de mi servicio
          </button>
        </div>

        {/* Contenido de la vista seleccionada */}
        <div className={styles.content}>
          {vistaActual === 'solicitados' && (
            <div className={styles.viajesContainer}>
              {viajes.filter(viaje => viaje.estado === "solicitados").map((viaje) => (
                <div key={viaje.id} className={styles.card}>
                  <p className={styles.titulo}>Viaje {viaje.id}</p>
                  
                  <p className={styles.origenDestino}>Origen:</p>
                  <div className={styles.labelInfo}>{viaje.origen || "Por definir..."}</div>
                  <p className={styles.origenDestino}>Destino:</p>
                  <div className={styles.labelInfo}>{viaje.destino || "Por definir..."}</div>
                  <div className={styles.botones}>
                    <button className={styles.cancelar} onClick={() => confirmarCancelar(viaje.id)}>Cancelar</button>
                    <button className={styles.verMas} onClick={() => verMas(viaje.id)}>Ver más..</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {vistaActual === 'aceptados' && (
            <div className={styles.viajesContainer}>
            {viajes.filter(viaje => viaje.estado === "aceptados").map((viaje) => (
              <div key={viaje.id} className={styles.card}>
                <p className={styles.titulo}>Viaje {viaje.id}</p>
                
          
                {/* Mostrar Origen y Destino con el texto antes */}
                <div className={styles.labelInfo}>
                  <strong>Origen:</strong> {viaje.origen || "Por definir..."}
                </div>
                <div className={styles.labelInfo}>
                  <strong>Destino:</strong> {viaje.destino || "Por definir..."}
                </div>
                <div className={styles.labelInfo}>
                  <strong>Transportista:</strong> {viaje.nombreT || "Por definir..."}
                </div>
          
                <div className={styles.botones}>
                  <button className={styles.verEstado} onClick={() => abrirModalEstado(viaje)}>
                    Ver estado de mi viaje
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          )}
          {vistaActual === 'estados' && (
            <div className={styles.estadoContainer}>
              {/* Recolección */}
              <div className={styles.estadoBox}>
                <div className={styles.estadoHeader}>Recolección</div>
                {viajes.filter(viaje => viaje.estado === "recoleccion").map((viaje) => (
                  <div key={viaje.id} className={styles.estadoCard}>
                    <p>id viaje: {viaje.id}</p>
                    <p>Transportista: {viaje.nombreT || "Por definir"}</p>
                  </div>
                ))}
              </div>

              {/* En camino */}
              <div className={styles.estadoBox}>
                <div className={styles.estadoHeader}>En camino</div>
                {viajes.filter(viaje => viaje.estado === "encamino").map((viaje) => (
                  <div key={viaje.id} className={styles.estadoCard}>
                    <p>id viaje: {viaje.id}</p>
                    <p>Transportista: {viaje.transportista || "Por definir"}</p>
                    <p>Valor: {viaje.valor || "Por definir"}</p>
                  </div>
                ))}
              </div>

              {/* Finalizado */}
              <div className={styles.estadoBox}>
                <div className={styles.estadoHeader}>Finalizado</div>
                {viajes.filter(viaje => viaje.estado === "finalizado").map((viaje) => (
                  <div key={viaje.id} className={styles.estadoCard}>
                    <p>id viaje: {viaje.id}</p>
                    <p>Transportista: {viaje.transportista || "Por definir"}</p>
                    <p>Valor: {viaje.valor || "Por definir"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {vistaActual === 'calificaciones' && <p>No hay calificaciones disponibles.</p>}
        </div>
      </div>

      {/* Modal de estado del viaje */}
      {modalVisible && viajeEnModal && (
        <div className={styles.popupOverlay}>
          <div className={styles.estadoModal}>
            <button className={styles.cerrarModal} onClick={cerrarModal}>✖</button>
            <p className={styles.titulo}>Conoce el estado de tu viaje</p>
            <div className={styles.imagenAceptado}>
              <img src="/camion.png" alt="Camión" className={styles.imagenCamion} />
            </div>

            <div className={styles.verEstado}>Información</div>
            <div className={styles.estadoViaje}>
              <span>Recolección</span>
              <span>En camino</span>
              <span>Finalizado</span>
            </div>
            <div className={styles.radioContainer}>
              <label>
                <input
                  type="radio"
                  name="estado"
                  value="recoleccion"
                  checked={estadoViaje === "recoleccion"}
                  onChange={() => setEstadoViaje("recoleccion")}
                />
              </label>
              <label>
                <input
                  type="radio"
                  name="estado"
                  value="encamino"
                  checked={estadoViaje === "encamino"}
                  onChange={() => setEstadoViaje("encamino")}
                />
              </label>
              <label>
                <input
                  type="radio"
                  name="estado"
                  value="finalizado"
                  checked={estadoViaje === "finalizado"}
                  onChange={() => setEstadoViaje("finalizado")}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Calificación cuando el estado es "Finalizado" */}
      {estadoViaje === 'finalizado' && modalVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.estadoModal}>
            <button className={styles.cerrarModal} onClick={cerrarModal}>✖</button>
            <p className={styles.titulo}>Califica tu experiencia</p>

            <div className={styles.estrellas}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={styles.star}
                  onClick={() => setCalificacion(star)}
                  style={{ color: star <= calificacion ? 'gold' : 'gray' }}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className={styles.reseñaInput}
              placeholder="Escribe tu reseña..."
              value={reseña}
              onChange={(e) => setReseña(e.target.value)}
            />

            <button className={styles.guardarBtn} onClick={guardarCalificacion}>
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Popup de confirmación */}
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
    </>
  );
};

export default Viajes;
