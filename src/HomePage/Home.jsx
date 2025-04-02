import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Home.css'; // Asegúrate de tener estilos

function Home() {
  return (
    <div className="home-wrapper">
      <Header />

      <main>
        

        <section className="hero">
          <div className="hero-content">
            <h1>Gana dinero conduciendo</h1>
            <p>Conduce cuando quieras y genera ganancias como conductor o repartidor.</p>
            <button className="cta-button">Regístrate para conducir</button>
            <a href="#" className="learn-more">Conoce más sobre cómo conducir y entregar &gt;</a>
          </div>
          <div className="hero-image">
            <img src="driver.jpg" alt="Conductor Uber" />
          </div>
        </section>

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

      <Footer />
    </div>
  );
}

export default Home;
