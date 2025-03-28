// App.js

import React from 'react';  // Importamos React
import Header from './Components/header/Navbar';  // Importamos el componente Header
import Hero from './Components/hero/Hero';  // Importamos el componente Hero
import Footer from './Components/footer/Footer';  // Importamos el componente Footer

// Componente principal de la app
function App() {
  return (
    <div>
      {/* Aquí se renderizan los componentes en orden */}
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default App; // Exportamos el componente para que lo pueda usar el index.js
