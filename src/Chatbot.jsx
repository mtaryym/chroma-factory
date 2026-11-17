import React, { useState } from "react";

function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto: "¡Hola! Soy el asistente de Chroma Factory. ¿En qué puedo ayudarte?",
    },
  ]);
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async (e) => {
    e.preventDefault();

    if (!mensaje.trim() || cargando) return;

    const textoUsuario = mensaje.trim();

    setMensajes((anteriores) => [
      ...anteriores,
      { tipo: "usuario", texto: textoUsuario },
    ]);

    setMensaje("");
    setCargando(true);

    try {
      const respuesta = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: textoUsuario }),
      });

      const datos = await respuesta.json();

      setMensajes((anteriores) => [
        ...anteriores,
        {
          tipo: "bot",
          texto: datos.respuesta || "No pude responder en este momento.",
        },
      ]);
    } catch (error) {
      setMensajes((anteriores) => [
        ...anteriores,
        {
          tipo: "bot",
          texto: "No pude conectarme. Inténtalo de nuevo más tarde.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="chatbot-contenedor">
      {abierto && (
        <div className="chatbot-ventana">
          <div className="chatbot-encabezado">
            <div>
              <h3>Chroma Assistant</h3>
              <span>Asistente virtual</span>
            </div>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-mensajes">
            {mensajes.map((item, indice) => (
              <div
                key={indice}
                className={`chatbot-mensaje ${item.tipo}`}
              >
                {item.texto}
              </div>
            ))}

            {cargando && (
              <div className="chatbot-mensaje bot">
                Escribiendo...
              </div>
            )}
          </div>

          <form className="chatbot-formulario" onSubmit={enviarMensaje}>
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              disabled={cargando}
            />
            <button type="submit" disabled={cargando || !mensaje.trim()}>
              ↑
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbot-boton"
        onClick={() => setAbierto(!abierto)}
        aria-label="Abrir asistente virtual"
      >
        {abierto ? "×" : "💬"}
      </button>
    </div>
  );
}

export default Chatbot;