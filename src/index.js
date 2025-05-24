import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './config/PrivateRoute';  // Asegúrate de importar el PrivateRoute
import { AuthProvider } from "./context/authContext"; // Asegúrate de importar el AuthProvider

import Home from './HomePage/Home';
import Login from './Login/Login';
import RegisterVehiculo from './Register/RegisterVehiculo';
import RegisterEmpresa from './Register/RegisterEmpresa';
import Recuperar from './RecuperarContra/Recuperar';
import IndexEmpresa from './RolEmpresa/Index/IndexEmpresa';
import InfoEmpresa from './RolEmpresa/Index/InfoEmpresa';
import SolicitarServicio from './RolEmpresa/Funcionalidades/SolicitarServicio';
import Viaje from './RolTransportista/Funcionalidades/Viaje';
import GuiaServicio from './RolTransportista/Funcionalidades/GuiaServicio';
import Viajes from './RolEmpresa/Funcionalidades/Viajes';
import Ofrecemos from './QuienSomos/Ofrecemos';
import Ofertas from './QuienSomos/Ofertas';
import Calificaciones from './RolEmpresa/Funcionalidades/Calificaciones';
import CalificacionesT from './RolTransportista/Funcionalidades/CalificacionesT';
import Detalle from './RolEmpresa/Funcionalidades/Detalle';
import UsuariosPendientes from './RolAdministrador/Funcionalidades/UsuariosPendientes'; 
import UsuarioDetalle from './RolAdministrador/Funcionalidades/UsuarioDetalle';
import Reporte from './RolAdministrador/Funcionalidades/Reporte';
import IndexTransportista from './RolTransportista/Index/IndexTransportista';
import InfoTransportista from './RolTransportista/Index/InfoTransportista';
import ViajeInfo from './RolTransportista/Funcionalidades/ViajeInfo';





import RegisterSelection from "./Register/RegisterSelection";
import RegisterCamionero from "./Register/RegisterCamionero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar" element={<Recuperar />} />
          <Route path="/indexTransportista" element={<IndexTransportista />} />
          <Route path="/infoTransportista" element={<InfoTransportista />} />
          <Route path="/indexEmpresa" element={<IndexEmpresa/>} />
          <Route path="/infoEmpresa" element={<InfoEmpresa/>} />
          <Route path="/register" element={<RegisterSelection />} />
          <Route path="/registerEmpresa" element={<RegisterEmpresa />} />
          <Route path="/registerTransportista" element={<RegisterCamionero />} />
          <Route path="/registervehiculo" element={<RegisterVehiculo />} />
          <Route path="/viaje" element={<Viaje />} />
          <Route path="/detalle/:idViaje" element={<Detalle viajes={Viajes} />} />
          <Route path="/viajes" element={<Viajes />} />
          <Route path="/solicitarServicio" element={<SolicitarServicio />} />
          <Route path="/usuariosPendientes" element={<UsuariosPendientes />} />
          <Route path="/Reporte" element={<Reporte />} />
          <Route path="/usuarioDetalle/:id" element={<UsuarioDetalle />} />     
          <Route path="/ofrecemos" element={<Ofrecemos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route element={<PrivateRoute allowedRoles={[3]} />}>       
          <Route path="/ofrecemos" element={<Ofrecemos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/calificaciones" element={<Calificaciones />} />
         
          </Route>

          {/* Rutas protegidas para 'transportista' */}
          <Route element={<PrivateRoute allowedRoles={[2]} />}>
            
            <Route path="/calificacionesT" element={<CalificacionesT />} />
            <Route path="/guiaServicio" element={<GuiaServicio />} />
            <Route path="/viajeInfo" element={<ViajeInfo />} />
          </Route>

          {/* Rutas protegidas para 'admin' */}
          <Route element={<PrivateRoute allowedRoles={[1]} />}>
          
            <Route path="/calificacionesT" element={<CalificacionesT />} />
            <Route path="/guiaServicio" element={<GuiaServicio />} />
           
            
         
            <Route path="/calificaciones" element={<Calificaciones />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar" element={<Recuperar />} />
           
            <Route path="/register" element={<RegisterSelection />} />
            <Route path="/registerEmpresa" element={<RegisterEmpresa />} />
            <Route path="/registerTransportista" element={<RegisterCamionero />} />
            
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
