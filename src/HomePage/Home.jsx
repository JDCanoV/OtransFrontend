import React, { useState } from 'react';
import Header from '../Header/Header';
import GoogleMapComponent from '../Components/googlemaps/GoogleMapComponent';
import './Home.css';

function Home() {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [routeRequested, setRouteRequested] = useState(false);
  const [quote, setQuote] = useState(null);

  const calculatePrice = (km, min) => {
    const baseFare = 10000;
    const perKm = 15000;
    const perMinute = 200;
    return baseFare + km * perKm + min * perMinute;
  };

  const handleCotizar = () => {
    if (!origen || !destino) return;
    setQuote(null);
    setRouteRequested(true);
  };

  const handleRouteCalculated = (distance, duration) => {
    const distKm = distance.value / 1000;
    const durMin = duration.value / 60;
    const price = calculatePrice(distKm, durMin);
    setQuote({
      distanceText: distance.text,
      durationText: duration.text,
      priceText: price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
    });
    setRouteRequested(false);
  };

  const onOrigenChange = e => {
    setOrigen(e.target.value);
    setRouteRequested(false);
    setQuote(null);
  };
  const onDestinoChange = e => {
    setDestino(e.target.value);
    setRouteRequested(false);
    setQuote(null);
  };

  return (
    <div className="home-wrapper">
      <Header />
      <main>
        <section className="map-section">
          <div className="map-content">
            <div className="map-controls">
              <h2 className="controls-title">Cotiza tu viaje en Otrans</h2>

              <div className="input-group">
                <label htmlFor="startInput">Ubicación de salida</label>
                <input
                  id="startInput"
                  type="text"
                  placeholder="Ej. Calle 123, Bogotá"
                  value={origen}
                  onChange={onOrigenChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="endInput">Ubicación de llegada</label>
                <input
                  id="endInput"
                  type="text"
                  placeholder="Ej. Carrera 45, Bogotá"
                  value={destino}
                  onChange={onDestinoChange}
                />
              </div>
              <button
                className="calcular-btn"
                onClick={handleCotizar}
                disabled={!origen || !destino || routeRequested}
              >
                {routeRequested ? 'Calculando…' : 'Cotizar viaje'}
              </button>

              {quote && (
                <div className="quote-container">
                  <h3>Resumen de tu cotización</h3>
                  <p><strong>Distancia:</strong> {quote.distanceText}</p>
                  <p><strong>Duración:</strong> {quote.durationText}</p>
                  <p><strong>Precio estimado:</strong> {quote.priceText}</p>
                </div>
              )}
            </div>

            <div className="map-container">
              <GoogleMapComponent
                startPoint={origen}
                endPoint={destino}
                setStartPoint={setOrigen}
                setEndPoint={setDestino}
                manual={true}
                routeRequested={routeRequested}
                onRouteCalculated={handleRouteCalculated}
              />
            </div>
          </div>
        </section>

        {/* Sección de servicios */}
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
            <p>Mantente al día con las últimas novedades de Uber.</p>
            <a href="#">Ver noticias &gt;</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
