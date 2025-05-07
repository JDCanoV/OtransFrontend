import React, { useState, useRef } from "react"; 
import "./SolicitarServicio.css"; 
import { useNavigate } from "react-router-dom"; 
import axios from "../../config/axiosConfig"; 
import HeaderEmpresa from "../../Header/HeaderEmpresa"; 
import GoogleMapComponent from "../../Components/googlemaps/GoogleMapComponent"; 

const SolicitarServicio = () => {
  const navigate = useNavigate();
  const [origen, setOrigen] = useState(""); 
  const [destino, setDestino] = useState(""); 
  const [tipoCarroceria, setTipoCarroceria] = useState("");  
  const [tamanoVeh, setTamanoVeh] = useState("");  
  const [tipoCarga, setTipoCarga] = useState(""); 
  const [peso, setPeso] = useState(""); 
  const [descripcion, setDescripcion] = useState(""); 
  const [evidencias, setEvidencias] = useState([]); 
  const [idCarga, setIdCarga] = useState(null); 
  const [price, setPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const fileInputRef = useRef(null); 

  const validTamanoVeh = ["2_ejesP", "2_ejesG", "3_ejes", "6_ejes"];
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

  const tiposDeCargaDisponibles = cargasPorCarroceria[tipoCarroceria] || [];

  // Tarifa por tipo de carrocería
  const carroceriaRates = {
    estacas: 12000,       // Estacas
    furgon: 16000,        // Furgón
    carrotanque: 22000,   // Carrotanque
    volqueta: 25000,      // Volqueta
    portacontenedor: 18000, // Portacontenedor
    refrigerador: 24000   // Refrigerador
  };

  const carroceriaNames = {
    estacas: 'Estacas',
    furgon: 'Furgón',
    carrotanque: 'Carrotanque',
    volqueta: 'Volqueta',
    portacontenedor: 'Portacontenedor',
    refrigerador: 'Refrigerador'
  };

  const calculatePrice = (km, min, tipoCarroceria) => {
    const baseFare = 10000;  // Tarifa base
    const perMinute = 200;   // Tarifa por minuto
    const perKm = carroceriaRates[tipoCarroceria] || carroceriaRates['estacas']; // Tarifa por carrocería
    return baseFare + km * perKm + min * perMinute;  // Cálculo del precio total
  };

  const uploadImages = async () => {
    if (evidencias.length === 0) {
      console.error("No se han seleccionado imágenes para cargar.");
      alert("Por favor, selecciona al menos una imagen.");
      return null; 
    }

    const formData = new FormData(); 
    evidencias.forEach((file, index) => {
      formData.append(`Imagen${index + 1}`, file);
    });

    try {
      console.log("Enviando imágenes al backend...");
      const response = await axios.post("/User/subir-imagenes-carga", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.idCarga) {
        console.log("Imágenes subidas con éxito. ID de carga:", response.data.idCarga);
        setIdCarga(response.data.idCarga);
        return response.data.idCarga;
      } else {
        console.error("La respuesta del servidor no contiene un IdCarga válido.");
        alert("Hubo un error al procesar las imágenes. Intenta nuevamente.");
        return null;
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
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

  const handleRouteCalculated = (distance, duration) => {
    // Convertir la distancia a kilómetros (especificando que la distancia está en metros)
    const distKm = distance.value / 1000;  // distance.value es en metros, lo convertimos a kilómetros

    // Asegurarnos de que la distancia esté en formato numérico con decimales (por ejemplo, 421.5 km)
    const distanceInKm = parseFloat(distKm.toFixed(2));  // Esto asegura que solo tengamos el valor numérico

    const durMin = duration.value / 60;  // Convertimos la duración a minutos
    const precio = calculatePrice(distanceInKm, durMin, tipoCarroceria);  // Calculamos el precio

    // Actualizamos el estado de la distancia y el precio
    setPrice(precio);
    setDistance(distanceInKm);  // Establecemos la distancia en kilómetros (como número)
    setDuration(duration.text);  // Establecemos la duración como texto (en minutos)
  };

  const validateForm = () => {
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

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const idCarga = await uploadImages();
    if (!idCarga) {
      alert("No se ha podido obtener el ID de carga.");
      return;
    }

    // Creamos el objeto con los datos del viaje, incluyendo distancia y precio calculados
    const viajeData = {
      origen,
      destino,
      tipoCarroceria,
      tamanoVeh,
      tipoCarga,
      peso,
      descripcion,
      idCarga,
      distancia: distance,  // Distancia como número
      precio: price.toString(),  // Convertimos el precio a string
      dto: ""  // Agrega aquí el campo dto (si es necesario, ajusta según lo que se espera)
    };

    try {
      // Enviamos los datos al backend
      const response = await axios.post("/user/registrarViaje", viajeData);
      if (response && response.data) {
        console.log("Viaje registrado con éxito:", response.data);
        navigate("/viajes");  // Redirige a la página de viajes
      } else {
        console.error("La respuesta del servidor no contiene datos válidos.");
        alert("Hubo un error al registrar el viaje. Intenta nuevamente.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error de respuesta del servidor:", error.response);
        if (error.response.status === 400) {
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const nuevas = [...evidencias, ...files].slice(0, 10);
    setEvidencias(nuevas);
    e.target.value = "";
  };

  const removeEvidencia = (idx) => {
    setEvidencias(evidencias.filter((_, i) => i !== idx));
  };

  return (
    <>
      <HeaderEmpresa />
      <div className="solicitar-servicio-container">
        <div className="menu">
          <label>Solicitar Servicio</label>
        </div>

        <div className="form-and-map-container">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                id="startInput"
                type="text"
                placeholder="Ingresa origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                id="endInput"
                type="text"
                placeholder="Ingresa destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              />
            </div>

            <div className="input-group">
              <select
                value={tipoCarroceria}
                onChange={(e) => {
                  setTipoCarroceria(e.target.value);
                  setTipoCarga(""); 
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
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Descripción del cargamento"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="input-group file-upload">
              <label>Fotos del cargamento:</label>
              <button
                type="button"
                className="button"
                disabled={evidencias.length >= 10}
                onClick={() => fileInputRef.current.click()}
              >
                <svg className="svgIcon" viewBox="0 0 384 512">
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            {evidencias.length > 0 && (
              <ul className="file-list">
                {evidencias.map((file, idx) => (
                  <li key={idx} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeEvidencia(idx)}
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
              onRouteCalculated={handleRouteCalculated}
            />
          </div>

          {price && (
            <div className="quote-container">
              <h3>Resumen de tu cotización</h3>
              <p><strong>Distancia:</strong> {distance}</p>
              <p><strong>Duración:</strong> {duration}</p>
              <p><strong>Precio estimado:</strong> {price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SolicitarServicio;
