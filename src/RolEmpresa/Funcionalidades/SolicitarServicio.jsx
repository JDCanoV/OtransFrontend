import React, { useState } from "react";
import "./SolicitarServicio.css"; // Asegúrate de importar el CSS correspondiente
import { useNavigate } from "react-router-dom";
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import axios from "../../config/axiosConfig"; // Importa axios

const SolicitarServicio = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCarroceria, setTipoCarroceria] = useState("");
  const [tipo, setTipoCarga] = useState("");
  const [tamanoVehiculo, setTamanoVehiculo] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);  // Para mostrar un estado de carga si es necesario
  const navigate = useNavigate();

  // Opciones de carga por carrocería
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

  // Manejo del envío del formulario
  const handleSubmit = async () => {
    setLoading(true); // Activamos el estado de carga

    // Preparando los datos a enviar al backend
    const viajeData = {
      Origen: origen,
      Destino: destino,
      Tipo: tipo,
      Peso: peso,
      Fecha: new Date().toISOString(), // Fecha actual
    };

    try {
      // Enviar los datos al backend con Axios
      const response = await axios.post(
        "https://localhost:7229/api/User/registrarViaje", // URL de la API
        viajeData
      );

      // Si la respuesta es exitosa, redirige al usuario
      if (response.status === 200) {
        console.log("Viaje registrado con éxito:", response.data);
        navigate("/indexEmpresa"); // Redirige a la página de inicio de la empresa
      }
    } catch (error) {
      console.log(viajeData)
      console.error("Error al registrar el viaje:", error);
      alert("Error al registrar el viaje. Por favor intente nuevamente.");
    } finally {
      setLoading(false);  // Desactivamos el estado de carga
    }
  };

  return (
    <>
      <HeaderEmpresa />
      <div className="solicitar-servicio-container">
        <div className="menu">
          <label>Solicitar Servicio</label>
        </div>
        <div className="form-and-map-container">
          <div className="form-container">
            {/* Origen */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Ingresa origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </div>

            {/* Destino */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Ingresa destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              />
            </div>

            {/* Tipo de carrocería */}
            <div className="input-group">
              <select
                value={tipoCarroceria}
                onChange={(e) => {
                  setTipoCarroceria(e.target.value);
                  setTipoCarga(""); // Reset tipo carga cuando cambie carrocería
                }}
              >
                <option value="" disabled>
                  Tipo de carrocería
                </option>
                <option value="furgon">Furgón</option>
                <option value="portacontenedor">Portacontenedor</option>
                <option value="volqueta">Volqueta</option>
                <option value="refrigerador">Refrigerador</option>
                <option value="carrotanque">Carrotanque</option>
                <option value="estacas">Estacas</option>
              </select>
            </div>

            {/* Tamaño de vehículo */}
            <div className="input-group">
              <select
                value={tamanoVehiculo}
                onChange={(e) => setTamanoVehiculo(e.target.value)}
              >
                <option value="" disabled>
                  Tamaño de vehículo
                </option>
                <option value="2_ejesP">2 Ejes llanta pequeña</option>
                <option value="2_ejesG">2 Ejes llanta grande</option>
                <option value="3_ejes">3 ó 4 Ejes</option>
                <option value="6_ejes">5 ó 6 Ejes</option>
              </select>
            </div>

            {/* Tipo de carga */}
            <div className="input-group">
              <select
                value={tipo}
                onChange={(e) => setTipoCarga(e.target.value)}
                disabled={!tipoCarroceria} // desactiva si no han seleccionado carrocería
              >
                <option value="" disabled>
                  Tipo de Carga
                </option>
                {tiposDeCargaDisponibles.map((carga, index) => (
                  <option key={index} value={carga}>
                    {carga}
                  </option>
                ))}
              </select>
            </div>

            {/* Peso */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Ingrese peso del cargamento (kilogramos)"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>

            {/* Descripción */}
            <div className="input-group">
              <textarea
                placeholder="Ingresa descripción del cargamento"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {/* Botón de enviar */}
            <button className="solicitar-btn" onClick={handleSubmit}>
              {loading ? "Cargando..." : "SOLICITAR"}
            </button>
          </div>

          <div className="map-container">
            <div className="file-upload">
              <label>Evidencias del cargamento</label>
              <button className="cargar-btn">CARGAR</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolicitarServicio;