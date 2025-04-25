import React from "react";
import "./Footer.css";
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"; // Agregamos el CDN aquí

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><button className="link-button" onClick={() => alert('Centro de ayuda')}>Centro de ayuda</button></li>
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
          <button className="app-store">
            <i className="fab fa-apple"></i> App Store
          </button>
          <button className="play-store">
            <i className="fab fa-google-play"></i> Google Play
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
