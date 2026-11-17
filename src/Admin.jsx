import React, { useEffect, useState } from "react";
import { API } from "./config";

const API_ADMIN = API + "/api/admin";

function Admin() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contactos, setContactos] = useState([]);
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function cargarContactos() {
    const respuesta = await fetch(`${API_ADMIN}/contactos`, {
      credentials: "include",
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los mensajes.");
    }

    const datos = await respuesta.json();
    setContactos(datos);
  }

  useEffect(() => {
    async function comprobarSesion() {
      try {
        const respuesta = await fetch(`${API_ADMIN}/sesion`, {
          credentials: "include",
        });

        if (respuesta.ok) {
          setAutenticado(true);
          await cargarContactos();
        }
      } catch (error) {
        console.error("No se pudo comprobar la sesión:", error);
      } finally {
        setCargando(false);
      }
    }

    comprobarSesion();
  }, []);

  async function iniciarSesion(event) {
    event.preventDefault();
    setEnviando(true);
    setMensaje("");

    try {
      const respuesta = await fetch(`${API_ADMIN}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contraseña,
        }),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.mensaje || "No se pudo iniciar sesión.");
      }

      setAutenticado(true);
      setContraseña("");
      await cargarContactos();

    } catch (error) {
      setMensaje(error.message);

    } finally {
      setEnviando(false);
    }
  }

  async function cerrarSesion() {
    try {
      await fetch(`${API_ADMIN}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setAutenticado(false);
      setContactos([]);
      setCorreo("");
      setMensaje("");
    }
  }

  if (cargando) {
    return (
      <main className="admin-page">
        <p>Comprobando sesión...</p>
      </main>
    );
  }

  if (!autenticado) {
    return (
      <main className="admin-page">
        <section className="admin-login">

          <a href="/" className="admin-back">
            ← Volver a Chroma Factory
          </a>

          <span className="eyebrow">
            CHROMA FACTORY
          </span>

          <h1>Panel de administración</h1>

          <p>
            Inicia sesión para gestionar los mensajes de tu proyecto.
          </p>

          <form onSubmit={iniciarSesion} className="admin-form">

            <label htmlFor="admin-correo">
              Correo electrónico
            </label>

            <input
              id="admin-correo"
              type="email"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              placeholder="admin@chromafactory.com"
              required
            />

            <label htmlFor="admin-password">
              Contraseña
            </label>

            <input
              id="admin-password"
              type="password"
              value={contraseña}
              onChange={(event) => setContraseña(event.target.value)}
              placeholder="Tu contraseña"
              required
            />

            {mensaje && (
              <p className="admin-message" role="alert">
                {mensaje}
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
              disabled={enviando}
            >
              {enviando ? "Ingresando..." : "Iniciar sesión →"}
            </button>

          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">

      <header className="admin-header">
        <div>
          <span className="eyebrow">CHROMA FACTORY</span>
          <h1>Panel de administración</h1>
          <p>Gestiona los mensajes enviados por tus visitantes.</p>
        </div>

        <button
          className="admin-logout"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </header>

      <section className="admin-content">

        <div className="admin-summary">
          <span>MENSAJES RECIBIDOS</span>
          <strong>{contactos.length}</strong>
        </div>

        <div className="admin-list-heading">
          <h2>Mensajes de contacto</h2>

          <button
            className="admin-refresh"
            onClick={() => cargarContactos().catch((error) => setMensaje(error.message))}
          >
            Actualizar ↻
          </button>
        </div>

        {mensaje && (
          <p className="admin-message" role="alert">
            {mensaje}
          </p>
        )}

        {contactos.length === 0 ? (
          <div className="admin-empty">
            <h3>Aún no hay mensajes</h3>
            <p>Cuando alguien complete el formulario, aparecerá aquí.</p>
          </div>
        ) : (
          <div className="admin-contact-list">

            {contactos.map((contacto) => (
              <article className="admin-contact-card" key={contacto._id}>

                <div className="admin-contact-top">
                  <h3>{contacto.nombre}</h3>

                  <span>
                    {contacto.createdAt
                      ? new Date(contacto.createdAt).toLocaleString("es-CO")
                      : "Fecha no disponible"}
                  </span>
                </div>

                <a href={`mailto:${contacto.correo}`}>
                  {contacto.correo}
                </a>

                <p>{contacto.mensaje}</p>

              </article>
            ))}

          </div>
        )}

      </section>
    </main>
  );
}

export default Admin;