import express from 'express';
const router = express.Router();

router.use(clasesRoutes);
router.use(reservasRoutes);
router.use(usuariosRoutes);

export default router;