import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../config/axiosConfig";
import './detalle.css';
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import ModalImage from "react-modal-image";

const Detalle = () => {
  const { idViaje } = useParams();
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const obtenerViaje = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const idUsuario = user?.usuario?.idUsuario;

        if (!idUsuario) {
          console.error("No se encontró el idUsuario en los datos del usuario");
          return;
        }

        const response = await axios.get(`/Empresa/listarViaje/${idUsuario}`);
        const viajeEncontrado = response.data.find(
          (viaje) => viaje.idViaje === parseInt(idViaje)
        );
        setDetalle(viajeEncontrado);
      } catch (error) {
        console.error("Error al obtener el viaje", error);
      }
    };

    obtenerViaje();
  }, [idViaje]);

  if (!detalle) {
    return <p>Viaje no encontrado...</p>;
  }

  return (
    <>
      <HeaderEmpresa />
      <div className="detalle-container">
        <h1>Detalles del Viaje</h1>
        <div className="detalles">
          <div className="container-izq">
            <div className="detalle-item">
              <span className="emoji">⛟</span>
              <span className="campo">ID del Viaje:</span>
              <span className="valor">{detalle.idViaje}</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">🗺</span>
              <span className="campo">Origen:</span>
              <span className="valor">{detalle.origen}</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">📍</span>
              <span className="campo">Destino:</span>
              <span className="valor">{detalle.destino}</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">📅</span>
              <span className="campo">Fecha de Recolección:</span>
              <span className="valor">{detalle.fecha}</span>
            </div>
          </div>

          <div className="container-der">
            <div className="detalle-item">
              <span className="emoji">↔</span>
              <span className="campo">Distancia:</span>
              <span className="valor">{detalle.distancia} km</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">⚖</span>
              <span className="campo">Peso:</span>
              <span className="valor">{detalle.peso} kg</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">🚚</span>
              <span className="campo">Tipo de Carrocería:</span>
              <span className="valor">{detalle.tipoCarroceria}</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">📦</span>
              <span className="campo">Tipo de Carga:</span>
              <span className="valor">{detalle.tipoCarga || "N/A"}</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">🚙</span>
              <span className="campo">Tamaño del Vehículo:</span>
              <span className="valor">{detalle.tamanoVeh || "N/A"}</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">📝</span>
              <span className="campo">Descripción:</span>
              <span className="valor">{detalle.descripcion || "N/A"}</span>
            </div>
            <div className="detalle-item">
              <span className="emoji">🧑‍✈</span>
              <span className="campo">Transportista:</span>
              <span className="valor">{detalle.nombreTransportista}</span>
            </div>
          </div>
        </div>

        <h2>Fotos</h2>
        <div className="imagenes-container">
          {Array.isArray(detalle.imagenes) && detalle.imagenes.length > 0 ? (
            <div className="imagenes-content">
              {detalle.imagenes.map((url, idx) => (
                <ModalImage
                  key={idx}
                  small={url}
                  large={url}
                  alt={`Evidencia ${idx + 1}`}
                  hideDownload={false}
                  hideZoom={false}
                  showRotate={true}
                />
              ))}
            </div>
          ) : (
            <p>No se encontraron imágenes disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Detalle;
