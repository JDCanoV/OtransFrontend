import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/HeaderLogin"; // Asegúrate de que este sea el nombre correcto


function Login() {
  const navigate = useNavigate();
  const goToRecuperar = () => {
    navigate("/recuperar");
  };
   
  const goToIndexEmpresa = () => {
    navigate("/indexEmpresa");
  };

  const [email, setEmail] = useState("");  // Cambié el estado para manejar el correo
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setPopupMessage("");
  
    if (email === "" || password === "") {
      setError("Por favor completa todos los campos.");
      return;
    }
  
    try {
      const response = await axios.post("/User/Login", {
        correo: email,
        contrasena: password
      });
    
      // Verifica que la respuesta sea exitosa
      if (response.data.respuesta === 1) { // Asumiendo que 'respuesta' es 1 para éxito
        const { token, usuario } = response.data;
    
        // Guardar el token en localStorage si lo necesitas para autenticación
        localStorage.setItem("token", token);
        
        // Redirigir al dashboard (o al que quieras)
        navigate("/indexEmpresa"); // Rediriges solo si el login es exitoso
      } else {
        setPopupMessage(response.data.mensaje || "Error al iniciar sesión.");
      }
    } catch (error) {
      if (error.response) {
        // Si el servidor respondió con un error específico
        const msg = error.response.data.mensaje || "Error al iniciar sesión.";
        setPopupMessage(msg);
      } else {
        // Error de red u otros
        setPopupMessage("No se pudo conectar al servidor.");
      }
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
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"  // Cambié el tipo de input a email
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Actualizamos el estado de email
            required  // Añadí un requerimiento de campo obligatorio
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required  // Añadí un requerimiento de campo obligatorio
          />

          {error && <p className="error">{error}</p>}
          <button type="submit">Iniciar sesión</button>
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
