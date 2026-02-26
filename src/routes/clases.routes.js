import express from "express";
import { crearClase, getClases } from "../controllers/clases.controller.js";

const router = express.Router();

router.get("/clases", getClases);
router.post("/clases", crearClase);

export default router;
