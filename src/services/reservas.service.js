import pool from "../db/db.js";

export async function cancelarReservaService(idReserva) {
  try {
    const reservaACancelar = await pool.query(
      "SELECT * FROM reservas WHERE id_reserva = $1",
      [idReserva],
    );

    if (reservaACancelar.rows.length === 0) {
      return { error: "Reserva no encontrada" };
    }

    const reserva = reservaACancelar.rows[0];

    if (reserva.estado_reserva === "Cancelada") {
      throw new Error("La reserva ya está cancelada");
    }

    const reservaCancelada = await pool.query(
      "UPDATE reservas SET estado_reserva = 'Cancelada' WHERE id_reserva = $1 RETURNING *",
      [idReserva],
    );

    return reservaCancelada.rows[0];
  } catch (error) {
    throw new Error(`Error al cancelar la reserva: ${error.message}`);
  }
}

