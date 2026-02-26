import express from "express";
import clasesRoutes from "./clases.routes.js";
import reservasRoutes from "./reservas.routes.js";
import usuariosRoutes from "./usuarios.routes.js";

const router = express.Router();

router.use(clasesRoutes);
router.use(reservasRoutes);
router.use(usuariosRoutes);

export default router;
