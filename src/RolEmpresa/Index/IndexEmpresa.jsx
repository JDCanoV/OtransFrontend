import React, { useState } from "react";
import "./IndexEmpresa.css";
import { useNavigate } from "react-router-dom";
import HeaderEmpresa from "../../Header/HeaderEmpresa";

const IndexEmpresa = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCarroceria, setTipoCarroceria] = useState("");
  const [tamanoVehiculo, setTamanoVehiculo] = useState("");

  const handleCotizar = () => {
    // Lógica para manejar la cotización aquí
    console.log("Cotizando...");
  };

  return (
    <>
      <HeaderEmpresa />
      <div className="cotizacion-container">
        <div className="form-container">
          <h2>COTIZA TU VIAJE</h2>
          <div className="input-group">
            
            <input
              type="text"
              placeholder="Ciudad de origen"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
            />
          </div>
          <div className="input-group">
            
            <input
              type="text"
              placeholder="Ciudad de destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </div>
          <div className="input-group">
  <select
    value={tipoCarroceria}
    onChange={(e) => setTipoCarroceria(e.target.value)}
  >
    <option value="" disabled selected>
      Tipo de carroseria
    </option>
    <option value="furgon">Furgón</option>
    <option value="carrotanque">Carrotanque</option>
    <option value="estacas">Estacas</option>
  </select>
</div>

          <div className="input-group">
           
            <select
              value={tamanoVehiculo}
              onChange={(e) => setTamanoVehiculo(e.target.value)}
            >
              <option value="" disabled selected>
      Tamaño de vehiculo 
    </option>
              <option value="2_ejes">2 Ejes</option>
              <option value="6_ejes">6 Ejes</option>
              <option value="3_ejes">3 Ejes</option>
            </select>
          </div>
          <button className="cotizar-btn" onClick={handleCotizar}>
            COTIZAR
          </button>
        </div>
        <div className="map-container">
          <p>Mapa</p>
        </div>
      </div>
    </>
  );
};

export default IndexEmpresa;
