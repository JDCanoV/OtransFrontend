import React, { useState } from "react"; // Importa React y el hook useState
import "./registercamionero.css"; // Importa el archivo CSS para estilos
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para redireccionar
import axios from "../config/axiosConfig"; // Importa la configuración de Axios para realizar solicitudes HTTP

const RegisterCamionero = () => {
  // Estado inicial para los datos del formulario
  const [formData, setFormData] = useState({
    numIdentificacion: "", // Número de identificación del camionero
    nombre: "", // Nombre del camionero
    apellido: "", // Apellido del camionero
    telefono: "", // Teléfono principal
    telefonoSos: "", // Teléfono de emergencia (SOS)
    correo: "", // Correo electrónico
    contrasena: "", // Contraseña
    direccion: "", // Dirección del camionero
    nombreEmpresa: null, // No se usa en este formulario
    numCuenta: "", // No se usa en este formulario
    nit: null, // No se usa en este formulario
    archiDocu: null, // Documento adicional (PDF)
    licencia: null, // Licencia del camionero (PDF)
  });

  // Estado para los archivos subidos
  const [uploadedFiles, setUploadedFiles] = useState({
    licencia: null, // Archivo de licencia
    archiDocu: null, // Archivo adicional
  });

  // Estado para manejar errores
  const [error, setError] = useState("");

  // Hook para redireccionar a otras páginas
  const navigate = useNavigate();

  // Maneja los cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo
    setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario
  };

  // Maneja los cambios en los campos de archivo
  const handleFileChange = (e) => {
    const { name } = e.target; // Obtiene el nombre del campo
    const file = e.target.files[0]; // Obtiene el archivo seleccionado
    if (file && file.type === "application/pdf") {
      // Verifica que el archivo sea un PDF
      setFormData({ ...formData, [name]: file }); // Actualiza el estado del formulario con el archivo
      setUploadedFiles({ ...uploadedFiles, [name]: file.name }); // Actualiza el estado de los archivos subidos
    } else {
      setError(`Por favor, sube un archivo PDF válido para ${name}.`); // Muestra un error si el archivo no es válido
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Crea un objeto FormData para enviar los datos al backend
    const data = new FormData();
    data.append("NumIdentificacion", formData.numIdentificacion); // Número de identificación
    data.append("Nombre", formData.nombre); // Nombre
    data.append("Apellido", formData.apellido); // Apellido
    data.append("Telefono", formData.telefono); // Teléfono principal
    data.append("TelefonoSos", formData.telefonoSos); // Teléfono SOS
    data.append("Correo", formData.correo); // Correo electrónico
    data.append("Contrasena", formData.contrasena); // Contraseña
    data.append("Direccion", formData.direccion); // Dirección
    data.append("Licencia", formData.licencia); // Archivo de licencia
    data.append("ArchiDocu", formData.archiDocu); // Archivo adicional
    data.append("IdRol", "2"); // ID de rol para camionero
    data.append("IdEstado", "1"); // Estado inicial (puedes ajustarlo según tu lógica)

    try {
      // Realiza una solicitud POST al backend
      const response = await axios.post("/user/registerTransportista", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Especifica que se envían datos de tipo FormData
        },
      });
      console.log("✅ Registro exitoso:", response.data.message); // Muestra un mensaje de éxito en la consola
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      if (error.response) {
        console.error("❌ Error del servidor:", error.response.data); // Muestra el error del servidor en la consola
        setError("Error al registrar. Revisa los campos."); // Muestra un mensaje de error al usuario
      } else {
        console.error("❌ Error de conexión:", error.message); // Muestra un error de conexión en la consola
        setError("No se pudo conectar con el servidor."); // Muestra un mensaje de error al usuario
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro de Camionero</h2>
        {error && <p className="error-message">{error}</p>} {/* Muestra un mensaje de error si existe */}

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
          </div>
        </div>

        {/* Campo para Número de Cuenta */}
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

        {/* Campo específico para camionero */}
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
        </div>

        {/* Campo para subir el archivo adicional */}
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
        </div>

        <button type="submit" className="register-button">
          Registrar Camionero
        </button>
      </form>
    </div>
  );
};

export default RegisterCamionero; // Exporta el componente para su uso en otras partes de la aplicación