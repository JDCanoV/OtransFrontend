import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="nav-left">
            <div className="logo">Uber</div>
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="#" className="nav-link">Empresa</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Seguridad</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Ayuda</a>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="nav-buttons">
              <button className="language-btn"><i className="fas fa-globe"></i> ES</button>
              <button className="products-btn"><i className="fas fa-th"></i> Productos</button>
              <button className="login-btn">Iniciar sesión</button>
              <button className="signup-btn">Regístrate</button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Gana dinero conduciendo</h1>
            <p>Conduce cuando quieras y genera ganancias como conductor o repartidor.</p>
            <button className="cta-button">Regístrate para conducir</button>
            <a href="#" className="learn-more">Conoce más sobre cómo conducir y entregar ></a>
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
            <a href="#" className="link-button">Conoce más ></a>
          </div>
          <div className="feature">
            <i className="fas fa-users"></i>
            <h3>Nuestra compañía</h3>
            <p>Descubre cómo estamos cambiando el mundo del transporte.</p>
            <a href="#">Más información ></a>
          </div>
          <div className="feature">
            <i className="fas fa-newspaper"></i>
            <h3>Últimas noticias</h3>
            <p>Mantente al día con las últimas novedades de Uber.</p>
            <a href="#">Ver noticias ></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Ayuda</h4>
            <ul>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Acerca de nosotros</a></li>
              <li><a href="#">Cómo funciona Uber</a></li>
              <li><a href="#">Ciudades</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Productos</h4>
            <ul>
              <li><a href="#">Viajes</a></li>
              <li><a href="#">Uber Eats</a></li>
              <li><a href="#">Uber Business</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Social</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Privacidad</a>
            <a href="#">Accesibilidad</a>
            <a href="#">Términos</a>
          </div>
          <div className="app-buttons">
            <button className="app-store"><i className="fab fa-apple"></i> App Store</button>
            <button className="play-store"><i className="fab fa-google-play"></i> Google Play</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
