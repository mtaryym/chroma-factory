import jwt from "jsonwebtoken";

function protegerAdmin(req, res, next) {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({
      mensaje: "Debes iniciar sesión para continuar.",
    });
  }

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);

    if (datos.role !== "admin") {
      return res.status(403).json({
        mensaje: "No tienes permiso para acceder.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Tu sesión ha expirado. Inicia sesión nuevamente.",
    });
  }
}

export default protegerAdmin;