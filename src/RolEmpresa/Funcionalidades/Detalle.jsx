import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../config/axiosConfig";
import './detalle.css';
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import ModalImage from "react-modal-image"; // Importar para mostrar imágenes

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

        const response = await axios.get(`/User/listarViaje/${idUsuario}`);
        const viajeEncontrado = response.data.find(
          (viaje) => viaje.idViaje === parseInt(idViaje)
        );

        setDetalle(viajeEncontrado);

        // Logs para depuración
        console.log("Detalle completo:", viajeEncontrado);
        console.log("Imágenes encontradas:", viajeEncontrado?.imagenes); // Cambiar aquí si viene anidado
      } catch (error) {
        console.error("Error al obtener el viaje", error);
      }
    };

    obtenerViaje();
  }, [idViaje]);

  if (!detalle) {
    return <p>Viaje no encontrado...</p>;
  }

  const campos = {
    idViaje: "ID del Viaje",
    destino: "Destino",
    origen: "Origen",
    distancia: "Distancia",
    fecha: "Fecha",
    idEstado: "Estado",
    idCarga: "ID Carga",
    idTransportista: "ID Transportista",
    peso: "Peso",
    tipoCarroceria: "Tipo de Carrocería",
    tipoCarga: "Tipo de Carga",
    tamanoVeh: "Tamaño del Vehículo",
    descripcion: "Descripción",
    nombreTransportista: "Transportista"
  };

  return (
    <>
      <HeaderEmpresa />
      <div className="detalle-container">
        <h1>Detalles del Viaje</h1>
        <div className="formulario-detalle">
          {Object.keys(campos).map((key) => (
            <React.Fragment key={key}>
              <label>{campos[key]}:</label>
              <label className="campo">
                {key === 'peso'
                  ? `${detalle[key] !== null && detalle[key] !== undefined ? detalle[key] : 'N/A'} kilogramos`
                  : key === 'distancia'
                  ? `${detalle[key] !== null && detalle[key] !== undefined ? detalle[key] : 'N/A'} kilómetros`
                  : detalle[key] !== null && detalle[key] !== undefined
                  ? detalle[key]
                  : 'N/A'}
              </label>
            </React.Fragment>
          ))}

          {/* 📸 Mostrar imágenes si existen */}
          <div className="image-container">
            {Array.isArray(detalle.imagenes) && detalle.imagenes.length > 0 ? (
              detalle.imagenes.map((url, idx) =>
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
              )
            ) : (
              <p>No hay imágenes disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detalle;
