import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './HomePage/Home';
import Login from './Login/Login';
import Recuperar from './RecuperarContra/Recuperar';
import IndexEmpresa from './RolEmpresa/Index/IndexEmpresa';
import SolicitarServicio from './RolEmpresa/Funcionalidades/SolicitarServicio';
import Viaje from './RolTransportista/Funcionalidades/Viaje';
import Viajes from './RolEmpresa/Funcionalidades/Viajes';
import Ofrecemos from './RolEmpresa/Funcionalidades/Ofrecemos';
import Ofertas from './RolEmpresa/Funcionalidades/Ofertas';
import Calificaciones from './RolEmpresa/Funcionalidades/Calificaciones';
import CalificacionesT from './RolTransportista/Funcionalidades/CalificacionesT';



import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
<Routes>
<Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/recuperar" element={<Recuperar />} />
  <Route path="/indexEmpresa" element={<IndexEmpresa/>} />
  <Route path="/solicitarServicio" element={<SolicitarServicio/>} />
  <Route path="/viaje" element={<Viaje/>} />
  <Route path="/viajes" element={<Viajes/>} />
  <Route path="/ofrecemos" element={<Ofrecemos/>} />
  <Route path="/ofertas" element={<Ofertas/>} />
  <Route path="/calificaciones" element={<Calificaciones/>} />
  <Route path="/calificacionesT" element={<CalificacionesT/>} />


</Routes>
</Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
