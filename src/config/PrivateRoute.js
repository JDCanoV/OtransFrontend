import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";  // Usamos el contexto de autenticación

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();  // Usamos el hook useAuth para acceder al usuario y al estado de carga

  if (loading) {
    return <div>Loading...</div>;  // Mostrar un componente de carga mientras se verifica la autenticación
  }

  // Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el rol del usuario no está permitido, redirige a la página principal
  if (!allowedRoles.includes(parseInt(user.idRol))) {  // Asegúrate de convertir el idRol a entero
    return <Navigate to="/" />;
  }

  // Si todo está bien, renderiza las rutas hijas
  return <Outlet />;
};

export default PrivateRoute;