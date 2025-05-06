import React, { useState, useRef } from "react"; // Importa React y hooks como useState y useRef
import "./SolicitarServicio.css"; // Importa los estilos CSS para la página
import { useNavigate } from "react-router-dom"; // hook para redireccionar a otras páginas
import axios from "../../config/axiosConfig"; // Importa la configuración de axios para realizar solicitudes HTTP
import HeaderEmpresa from "../../Header/HeaderEmpresa"; // Importa el componente del encabezado
import GoogleMapComponent from "../../Components/googlemaps/GoogleMapComponent"; // Importa el componente del mapa de Google

const SolicitarServicio = () => {
  // Definición de hooks de estado
  const navigate = useNavigate(); // Usado para redirigir al usuario a otras rutas
  const [origen, setOrigen] = useState(""); // Estado para almacenar el valor del origen
  const [destino, setDestino] = useState(""); // Estado para almacenar el valor del destino
  const [tipoCarroceria, setTipoCarroceria] = useState("");  // Estado para almacenar tipo de carrocería
  const [tamanoVeh, setTamanoVeh] = useState("");  // Estado para almacenar tamaño del vehículo
  const [tipoCarga, setTipoCarga] = useState(""); // Estado para almacenar el tipo de carga
  const [peso, setPeso] = useState(""); // Estado para almacenar el peso
  const [descripcion, setDescripcion] = useState(""); // Estado para almacenar la descripción
  const [evidencias, setEvidencias] = useState([]); // Estado para almacenar las imágenes seleccionadas
  const [idCarga, setIdCarga] = useState(null); // Estado para almacenar el id de la carga
  const fileInputRef = useRef(null); // Referencia al input de tipo archivo (para seleccionar imágenes)

  // Definimos las opciones válidas para el tamaño del vehículo
  const validTamanoVeh = ["2_ejesP", "2_ejesG", "3_ejes", "6_ejes"];

  // Opciones de carga por tipo de carrocería
  const cargasPorCarroceria = {
    estacas: [
      "Carga agrícola",
      "Ganado",
      "Materiales de construcción",
      "Productos en sacos",
      "Maquinaria liviana"
    ],
    furgon: [
      "Electrodomésticos",
      "Textiles y ropa",
      "Paquetería",
      "Alimentos secos",
      "Artículos tecnológicos"
    ],
    carrotanque: [
      "Combustibles líquidos",
      "Agua potable",
      "Leche y líquidos alimenticios",
      "Sustancias químicas"
    ],
    volqueta: [
      "Arena, grava y piedra",
      "Tierra y escombros",
      "Carbón",
      "Materiales de demolición"
    ],
    portacontenedor: [
      "Carga contenerizada general",
      "Maquinaria pesada",
      "Alimentos en pallets",
      "Productos químicos"
    ],
    refrigerador: [
      "Alimentos perecederos",
      "Productos farmacéuticos",
      "Flores",
      "Productos congelados"
    ]
  };

  // Filtra las opciones de tipo de carga según el tipo de carrocería seleccionado
  const tiposDeCargaDisponibles = cargasPorCarroceria[tipoCarroceria] || [];

  // Función para subir imágenes y obtener el id_carga
  const uploadImages = async () => {
    if (evidencias.length === 0) {
      console.error("No se han seleccionado imágenes para cargar.");
      alert("Por favor, selecciona al menos una imagen.");
      return null; // Si no se seleccionaron imágenes, no continuamos
    }

    const formData = new FormData(); // Crea un objeto FormData para enviar las imágenes
    // Añadir imágenes al FormData
    evidencias.forEach((file, index) => {
      formData.append(`Imagen${index + 1}`, file);
    });

    try {
      console.log("Enviando imágenes al backend...");
      // Realiza la solicitud POST para subir las imágenes al servidor
      const response = await axios.post("/User/subir-imagenes-carga", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Tipo de contenido necesario para enviar imágenes
        },
      });

      // Si la respuesta contiene un idCarga, lo asignamos
      if (response.data && response.data.idCarga) {
        console.log("Imágenes subidas con éxito. ID de carga:", response.data.idCarga);
        setIdCarga(response.data.idCarga); // Guardamos el idCarga en el estado
        return response.data.idCarga; // Regresamos el idCarga
      } else {
        console.error("La respuesta del servidor no contiene un IdCarga válido.");
        alert("Hubo un error al procesar las imágenes. Intenta nuevamente.");
        return null;
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      // Manejo de errores en la solicitud
      if (error.response) {
        console.error("Error de respuesta del servidor:", error.response);
        alert(`Error del servidor: ${error.response.statusText}`);
      } else if (error.request) {
        console.error("Error al realizar la solicitud:", error.request);
        alert("Error de red al enviar las imágenes. Verifica tu conexión.");
      } else {
        console.error("Error inesperado:", error.message);
        alert("Hubo un error inesperado. Intenta nuevamente.");
      }
      return null;
    }
  };

  // Función para validar los datos del formulario antes de enviarlos
  const validateForm = () => {
    // Verificamos si los campos necesarios están completos
    if (!origen || !destino) {
      alert("Por favor ingresa origen y destino válidos.");
      return false;
    }

    if (!tamanoVeh) {
      alert("Por favor selecciona un tamaño de vehículo.");
      return false;
    }

    if (!tipoCarga) {
      alert("Por favor ingresa un tipo de carga.");
      return false;
    }

    if (!tipoCarroceria) {
      alert("Por favor ingresa un tipo de carrocería.");
      return false;
    }

    // Validamos si el tamaño del vehículo es válido
    if (!validTamanoVeh.includes(tamanoVeh)) {
      alert("El tamaño de vehículo seleccionado no es válido.");
      return false;
    }

    // Validamos si el peso es un número
    if (!peso || isNaN(peso)) {
      alert("Por favor ingresa un peso válido.");
      return false;
    }

    return true;
  };

  // Función para enviar el formulario con los datos del viaje
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado de la forma

    if (!validateForm()) {
      return; // Si la validación falla, no se envía el formulario
    }

    // Subir imágenes y obtener el id_carga
    const idCarga = await uploadImages();
    if (!idCarga) {
      alert("No se ha podido obtener el ID de carga.");
      return; // Si no se pudo obtener el id_carga, no continuamos
    }

    // Crear objeto con los datos del viaje
    const viajeData = {
      origen,
      destino,
      tipoCarroceria,
      tamanoVeh,
      tipoCarga,
      peso,
      descripcion,
      idCarga, // Asignamos el id_carga
    };

    try {
      // Realizamos la solicitud POST para registrar el viaje
      const response = await axios.post("/user/registrarViaje", viajeData);
      if (response && response.data) {
        console.log("Viaje registrado con éxito:", response.data);
        navigate("/viajes"); // Redirige a la página de viajes después de la solicitud exitosa
      } else {
        console.error("La respuesta del servidor no contiene datos válidos.");
        alert("Hubo un error al registrar el viaje. Intenta nuevamente.");
      }
    } catch (error) {
      // Manejo de errores en la respuesta del servidor
      if (error.response) {
        console.error("Error de respuesta del servidor:", error.response);
        console.log("Detalles completos de la respuesta:", error.response.data);
        if (error.response.status === 400) {
          // Error 400: Bad Request
          const errorMessages = error.response.data.errors;
          let errorMsg = "Hubo un problema con los datos ingresados:\n";
          for (const key in errorMessages) {
            errorMsg += `${key}: ${errorMessages[key].join(", ")}\n`;
          }
          alert(errorMsg);  // Mostrar detalles de los errores de validación
        } else {
          alert(`Error del servidor al registrar el viaje: ${error.response.statusText}`);
        }
      } else if (error.request) {
        console.error("Error al realizar la solicitud:", error.request);
        alert("Error de red al registrar el viaje. Verifica tu conexión.");
      } else {
        console.error("Error inesperado:", error.message);
        alert("Hubo un error inesperado al registrar el viaje.");
      }
    }
  };

  // Manejo de los archivos seleccionados (imágenes)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convierte la lista de archivos a un array
    const nuevas = [...evidencias, ...files].slice(0, 10); // Añade los nuevos archivos al estado, con un límite de 10
    setEvidencias(nuevas);
    e.target.value = ""; // Limpia el campo de entrada para permitir seleccionar el mismo archivo si es necesario
  };

  // Eliminar un archivo de la lista
  const removeEvidencia = (idx) => {
    setEvidencias(evidencias.filter((_, i) => i !== idx)); // Elimina el archivo de la lista por su índice
  };

  return (
    <>
      <HeaderEmpresa /> {/* Muestra el encabezado de la empresa */}
      <div className="solicitar-servicio-container">
        <div className="menu">
          <label>Solicitar Servicio</label> {/* Título de la página */}
        </div>

        <div className="form-and-map-container">
          <form className="form-container" onSubmit={handleSubmit}>
            {/* Formulario para ingresar datos del viaje */}
            <div className="input-group">
              <input
                id="startInput"
                type="text"
                placeholder="Ingresa origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)} // Actualiza el estado del origen
              />
            </div>
            <div className="input-group">
              <input
                id="endInput"
                type="text"
                placeholder="Ingresa destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)} // Actualiza el estado del destino
              />
            </div>
            {/* Tipo de Carrocería */}
            <div className="input-group">
              <select
                value={tipoCarroceria}
                onChange={(e) => {
                  setTipoCarroceria(e.target.value);
                  setTipoCarga(""); // Reset tipo carga cuando cambie carrocería
                }}
              >
                <option value="" disabled>Tipo de carrocería</option>
                <option value="furgon">Furgón</option>
                <option value="portacontenedor">Portacontenedor</option>
                <option value="volqueta">Volqueta</option>
                <option value="refrigerador">Refrigerador</option>
                <option value="carrotanque">Carrotanque</option>
                <option value="estacas">Estacas</option>
              </select>
            </div>

            {/* Tipo de carga */}
            <div className="input-group">
              <select
                value={tipoCarga}
                onChange={(e) => setTipoCarga(e.target.value)}
                disabled={tipoCarroceria === ""}
              >
                <option value="" disabled>Tipo de carga</option>
                {tiposDeCargaDisponibles.map((carga, index) => (
                  <option key={index} value={carga}>{carga}</option>
                ))}
              </select>
            </div>

            {/* Tamaño de vehículo */}
            <div className="input-group">
              <select
                value={tamanoVeh}
                onChange={(e) => setTamanoVeh(e.target.value)}
              >
                <option value="" disabled>Tamaño de vehículo</option>
                <option value="2_ejesP">2 Ejes llanta pequeña</option>
                <option value="2_ejesG">2 Ejes llanta grande</option>
                <option value="3_ejes">3 ó 4 Ejes</option>
                <option value="6_ejes">5 ó 6 Ejes</option>
              </select>
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Peso del cargamento (kg)"
                value={peso}
                onChange={(e) => setPeso(e.target.value)} // Actualiza el peso del cargamento
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Descripción del cargamento"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)} // Actualiza la descripción
              />
            </div>

            {/* Subir hasta 10 archivos */}
            <div className="input-group file-upload">
              <label>Fotos del cargamento:</label>
              <button
                type="button"
                className="button"
                disabled={evidencias.length >= 10}
                onClick={() => fileInputRef.current.click()} // Abre el selector de archivos
              >
                <svg className="svgIcon" viewBox="0 0 384 512">
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 
                    160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 
                    45.3 0L160 141.2V448c0 17.7 14.3 32 
                    32 32s32-14.3 32-32V141.2L329.4 
                    246.6c12.5 12.5 32.8 12.5 45.3 
                    0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange} // Maneja los archivos seleccionados
              />
            </div>

            {/* Lista de archivos seleccionados */}
            {evidencias.length > 0 && (
              <ul className="file-list">
                {evidencias.map((file, idx) => (
                  <li key={idx} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeEvidencia(idx)} // Elimina el archivo de la lista
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button type="submit" className="solicitar-btn">SOLICITAR</button>
          </form>

          <div className="map-container">
            <GoogleMapComponent
              startPoint={origen}
              endPoint={destino}
              setStartPoint={setOrigen}
              setEndPoint={setDestino}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SolicitarServicio;
