import { cancelarReservaService } from "../services/reservas.service.js";

export async function cancelarReserva(req, res) {
  const { id } = req.params;

  try {
    const reservaCancelada = await cancelarReservaService(id);
    res.status(200).json(reservaCancelada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
