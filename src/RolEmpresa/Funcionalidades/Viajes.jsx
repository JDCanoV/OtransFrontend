import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig"; // Ya incluye el token con el interceptor
import HeaderAdmi from "../../Header/HeaderAdmi"; // Importa el componente HeaderAdmi
import "./Viajes.module.css"; // Importa el archivo CSS correspondiente

const UsuariosPendientes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Traer datos del backend
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get("/User/pendientes-validacion"); // Asegúrate de que esta ruta sea correcta
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []); // Se ejecuta una vez cuando el componente se monta

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
          <p>Cargando...</p>
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
