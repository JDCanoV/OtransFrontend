import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulación de validación simple
    if (idNumber === "" || password === "") {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (idNumber === "123456" && password === "contraseña") {
      navigate("/"); // Redirige a Home
    } else {
      setError("Identificación o contraseña incorrecta.");
    }
  };

  return (
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

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
