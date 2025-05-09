import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmi from "../../Header/HeaderAdmi"; // Importa el componente HeaderAdmi
import "./UsuariosPendientes.css"; // Importa el archivo CSS correspondiente

const UsuariosPendientes = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Juan Perez",
      correo: "JuanPerez@example.com",
      tipoUsuario: "Empresa",
      fecha: "15/11/2025",
      estado: "PendienteValidacion",
    },
    // Puedes agregar más usuarios aquí si deseas simular más datos
  ]);

  const navigate = useNavigate();

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
                <td>{usuario.fecha}</td>
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
      </div>
    </>
  );
};

export default UsuariosPendientes;
