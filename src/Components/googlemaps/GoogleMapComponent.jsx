import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader"; // Importar el cargador de Google Maps

/**
 * Componente que implementa un mapa de Google con funcionalidad de rutas
 */
const GoogleMapComponent = () => {
  // Referencias y estados del componente
  const mapRef = useRef(null); // Referencia al elemento DOM del mapa
  const [map, setMap] = useState(null); // Estado para la instancia del mapa
  const [googleApi, setGoogleApi] = useState(null); // Estado para la API de Google Maps
  const [directionsService, setDirectionsService] = useState(null); // Servicio para calcular rutas
  const [directionsRenderer, setDirectionsRenderer] = useState(null); // Renderizador de rutas
  const [autocompleteService, setAutocompleteService] = useState(null); // Servicio de autocompletado
  const [placesService, setPlacesService] = useState(null); // Servicio de lugares
  const [startPoint, setStartPoint] = useState(""); // Punto de inicio
  const [endPoint, setEndPoint] = useState(""); // Punto de destino
  const [suggestions, setSuggestions] = useState([]); // Sugerencias de lugares
  const [activeSuggestions, setActiveSuggestions] = useState(false); // Control de visibilidad de sugerencias
  const [activeInput, setActiveInput] = useState(null); // Input activo actualmente
  const [routeInfo, setRouteInfo] = useState(null); // Información de la ruta

  // Efecto para inicializar el mapa y los servicios de Google
  useEffect(() => {
    const initMap = async () => {
      try {
        // Inicializar el cargador de Google Maps
        const loader = new Loader({
          apiKey: "AIzaSyBRnZf_ARo6HvMx86Yjqg9tHar0Ou51vPo", // Clave de API de Google Maps
          version: "weekly",
          libraries: ["places"] // Cargar biblioteca de lugares
        });

        // Cargar la API de Google Maps
        const googleInstance = await loader.load();
        setGoogleApi(googleInstance);

        // Crear instancia del mapa
        const mapInstance = new googleInstance.maps.Map(mapRef.current, {
          center: { lat: 4.73245, lng: -74.26419 }, // Centro en Bogotá
          zoom: 10,
          mapTypeControl: true,
          streetViewControl: true,
        });

        // Inicializar servicios de Google Maps
        const directionsServiceInstance = new googleInstance.maps.DirectionsService();
        const directionsRendererInstance = new googleInstance.maps.DirectionsRenderer({
          map: mapInstance
        });
        const autocompleteServiceInstance = new googleInstance.maps.places.AutocompleteService();
        const placesServiceInstance = new googleInstance.maps.places.PlacesService(mapInstance);

        // Guardar las instancias en el estado
        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
        setAutocompleteService(autocompleteServiceInstance);
        setPlacesService(placesServiceInstance);

        console.log("✅ Google Maps inicializado correctamente");
      } catch (error) {
        console.error("🚨 Error al inicializar Google Maps:", error);
      }
    };

    initMap();
  }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

  /**
   * Maneja las sugerencias de lugares mientras el usuario escribe
   * @param {string} query - Texto de búsqueda
   * @param {string} type - Tipo de input ('start' o 'end')
   */
  const handleSuggestions = async (query, type) => {
    if (!autocompleteService || query.length < 3 || !googleApi) {
      setSuggestions([]); // Si no hay suficiente texto, limpiar sugerencias
      return;
    }

    try {
      // Configurar la solicitud de predicciones
      const request = {
        input: query,
        componentRestrictions: { country: 'CO' }, // Restringir a Colombia
        types: ['geocode', 'establishment']
      };

      // Obtener predicciones de lugares
      const predictions = await new Promise((resolve, reject) => {
        autocompleteService.getPlacePredictions(request, (results, status) => {
          if (status === googleApi.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results); // Devuelve las predicciones si todo es correcto
          } else {
            resolve([]); // Si ocurre un error, devolver un array vacío
          }
        });
      });

      // Procesar y formatear las sugerencias
      const processedSuggestions = predictions.map(prediction => ({
        id: prediction.place_id,
        title: prediction.structured_formatting.main_text,
        address: prediction.structured_formatting.secondary_text,
        fullAddress: prediction.description
      }));

      setSuggestions(processedSuggestions); // Guardar las sugerencias procesadas
      setActiveSuggestions(true); // Activar la visibilidad de las sugerencias
      setActiveInput(type); // Establecer el tipo de input activo
    } catch (error) {
      console.error("🚨 Error al obtener sugerencias:", error);
      setSuggestions([]); // Si ocurre un error, limpiar las sugerencias
    }
  };

  /**
   * Maneja la selección de una sugerencia de lugar
   * @param {Object} suggestion - Sugerencia seleccionada
   * @param {string} type - Tipo de input ('start' o 'end')
   */
  const handleSuggestionSelect = async (suggestion, type) => {
    try {
      if (!placesService || !googleApi) return;

      // Obtener detalles del lugar seleccionado
      const placeDetails = await new Promise((resolve, reject) => {
        placesService.getDetails(
          { placeId: suggestion.id },
          (place, status) => {
            if (status === googleApi.maps.places.PlacesServiceStatus.OK) {
              resolve(place); // Devuelve los detalles del lugar si todo es correcto
            } else {
              reject(new Error("No se pudo obtener los detalles del lugar"));
            }
          }
        );
      });

      // Actualizar el punto de inicio o destino según corresponda
      if (type === 'start') {
        setStartPoint(suggestion.fullAddress);
      } else {
        setEndPoint(suggestion.fullAddress);
      }

      setActiveSuggestions(false); // Desactivar la visibilidad de las sugerencias
    } catch (error) {
      console.error("🚨 Error al seleccionar sugerencia:", error);
    }
  };

  /**
   * Calcula y muestra la ruta entre los puntos seleccionados
   */
  const calculateRoute = async () => {
    if (!startPoint || !endPoint || !directionsService || !directionsRenderer || !googleApi) {
      alert("Por favor ingresa tanto el punto de inicio como el destino");
      return;
    }

    try {
      // Configurar la solicitud de ruta
      const request = {
        origin: startPoint,
        destination: endPoint,
        travelMode: googleApi.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false,
      };

      // Calcular la ruta
      const result = await new Promise((resolve, reject) => {
        directionsService.route(request, (response, status) => {
          if (status === googleApi.maps.DirectionsStatus.OK) {
            resolve(response); // Devuelve la ruta si todo es correcto
          } else {
            reject(new Error(`Error al calcular la ruta: ${status}`)); // Si hay error, rechazar promesa
          }
        });
      });

      // Mostrar la ruta en el mapa
      directionsRenderer.setDirections(result);

      // Obtener detalles de la ruta
      const route = result.routes[0];
      const leg = route.legs[0];
      const distanceInKm = leg.distance.value / 1000;
      const precioRecomendado = distanceInKm * 10000;

      setRouteInfo({
        startAddress: leg.start_address,
        endAddress: leg.end_address,
        distance: leg.distance.text,
        duration: leg.duration.text,
        speed: ((leg.distance.value/1000)/(leg.duration.value/3600)).toFixed(2),
        price: precioRecomendado
      });

    } catch (error) {
      console.error("🚨 Error al calcular la ruta:", error);
      alert(error.message); // Mostrar mensaje de error si algo sale mal
    }
  };

  // Renderizado del componente
  return (
    <div>
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Punto de partida"
            value={startPoint}
            onChange={(e) => {
              setStartPoint(e.target.value);
              handleSuggestions(e.target.value, 'start');
            }}
            onFocus={() => setActiveInput('start')}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          {activeSuggestions && activeInput === 'start' && suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              zIndex: 1000,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion, 'start')}
                  style={{
                    padding: '10px',
                    borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                    cursor: 'pointer',
                    hover: {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{suggestion.title}</div>
                  <div style={{ fontSize: '0.9em', color: '#666' }}>{suggestion.address}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Punto de llegada"
            value={endPoint}
            onChange={(e) => {
              setEndPoint(e.target.value);
              handleSuggestions(e.target.value, 'end');
            }}
            onFocus={() => setActiveInput('end')}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          {activeSuggestions && activeInput === 'end' && suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              zIndex: 1000,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion, 'end')}
                  style={{
                    padding: '10px',
                    borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                    cursor: 'pointer',
                    hover: {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{suggestion.title}</div>
                  <div style={{ fontSize: '0.9em', color: '#666' }}>{suggestion.address}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={calculateRoute}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#0088FF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Calcular Ruta
        </button>
      </div>
      {routeInfo && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#0088FF', marginBottom: '10px' }}>
            Detalles de la Ruta
          </h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <p style={{ margin: '5px 0' }}>
              <strong>Desde:</strong> {routeInfo.startAddress}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Hasta:</strong> {routeInfo.endAddress}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Distancia:</strong> {routeInfo.distance}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Tiempo estimado:</strong> {routeInfo.duration}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Velocidad promedio:</strong> {routeInfo.speed} km/h
            </p>
            <p style={{ 
              margin: '5px 0', 
              fontSize: '1.2em', 
              color: '#0088FF', 
              fontWeight: 'bold' 
            }}>
              <strong>Precio Recomendado:</strong> ${routeInfo.price.toLocaleString('es-CO')} COP
            </p>
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "12px",
          marginTop: "20px",
          position: "relative"
        }}
      />
    </div>
  );
};

export default GoogleMapComponent;
