// filepath: c:\Users\jdcan\Desktop\otransfrontend\OtransFrontend\src\Components\GoogleMapComponent.jsx
import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "35px", // Redondea las esquinas
  overflow: "hidden",
};

const initialCenter = {
  lat: 4.73245, // Latitud inicial
  lng: -74.26419, // Longitud inicial
};

const GoogleMapComponent = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(""); // Estado para la distancia
  const [mapCenter, setMapCenter] = useState(initialCenter); // Estado para el centro del mapa
  const mapRef = useRef(null); // Referencia al objeto del mapa

  const origin = { lat: 10.96854, lng: -74.78132 }; // Punto de partida
  const destination = { lat: 4.60971, lng: -74.08175 }; // Punto de destino

  // Opciones del mapa
  const mapOptions = {
    zoomControl: true, // Habilita el control de zoom
    scrollwheel: true, // Permite hacer zoom con la rueda del mouse
    draggable: true, // Permite arrastrar el mapa
    disableDefaultUI: false, // Muestra los controles predeterminados
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBRnZf_ARo6HvMx86Yjqg9tHar0Ou51vPo"> {/* Reemplaza YOUR_API_KEY con tu clave de API */}
      <div style={{ position: "relative", height: "100%" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter} // Usa el estado dinámico para el centro
          zoom={14}
          options={mapOptions} // Aplica las opciones al mapa
          onLoad={(map) => (mapRef.current = map)} // Guarda la referencia al mapa
          onDragEnd={() => {
            if (mapRef.current) {
              const newCenter = {
                lat: mapRef.current.getCenter().lat(),
                lng: mapRef.current.getCenter().lng(),
              };
              setMapCenter(newCenter); // Actualiza el centro dinámicamente
            }
          }}
        >
          {/* Servicio de direcciones para calcular la ruta */}
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: "DRIVING", // Opciones: DRIVING, WALKING, BICYCLING, TRANSIT
            }}
            callback={(response) => {
              if (response !== null && response.status === "OK") {
                setDirectionsResponse(response); // Guarda la respuesta de la API

                // Calcula la distancia total
                const legs = response.routes[0].legs;
                const totalDistance = legs.reduce((sum, leg) => sum + leg.distance.value, 0); // En metros
                setDistance((totalDistance / 1000).toFixed(2) + " km"); // Convierte a kilómetros
              } else {
                console.error("Error al calcular la ruta:", response);
              }
            }}
          />

          {/* Renderiza la ruta en el mapa */}
          {directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
              }}
            />
          )}
        </GoogleMap>

        {/* Muestra la distancia */}
        <div style={{ position: "absolute", top: 10, left: 10, background: "white", padding: "10px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
          <h4>Distancia de la ruta:</h4>
          <p>{distance}</p>
        </div>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;