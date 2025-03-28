// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Aquí van tus estilos globales
import App from './App'; // Importamos el componente principal de nuestra app

// React.StrictMode ayuda a identificar problemas durante el desarrollo
ReactDOM.render(
  <React.StrictMode>
    <App />  {/* Renderizamos la app aquí */}
  </React.StrictMode>,
  document.getElementById('root')  // Este es el div con el id="root" en tu index.html
);
