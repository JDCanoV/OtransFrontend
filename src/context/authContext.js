import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Creamos el contexto de autenticación para que lo podamos usar en los componentes
const AuthContext = createContext();

// El AuthProvider es el componente que maneja todo el estado de autenticación
export const AuthProvider = ({ children }) => {
  // Estado que mantiene los datos del usuario, se inicializa con los datos almacenados en sessionStorage
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);  // Parsear los datos del usuario

        // Asegúrate de establecer el token correctamente en los headers de Axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
        
        return userData; // Almacenamos el usuario
      } catch (error) {
        console.error("Error al obtener los datos del usuario", error);
        return null;
      }
    }
    
    return null; // Si no hay usuario almacenado
  });

  const [loading, setLoading] = useState(false);

  // Función para realizar el login
  const login = async (email, password, remember) => {
    const URL_LOGIN = process.env.REACT_APP_API_URL + "/User/Login";
    try {
      setLoading(true);
      const response = await axios.post(URL_LOGIN, { correo: email, contrasena: password });

      if (response.data.respuesta === 1) {
        const { token, idRol, usuario } = response.data;  // Obtener todo el objeto 'usuario'
        
        console.log("✅ Nuevo token recibido:", token);  // Log para verificar el token
        console.log("✅ Usuario recibido:", usuario);  // Log para verificar los detalles del usuario

        // Guardar el usuario completo sin cifrar
        const userData = { token, idRol, usuario }; 
        sessionStorage.setItem("user", JSON.stringify(userData));  // Guardamos el usuario sin cifrar
        setUser(userData); // Actualiza el contexto con los datos del usuario

        // Si el usuario seleccionó recordar sesión, guardamos en localStorage
        if (remember) {
          localStorage.setItem("rememberSession", "true");
        } else {
          localStorage.removeItem("rememberSession");
        }

        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error durante el login", error);
      return error.response?.data || "Error en la autenticación";
    } finally {
      setLoading(false);
    }
  };

  // Función para realizar el logout
  const logout = async () => {
    try {
      setUser(null);
      sessionStorage.removeItem("user");
      localStorage.removeItem("rememberSession");
      await axios.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Error durante logout", error);
    }
  };

  // Creamos el objeto de contexto que contiene los valores que se pasan a los componentes hijos
  const value = {
    user,
    loading,
    setLoading,
    login,
    logout,
  };

  // Proveemos el contexto a los componentes hijos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para acceder al contexto de autenticación desde cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
