import React, { useState } from "react"; 
import "./registercamionero.css"; 
import { useNavigate } from "react-router-dom"; 
import axios from "../config/axiosConfig"; 
import Header from "../Header/Header";

const RegisterCamionero = () => {
  const [formData, setFormData] = useState({
    numIdentificacion: "", 
    nombre: "", 
    apellido: "", 
    telefono: "", 
    telefonoSos: "", 
    correo: "", 
    contrasena: "", 
    direccion: "", 
    nombreEmpresa: null, 
    numCuenta: "", 
    nit: null, 
    archiDocu: null, 
    licencia: null, 
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    licencia: null, 
    archiDocu: null, 
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
    setErrors({ ...errors, [name]: "" }); 
    setError("");
  };

  const handleFileChange = (e) => {
    const { name } = e.target; 
    const file = e.target.files[0]; 
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, [name]: file }); 
      setUploadedFiles({ ...uploadedFiles, [name]: file.name }); 
      setErrors({ ...errors, [name]: "" });
      setError("");
    } else {
      setErrors({ ...errors, [name]: "Por favor, sube un archivo PDF válido." });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.numIdentificacion.trim()) {
      newErrors.numIdentificacion = "Este campo es obligatorio.";
    } else if (!/^\d{5,}$/.test(formData.numIdentificacion.trim())) {
      newErrors.numIdentificacion = "Debe tener al menos 5 dígitos numéricos.";
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Este campo es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(formData.nombre.trim())) {
      newErrors.nombre = "Solo letras y espacios, mínimo 2 caracteres.";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "Este campo es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(formData.apellido.trim())) {
      newErrors.apellido = "Solo letras y espacios, mínimo 2 caracteres.";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "Este campo es obligatorio.";
    } else if (!/^\+?\d{7,15}$/.test(formData.telefono.trim())) {
      newErrors.telefono = "Número de teléfono inválido.";
    }

    if (formData.telefonoSos && formData.telefonoSos.trim() !== "") {
      if (!/^\+?\d{7,15}$/.test(formData.telefonoSos.trim())) {
        newErrors.telefonoSos = "Número de teléfono SOS inválido.";
      }
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "Este campo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo.trim())) {
      newErrors.correo = "Correo inválido.";
    }

    if (!formData.contrasena.trim()) {
      newErrors.contrasena = "Este campo es obligatorio.";
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "Debe tener al menos 6 caracteres.";
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "Este campo es obligatorio.";
    } else if (formData.direccion.trim().length < 5) {
      newErrors.direccion = "La dirección es muy corta.";
    }

    if (!formData.numCuenta.trim()) {
      newErrors.numCuenta = "Este campo es obligatorio.";
    } else if (!/^\d{10,}$/.test(formData.numCuenta.trim())) {
      newErrors.numCuenta = "Número de cuenta inválido, mínimo 10 dígitos.";
    }

    if (!formData.licencia) {
      newErrors.licencia = "Debe subir un archivo de licencia en formato PDF.";
    }

    if (!formData.archiDocu) {
      newErrors.archiDocu = "Debe subir un documento adicional en formato PDF.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setError("Por favor corrige los campos marcados.");
      return;
    }

    setIsLoading(true);
    setError("");

    const data = new FormData();
    data.append("NumIdentificacion", formData.numIdentificacion);
    data.append("Nombre", formData.nombre);
    data.append("Apellido", formData.apellido);
    data.append("Telefono", formData.telefono);
    data.append("TelefonoSos", formData.telefonoSos || "");
    data.append("Correo", formData.correo);
    data.append("Contrasena", formData.contrasena);
    data.append("Direccion", formData.direccion);
    data.append("Licencia", formData.licencia);
    data.append("ArchiDocu", formData.archiDocu);
    data.append("IdRol", "2");
    data.append("IdEstado", "1");

    try {
      const response = await axios.post("/Usuario/registerTransportista", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Registro exitoso:", response.data.message);
      navigate("/registervehiculo", { state: { numIdentificacion: formData.numIdentificacion } });

    } catch (error) {
      if (error.response) {
        console.error("❌ Error del servidor:", error.response.data);
        setError("Error al registrar. Revisa los campos.");
      } else {
        console.error("❌ Error de conexión:", error.message);
        setError("No se pudo conectar con el servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <>
      <Header />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <h2>Registro Transportista</h2>
          {error && <p className="error-message">{error}</p>}

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
              {errors.numIdentificacion && <p className="field-error">{errors.numIdentificacion}</p>}
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
              {errors.nombre && <p className="field-error">{errors.nombre}</p>}
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
              {errors.apellido && <p className="field-error">{errors.apellido}</p>}
            </div>
          </div>

          <div className="form-group-row">
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
              {errors.telefono && <p className="field-error">{errors.telefono}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="telefonoSos">Teléfono SOS</label>
              <input
                type="text"
                id="telefonoSos"
                name="telefonoSos"
                value={formData.telefonoSos}
                onChange={handleChange}
                required
              />
              {errors.telefonoSos && <p className="field-error">{errors.telefonoSos}</p>}
            </div>
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
            {errors.numCuenta && <p className="field-error">{errors.numCuenta}</p>}
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
              {errors.correo && <p className="field-error">{errors.correo}</p>}
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
              {errors.contrasena && <p className="field-error">{errors.contrasena}</p>}
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
            {errors.direccion && <p className="field-error">{errors.direccion}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="licencia">Sube tu Licencia (PDF)</label>
            {uploadedFiles.licencia ? (
              <div className="uploaded-file">
                <span className="file-name">{uploadedFiles.licencia}</span>
                <span className="check-icon">✔</span>
              </div>
            ) : (
              <>
                <label htmlFor="licencia" className="file-input-label">
                  Seleccionar archivo
                </label>
                <input
                  type="file"
                  id="licencia"
                  name="licencia"
                  className="file-input"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </>
            )}
            {errors.licencia && <p className="field-error">{errors.licencia}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="archiDocu">Sube tu Documento Adicional (PDF)</label>
            {uploadedFiles.archiDocu ? (
              <div className="uploaded-file">
                <span className="file-name">{uploadedFiles.archiDocu}</span>
                <span className="check-icon">✔</span>
              </div>
            ) : (
              <>
                <label htmlFor="archiDocu" className="file-input-label">
                  Seleccionar archivo
                </label>
                <input
                  type="file"
                  id="archiDocu"
                  name="archiDocu"
                  className="file-input"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </>
            )}
            {errors.archiDocu && <p className="field-error">{errors.archiDocu}</p>}
          </div>

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar Transportista"}
          </button>
        </form>
      </div>
   </>
  );
};

export default RegisterCamionero;
