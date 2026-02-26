import express from "express";
import { eliminarUsuario } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.delete('/usuarios/:id', eliminarUsuario);

export default router;