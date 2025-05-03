import "./IndexEmpresa.css";
import { useNavigate } from "react-router-dom";
import HeaderAdmi from '../../Header/HeaderAdmi';
import HeaderTrans from '../../Header/HeaderTrans';
import HeaderEmpresa from '../../Header/HeaderEmpresa';
import React, { useEffect, useState } from "react";

const IndexEmpresa = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCarroceria, setTipoCarroceria] = useState("");
  const [tamanoVehiculo, setTamanoVehiculo] = useState("");
  const [role, setRole] = useState(null); // Inicializamos el role como null

  useEffect(() => {
    // Obtienes el idRol desde el localStorage (guardo el idRol después de login)
    const userRole = localStorage.getItem("idRol");
    if (userRole) {
      setRole(userRole); // Asignamos el valor del rol
    }
  }, []);

  const handleCotizar = () => {
    // Lógica para manejar la cotización aquí
    console.log("Cotizando...");
  };

  // Si el rol no está definido o cargado, no mostramos nada (o podemos mostrar un loader)
  if (role === null) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {/* Solo se muestra el header correspondiente si el role está definido */}
      {role === "1" && <HeaderAdmi />} {/* Para Admin */}
      {role === "2" && <HeaderTrans />} {/* Para Transportista */}
      {role === "3" && <HeaderEmpresa />} {/* Para Empresa */}
      
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
              <option value="" disabled>
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
              <option value="" disabled>
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