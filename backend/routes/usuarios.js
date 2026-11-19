import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// REGISTRO
router.post("/registro", async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre?.trim() || !correo?.trim() || !contraseña) {
      return res.status(400).json({
        mensaje: "Completa todos los campos.",
      });
    }

    if (contraseña.length < 8) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 8 caracteres.",
      });
    }

    const correoNormalizado = correo.trim().toLowerCase();

    const usuarioExistente = await User.findOne({
      correo: correoNormalizado,
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: "Este correo ya tiene una cuenta registrada.",
      });
    }

    const contraseñaHash = await bcrypt.hash(contraseña, 12);

    const nuevoUsuario = await User.create({
      nombre: nombre.trim(),
      correo: correoNormalizado,
      contraseña: contraseñaHash,
    });

    return res.status(201).json({
      mensaje: "¡Tu cuenta fue creada correctamente!",
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
      },
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({
      mensaje: "No se pudo crear la cuenta. Inténtalo nuevamente.",
    });
  }
});

// INICIO DE SESIÓN
router.post("/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo?.trim() || !contraseña) {
      return res.status(400).json({
        mensaje: "Completa el correo y la contraseña.",
      });
    }

    const usuario = await User.findOne({
      correo: correo.trim().toLowerCase(),
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos.",
      });
    }

    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseña
    );

    if (!contraseñaValida) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos.",
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id.toString(),
        role: "cliente",
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({
      mensaje: "¡Bienvenido de nuevo!",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({
      mensaje: "No se pudo iniciar sesión.",
    });
  }
});

// CONSULTAR SESIÓN
router.get("/sesion", async (req, res) => {
  try {
    const token = req.cookies?.userToken;

    if (!token) {
      return res.status(401).json({
        mensaje: "No has iniciado sesión.",
      });
    }

    const datos = jwt.verify(token, process.env.JWT_SECRET);

    if (datos.role !== "cliente") {
      return res.status(403).json({
        mensaje: "Acceso no autorizado.",
      });
    }

    const usuario = await User.findById(datos.id).select(
      "_id nombre correo"
    );

    if (!usuario) {
      return res.status(401).json({
        mensaje: "La cuenta ya no está disponible.",
      });
    }

    return res.json({ usuario });
  } catch (error) {
    return res.status(401).json({
      mensaje: "Tu sesión ha expirado.",
    });
  }
});

// CERRAR SESIÓN
router.post("/logout", (req, res) => {
  res.clearCookie("userToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res.json({
    mensaje: "Sesión cerrada correctamente.",
  });
});

export default router;