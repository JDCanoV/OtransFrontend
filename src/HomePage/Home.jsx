import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HereMapComponent from '../Components/heremaps/HereMapComponent';
import PlaceInputs from '../Components/placeinputs/PlaceInputs';
import './Home.css';

function Home() {
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  return (
    <div className="home-wrapper">
      <Header />

      <main>
        <section className="hero">
          <div className="hero-left">
            <h1>Otrans</h1>
            <PlaceInputs
              setOriginCoords={setOriginCoords}
              setDestinationCoords={setDestinationCoords}
            />
            <button className="cta-button">Ver precios</button>
          </div>

          <div className="hero-right" style={{ height: '400px' }}>
            <HereMapComponent
              originCoords={originCoords}
              destinationCoords={destinationCoords}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
