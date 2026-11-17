import React, { useState } from "react";
import { API } from "./config";

function Acceso({ alIniciarSesion, alCerrar }) {
  const [modo, setModo] = useState("login");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (modo === "registro" && contraseña !== confirmacion) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(API +
        `/api/usuarios/${modo === "registro" ? "registro" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            nombre,
            correo,
            contraseña,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(datos.mensaje || "Ocurrió un error.");
        return;
      }

      if (modo === "registro") {
        setMensaje("¡Cuenta creada! Ahora puedes iniciar sesión.");
        setModo("login");
        setNombre("");
        setContraseña("");
        setConfirmacion("");
      } else {
        alIniciarSesion(datos.usuario);
      }
    } catch (error) {
      setMensaje("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="acceso-fondo">
      <section className="acceso-tarjeta">
        <button
          type="button"
          className="acceso-cerrar"
          onClick={alCerrar}
        >
          ×
        </button>

        <h2>{modo === "registro" ? "Crear cuenta" : "Bienvenido"}</h2>
        <p>
          {modo === "registro"
            ? "Regístrate para solicitar tus diseños."
            : "Inicia sesión para continuar con tu pedido."}
        </p>

        <form onSubmit={enviarFormulario}>
          {modo === "registro" && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            minLength={8}
            required
          />

          {modo === "registro" && (
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmacion}
              onChange={(e) => setConfirmacion(e.target.value)}
              minLength={8}
              required
            />
          )}

          {mensaje && <p className="acceso-mensaje">{mensaje}</p>}

          <button type="submit" disabled={cargando}>
            {cargando
              ? "Procesando..."
              : modo === "registro"
                ? "Registrarme"
                : "Iniciar sesión"}
          </button>
        </form>

        <div className="acceso-cambio">
          {modo === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <button type="button" onClick={() => {
                setModo("registro");
                setMensaje("");
              }}>
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <button type="button" onClick={() => {
                setModo("login");
                setMensaje("");
              }}>
                Inicia sesión
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Acceso;