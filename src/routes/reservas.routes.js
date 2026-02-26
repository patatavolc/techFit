import express from "express";
import {
  cancelarReserva,
  reservarPlaza,
} from "../controllers/reservas.controller.js";
const router = express.Router();

router.patch("/reservas/:id/cancelar", cancelarReserva);
router.post("/reservas", reservarPlaza);

export default router;
