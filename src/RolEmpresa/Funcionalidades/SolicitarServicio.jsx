// src/RolEmpresa/Funcionalidades/SolicitarServicio.jsx
import React, { useState, useRef } from "react";
import "./SolicitarServicio.css";
import { useNavigate } from "react-router-dom";
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import GoogleMapComponent from "../../Components/googlemaps/GoogleMapComponent";

const SolicitarServicio = () => {
  const navigate = useNavigate();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCarroceria, setTipoCarroceria] = useState("");
  const [tamanoVehiculo, setTamanoVehiculo] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [bonificacion, setBonificacion] = useState("");
  const [evidencias, setEvidencias] = useState([]); // arreglo de Files
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origen || !destino) {
      alert("Por favor ingresa origen y destino válidos.");
      return;
    }
    console.log({
      origen,
      destino,
      tipoCarroceria,
      tamanoVehiculo,
      peso,
      descripcion,
      bonificacion,
      evidencias,
    });
    navigate("/viajes");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const nuevas = [...evidencias, ...files].slice(0, 10);
    setEvidencias(nuevas);
    e.target.value = "";
  };

  const removeEvidencia = (idx) => {
    setEvidencias(evidencias.filter((_, i) => i !== idx));
  };

  return (
    <>
      <HeaderEmpresa />
      <div className="solicitar-servicio-container">
        <div className="menu">
          <label>Solicitar Servicio</label>
        </div>

        <div className="form-and-map-container">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                id="startInput"
                type="text"
                placeholder="Ingresa origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                id="endInput"
                type="text"
                placeholder="Ingresa destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              />
            </div>
            <div className="input-group">
              <select
                value={tipoCarroceria}
                onChange={(e) => setTipoCarroceria(e.target.value)}
              >
                <option value="" disabled>
                  Tipo de carrocería
                </option>
                <option value="furgon">Furgón</option>
                <option value="portacontenedor">Portacontenedor</option>
                <option value="volqueta">Volqueta</option>
                <option value="refrigerador">Refrigerador</option>
                <option value="carrotanque">Carrotanque</option>
                <option value="estacas">Estacas</option>
              </select>
            </div>
            <div className="input-group">
              <select
                value={tamanoVehiculo}
                onChange={(e) => setTamanoVehiculo(e.target.value)}
              >
                <option value="" disabled>
                  Tamaño de vehículo
                </option>
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
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Descripción del cargamento"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Bonificación (Opcional)"
                value={bonificacion}
                onChange={(e) => setBonificacion(e.target.value)}
              />
            </div>

            {/* Subir hasta 10 archivos */}
            <div className="input-group file-upload">
              <label>Fotos del cargamento:</label>
              <button
                type="button"
                className="button"
                disabled={evidencias.length >= 10}
                onClick={() => fileInputRef.current.click()}
              >
                <svg className="svgIcon" viewBox="0 0 384 512">
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 
                    160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 
                    45.3 0L160 141.2V448c0 17.7 14.3 32 
                    32 32s32-14.3 32-32V141.2L329.4 
                    246.6c12.5 12.5 32.8 12.5 45.3 
                    0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            {/* Lista de archivos seleccionados */}
            {evidencias.length > 0 && (
              <ul className="file-list">
                {evidencias.map((file, idx) => (
                  <li key={idx} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeEvidencia(idx)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button type="submit" className="solicitar-btn">
              SOLICITAR
            </button>
          </form>

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

export default SolicitarServicio;
