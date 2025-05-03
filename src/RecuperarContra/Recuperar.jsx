import React, { useState } from "react";
import "./Recuperar.css"; // Asegúrate de que el estilo esté disponible
import { useNavigate } from 'react-router-dom';
import HeaderLogin from "../Header/HeaderLogin";
import axios from "../config/axiosConfig"; // Asumiendo que tienes axios configurado

const Recuperar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Para controlar el estado de carga
  
  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    if (email === "") {
      setMessage("Por favor ingresa tu correo electrónico.");
      return;
    }

    setIsLoading(true);
    setMessage(""); // Limpia el mensaje previo

    try {
      // Cambiar la solicitud para enviar solo el correo como string
      const response = await axios.post("/User/RecuperarContra", email);

      console.log(response); // Verificar respuesta

      if (response.status === 200) {
        // Accede al mensaje en la respuesta y asegúrate de que sea un string
        const message = response.data.message; // Aquí se accede a la propiedad 'message' del objeto
        setMessage(message); // Mostrar el mensaje específico que viene desde la API

        if (message === "Correo enviado con la nueva contraseña") {
          // Asegúrate de que la redirección se hace después de que el mensaje se haya actualizado
          setTimeout(() => {
            navigate("/login"); // Redirigir a login después de 2 segundos
          }, 2000);
        }
      } else {
        setMessage(response.data.message || "Hubo un error al enviar el correo.");
      }
    } catch (error) {
      console.log({ correo: email });  // Verifica que el correo esté bien estructurado

      console.error("Error al enviar el correo:", error); // Para ver detalles del error
      setMessage("Hubo un error al enviar el correo. Por favor, intenta nuevamente.");
    }
    setIsLoading(false); // Finaliza el estado de carga
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
            disabled={isLoading} // Deshabilita el input mientras se procesa la solicitud
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