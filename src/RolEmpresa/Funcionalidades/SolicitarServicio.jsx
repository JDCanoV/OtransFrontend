import React, { useState } from "react";
import "./SolicitarServicio.css"; // Asegúrate de importar el CSS correspondiente
import { useNavigate } from "react-router-dom";
import HeaderEmpresa from "../../Header/HeaderEmpresa";

const SolicitarServicio = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCarroceria, setTipoCarroceria] = useState("");
  const [tamanoVehiculo, setTamanoVehiculo] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [bonificacion, setBonificacion] = useState("");

  const handleSubmit = () => {
    // Lógica para manejar el envío del formulario
    console.log("Formulario enviado");
  };

  return (
    <>
      <HeaderEmpresa />
      <div className="solicitar-servicio-container">
     
          <div className="menu">
            <label>Solicitar Servicio</label>
          </div>
         
         
         
        

        <div className="form-and-map-container">
          <div className="form-container">
            <div className="input-group">
              <label></label>
              <input
                type="text"
                placeholder="Ingresa origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label></label>
              <input
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
                 <option value="" disabled selected>
      Tipo de carroseria
    </option>
                <option value="furgon">Furgón</option>
                <option value="portacontenedor">Portacontenedor</option>
                <option value="Volqueta">Volqueta</option>
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
                 <option value="" disabled selected>
      Tamaño de vehiculo
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
                placeholder="Ingrese peso del cargamento (kilogramos) "
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>

            <div className="input-group">
             
              <textarea
                placeholder="Ingresa descripción del cargamento"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="input-group">
              
              <input
                type="text"
                placeholder="Ingresa bonificación (Opcional)"
                value={bonificacion}
                onChange={(e) => setBonificacion(e.target.value)}
              />
            </div>

            <button className="solicitar-btn" onClick={handleSubmit}>
              SOLICITAR
            </button>
          </div>

          <div className="map-container">
            <div className="file-upload">
              <label>Evidencias del cargamento</label>
              <button className="cargar-btn">CARGAR</button>
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
};

export default SolicitarServicio;
