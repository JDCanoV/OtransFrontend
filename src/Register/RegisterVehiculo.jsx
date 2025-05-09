import React, { useState } from "react";
import "./registervehiculo.css"; // Archivo CSS para los estilos
import { useNavigate } from "react-router-dom";

const Register = () => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        placa: "", // Placa del vehículo
        capacidadCarga: "", // Capacidad de carga del vehículo
        soat: null, // Archivo PDF del SOAT
        tecnicomecanica: null, // Archivo PDF de la Tecnicomecánica
        licenciaTransito: null, // Archivo PDF de la Licencia de Tránsito
        carroceria: "", // Valor inicial vacío para mostrar la opción de instrucción
        nombreDueño: "", // Nombre del dueño del vehículo
        numIdentDueño: "", // Número de identificación del dueño
        telDueño: "", // Teléfono del dueño
    });

    // Estado para almacenar los nombres de los archivos subidos
    const [uploadedFiles, setUploadedFiles] = useState({
        soat: null,
        tecnicomecanica: null,
        licenciaTransito: null,
    });

    // Estado para manejar errores
    const [error, setError] = useState("");

    // Hook para redirigir a otra página
    const navigate = useNavigate();

    // Maneja los cambios en los campos de texto y select
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
        const { placa, capacidadCarga, soat, tecnicomecanica, licenciaTransito, carroceria, nombreDueño, numIdentDueño, telDueño } = formData;

        // Validaciones básicas: verifica que todos los campos estén completos
        if (!placa || !capacidadCarga || !soat || !tecnicomecanica || !licenciaTransito || !carroceria || !nombreDueño || !numIdentDueño || !telDueño) {
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
                <h2>Registro de Vehículo</h2>
                {/* Muestra un mensaje de error si hay algún problema */}
                {error && <p className="error-message">{error}</p>}

                {/* Campo de texto: Placa */}
                <div className="form-group">
                    <label htmlFor="placa">Placa</label>
                    <input
                        type="text"
                        id="placa"
                        name="placa"
                        value={formData.placa}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Campo de texto: Capacidad de Carga */}
                <div className="form-group">
                    <label htmlFor="capacidadCarga">Capacidad de Carga</label>
                    <input
                        type="text"
                        id="capacidadCarga"
                        name="capacidadCarga"
                        value={formData.capacidadCarga}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Campos del dueño */}
                <div className="form-group">
                    <label htmlFor="nombreDueño">Nombre del Dueño</label>
                    <input
                        type="text"
                        id="nombreDueño"
                        name="nombreDueño"
                        value={formData.nombreDueño}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numIdentDueño">Número de Identificación del Dueño</label>
                    <input
                        type="text"
                        id="numIdentDueño"
                        name="numIdentDueño"
                        value={formData.numIdentDueño}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telDueño">Teléfono del Dueño</label>
                    <input
                        type="text"
                        id="telDueño"
                        name="telDueño"
                        value={formData.telDueño}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Campo de selección: Carrocería */}
                <div className="form-group">
                    <label htmlFor="carroceria">Carrocería</label>
                    <select
                        id="carroceria"
                        name="carroceria"
                        className="styled-select"
                        value={formData.carroceria}
                        onChange={handleChange}
                        required
                    >
                        {/* Opción predeterminada con texto de instrucción */}
                        <option value="" disabled>
                            Selecciona la carrocería de tu camión
                        </option>
                        <option value="portacontenedor">Portacontenedor</option>
                        <option value="furgon">Furgón</option>
                        <option value="refrigeradas">Refrigeradas</option>
                        <option value="tanques">Tanques</option>
                        <option value="tolva">Tolva</option>
                        <option value="estacas">Estacas</option>
                    </select>
                </div>

                {/* Campos de subida de archivos */}
                {["soat", "tecnicomecanica", "licenciaTransito"].map((field) => (
                    <div className="form-group" key={field}>
                        <label htmlFor={field}>
                            {field === "soat" && "Sube el SOAT (PDF)"}
                            {field === "tecnicomecanica" && "Sube la Tecnicomecánica (PDF)"}
                            {field === "licenciaTransito" && "Sube la Licencia de Tránsito (PDF)"}
                        </label>
                        {uploadedFiles[field] ? (
                            // Muestra el nombre del archivo subido y un ícono de verificación
                            <div className="uploaded-file">
                                <span className="file-name">{uploadedFiles[field]}</span>
                                <span className="check-icon">✔</span>
                            </div>
                        ) : (
                            // Botón para seleccionar un archivo
                            <>
                                <label htmlFor={field} className="file-input-label">Seleccionar archivo</label>
                                <input
                                    type="file"
                                    id={field}
                                    name={field}
                                    className="file-input"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </>
                        )}
                    </div>
                ))}

                {/* Botón para enviar el formulario */}
                <button type="submit" className="register-button">
                    Registrar Vehiculo
                </button>
            </form>
        </div>
    );
};

export default Register;