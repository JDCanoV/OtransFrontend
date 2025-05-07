import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js"; // Para cifrar los datos del usuario

// Creamos el contexto de autenticación para que lo podamos usar en los componentes
const AuthContext = createContext();

// Clave secreta que se usará para cifrar y descifrar los datos del usuario
const SECRET_KEY = process.env.REACT_APP_SESSION_KEY; // Clave para cifrar y descifrar datos

// El AuthProvider es el componente que maneja todo el estado de autenticación
export const AuthProvider = ({ children }) => {
  // Estado que mantiene los datos del usuario, se inicializa con los datos cifrados de sessionStorage
  const [user, setUser] = useState(() => {
    const encryptedUser = sessionStorage.getItem("user");
    
    if (encryptedUser) {
      try {
        // Desencriptamos los datos del usuario guardados en sessionStorage
        const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // Desencriptamos y parseamos los datos
        console.log("Usuario descifrado:", decryptedData); // Depuración para verificar si los datos se desencriptan correctamente
        return decryptedData; // Regresa los datos descifrados
      } catch (error) {
        console.error("Error al descifrar los datos del usuario", error); // Si ocurre un error en el descifrado, lo mostramos
        return null; // Si ocurre un error, no hay datos y se retorna null
      }
    }
    return null; // Si no hay datos en sessionStorage, retorna null
  });

  // Estado que controla si el login está en proceso (loading)
  const [loading, setLoading] = useState(false);

  // Función para realizar el login
  const login = async (email, password, remember) => {
    const URL_LOGIN = process.env.REACT_APP_API_URL + "/User/Login"; // URL del endpoint de login
    try {
      setLoading(true); // Activamos el estado de carga mientras hacemos la solicitud

      // Hacemos una solicitud POST al servidor para autenticar al usuario
      const response = await axios.post(URL_LOGIN, { correo: email, contrasena: password });

      console.log("Respuesta del servidor:", response.data); // Depuración: Verifica la respuesta del servidor

      // Accedemos al idUsuario dentro de la respuesta del servidor
      const { token, idRol, usuario } = response.data;
      const idUsuario = usuario?.idUsuario; // Accedemos a idUsuario dentro del objeto usuario

      console.log("ID Usuario:", idUsuario); // Depuración: Verifica el valor de idUsuario

      // Si el idUsuario existe, guardamos los datos en el estado y en sessionStorage
      if (idUsuario) {
        const userData = { token, idRol, idUsuario, email }; // Creamos el objeto con los datos del usuario
        console.log("userData guardado:", userData); // Depuración: Verifica lo que estamos guardando

        // Ciframos los datos del usuario antes de guardarlos en sessionStorage
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), SECRET_KEY).toString();
        sessionStorage.setItem("user", encryptedData); // Guardamos los datos cifrados en sessionStorage

        // Si el usuario seleccionó recordar sesión, guardamos en localStorage
        if (remember) {
          localStorage.setItem("rememberSession", "true");
        } else {
          localStorage.removeItem("rememberSession"); // Si no, eliminamos la sesión guardada
        }

        setUser(userData); // Actualizamos el estado con los datos del usuario

        return response; // Retornamos la respuesta del servidor
      } else {
        console.error("No se recibió idUsuario del servidor"); // Si no se recibe idUsuario, mostramos un error
        return null;
      }
    } catch (error) {
      console.error("Error durante el login", error); // Si hay un error en la solicitud, lo mostramos
      return error.response?.data || "Error en la autenticación"; // Retornamos el error si lo hay
    } finally {
      setLoading(false); // Finalmente, desactivamos el estado de carga
    }
  };

  // Función para realizar el logout
  const logout = async () => {
    try {
      setUser(null); // Limpiamos el estado del usuario
      sessionStorage.removeItem("user"); // Eliminamos los datos de sessionStorage
      localStorage.removeItem("rememberSession"); // Eliminamos los datos de localStorage
      await axios.post("/auth/logout", {}, { withCredentials: true }); // Hacemos la solicitud de logout al servidor
    } catch (error) {
      console.error("Error durante logout", error); // Si ocurre un error, lo mostramos
    }
  };

  // Creamos el objeto de contexto que contiene los valores que se pasan a los componentes hijos
  const value = {
    user, // El usuario actual
    loading, // El estado de carga
    setLoading, // Función para actualizar el estado de carga
    login, // Función para hacer login
    logout, // Función para hacer logout
  };

  // Proveemos el contexto a los componentes hijos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para acceder al contexto de autenticación desde cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider"); // Aseguramos que se use dentro de un AuthProvider
  }
  return context; // Retornamos el contexto
};
