import {
  cancelarReservaService,
  reservarPlazaService,
} from "../services/reservas.service.js";

export async function cancelarReserva(req, res) {
  const { id } = req.params;

  try {
    const reservaCancelada = await cancelarReservaService(id);
    res.status(201).json(reservaCancelada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function reservarPlaza(req, res) {
  const { idUsuario, idClase } = req.body;

  try {
    const nuevaReserva = await reservarPlazaService(idUsuario, idClase);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
