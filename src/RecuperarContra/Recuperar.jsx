import React, { useState } from "react";
import "./Recuperar.css"; 
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/HeaderLogin";
import axios from "../config/axiosConfig";

const Recuperar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setMessage("Por favor ingresa tu correo electrónico.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Aquí asegúrate de mandar el objeto con la propiedad que espera el backend
      const response = await axios.post(`/Usuario/RecuperarContra?correo=${encodeURIComponent(email)}`, {});



      console.log("Respuesta completa:", response);

      if (response.status === 200) {
        const msg = response.data.message || "Operación exitosa";
        setMessage(msg);

        if (msg === "Correo enviado con la nueva contraseña") {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } else {
        setMessage(response.data.message || "Hubo un error al enviar el correo.");
      }
    } catch (error) {
      console.log({ correo: email });

      // Manejo más detallado de errores
      if (error.response) {
        // El servidor respondió con un status fuera del rango 2xx
        console.error("Error en la respuesta del servidor:", error.response.data);
        setMessage(
          error.response.data?.message ||
          `Error ${error.response.status}: ${error.response.statusText}`
        );
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
        setMessage("No se recibió respuesta del servidor. Intenta más tarde.");
      } else {
        // Algo pasó al configurar la solicitud
        console.error("Error al configurar la solicitud:", error.message);
        setMessage("Error en la solicitud. Por favor intenta nuevamente.");
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <HeaderLogin />
      <div className="recover-password-container">
        <h2>RECUPERAR CONTRASEÑA</h2>
        <form className="recover-password-form" onSubmit={handleRecoverPassword}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu correo"
            disabled={isLoading}
          />
          
          {message && <p className="message">{message}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Recuperar;
