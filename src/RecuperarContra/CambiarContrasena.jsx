import React, { useState } from "react";
import "./cambiarContrasena.css";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/HeaderLogin";
import axios from "../config/axiosConfig";

const CambiarContrasena = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const correo = user?.usuario?.correo;
  
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword === "" || confirmPassword === "") {
      setMessage("Por favor, ingresa ambas contraseñas.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/Usuario/CambiarContrasena", {
        correo: correo,
        contrasena: newPassword,
      });

      if (response.status === 200) {
        setMessage(response.data.message);

        if (response.data.message === "Contraseña cambiada con éxito") {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      // Loguea el payload enviado para debug
      console.log({ correo, contrasena: newPassword });

      const errorMessage =
        error.response?.data?.message || "Hubo un error. Por favor, intenta nuevamente.";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderLogin />
      <div className="change-password-container">
        <h2>Cambiar Contraseña</h2>
        <form className="change-password-form" onSubmit={handleChangePassword}>
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <div className="password-input-container">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Introduce tu nueva contraseña"
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? "Ocultar" : "👀"}
            </button>
          </div>

          <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? "Ocultar" : "👀"}
            </button>
          </div>

          {message && <p className="message">{message}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CambiarContrasena;
