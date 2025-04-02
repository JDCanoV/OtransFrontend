import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/HeaderLogin"; // Asegúrate de que este sea el nombre correcto

function Login() {
  const navigate = useNavigate();
  const goToRecuperar = () => {
    navigate("/recuperar");
  };

  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulación de validación simple
    if (idNumber === "" || password === "") {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (idNumber === "123456" && password === "contraseña") {
      navigate("/"); // Redirige a Home
    } else if (idNumber !== "123456") {
      setPopupMessage("Usuario no encontrado.");
    } else {
      setPopupMessage("Contraseña incorrecta.");
    }
  };

  // useEffect para manejar el cierre del popup después de 4 segundos
  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage(""); // Limpiamos el mensaje del popup
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el mensaje cambia
    }
  }, [popupMessage]);

  return (
    <>
      <HeaderLogin /> {/* Mostrar solo en Login */}
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="idNumber">Número de identificación</label>
          <input
            type="text"
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">Ingresar</button>

          <div className="login-links">
            <a href="/recuperar" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div className="new-user">
            <p>Nuevo Usuario</p>
            <button
              type="button"
              className="login-btn secondary"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </div>
        </form>

        {popupMessage && (
          <div className="popup">
            <div className="popup-content">
              <p>{popupMessage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
