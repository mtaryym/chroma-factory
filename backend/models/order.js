import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plantillaId: {
      type: String,
      required: true,
    },
    nombreDiseno: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En revisión", "Completado"],
      default: "Pendiente",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;