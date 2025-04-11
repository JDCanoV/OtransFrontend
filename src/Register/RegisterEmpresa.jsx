import React, { useState } from "react";
import "./registerempresa.css";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig";

const RegisterEmpresa = () => {
  const [formData, setFormData] = useState({
    numIdentificacion: "",
    nombre: "",
    apellido: "",
    telefono: "",
    telefonoSos: "",
    correo: "",
    contrasena: "",
    direccion: "",
    nombreEmpresa: "", // Solo para empresa
    numCuenta: "", // Solo para empresa
    nit: null, // Ahora será un archivo
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    nit: null,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, [name]: file });
      setUploadedFiles({ ...uploadedFiles, [name]: file.name });
    } else {
      setError(`Por favor, sube un archivo PDF válido para ${name}.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("NumIdentificacion", formData.numIdentificacion);
    data.append("Nombre", formData.nombre);
    data.append("Apellido", formData.apellido);
    data.append("Telefono", formData.telefono);
    data.append("TelefonoSos", formData.telefonoSos);
    data.append("Correo", formData.correo);
    data.append("Contrasena", formData.contrasena);
    data.append("Direccion", formData.direccion);
    data.append("NombreEmpresa", formData.nombreEmpresa);
    data.append("NumCuenta", formData.numCuenta);
    data.append("Nit", formData.nit); // Ahora es un archivo
    data.append("IdRol", "1"); // ID de rol para empresa
    data.append("IdEstado", "1"); // Estado inicial (puedes ajustarlo según tu lógica)

    try {
      const response = await axios.post("/user/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Registro exitoso:", response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("❌ Error del servidor:", error.response.data);
        setError("Error al registrar. Revisa los campos.");
      } else {
        console.error("❌ Error de conexión:", error.message);
        setError("No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro de Empresa</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Campos comunes */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="numIdentificacion">Número de Identificación</label>
            <input
              type="text"
              id="numIdentificacion"
              name="numIdentificacion"
              value={formData.numIdentificacion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campos específicos para empresa */}
        <div className="form-group">
          <label htmlFor="nombreEmpresa">Nombre de la Empresa</label>
          <input
            type="text"
            id="nombreEmpresa"
            name="nombreEmpresa"
            value={formData.nombreEmpresa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numCuenta">Número de Cuenta</label>
          <input
            type="text"
            id="numCuenta"
            name="numCuenta"
            value={formData.numCuenta}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo específico para subir el archivo NIT */}
        <div className="form-group">
          <label htmlFor="nit">Sube tu NIT (PDF)</label>
          {uploadedFiles.nit ? (
            <div className="uploaded-file">
              <span className="file-name">{uploadedFiles.nit}</span>
              <span className="check-icon">✔</span>
            </div>
          ) : (
            <>
              <label htmlFor="nit" className="file-input-label">
                Seleccionar archivo
              </label>
              <input
                type="file"
                id="nit"
                name="nit"
                className="file-input"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </>
          )}
        </div>

        <button type="submit" className="register-button">
          Registrar Empresa
        </button>
      </form>
    </div>
  );
};

export default RegisterEmpresa;