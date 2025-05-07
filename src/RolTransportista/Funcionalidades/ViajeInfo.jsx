import React, { useState, useEffect } from "react";
import "./viajeinfo.css";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import GoogleMapComponent from "../../Components/googlemaps/GoogleMapComponent";
import { useAuth } from "../../context/authContext"; // Importa el contexto de autenticación

const ViajeInfo = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Usamos el hook useAuth para obtener el usuario
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCarroceria, setTipoCarroceria] = useState("");
  const [tamanoVeh, setTamanoVeh] = useState("");
  const [tipoCarga, setTipoCarga] = useState("");
  const [precio, setPrecio] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]); // Aquí almacenamos las imágenes
  const [idCarga, setIdCarga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viajeData, setViajeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar mensajes de error

  const idTransportista = user?.idUsuario; // Usamos el idUsuario del contexto

  // Función para obtener los datos del viaje desde la API
  const fetchViajeData = async () => {
    if (!idTransportista) {
      setErrorMessage("No se encontró el ID del transportista. Asegúrate de haber iniciado sesión.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/user/${idTransportista}/viaje`);
      if (response.data) {
        setViajeData(response.data);
        if (response.data.imagenes && response.data.imagenes.length > 0) {
          setImagenes(response.data.imagenes); // Almacenamos las imágenes si hay
        } else {
          setErrorMessage("No hay imágenes disponibles.");
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrorMessage("No hay viaje disponible para este transportista.");
      }
    } catch (error) {
      console.error("Error al obtener el viaje", error);
      setIsLoading(false);
      setErrorMessage("Error al cargar los datos del viaje. Intente nuevamente.");
    }
  };

  useEffect(() => {
    fetchViajeData();
  }, [idTransportista]);

  useEffect(() => {
    if (viajeData) {
      setOrigen(viajeData.origen);
      setDestino(viajeData.destino);
      setTipoCarroceria(viajeData.tipoCarroceria);
      setTamanoVeh(viajeData.tamanoVeh);
      setTipoCarga(viajeData.tipoCarga);
      setPeso(viajeData.peso);
      setDescripcion(viajeData.descripcion);
      setIdCarga(viajeData.idCarga);
      setPrecio(viajeData.precio);
    }
  }, [viajeData]);

  // Función para transformar la URL de Google Drive
  const transformDriveUrl = (url) => {
    console.log("URL recibida de Google Drive:", url); // Imprimir la URL que llega del backend

    const match = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const transformedUrl = `https://drive.google.com/thumbnail?id=${match[1]}`;
      console.log("URL transformada:", transformedUrl); // Imprimir la URL transformada
      return transformedUrl;
    } else {
      console.error("Error: La URL no tiene el formato esperado para Google Drive:", url);
      return null; // Si la URL no tiene el formato adecuado, devolvemos null
    }
  };

  return (
    <>
      <HeaderEmpresa />
      <div className="solicitar-servicio-container">
        <div className="menu">
          <label>Viaje Info</label>
        </div>

        <div className="form-and-map-container">
          {isLoading ? (
            <p>Cargando...</p>
          ) : errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            <form className="form-container">
              <div className="input-group">
                <input
                  id="startInput"
                  type="text"
                  placeholder="Ingresa origen"
                  value={origen}
                  readOnly
                />
              </div>
              <div className="input-group">
                <input
                  id="endInput"
                  type="text"
                  placeholder="Ingresa destino"
                  value={destino}
                  readOnly
                />
              </div>
              <div className="input-group">
                <select value={tipoCarroceria} disabled>
                  <option value="furgon">Furgón</option>
                  <option value="portacontenedor">Portacontenedor</option>
                  <option value="volqueta">Volqueta</option>
                  <option value="refrigerador">Refrigerador</option>
                  <option value="carrotanque">Carrotanque</option>
                  <option value="estacas">Estacas</option>
                </select>
              </div>
              <div className="input-group">
                <select value={tipoCarga} disabled>
                  <option value="Carga agrícola">Carga agrícola</option>
                  <option value="Ganado">Ganado</option>
                  <option value="Materiales de construcción">Materiales de construcción</option>
                  <option value="Electrodomésticos">Electrodomésticos</option>
                  <option value="Electrónica">Electrónica</option>
                </select>
              </div>
              <div className="input-group">
                <select value={tamanoVeh} disabled>
                  <option value="2_ejesP">2 Ejes llanta pequeña</option>
                  <option value="2_ejesG">2 Ejes llanta grande</option>
                  <option value="3_ejes">3 ó 4 Ejes</option>
                  <option value="6_ejes">5 ó 6 Ejes</option>
                </select>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Peso del cargamento (kg)"
                  value={peso}
                  readOnly
                />
              </div>
              <div className="input-group">
                <textarea
                  placeholder="Descripción del cargamento"
                  value={descripcion}
                  readOnly
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Precio estimado"
                  value={precio}
                  readOnly
                />
              </div>

              <div id="checklist" className="input-group">
                <div>
                  <input value="1" name="r" type="checkbox" id="01" />
                  <label htmlFor="01">Para Recoger</label>
                </div>
                <div>
                  <input value="2" name="r" type="checkbox" id="02" />
                  <label htmlFor="02">En Camino</label>
                </div>
                <div>
                  <input value="3" name="r" type="checkbox" id="03" />
                  <label htmlFor="03">Entregado</label>
                </div>
              </div>

              {/* Muestra las imágenes directamente desde el enlace transformado */}
              <div className="image-container">
                {imagenes && imagenes.length > 0 ? (
                  imagenes.map((image, index) => {
                    const transformedUrl = transformDriveUrl(image); // Transformamos la URL
                    return transformedUrl ? (
                      <img
                        key={index}
                        src={transformedUrl}
                        alt={`Evidencia ${index}`}
                        className="image"
                      />
                    ) : (
                      <p key={index}>Error al cargar la imagen.</p>
                    );
                  })
                ) : (
                  <p>No se encontraron imágenes disponibles.</p>
                )}
              </div>
            </form>
          )}
          <div className="map-container">
            <GoogleMapComponent
              startPoint={origen}
              endPoint={destino}
              setStartPoint={setOrigen}
              setEndPoint={setDestino}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViajeInfo;
