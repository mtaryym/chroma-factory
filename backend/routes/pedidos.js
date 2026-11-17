import express from "express";
import Order from "../models/order.js";
import protegerCliente from "../middleware/authCliente.js";

const router = express.Router();

// CONSULTAR LOS PEDIDOS DEL CLIENTE
router.get("/", protegerCliente, async (req, res) => {
  try {
    const pedidos = await Order.find({
      usuario: req.usuarioId,
    }).sort({ createdAt: -1 });

    res.json({ pedidos });
  } catch (error) {
    console.error("Error al consultar pedidos:", error);
    res.status(500).json({
      mensaje: "No se pudieron consultar tus pedidos.",
    });
  }
});

// AGREGAR UN DISEÑO AL CARRITO
router.post("/", protegerCliente, async (req, res) => {
  try {
    const {
      plantillaId,
      nombreDiseno,
      tipo,
      categoria,
      imagen,
    } = req.body;

    if (
      !plantillaId ||
      !nombreDiseno ||
      !tipo ||
      !categoria ||
      !imagen
    ) {
      return res.status(400).json({
        mensaje: "Faltan datos del diseño seleccionado.",
      });
    }

    const pedido = await Order.create({
      usuario: req.usuarioId,
      plantillaId,
      nombreDiseno,
      tipo,
      categoria,
      imagen,
    });

    res.status(201).json({
      mensaje: "¡Diseño agregado a tus pedidos!",
      pedido,
    });
  } catch (error) {
    console.error("Error al agregar pedido:", error);
    res.status(500).json({
      mensaje: "No se pudo agregar el diseño.",
    });
  }
});

// ELIMINAR UN PEDIDO PROPIO
router.delete("/:id", protegerCliente, async (req, res) => {
  try {
    const pedido = await Order.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuarioId,
    });

    if (!pedido) {
      return res.status(404).json({
        mensaje: "No se encontró ese pedido.",
      });
    }

    res.json({
      mensaje: "Pedido eliminado correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    res.status(500).json({
      mensaje: "No se pudo eliminar el pedido.",
    });
  }
});

export default router;