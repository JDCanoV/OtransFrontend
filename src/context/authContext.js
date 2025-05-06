import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js"; // Para cifrar los datos del usuario

const AuthContext = createContext();


const SECRET_KEY = process.env.REACT_APP_SESSION_KEY; // Clave para cifrar y descifrar datos

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const encryptedUser = sessionStorage.getItem("user");
    if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      } catch (error) {
        console.error("Error al descifrar los datos del usuario", error);
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password, remember) => {
    const URL_LOGIN = process.env.REACT_APP_API_URL + "/User/Login";
    try {
      setLoading(true);
      const response = await axios.post(URL_LOGIN, { correo: email, contrasena: password });

      if (response.data.respuesta === 1) {
        const { token, idRol } = response.data;
        const userData = { token, idRol, email };
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), SECRET_KEY).toString();
        
        sessionStorage.setItem("user", encryptedData);
        if (remember) {
          localStorage.setItem("rememberSession", "true");
        } else {
          localStorage.removeItem("rememberSession");
        }

        setUser(userData); // Actualiza el estado del usuario

        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error durante el login", error);
      console.error("Error durante el login", URL_LOGIN);
      return error.response?.data || "Error en la autenticación";
    } finally {
      setLoading(false);
    }
  };

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

  const value = {
    user,
    loading,
    setLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};