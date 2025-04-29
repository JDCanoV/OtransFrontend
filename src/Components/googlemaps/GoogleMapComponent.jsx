import './googlemapcomponent.css';
import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Home() {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);
  const mapRef = useRef(null);
  const [googleApi, setGoogleApi] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Cargar la API de Google Maps y configurarla
  useEffect(() => {
    const initMap = async () => {
      try {
        // Cargar la API de Google Maps
        const loader = new Loader({
          apiKey: "AIzaSyBRnZf_ARo6HvMx86Yjqg9tHar0Ou51vPo", // Asegúrate de reemplazar con tu API Key
          version: "weekly",
          libraries: ["places"], // Asegúrate de incluir la librería 'places' para el autocompletado
        });

        const googleInstance = await loader.load();
        setGoogleApi(googleInstance);

        const map = new googleInstance.maps.Map(mapRef.current, {
          center: { lat: 4.73245, lng: -74.26419 }, // Coordenadas por defecto (Bogotá)
          zoom: 10,
          mapTypeControl: true,
          streetViewControl: true,
        });

        // Servicios de direcciones y autocompletado
        const directionsServiceInstance = new googleInstance.maps.DirectionsService();
        const directionsRendererInstance = new googleInstance.maps.DirectionsRenderer({
          map,
        });

        // Configuración del autocompletado para restricciones de país (Colombia)
        const autocompleteInputStart = new googleInstance.maps.places.Autocomplete(document.getElementById("startInput"), {
          componentRestrictions: { country: "CO" }, // Restricción a Colombia
        });
        const autocompleteInputEnd = new googleInstance.maps.places.Autocomplete(document.getElementById("endInput"), {
          componentRestrictions: { country: "CO" }, // Restricción a Colombia
        });

        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);

        // Agregar eventos de autocompletado para actualizar los campos
        autocompleteInputStart.addListener("place_changed", () => {
          const place = autocompleteInputStart.getPlace();
          setStartPoint(place.formatted_address);
        });

        autocompleteInputEnd.addListener("place_changed", () => {
          const place = autocompleteInputEnd.getPlace();
          setEndPoint(place.formatted_address);
        });
      } catch (error) {
        console.error("Error al cargar Google Maps:", error);
      }
    };

    initMap();
  }, []);

  // Función para calcular la ruta
  const handleCalculateRoute = () => {
    if (!startPoint || !endPoint || !directionsService || !directionsRenderer || !googleApi) {
      alert("Por favor, ingresa tanto el punto de inicio como el destino.");
      return;
    }

    const request = {
      origin: startPoint,
      destination: endPoint,
      travelMode: googleApi.maps.TravelMode.DRIVING, // Modo de transporte (puedes cambiarlo a WALKING, BICYCLING, etc.)
      avoidHighways: false,
      avoidTolls: false,
    };

    directionsService.route(request, (result, status) => {
      if (status === googleApi.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);

        // Obtener detalles de la ruta
        const route = result.routes[0];
        const leg = route.legs[0];
        const distanceInKm = leg.distance.value / 1000; // Convertir metros a kilómetros
        const price = distanceInKm * 10000; // Precio estimado

        const routeData = {
          startAddress: leg.start_address,
          endAddress: leg.end_address,
          distance: leg.distance.text,
          duration: leg.duration.text,
          price: price,
        };

        setRouteInfo(routeData);
      } else {
        console.error("Error al calcular la ruta:", status);
        alert("Error al calcular la ruta: " + status);
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <div style={{ width: "45%" }}>
        <h1 className="form-title">
          Ingrese los puntos de inicio y destino
        </h1>

        {/* Campo de punto de inicio */}
        <div className="input-wrapper" style={{ marginBottom: "20px" }}>
          <input
            id="startInput"
            type="text"
            placeholder="Punto de partida"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
          />
        </div>

        {/* Campo de punto de destino */}
        <div className="input-wrapper" style={{ marginBottom: "20px" }}>
          <input
            id="endInput"
            type="text"
            placeholder="Punto de destino"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
          />
        </div>

        {/* Botón para calcular la ruta */}
        <button
          onClick={handleCalculateRoute}
          className="calculate-route-btn"
        >
          <span>Calcular Ruta</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 74 74"
            height="34"
            width="34"
          >
            <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
            <path
              fill="black"
              d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
            ></path>
          </svg>
        </button>

        {/* Mostrar información de la ruta */}
        {routeInfo && (
          <div className="route-info-container">
            <h3>Detalles de la Ruta</h3>
            <p><strong>Desde:</strong> {routeInfo.startAddress}</p>
            <p><strong>Hasta:</strong> {routeInfo.endAddress}</p>
            <p><strong>Distancia:</strong> {routeInfo.distance}</p>
            <p><strong>Duración:</strong> {routeInfo.duration}</p>
            <p><strong>Precio Estimado:</strong> ${routeInfo.price.toLocaleString()}</p>
          </div>
        )}

      </div>

      {/* Contenedor para el mapa */}
      <div style={{ width: "45%" }}>
        <div ref={mapRef} style={{ height: "700px", width: "100%", borderRadius: "25px" }} />
      </div>
    </div>
  );
}

export default Home;
