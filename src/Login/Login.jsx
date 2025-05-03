import React, { useState, useEffect } from "react";
import "./login.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/HeaderLogin"; // Asegúrate de que este sea el nombre correcto


function Login() {
  const { login, setLoading } = useAuth(); // Usamos las funciones del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setPopupMessage("");

    if (email === "" || password === "") {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true); // Establecer el loading en true mientras hacemos la solicitud

    try {
      const response = await login(email, password, false); // Usamos la función de login del contexto

      if (response.status === 200) {
        navigate("/indexEmpresa"); // Redirigir al dashboard
      } else {
        setError(response.data.mensaje || "Error al iniciar sesión.");
      }
    } catch (error) {
      setError("Error al iniciar sesión.");
    } finally {
      setLoading(false); // Desactivar el loading
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