import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje || typeof mensaje !== "string" || !mensaje.trim()) {
      return res.status(400).json({
        respuesta: "Escribe una pregunta para poder ayudarte.",
      });
    }

    if (mensaje.length > 1000) {
      return res.status(400).json({
        respuesta: "Tu pregunta es demasiado larga. Intenta resumirla.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        respuesta: "El chatbot todavía no está configurado.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      apiVersion: "v1beta",
    });

    const respuesta = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `
Eres el asistente virtual de Chroma Factory, un emprendimiento
creativo que ofrece diseños publicitarios para pequeños negocios.

INFORMACIÓN DEL EMPRENDIMIENTO:
- Ofrecemos plantillas y diseños publicitarios.
- Los tipos de diseño son Poster y Banner.
- Las categorías son Alimentos, Ropa y calzado, Tecnología
  y Cuidado personal.
- Para solicitar un diseño, el visitante puede explorar el
  catálogo, seleccionar una plantilla y pulsar "Pedir Diseño".
- También puede escribirnos mediante el formulario de contacto.
- Chroma Factory no procesa pagos directamente desde la página.

INSTRUCCIONES:
- Responde en español, de forma amable, clara y breve.
- Responde preguntas relacionadas con Chroma Factory.
- No inventes precios, tiempos de entrega ni servicios que no
  estén descritos en la información.
- Si no conoces una respuesta, invita al visitante a usar
  el formulario de contacto.
- No solicites contraseñas ni datos bancarios.

PREGUNTA DEL VISITANTE:
${mensaje.trim()}
      `,
    });

    return res.json({
      respuesta:
        respuesta.text || "No pude generar una respuesta. Inténtalo otra vez.",
    });

  } catch (error) {
    console.error("Error en el chatbot:", error);

    return res.status(500).json({
      respuesta: "En este momento no puedo responder. Inténtalo más tarde.",
    });
  }
});

export default router;