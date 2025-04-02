import React, { useState } from "react";
import "./Recuperar.css"; // Asegúrate de que el estilo esté disponible
import { useNavigate } from 'react-router-dom';
import HeaderLogin from "../Header/HeaderLogin";

const Recuperar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleRecoverPassword = (e) => {
    e.preventDefault();

    if (email === "") {
      setMessage("Por favor ingresa tu correo electrónico.");
    } else {
      setMessage("Se ha enviado un correo exitosamente.");
      // Después de 2 segundos, redirige a la vista de login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
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
          />
          
          {message && <p className="message">{message}</p>}

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default Recuperar;
