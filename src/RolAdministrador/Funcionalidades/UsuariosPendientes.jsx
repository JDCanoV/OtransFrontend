import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig"; // Ya incluye el token con el interceptor
import HeaderAdmi from "../../Header/HeaderAdmi"; // Importa el componente HeaderAdmi
import "./UsuariosPendientes.css"; // Importa el archivo CSS correspondiente

const UsuariosPendientes = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para los usuarios
  const [loading, setLoading] = useState(true); // Estado para la carga de datos
  const navigate = useNavigate(); // Para la navegación

  // Traer datos del backend
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get("/Administrador/pendientes-validacion"); // Asegúrate de que esta ruta sea correcta
        setUsuarios(response.data); // Establece los datos obtenidos
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false); // Cambia el estado de carga a falso
      }
    };

    obtenerUsuarios();
  }, []); // Se ejecuta solo cuando el componente se monta

  const verDetalles = (id) => {
    // Navega a la ruta de detalles del usuario con el ID correspondiente
    navigate(`/usuarioDetalle/${id}`);
  };

  return (
    <>
      <HeaderAdmi />

      <div className="menuup">
        <label>Usuarios Pendientes de Validación</label>
      </div>
      <div className="usuarios-table-container">
        {loading ? (
          <p>Cargando...</p> // Mientras los datos se están cargando
        ) : (
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo de usuario</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.tipoUsuario}</td>
                  <td>{new Date(usuario.fechaRegistro).toLocaleDateString()}</td>
                  <td>{usuario.estado}</td>
                  <td>
                    <button
                      className="ver-detalles-btn"
                      onClick={() => verDetalles(usuario.id)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UsuariosPendientes;
