import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../config/axiosConfig"; // Asegúrate de tener configurado axios
import './detalle.css';
import HeaderEmpresa from "../../Header/HeaderEmpresa";

const Detalle = () => {
  const { idViaje } = useParams(); // Obtener el idViaje de la URL
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const obtenerViaje = async () => {
      try {
        // Obtener los viajes
        const user = JSON.parse(sessionStorage.getItem("user"));
        const idUsuario = user?.usuario?.idUsuario;  // Obtener el idUsuario del sessionStorage
        
        if (!idUsuario) {
          console.error("No se encontró el idUsuario en los datos del usuario");
          return;
        }

        const response = await axios.get(`/User/listarViaje/${idUsuario}`); // Obtener todos los viajes
        const viajeEncontrado = response.data.find(viaje => viaje.idViaje === parseInt(idViaje)); // Buscar el viaje con el id
        setDetalle(viajeEncontrado); // Establecer los datos del viaje
      } catch (error) {
        console.error("Error al obtener el viaje", error);
      }
    };

    obtenerViaje();
  }, [idViaje]); // Ejecutar cuando cambie el idViaje

  if (!detalle) {
    return <p>Viaje no encontrado...</p>;
  }

  // Mapeo de los nombres legibles de los campos
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
              {key === 'peso' ? `${detalle[key] !== null && detalle[key] !== undefined ? detalle[key] : 'N/A'} kilogramos` :
              key === 'distancia' ? `${detalle[key] !== null && detalle[key] !== undefined ? detalle[key] : 'N/A'} kilómetros` :
              detalle[key] !== null && detalle[key] !== undefined ? detalle[key] : 'N/A'}
            </label>
          </React.Fragment>
          
          ))}
        </div>
      </div>
    </>
  );
};

export default Detalle;
