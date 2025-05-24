import React from "react";
import { useNavigate } from "react-router-dom";
import "./registerselection.css"; // Archivo CSS para estilos personalizados
import Header from "../Header/Header";
const RegisterSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    if (type === "camionero") {
      navigate("/registertransportista"); // Redirige al formulario de camionero
    } else if (type === "empresa") {
      navigate("/registerEmpresa"); // Redirige al formulario de empresa
    }
  };

  return (
    <>
      <Header/>
    <div className="register-selection-container">
      <h2>¿Cómo deseas registrarte?</h2>
      <div className="selection-cards">
        {/* Card para Camionero */}
        <div className="selection-card camionero">
          <h3>Transportista</h3>
          <p>Regístrate como transportista para gestionar tus viajes</p>
          <button
            className="selection-button"
            onClick={() => handleSelection("camionero")}
          >
            Seleccionar
          </button>
        </div>

        {/* Card para Empresa */}
        <div className="selection-card empresa">
          <h3>Empresa</h3>
          <p>Regístrate como empresa para gestionar tus operaciones </p>
          <button
            className="selection-button"
            onClick={() => handleSelection("empresa")}
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterSelection;