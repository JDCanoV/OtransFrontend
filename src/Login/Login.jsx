import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/HeaderLogin";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "https://localhost:7229";

const mapUrlKey = (nombreDocumento) => {
  switch (nombreDocumento) {
    case "Documento Identidad":
      return "archiDocu";
    case "NIT":
      return "nit";
    case "Licencia Conducción":
      return "licencia";
    case "Soat":
      return "soat";
    case "Técnico Mecánica":
      return "tecnomecanico";
    case "Licencia Tránsito":
      return "licenciaTransito";
    default:
      return "";
  }
};

function maskPassword(pwd) {
  const rev = pwd.split("").reverse().join("");
  return btoa(rev);
}

function Login() {
  const navigate = useNavigate();

  const { login, setLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [missing, setMissing] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState({});
  const [loginUserId, setLoginUserId] = useState(null);
  const [messagePopup, setMessagePopup] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showModal]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    const pwdMask = maskPassword(password);

    try {
      const response = await login(email, pwdMask, false);

      if (response.status === 200) {
        const idRol = response.data.idRol;
        let redirectPath = "";

        if (idRol === 1) {
          redirectPath = "/UsuariosPendientes";
        } else if (idRol === 3) {
          redirectPath = "/indexEmpresa";
        } else if (idRol === 2) {
          redirectPath = "/indexTransportista";
        } else {
          setError("Rol de usuario no reconocido.");
          return;
        }

        const userId = response.data.usuario.idUsuario;
        setLoginUserId(userId);

        const { data: detalle } = await axios.get(`${API}/Usuario/detalle/${userId}`);

        const faltantes = detalle.documentos
          .filter((d) => !detalle[mapUrlKey(d.nombreDocumento)])
          .map((d) => d.nombreDocumento);

        if (faltantes.length > 0) {
          setMissing(faltantes);
          setShowModal(true);
        } else {
          navigate(redirectPath);
        }
      } else {
        setError(response.data.mensaje || "Error al iniciar sesión.");
      }
    } catch (error) {
      setError("Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const handleReupload = async (e) => {
    e.preventDefault();
    if (!loginUserId) return;

    const form = new FormData();
    form.append("IdUsuario", loginUserId);
    missing.forEach((doc, i) => {
      form.append(`Documentos[${i}].NombreDocumento`, doc);
      form.append(`Documentos[${i}].Archivo`, files[doc]);
    });

    try {
      await axios.post(`${API}/Usuario/reupload-documentos`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessagePopup({
        type: "success",
        text: "Documentos subidos correctamente. Por favor ingresa de nuevo.",
      });
      setShowModal(false);
      setMissing([]);
      setFiles({});
    } catch (err) {
      console.error(err);
      setMessagePopup({ type: "error", text: "Error al subir los documentos" });
    }
  };

  return (
    <>
      <HeaderLogin />
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Iniciar sesión</button>

          <div className="login-links">
            <a href="/recuperar" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div className="new-user">
            <p>Nuevo Usuario</p>
            <button
              type="button"
              className="login-btn secondary"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </div>
        </form>

        {showModal && (
          <div
            ref={modalRef}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000"
          >
            <div className="modal-docs">
              <h3>Documentos Faltantes</h3>
              <form onSubmit={handleReupload} className="space-y-4">
                {missing.map((doc) => (
                  <div key={doc}>
                    <label className="block font-medium mb-1">{doc}:</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        setFiles((f) => ({ ...f, [doc]: e.target.files[0] }))
                      }
                      required
                    />
                  </div>
                ))}
                <div className="flex justify-end mt-4">
                  <button type="submit" className="upload-btn">
                    Subir Documentos
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="cancel-btn"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {messagePopup && (
          <div
            className="message-popup"
            onClick={() => setMessagePopup(null)}
            role="alert"
          >
            <div className="message-popup-content">{messagePopup.text}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
