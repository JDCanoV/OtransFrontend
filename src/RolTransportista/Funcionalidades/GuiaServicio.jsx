import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './GuiaServicio.module.css';
import HeaderTrans from "../../Header/HeaderTrans";
const GuiaServicio = () => {
  const [estado, setEstado] = useState("Recoleccion");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [reseña, setReseña] = useState("");
  const [estadoViaje, setEstadoViaje] = useState("recoleccion");

  const navigate = useNavigate();

  const actualizarEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
    if (nuevoEstado === "Finalizado") {
      setMostrarModal(true);
    }
  };

  const manejarCalificacion = (valor) => {
    setCalificacion(valor);
  };

  const manejarComentario = (e) => {
    setComentario(e.target.value);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const guardarCalificacion = () => {
    console.log("Calificación guardada:", calificacion, reseña);
    setMostrarModal(false);
  };

  return (
    <>
        <HeaderTrans />
    <div className={styles.container}>
      <h3>Viaje 1</h3>

      <div className={styles.infoViaje}>
        <div className={styles.infoLeft}>
          <p><strong>Empresa:</strong> Empresa ABC</p>
          <p><strong>Nombre Representante:</strong> Juan Pérez</p>
          <p><strong>Número:</strong> 123456789</p>
          <p><strong>Precio:</strong> $500</p>
          <p><strong>Tipo de carga:</strong> Fragile</p>
          <div className={styles.fotosCarga}>
  <h4>Fotos de la carga</h4>
  <div className={styles.galeriaCarga}>
    {/* Aquí luego insertarás las imágenes */}
    {/* <img src="/ruta/imagen1.jpg" alt="Carga 1" /> */}
  </div>
</div>

        </div>

        <div className={styles.mapa}>
          <p>Mapa</p>
        </div>
      </div>

      <div className={styles.estadoViaje}>
  <h4 className={styles.estadoTitulo}>Estado de Viaje</h4>
  <div className={styles.radioEstadosVertical}>
    {["Recoleccion", "En camino", "Finalizado"].map((item) => (
      <label key={item} className={styles.estadoOption}>
        <input
          type="radio"
          name="estado"
          value={item}
          checked={estado === item}
          onChange={() => actualizarEstado(item)}
        />
        <span className={`${styles.radioCustom} ${estado === item ? styles.activo : ""}`}></span>
        <span className={styles.estadoLabel}>{item}</span>
      </label>
    ))}
  </div>
</div>


      {/* Modal de calificación */}
      {estado === "Finalizado" && mostrarModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.estadoModal}>
            <button className={styles.cerrarModal} onClick={cerrarModal}>✖</button>
            <p className={styles.titulo}>Califica tu experiencia</p>

            <div className={styles.estrellas}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={styles.star}
                  onClick={() => manejarCalificacion(star)}
                  style={{ color: star <= calificacion ? 'gold' : 'gray', fontSize: '2rem', cursor: 'pointer' }}
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

      {/* Modal de estado del viaje */}
      {estadoViaje === "finalizado" && (
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
    </div>
    </>
  );
};

export default GuiaServicio;
