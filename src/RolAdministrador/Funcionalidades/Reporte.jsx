import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderAdmi from '../../Header/HeaderAdmi';

const API = process.env.REACT_APP_API_URL || 'https://localhost:7229';

export default function UserReportPage() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);  // estado para PDF

  useEffect(() => {
    axios.get(`${API}/Administrador/usuarios`)
      .then(({ data }) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar usuarios');
        setLoading(false);
      });
  }, []);

  const handleGeneratePdf = async () => {
    setLoadingPdf(true);  // comienza carga
    try {
      const response = await axios.get(
        `${API}/Administrador/reporte`,
        { responseType: 'blob' }
      );
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      console.error('Error generando el PDF:', error);
      alert('Ocurrió un error al generar el reporte');
    } finally {
      setLoadingPdf(false);  // termina carga
    }
  };

  if (loading) return <p>Cargando usuarios…</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <HeaderAdmi />
      <div style={{ maxWidth: 800, margin: '8rem auto 2rem auto', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Usuarios Registrados</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#FF8C00', color: '#fff' }}>
              <th style={{ padding: '8px' }}>Nombre</th>
              <th style={{ padding: '8px' }}>Tipo</th>
              <th style={{ padding: '8px' }}>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                <td style={{ padding: '6px', border: '1px solid #ddd' }}>{u.nombreCompleto}</td>
                <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>{u.tipoUsuario}</td>
                <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {new Date(u.fechaRegistro).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleGeneratePdf}
            disabled={loadingPdf}  // deshabilita botón mientras carga
            style={{
              backgroundColor: '#FF8C00',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: loadingPdf ? 'not-allowed' : 'pointer',
            }}
          >
            {loadingPdf ? 'Generando reporte...' : 'Generar Reporte PDF'}
          </button>
        </div>
      </div>
    </>
  );
}
