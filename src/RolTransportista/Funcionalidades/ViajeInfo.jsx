import React, { useState, useEffect } from "react";
import "./viajeinfo.css";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderTrans from "../../Header/HeaderTrans";
import GoogleMapComponent from "../../Components/googlemaps/GoogleMapComponent";
import { useAuth } from "../../context/authContext";
import ModalImage from "react-modal-image";

const ViajeInfo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCarroceria, setTipoCarroceria] = useState("");
  const [tamanoVeh, setTamanoVeh] = useState("");
  const [tipoCarga, setTipoCarga] = useState("");
  const [precio, setPrecio] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [idCarga, setIdCarga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viajeData, setViajeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const idTransportista = user?.usuario?.idUsuario;

  const fetchViajeData = async () => {
    if (!idTransportista) {
      setErrorMessage(
        "No se encontró el ID del transportista. Asegúrate de haber iniciado sesión."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/Transportista/${idTransportista}/viaje`);
      console.log("Respuesta de viaje:", response.data);
      if (response.data) {
        setViajeData(response.data);
      } else {
        setErrorMessage("No hay viaje disponible para este transportista.");
      }
    } catch (error) {
      console.error("Error al obtener el viaje", error);
      setErrorMessage("Error al cargar los datos del viaje. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchViajeData();
  }, [idTransportista]);

  useEffect(() => {
    if (viajeData) {
      console.log("Datos del viaje recibidos:", viajeData);

      const imgs = Array.isArray(viajeData.imagenes)
        ? viajeData.imagenes.filter((url) => url && url.trim() !== "")
        : [];

      console.log("URLs de imágenes filtradas:", imgs);

      setImagenes(imgs);

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

  return (
    <>
      <HeaderTrans />
      <div className="solicitar-servicio-container">
        <div className="menu">
          <label>Informacion del Viaje</label>
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
                  disabled
                />
              </div>
              <div className="input-group">
                <input
                  id="endInput"
                  type="text"
                  placeholder="Ingresa destino"
                  value={destino}
                  disabled
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
                  <option value="Materiales de construcción">
                    Materiales de construcción
                  </option>
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
                  disabled
                />
              </div>
              <div className="input-group">
                <textarea
                  placeholder="Descripción del cargamento"
                  value={descripcion}
                  disabled
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Precio estimado"
                  value={precio}
                  disabled
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


              <div className="image-container">
                {imagenes.length > 0 ? (
                  imagenes.map((url, idx) => (
                    <ModalImage
                      key={idx}
                      small={url}
                      large={url}
                      alt={`Evidencia ${idx + 1}`}
                      hideDownload={false}
                      hideZoom={false}
                      showRotate={true}
                    />
                  ))
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
