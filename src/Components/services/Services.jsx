import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <section className="services">
      <div className="service-card">
        <img src="ride.jpg" alt="Viaje Uber" />
        <h2>Pide un viaje ahora</h2>
        <p>Solicita un viaje en cualquier momento y a cualquier lugar.</p>
        <button className="service-btn">Solicitar viaje</button>
      </div>
      <div className="service-card">
        <img src="delivery.jpg" alt="Uber Eats" />
        <h2>Pide comida a domicilio</h2>
        <p>Los restaurantes que te encantan, a domicilio.</p>
        <button className="service-btn">Pedir ahora</button>
      </div>
      <div className="service-card">
        <img src="business.jpg" alt="Uber Business" />
        <h2>Uber para Empresas</h2>
        <p>Transforma la manera en que tu empresa se mueve.</p>
        <button className="service-btn">Conoce más</button>
      </div>
    </section>
  );
};

export default Services;
