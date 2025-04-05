import React, { useState } from "react"; 
import "./registerusuario.css"; // Importa el archivo CSS para estilos personalizados
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario después del registro
import axios from "../config/axiosConfig"; // Configuración de Axios para realizar solicitudes HTTP

const RegisterUsuario = () => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        numIdentificacion: "", // Número de identificación
        nombre: "", // Nombre del usuario
        apellido: "", // Apellido del usuario
        telefono: "", // Teléfono de contacto
        telefonoSos: "", // Teléfono de emergencia
        correo: "", // Correo electrónico
        contrasena: "", // Contraseña del usuario
        nombreEmpresa: "", // Nombre de la empresa del usuario
        numCuenta: "", // Número de cuenta bancaria
        direccion: "", // Dirección del usuario
        licencia: null, // Archivo PDF de la licencia
        nit: "", // NIT de la empresa
    });

    // Estado para manejar el nombre de los archivos subidos
    const [uploadedFiles, setUploadedFiles] = useState({
        licencia: null, // Almacena el nombre del archivo de la licencia subido
    });

    // Estado para manejar los errores
    const [error, setError] = useState("");

    // Hook para redirigir al usuario después de enviar el formulario
    const navigate = useNavigate();

    // Función para manejar los cambios en los campos de texto
    const handleChange = (e) => {
        const { name, value } = e.target; // Desestructura el evento para obtener el nombre y valor del campo
        setFormData({ ...formData, [name]: value }); // Actualiza el estado con el nuevo valor del campo
    };

    // Función para manejar la carga de archivos (solo PDF en este caso)
    const handleFileChange = (e) => {
        const { name } = e.target; // Obtiene el nombre del campo de archivo
        const file = e.target.files[0]; // Obtiene el primer archivo del input
        if (file && file.type === "application/pdf") {
            // Verifica si el archivo es un PDF válido
            setFormData({ ...formData, [name]: file }); // Actualiza el estado con el archivo
            setUploadedFiles({ ...uploadedFiles, [name]: file.name }); // Almacena el nombre del archivo
        } else {
            // Si el archivo no es un PDF válido, muestra un mensaje de error
            setError(`Por favor, sube un archivo PDF válido para ${name}.`);
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        // Crea un FormData para enviar los datos como multipart/form-data
        const data = new FormData();
        data.append("NumIdentificacion", formData.numIdentificacion);
        data.append("Nombre", formData.nombre);
        data.append("Apellido", formData.apellido);
        data.append("Telefono", formData.telefono);
        data.append("TelefonoSos", formData.telefonoSos);
        data.append("Correo", formData.correo);
        data.append("Contrasena", formData.contrasena);
        data.append("NombreEmpresa", formData.nombreEmpresa);
        data.append("NumCuenta", formData.numCuenta);
        data.append("Direccion", formData.direccion);
        data.append("Nit", formData.nit);
        data.append("Licencia", formData.licencia); // Agrega el archivo de la licencia

        // Campo adicional para el rol (ajustar según el sistema)
        data.append("IdRol", "1"); // En este caso, el ID del rol es 1, pero puede variar

        // Verifica los datos antes de enviarlos (útil para depuración)
        console.log("📝 Datos del formulario antes de enviar:");
        for (let pair of data.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            // Envia los datos al backend usando Axios
            const response = await axios.post("http/user/registerTransportista", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // Indica que el tipo de contenido es multipart (para archivos)
                },
            });

            // Si el registro es exitoso, muestra la respuesta y redirige a la página de login
            console.log("✅ Registro exitoso:", response.data.message);
            navigate("/login"); // Redirige al login después del registro
        } catch (error) {
            // Maneja errores en el envío
            if (error.response) {
                // Si el error es del servidor (response)
                console.error("❌ Error del servidor:", error.response.data);
                if (error.response.data.errors) {
                    // Si hay errores de validación, los muestra en consola
                    console.log("🛑 Errores de validación del backend:");
                    for (let key in error.response.data.errors) {
                        console.log(`${key}:`, error.response.data.errors[key][0]);
                    }
                }
                setError("Error al registrar. Revisa los campos.");
            } else {
                // Si hay un error de conexión o red
                console.error("❌ Error de conexión:", error.message);
                setError("No se pudo conectar con el servidor.");
            }
        }
    };

    return (
        <div className="register-container">
            {/* Formulario de registro */}
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Registro de Usuario</h2>
                {/* Muestra un mensaje de error si hay algún problema */}
                {error && <p className="error-message">{error}</p>}

                {/* Primera fila: Número de Identificación y Nombre */}
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

                {/* Segunda fila: Apellido y Teléfono */}
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

                {/* Tercera fila: Teléfono de Emergencia y Correo Electrónico */}
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="telefonoSos">Teléfono de Emergencia</label>
                        <input
                            type="text"
                            id="telefonoSos"
                            name="telefonoSos"
                            value={formData.telefonoSos}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                </div>

                {/* Cuarta fila: Contraseña y Nombre de la Empresa */}
                <div className="form-group-row">
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
                </div>

                {/* Quinta fila: Número de Cuenta y Dirección */}
                <div className="form-group-row">
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
                </div>

                {/* Sexta fila: Licencia y NIT */}
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="licencia">Sube tu Licencia (PDF)</label>
                        {uploadedFiles.licencia ? (
                            <div className="uploaded-file">
                                <span className="file-name">{uploadedFiles.licencia}</span>
                                <span className="check-icon">✔</span>
                            </div>
                        ) : (
                            <>
                                <label htmlFor="licencia" className="file-input-label">Seleccionar archivo</label>
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
                    <div className="form-group">
                        <label htmlFor="nit">NIT</label>
                        <input
                            type="text"
                            id="nit"
                            name="nit"
                            value={formData.nit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Botón de envío */}
                <button type="submit" className="register-button">
                    Registrar Usuario
                </button>
            </form>
        </div>
    );
};

export default RegisterUsuario;