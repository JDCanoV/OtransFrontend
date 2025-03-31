import React, { useState } from "react";
import "./registerusuario.css"; // Archivo CSS para los estilos
import { useNavigate } from "react-router-dom";

const RegisterUsuario = () => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        numIdentificacion: "", // Número de identificación del usuario
        nombre: "", // Nombre del usuario
        apellido: "", // Apellido del usuario
        telefono: "", // Teléfono del usuario
        telefonoSOS: "", // Teléfono de emergencia
        correo: "", // Correo electrónico del usuario
        contrasena: "", // Contraseña del usuario
        nombreEmpresa: "", // Nombre de la empresa asociada
        numCuenta: "", // Número de cuenta bancaria
        direccion: "", // Dirección del usuario o empresa
        licencia: null, // Archivo PDF de la licencia
        nit: "", // NIT de la empresa
    });

    // Estado para almacenar los nombres de los archivos subidos
    const [uploadedFiles, setUploadedFiles] = useState({
        licencia: null, // Nombre del archivo de la licencia subido
    });

    // Estado para manejar errores
    const [error, setError] = useState("");

    // Hook para redirigir a otra página
    const navigate = useNavigate();

    // Maneja los cambios en los campos de texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Actualiza el estado con el nuevo valor
    };

    // Maneja los cambios en los campos de subida de archivos
    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            // Si el archivo es un PDF válido, actualiza el estado
            setFormData({ ...formData, [name]: file });
            setUploadedFiles({ ...uploadedFiles, [name]: file.name }); // Guarda el nombre del archivo subido
        } else {
            // Si el archivo no es válido, muestra un mensaje de error
            setError(`Por favor, sube un archivo PDF válido para ${name}.`);
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        const { numIdentificacion, nombre, apellido, telefono, telefonoSOS, correo, contrasena, nombreEmpresa, numCuenta, direccion, licencia, nit } = formData;

        // Validaciones básicas: verifica que todos los campos estén completos
        if (!numIdentificacion || !nombre || !apellido || !telefono || !telefonoSOS || !correo || !contrasena || !nombreEmpresa || !numCuenta || !direccion || !licencia || !nit) {
            setError("Por favor, completa todos los campos y sube los archivos requeridos.");
            return;
        }

        // Simulación de registro exitoso
        console.log("Datos registrados:", formData);
        navigate("/login"); // Redirige al login después del registro
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
                        <label htmlFor="telefonoSOS">Teléfono de Emergencia</label>
                        <input
                            type="text"
                            id="telefonoSOS"
                            name="telefonoSOS"
                            value={formData.telefonoSOS}
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