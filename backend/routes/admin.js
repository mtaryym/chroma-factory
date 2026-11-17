import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js";
import protegerAdmin from "../middleware/auth.js";

const router = express.Router();

const opcionesCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 2 * 60 * 60 * 1000,
  path: "/",
};

// INICIAR SESIÓN
router.post("/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({
        mensaje: "Escribe tu correo y contraseña.",
      });
    }

    const correoValido =
      correo.toLowerCase().trim() ===
      process.env.ADMIN_EMAIL?.toLowerCase().trim();

    const contraseñaValida = await bcrypt.compare(
      contraseña,
      process.env.ADMIN_PASSWORD_HASH || ""
    );

    if (!correoValido || !contraseñaValida) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos.",
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("adminToken", token, opcionesCookie);

    return res.json({
      mensaje: "Inicio de sesión correcto.",
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return res.status(500).json({
      mensaje: "Ocurrió un error al iniciar sesión.",
    });
  }
});

// COMPROBAR SI HAY UNA SESIÓN ACTIVA
router.get("/sesion", protegerAdmin, (req, res) => {
  res.json({
    autenticado: true,
    mensaje: "Sesión de administrador activa.",
  });
});

// CERRAR SESIÓN
router.post("/logout", protegerAdmin, (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.json({
    mensaje: "Sesión cerrada correctamente.",
  });
});

// CONSULTAR MENSAJES DE CONTACTO
router.get("/contactos", protegerAdmin, async (req, res) => {
  try {
    const contactos = await Contact.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json(contactos);

  } catch (error) {
    console.error("Error al consultar contactos:", error);

    res.status(500).json({
      mensaje: "No se pudieron cargar los contactos.",
    });
  }
});

export default router;