import React, { useState } from "react";
import "./registervehiculo.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Register = () => {
  const [formData, setFormData] = useState({
    placa: "",
    capacidadCarga: "",
    soat: null,
    tecnicomecanica: null,
    licenciaTransito: null,
    carroceria: "",
    nombreDueño: "",
    numIdentDueño: "",
    telDueño: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    soat: null,
    tecnicomecanica: null,
    licenciaTransito: null,
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

    if (!formData.placa.trim()) {
      newErrors.placa = "Este campo es obligatorio.";
    } else if (!/^[A-Za-z0-9\-]{5,10}$/.test(formData.placa.trim())) {
      newErrors.placa = "Placa inválida. Usa entre 5 y 10 caracteres alfanuméricos o guiones.";
    }

    if (!formData.capacidadCarga.trim()) {
      newErrors.capacidadCarga = "Este campo es obligatorio.";
    } else if (!/^\d+(\.\d+)?$/.test(formData.capacidadCarga.trim())) {
      newErrors.capacidadCarga = "Capacidad inválida. Debe ser un número.";
    }

    if (!formData.nombreDueño.trim()) {
      newErrors.nombreDueño = "Este campo es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(formData.nombreDueño.trim())) {
      newErrors.nombreDueño = "Solo letras y espacios, mínimo 2 caracteres.";
    }

    if (!formData.numIdentDueño.trim()) {
      newErrors.numIdentDueño = "Este campo es obligatorio.";
    } else if (!/^\d{5,}$/.test(formData.numIdentDueño.trim())) {
      newErrors.numIdentDueño = "Debe tener al menos 5 dígitos numéricos.";
    }

    if (!formData.telDueño.trim()) {
      newErrors.telDueño = "Este campo es obligatorio.";
    } else if (!/^\+?\d{7,15}$/.test(formData.telDueño.trim())) {
      newErrors.telDueño = "Número de teléfono inválido.";
    }

    if (!formData.carroceria.trim()) {
      newErrors.carroceria = "Debe seleccionar una opción.";
    }

    if (!formData.soat) {
      newErrors.soat = "Debe subir el archivo SOAT en formato PDF.";
    }

    if (!formData.tecnicomecanica) {
      newErrors.tecnicomecanica = "Debe subir el archivo Tecnicomecánica en formato PDF.";
    }

    if (!formData.licenciaTransito) {
      newErrors.licenciaTransito = "Debe subir el archivo Licencia de Tránsito en formato PDF.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setError("Por favor corrige los campos marcados.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Aquí debes enviar la data real al backend. Ejemplo:
    // const data = new FormData();
    // ...data.append...
    // axios.post(...) ...

    console.log("Datos registrados:", formData);

    // Simulación de navegación después de registro
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <h2>Registro de Vehículo</h2>
          {error && <p className="error-message">{error}</p>}

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
            {errors.placa && <p className="field-error">{errors.placa}</p>}
          </div>

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
            {errors.capacidadCarga && <p className="field-error">{errors.capacidadCarga}</p>}
          </div>

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
            {errors.nombreDueño && <p className="field-error">{errors.nombreDueño}</p>}
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
            {errors.numIdentDueño && <p className="field-error">{errors.numIdentDueño}</p>}
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
            {errors.telDueño && <p className="field-error">{errors.telDueño}</p>}
          </div>

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
            {errors.carroceria && <p className="field-error">{errors.carroceria}</p>}
          </div>

          {["soat", "tecnicomecanica", "licenciaTransito"].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>
                {field === "soat" && "Sube el SOAT (PDF)"}
                {field === "tecnicomecanica" && "Sube la Tecnicomecánica (PDF)"}
                {field === "licenciaTransito" && "Sube la Licencia de Tránsito (PDF)"}
              </label>
              {uploadedFiles[field] ? (
                <div className="uploaded-file">
                  <span className="file-name">{uploadedFiles[field]}</span>
                  <span className="check-icon">✔</span>
                </div>
              ) : (
                <>
                  <label htmlFor={field} className="file-input-label">
                    Seleccionar archivo
                  </label>
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
              {errors[field] && <p className="field-error">{errors[field]}</p>}
            </div>
          ))}

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar Vehiculo"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
