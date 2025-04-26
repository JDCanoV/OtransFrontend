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
      {/* Contenedor para los campos de dirección y botón */}
      <div style={{ width: "45%" }}>
        <h1>Ingrese los puntos de inicio y destino</h1>

        {/* Campo de punto de inicio */}
        <div style={{ marginBottom: "20px" }}>
          <input
            id="startInput"
            type="text"
            placeholder="Punto de partida"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Campo de punto de destino */}
        <div style={{ marginBottom: "20px" }}>
          <input
            id="endInput"
            type="text"
            placeholder="Punto de destino"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Botón para calcular la ruta */}
        <button
          onClick={handleCalculateRoute}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0088FF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Calcular Ruta
        </button>

        {/* Mostrar información de la ruta */}
        {routeInfo && (
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
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
        <div ref={mapRef} style={{ height: "500px", width: "100%", borderRadius: "12px" }} />
      </div>
    </div>
  );
}

export default Home;
