import React, { useState } from 'react';
import Header from '../Header/Header'; // Importa el componente Header
import GoogleMapComponent from '../Components/googlemaps/GoogleMapComponent'; // Importa el componente para mostrar el mapa
import './Home.css'; // Importa el archivo de estilos CSS

function Home() {
  // Declaración de estados para manejar los valores de la interfaz de usuario
  const [origen, setOrigen] = useState('');  // Ubicación de origen
  const [destino, setDestino] = useState('');  // Ubicación de destino
  const [truckType, setTruckType] = useState('');  // Tipo de camión seleccionado
  const [routeRequested, setRouteRequested] = useState(false);  // Si la ruta ha sido solicitada
  const [quote, setQuote] = useState(null);  // Resumen de la cotización

  // Tarifas base por kilómetro según el tipo de camión
  const truckTypeRates = {
    small: 12000,   // Camión pequeño
    medium: 16000,  // Camión mediano
    large: 22000,   // Camión grande
  };

  // Nombres legibles para mostrar en el resumen de la cotización
  const truckTypeNames = {
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
  };

  // Función para calcular el precio total en base a la distancia y duración
  const calculatePrice = (km, min, type) => {
    const baseFare = 10000;  // Tarifa base
    const perMinute = 200;   // Tarifa por minuto
    const perKm = truckTypeRates[type] || truckTypeRates.small; // Tarifa por kilómetro según el tipo de camión
    return baseFare + km * perKm + min * perMinute;  // Cálculo del precio total
  };

  // Función que se ejecuta al hacer clic en el botón "Cotizar viaje"
  const handleCotizar = () => {
    if (!origen || !destino || !truckType) return;  // Verifica si falta información
    setQuote(null);  // Resetea la cotización
    setRouteRequested(true);  // Marca que se ha solicitado la ruta
  };

  // Función que maneja la respuesta del cálculo de la ruta
  const handleRouteCalculated = (distance, duration) => {
    const distKm = distance.value / 1000;  // Convierte la distancia a kilómetros
    const durMin = duration.value / 60;  // Convierte la duración a minutos
    const price = calculatePrice(distKm, durMin, truckType);  // Calcula el precio
    setQuote({
      truckType,
      distanceText: distance.text,  // Texto con la distancia
      durationText: duration.text,  // Texto con la duración
      priceText: price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),  // Precio formateado en COP
    });
    setRouteRequested(false);  // Resetea la solicitud de ruta
  };

  // Función para manejar los cambios en la ubicación de origen
  const onOrigenChange = e => {
    setOrigen(e.target.value);  // Actualiza la ubicación de origen
    setRouteRequested(false);  // Resetea la solicitud de ruta
    setQuote(null);  // Resetea la cotización
  };

  // Función para manejar los cambios en la ubicación de destino
  const onDestinoChange = e => {
    setDestino(e.target.value);  // Actualiza la ubicación de destino
    setRouteRequested(false);  // Resetea la solicitud de ruta
    setQuote(null);  // Resetea la cotización
  };

  return (
    <div className="home-wrapper">
      <Header />  {/* Componente de cabecera */}
      <main>
        <section className="map-section">
          <div className="map-content">
            <div className="map-controls">
              <h2 className="controls-title">Cotiza tu viaje en Otrans</h2>

              {/* Sección de entrada para la ubicación de origen */}
              <div className="input-group">
                <label htmlFor="startInput">Ubicación de salida</label>
                <input
                  id="startInput"
                  type="text"
                  placeholder="Ej. Calle 123, Bogotá"
                  value={origen}  // El valor de la ubicación de origen
                  onChange={onOrigenChange}  // Actualiza el estado al cambiar el texto
                />
              </div>

              {/* Sección de entrada para la ubicación de destino */}
              <div className="input-group">
                <label htmlFor="endInput">Ubicación de llegada</label>
                <input
                  id="endInput"
                  type="text"
                  placeholder="Ej. Carrera 45, Bogotá"
                  value={destino}  // El valor de la ubicación de destino
                  onChange={onDestinoChange}  // Actualiza el estado al cambiar el texto
                />
              </div>

              {/* Sección de selección del tipo de camión */}
              <div className="input-group">
                <label htmlFor="truckType">Tipo de camión</label>
                <select
                  id="truckType"
                  value={truckType}  // El valor del tipo de camión seleccionado
                  onChange={e => {
                    setTruckType(e.target.value);  // Actualiza el tipo de camión
                    setRouteRequested(false);  // Resetea la solicitud de ruta
                    setQuote(null);  // Resetea la cotización
                  }}
                >
                  <option value="" disabled>Selecciona un tipo de camión</option>
                  <option value="small">Camión pequeño</option>
                  <option value="medium">Camión mediano</option>
                  <option value="large">Camión grande</option>
                </select>
              </div>

              {/* Botón para calcular la cotización */}
              <button
                className="calcular-btn"
                onClick={handleCotizar}  // Llama a la función de cotización
                disabled={!origen || !destino || !truckType || routeRequested}  // Desactiva el botón si falta información o si ya se está calculando
              >
                {routeRequested ? 'Calculando…' : 'Cotizar viaje'}  {/* Cambia el texto según el estado */}
              </button>

              {/* Muestra el resumen de la cotización si está disponible */}
              {quote && (
                <div className="quote-container">
                  <h3>Resumen de tu cotización</h3>
                  <p><strong>Tipo de camión:</strong> {truckTypeNames[quote.truckType]}</p>
                  <p><strong>Distancia:</strong> {quote.distanceText}</p>
                  <p><strong>Duración:</strong> {quote.durationText}</p>
                  <p><strong>Precio estimado:</strong> {quote.priceText}</p>
                </div>
              )}
            </div>

            {/* Componente para mostrar el mapa y calcular la ruta */}
            <div className="map-container">
              <GoogleMapComponent
                startPoint={origen}  // Pasa el valor de origen
                endPoint={destino}  // Pasa el valor de destino
                setStartPoint={setOrigen}  // Función para actualizar el origen
                setEndPoint={setDestino}  // Función para actualizar el destino
                manual={true}  // Permite la modificación manual de las ubicaciones
                routeRequested={routeRequested}  // Indica si se ha solicitado el cálculo de la ruta
                onRouteCalculated={handleRouteCalculated}  // Callback para manejar la respuesta del cálculo de la ruta
              />
            </div>
          </div>
        </section>

        {/* Sección de servicios adicionales */}
        <section className="services">
          <div className="service-card">
            <img src="ride.jpg" alt="Viaje Otrans" />
            <h2>Pide un viaje ahora</h2>
            <p>Solicita un viaje en cualquier momento y a cualquier lugar.</p>
            <button className="service-btn">Solicitar viaje</button>
          </div>
          <div className="service-card">
            <img src="delivery.jpg" alt="Otrans Eats" />
            <h2>Pide comida a domicilio</h2>
            <p>Los restaurantes que te encantan, a domicilio.</p>
            <button className="service-btn">Pedir ahora</button>
          </div>
          <div className="service-card">
            <img src="business.jpg" alt="Otrans Business" />
            <h2>Otrans para Empresas</h2>
            <p>Transforma la manera en que tu empresa se mueve.</p>
            <button className="service-btn">Conoce más</button>
          </div>
        </section>

        {/* Sección de características */}
        <section className="features">
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Tu seguridad es importante</h3>
            <p>Comprometidos con tu seguridad, donde sea que vayas.</p>
            <a href="#" className="link-button">Conoce más &gt;</a>
          </div>
          <div className="feature">
            <i className="fas fa-users"></i>
            <h3>Nuestra compañía</h3>
            <p>Descubre cómo estamos cambiando el mundo del transporte.</p>
            <a href="#">Más información &gt;</a>
          </div>
          <div className="feature">
            <i className="fas fa-newspaper"></i>
            <h3>Últimas noticias</h3>
            <p>Mantente al día con las últimas novedades de Otrans.</p>
            <a href="#">Ver noticias &gt;</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home; // Exporta el componente Home
