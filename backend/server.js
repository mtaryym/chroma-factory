import pedidosRoutes from "./routes/pedidos.js";
import usuariosRoutes from "./routes/usuarios.js";
import chatbotRoutes from "./routes/chatbot.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import conectarDB from "./config/database.js";
import Contact from "./models/contact.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Configuración
app.use(cors({
  origin: "https://chroma-factory-frontend.onrender.com",
  credentials: true,
}));


// Comprobar servidor
app.get("/", (req, res) => {
  res.json({
    mensaje: "¡Servidor de Chroma Factory funcionando!",
  });
});

app.get("/api/estado", (req, res) => {
  res.json({
    estado: "correcto",
    proyecto: "Chroma Factory",
  });
});

// Recibir y guardar mensajes del formulario
app.post("/api/contacto", async (req, res) => {
  try {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios.",
      });
    }

    const nuevoContacto = new Contact({
      nombre,
      correo,
      mensaje,
    });

    await nuevoContacto.save();

    res.status(201).json({
      mensaje: "¡Tu mensaje fue enviado correctamente!",
    });

  } catch (error) {
    console.error("Error al guardar el contacto:", error);

    res.status(500).json({
      mensaje: "No se pudo enviar el mensaje.",
    });
  }
});

// Rutas del administrador
app.use("/api/admin", adminRoutes);

// Usuarios Rutas
app.use("/api/usuarios", usuariosRoutes);

// Pedidos Rutas
app.use("/api/pedidos", pedidosRoutes);

// Ruta del chatbot
app.use("/api/chatbot", chatbotRoutes);

// Iniciar servidor
const iniciarServidor = async () => {
  await conectarDB();

  app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
  });
};

iniciarServidor();