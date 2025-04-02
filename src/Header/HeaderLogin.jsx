import React from "react";
import './HeaderLogin.css'; // Asegúrate de importar el CSS
import logo from '../../src/Imagenes/Otrans.png'; // Importa la imagen

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo Otrans" className="logo" /> {/* Usamos la imagen importada */}
      </div>
    </header>
  );
};

export default Header;
