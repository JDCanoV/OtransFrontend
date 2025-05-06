import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import './googlemapcomponent.css';

function GoogleMapComponent({
  startPoint,
  endPoint,
  setStartPoint,
  setEndPoint,
  manual = false,
  routeRequested = false,
  onRouteCalculated       // <--- nuevo prop
}) {
  const mapRef = useRef(null);
  const [googleApi, setGoogleApi] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1) Inicializar mapa y autocomplete
  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyBRnZf_ARo6HvMx86Yjqg9tHar0Ou51vPo",
          version: "weekly",
          libraries: ["places"],
        });
        const google = await loader.load();
        setGoogleApi(google);

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 4.73245, lng: -74.26419 },
          zoom: 10,
        });

        const svc = new google.maps.DirectionsService();
        const rdr = new google.maps.DirectionsRenderer({ map });
        setDirectionsService(svc);
        setDirectionsRenderer(rdr);

        const acStart = new google.maps.places.Autocomplete(
          document.getElementById("startInput"),
          { componentRestrictions: { country: "CO" } }
        );
        const acEnd = new google.maps.places.Autocomplete(
          document.getElementById("endInput"),
          { componentRestrictions: { country: "CO" } }
        );

        acStart.addListener("place_changed", () => {
          const place = acStart.getPlace();
          place.formatted_address && setStartPoint(place.formatted_address);
        });
        acEnd.addListener("place_changed", () => {
          const place = acEnd.getPlace();
          place.formatted_address && setEndPoint(place.formatted_address);
        });
      } catch (error) {
        console.error("Error al cargar Google Maps:", error);
      }
    };
    initMap();
  }, [setStartPoint, setEndPoint]);

  // 2) Cálculo de ruta (auto o manual según prop)
  useEffect(() => {
    if (manual && !routeRequested) return;
    if (!startPoint || !endPoint || !directionsService || !directionsRenderer || !googleApi) {
      return;
    }

    setLoading(true);

    const delayRouteCalculation = setTimeout(() => {
      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: googleApi.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
        },
        (result, status) => {
          setLoading(false);
          if (status === googleApi.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            // enviamos distancia y duración al padre
            if (onRouteCalculated) {
              const leg = result.routes[0].legs[0];
              onRouteCalculated(leg.distance, leg.duration);
            }
          } else {
            console.error("Error al calcular la ruta:", status);
            alert("Error al calcular la ruta: " + status);
          }
        }
      );
    }, 5000);  // Retraso de 2 segundos (ajustable)

    // Limpiar el timeout si la ruta no es solicitada después de un cambio en los inputs
    return () => clearTimeout(delayRouteCalculation);

  }, [
    manual,
    routeRequested,
    startPoint,
    endPoint,
    googleApi,
    directionsService,
    directionsRenderer,
    onRouteCalculated
  ]);

  return (
    <div className="map-container">
      {loading && <div className="loading-overlay">Calculando ruta…</div>}
      <div ref={mapRef} className="map-element" />
    </div>
  );
}

export default GoogleMapComponent;
