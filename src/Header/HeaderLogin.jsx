import React from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import './HeaderLogin.css'; // Asegúrate de importar el CSS
import logo from '../../src/Imagenes/Otrans.png'; // Importa la imagen

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        {/* Usa Link para hacer el logo clickeable y redirigir */}
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo Otrans" className="logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
