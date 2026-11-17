import jwt from "jsonwebtoken";

function protegerCliente(req, res, next) {
  const token = req.cookies?.userToken;

  if (!token) {
    return res.status(401).json({
      mensaje: "Inicia sesión para continuar.",
    });
  }

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);

    if (datos.role !== "cliente") {
      return res.status(403).json({
        mensaje: "No tienes permiso para realizar esta acción.",
      });
    }

    req.usuarioId = datos.id;
    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Tu sesión ha expirado. Inicia sesión nuevamente.",
    });
  }
}

export default protegerCliente;