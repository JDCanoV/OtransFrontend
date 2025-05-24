import React, { useState } from 'react';
import styles from './IndexTransportista.module.css';
import HeaderTrans from "../../Header/HeaderTrans";
import GoogleMapComponent from '../../Components/googlemaps/GoogleMapComponent';
import Camionero from '../../Imagenes/Camionero.png';


const IndexTransportista = () => {
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
      <HeaderTrans />
      <div className={styles.otransLanding}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2>¡BIENVENIDO! Conduce</h2>
            <h2>
              hacia tu próxima <br /> oportunidad con <span>Otrans</span>
            </h2>
            <p className={styles.sub}>Recoge cargas donde estés, cuando quieras</p>
          </div>
          <div className={styles.heroImage}>
            <img src={Camionero} alt="Camionero" className={styles.image} />
          </div>
        </section>

        <section className={styles.requirements}>
          <h3>Cotiza tu próximo viaje</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}>
              <div className={styles.inputGroup}>
                <label>Ubicación de salida</label>
                <input type="text" value={origen} onChange={e => setOrigen(e.target.value)} placeholder="Ej: Calle 123, Bogotá" />
              </div>
              <div className={styles.inputGroup}>
                <label>Ubicación de llegada</label>
                <input type="text" value={destino} onChange={e => setDestino(e.target.value)} placeholder="Ej: Carrera 45, Bogotá" />
              </div>
              <div className={styles.inputGroup}>
                <label>Tipo de camión</label>
                <select value={truckType} onChange={e => setTruckType(e.target.value)}>
                  <option value="">Selecciona un tipo de camión</option>
                  <option value="small">Camión pequeño</option>
                  <option value="medium">Camión mediano</option>
                  <option value="large">Camión grande</option>
                </select>
              </div>
              <button className={styles.btnPrimary} onClick={handleCotizar} disabled={!origen || !destino || !truckType || routeRequested}>
                {routeRequested ? 'Calculando…' : 'Cotizar viaje'}
              </button>
              {quote && (
                <div className={styles.quoteBox}>
                  <h4>Resumen de la cotización</h4>
                  <p><strong>Tipo de camión:</strong> {truckTypeNames[quote.truckType]}</p>
                  <p><strong>Distancia:</strong> {quote.distanceText}</p>
                  <p><strong>Duración:</strong> {quote.durationText}</p>
                  <p><strong>Precio estimado:</strong> {quote.priceText}</p>
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: '300px' }}>
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

        
      </div>
    </>
  );
};

export default IndexTransportista;
