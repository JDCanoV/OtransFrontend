import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig"; 
import HeaderAdmi from "../../Header/HeaderAdmi";
import "./UsuarioDetalle.css";

// Componente Documento (igual que antes)
const Documento = ({ nombre, url, esValido, onToggle }) => {
  return (
    <div className="documento">
      <h4 className="titulo">{nombre}</h4>
      {url ? (
        <>
          <a href={url} target="_blank" rel="noopener noreferrer" className="documento-link">
            Ver documento
          </a>
          <div className="estado">
            <span className="estado-text">Estado:</span>
            <label className="estado-radio">
              <input
                type="radio"
                name={`val_${nombre}`}
                value="true"
                checked={esValido === true}
                onChange={() => onToggle(nombre, true)}
                className="radio"
              />
              <span>Válido</span>
            </label>
            <label className="estado-radio">
              <input
                type="radio"
                name={`val_${nombre}`}
                value="false"
                checked={esValido === false}
                onChange={() => onToggle(nombre, false)}
                className="radio"
              />
              <span>Inválido</span>
            </label>
          </div>
        </>
      ) : (
        <p className="no-documento">Documento no cargado</p>
      )}
    </div>
  );
};

// Nuevo componente para el popup bonito
const Popup = ({ mensaje, visible }) => {
  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{mensaje}</p>
      </div>
    </div>
  );
};

const UsuarioDetalle = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [observaciones, setObservaciones] = useState("");
  const [saving, setSaving] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const mapUrlKey = (nombreDocumento) => {
    switch (nombreDocumento) {
      case "Documento Identidad": return "archiDocu";
      case "Licencia Conducción": return "licencia";
      case "Soat": return "soat";
      case "Técnico Mecánica": return "tecnomecanico";
      case "Licencia Tránsito": return "licenciaTransito";
      case "NIT": return "nit";
      default: return "";
    }
  };

  useEffect(() => {
    const obtenerUsuarioDetalle = async () => {
      try {
        const response = await axios.get(`/Usuario/detalle/${id}`);
        setUsuario(response.data);

        const docs = response.data.documentos.map((doc) => {
          const key = mapUrlKey(doc.nombreDocumento);
          const url = key ? response.data[key] : null;
          return {
            nombre: doc.nombreDocumento,
            esValido: doc.esValido,
            url,
          };
        });
        setDocumentos(docs);
        setObservaciones(response.data.observaciones || "");
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
        setDocumentos([]);
      }
    };
    obtenerUsuarioDetalle();
  }, [id]);

  const handleToggleDocumento = (nombre, valid) => {
    setDocumentos((prev) =>
      prev.map((doc) => (doc.nombre === nombre ? { ...doc, esValido: valid } : doc))
    );
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);

    try {
      const payload = {
        idUsuario: usuario.idUsuario,
        documentos: documentos.map((d) => ({ nombreDocumento: d.nombre, esValido: d.esValido })),
        observaciones,
      };

      await axios.post(`/Usuario/validar`, payload);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate("/usuariosPendientes");
      }, 3000); // 3 segundos
    } catch (error) {
      console.error("Error al enviar validación:", error);
      alert("Falló al enviar la validación");
    } finally {
      setSaving(false);
    }
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="usuario-detalle">
        <h3 className="detalle-titulo">Detalle del Usuario</h3>
        <p><strong>Nombre:</strong> {usuario.nombreCompleto}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>

        <h4 className="documentos-titulo">Documentos</h4>
        {documentos.length > 0 ? (
          documentos.map((doc, idx) => (
            <Documento
              key={idx}
              nombre={doc.nombre}
              url={doc.url}
              esValido={doc.esValido}
              onToggle={handleToggleDocumento}
            />
          ))
        ) : (
          <p>No hay documentos disponibles.</p>
        )}

        {usuario.idRol === 2 && (
          <div className="datos-vehiculo">
            <h4>Datos del Vehículo</h4>
            <p><strong>Placa:</strong> {usuario.placa ?? "No disponible"}</p>
            <p><strong>SOAT:</strong> {usuario.soat ? <a href={usuario.soat} target="_blank" rel="noreferrer">Ver SOAT</a> : "No disponible"}</p>
            <p><strong>Técnico Mecánica:</strong> {usuario.tecnomecanico ? <a href={usuario.tecnomecanico} target="_blank" rel="noreferrer">Ver Técnico Mecánica</a> : "No disponible"}</p>
            <p><strong>Licencia Tránsito:</strong> {usuario.licenciaTransito ? <a href={usuario.licenciaTransito} target="_blank" rel="noreferrer">Ver Licencia Tránsito</a> : "No disponible"}</p>
            <p><strong>NIT:</strong> {usuario.nit ? <a href={usuario.nit} target="_blank" rel="noreferrer">Ver NIT</a> : "No disponible"}</p>
          </div>
        )}

        <div className="observaciones">
          <label className="observaciones-label">Observaciones:</label>
          <textarea
            className="observaciones-textarea"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            rows={4}
          />
        </div>

        <div className="guardar">
          <button onClick={handleSave} className="guardar-btn" disabled={saving}>
            {saving ? "Guardando..." : "Guardar Validación"}
          </button>
        </div>
      </div>

      <Popup mensaje="Validación enviada correctamente" visible={popupVisible} />
    </>
  );
};

export default UsuarioDetalle;
