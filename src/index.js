import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './HomePage/Home';
import Login from './Login/Login';
import RegisterVehiculo from './Register/RegisterVehiculo';
import RegisterEmpresa from './Register/RegisterEmpresa';
import Recuperar from './RecuperarContra/Recuperar';
import RegisterSelection from "./Register/RegisterSelection";
import RegisterCamionero from "./Register/RegisterCamionero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/registervehiculo" element={<RegisterCamionero />} />
        <Route path="/registerusuario" element={<RegisterEmpresa />} />
        <Route path="/recuperar" element={<Recuperar />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
