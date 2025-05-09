import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderAdmi from "../../Header/HeaderAdmi"; // Importa el componente HeaderAdmi
import "./UsuarioDetalle.css"; // Importa el archivo CSS correspondiente

// Componente Documento
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

// Componente Detalle
const UsuarioDetalle = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const [usuario, setUsuario] = useState(null);
  const [documentos, setDocumentos] = useState([
    { nombre: 'Documento Identidad', esValido: true, url: 'https://example.com' },
    { nombre: 'Licencia Conducción', esValido: false, url: 'https://example.com' },
    { nombre: 'Soat', esValido: true, url: 'https://example.com' },
    // Aquí puedes agregar más documentos con estado
  ]);
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    // Simula la carga de datos del usuario basados en el ID
    // Esto sería una llamada a la API o algo similar
    const usuarioData = {
      id,
      nombre: "Juan Perez",
      correo: "JuanPerez@example.com",
      telefono: "1234567890",
    };
    setUsuario(usuarioData);
  }, [id]);

  const handleToggleDocumento = (nombre, valid) => {
    setDocumentos(prev => prev.map(doc =>
      doc.nombre === nombre ? { ...doc, esValido: valid } : doc
    ));
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="usuario-detalle">
        <h3 className="detalle-titulo">Detalle del Usuario</h3>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>

        <h4 className="documentos-titulo">Documentos</h4>
        {documentos.map((doc, idx) => (
          <Documento
            key={idx}
            nombre={doc.nombre}
            url={doc.url}
            esValido={doc.esValido}
            onToggle={handleToggleDocumento}
          />
        ))}

        <div className="observaciones">
          <label className="observaciones-label">Observaciones:</label>
          <textarea
            className="observaciones-textarea"
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
            rows={4}
          />
        </div>

        <div className="guardar">
          <button className="guardar-btn">
            Guardar Validación
          </button>
        </div>
      </div>
    </>
  );
};

export default UsuarioDetalle;
