import React from "react";
import "./Hero.css"; // Importas el CSS de la sección Hero

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Gana dinero conduciendo</h1>
        <p>
          Conduce cuando quieras y genera ganancias como conductor o repartidor.
        </p>
        <button className="cta-button">Regístrate para conducir</button>
        <button className="learn-more" onClick={() => alert('Learn more clicked!')}>Conoce más sobre cómo conducir y entregar</button>
      </div>
      <div className="hero-image">
        <img src="driver.jpg" alt="Conductor Uber" />
      </div>
    </section>
  );
};

export default Hero;
