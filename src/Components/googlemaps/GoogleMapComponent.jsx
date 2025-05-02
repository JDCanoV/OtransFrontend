import './googlemapcomponent.css';
import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function GoogleMapComponent({ startPoint, endPoint, setStartPoint, setEndPoint }) {
  const mapRef = useRef(null);
  const [googleApi, setGoogleApi] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Cargar la API de Google Maps
        const loader = new Loader({
          apiKey: "AIzaSyBRnZf_ARo6HvMx86Yjqg9tHar0Ou51vPo",  // Asegúrate de que esta sea tu clave de Google Maps
          version: "weekly",
          libraries: ["places"], // Asegúrate de incluir la librería 'places' para el autocompletado
        });

        const googleInstance = await loader.load();
        setGoogleApi(googleInstance);

        const map = new googleInstance.maps.Map(mapRef.current, {
          center: { lat: 4.73245, lng: -74.26419 }, // Coordenadas predeterminadas
          zoom: 10,
          mapTypeControl: true,
          streetViewControl: true,
        });

        // Servicios de direcciones y autocompletado
        const directionsServiceInstance = new googleInstance.maps.DirectionsService();
        const directionsRendererInstance = new googleInstance.maps.DirectionsRenderer({
          map,
        });

        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);

        // Configuración de Autocompletado
        const autocompleteInputStart = new googleInstance.maps.places.Autocomplete(
          document.getElementById("startInput"), 
          { componentRestrictions: { country: "CO" } }
        );
        const autocompleteInputEnd = new googleInstance.maps.places.Autocomplete(
          document.getElementById("endInput"), 
          { componentRestrictions: { country: "CO" } }
        );

        // Actualizar el estado de las direcciones cuando se selecciona una opción en el autocompletado
        autocompleteInputStart.addListener("place_changed", () => {
          const place = autocompleteInputStart.getPlace();
          setStartPoint(place.formatted_address);  // Actualizamos el punto de partida
        });

        autocompleteInputEnd.addListener("place_changed", () => {
          const place = autocompleteInputEnd.getPlace();
          setEndPoint(place.formatted_address);  // Actualizamos el punto de destino
        });
        
      } catch (error) {
        console.error("Error al cargar Google Maps:", error);
      }
    };

    initMap();
  }, []);

  // Función para calcular la ruta con debounce
  useEffect(() => {
    if (startPoint && endPoint && directionsService && directionsRenderer) {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      // Arrancamos el timeout para debounce
      const timeout = setTimeout(() => {
        setLoading(true);  // <<< Activamos el overlay

        const request = {
          origin: startPoint,
          destination: endPoint,
          travelMode: googleApi.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
        };

        directionsService.route(request, (result, status) => {
          if (status === googleApi.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Error al calcular la ruta:", status);
            alert("Error al calcular la ruta: " + status);
          }
          setLoading(false);  // <<< Desactivamos el overlay al terminar
        });
      }, 5000); // debounce de 5s

      setDebounceTimeout(timeout);
    }
  }, [startPoint, endPoint, directionsService, directionsRenderer, googleApi]);

  return (
    <div className="map-container">
      {loading && (
        <div className="loading-overlay">
          Calculando ruta…
        </div>
      )}
      <div ref={mapRef} className="map-element" />
    </div>
  );
}

export default GoogleMapComponent;