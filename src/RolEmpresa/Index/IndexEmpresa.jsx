import React, { useState } from 'react';
import styles from './IndexEmpresa.module.css'; // CSS módulo
import { useNavigate } from "react-router-dom";
import HeaderEmpresa from "../../Header/HeaderEmpresa";
import GoogleMapComponent from '../../Components/googlemaps/GoogleMapComponent';
import Carga from '../../Imagenes/Carga.png';

const IndexEmpresa = () => {
  const navigate = useNavigate();

  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [truckType, setTruckType] = useState('');
  const [routeRequested, setRouteRequested] = useState(false);
  const [quote, setQuote] = useState(null);

  const truckTypeRates = {
    small: 12000,
    medium: 16000,
    large: 22000,
  };

  const truckTypeNames = {
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
  };

  const calculatePrice = (km, min, type) => {
    const baseFare = 10000;
    const perMinute = 200;
    const perKm = truckTypeRates[type] || truckTypeRates.small;
    return baseFare + km * perKm + min * perMinute;
  };

  const handleCotizar = () => {
    if (!origen || !destino || !truckType) return;
    setQuote(null);
    setRouteRequested(true);
  };

  const handleRouteCalculated = (distance, duration) => {
    const distKm = distance.value / 1000;
    const durMin = duration.value / 60;
    const price = calculatePrice(distKm, durMin, truckType);
    setQuote({
      truckType,
      distanceText: distance.text,
      durationText: duration.text,
      priceText: price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
    });
    setRouteRequested(false);
  };

  return (
   <>
  <HeaderEmpresa />

  <div className={styles.otransLanding}>
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h2>Optimiza el Transporte de Tu Carga con Otrans</h2> 
        <p className={styles.sub}>
          Con Otrans, tu empresa podrá mejorar la eficiencia en la gestión logística, conectando con una red de transportistas disponibles en todo el país, segura, todo desde un solo lugar.
        </p>

        
      </div>

      <div className={styles.heroImage}>
        <img src={Carga} alt="Carga" />
      </div>
    </section>

    {/* CONTENEDOR FLEX: FORMULARIO Y MAPA */}
    <div className={styles.cotizacionContainer}>
      <section className={styles.cotizacionSection}>
        <h3>Cotiza tu viaje en Otrans</h3>

        <div className={styles.inputGroup}>
          <label>Ubicación de salida</label>
          <input
            type="text"
            placeholder="Ej. Calle 123, Bogotá"
            value={origen}
            onChange={e => setOrigen(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Ubicación de llegada</label>
          <input
            type="text"
            placeholder="Ej. Carrera 45, Bogotá"
            value={destino}
            onChange={e => setDestino(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Tipo de camión</label>
          <select
            value={truckType}
            onChange={e => setTruckType(e.target.value)}
          >
            <option value="" disabled>Selecciona un tipo de camión</option>
            <option value="small">Camión pequeño</option>
            <option value="medium">Camión mediano</option>
            <option value="large">Camión grande</option>
          </select>
        </div>

        <button
          className={styles.btnPrimary}
          onClick={handleCotizar}
          disabled={!origen || !destino || !truckType || routeRequested}
        >
          {routeRequested ? 'Calculando…' : 'Cotizar viaje'}
        </button>

        {quote && (
          <div className={styles.quoteBox}>
            <h4>Resumen de tu cotización</h4>
            <p><strong>Tipo de camión:</strong> {truckTypeNames[quote.truckType]}</p>
            <p><strong>Distancia:</strong> {quote.distanceText}</p>
            <p><strong>Duración:</strong> {quote.durationText}</p>
            <p><strong>Precio estimado:</strong> {quote.priceText}</p>
          </div>
        )}
      </section>

      <section className={styles.mapaSection}>
        <GoogleMapComponent
          startPoint={origen}
          endPoint={destino}
          setStartPoint={setOrigen}
          setEndPoint={setDestino}
          manual={true}
          routeRequested={routeRequested}
          onRouteCalculated={handleRouteCalculated}
        />
      </section>
    </div>
  </div>
</>

  );
};

export default IndexEmpresa;
