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

export async function reservarPlazaService(idUsuario, idClase) {
  try {
    pool.query("BEGIN");

    const usuario = await pool.query(
      `SELECT fecha_fin_suscripcion FROM usuarios WHERE id = $1`,
      [idUsuario],
    );

    if (usuario.rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const fechaSuscripcion = new Date(usuario.rows[0].fecha_fin_suscripcion);
    const fechaActual = new Date();

    if (fechaSuscripcion < fechaActual) {
      throw new Error("La suscripción del usuario ha expirado");
    }

    const clase = await pool.query(
      `SELECT aforo_maximo FROM clases WHERE id = $1`,
      [idClase],
    );

    if (clase.rows.length === 0) {
      throw new Error("Clase no encontrada");
    }

    const aforoMaximo = clase.rows[0].aforo_maximo;

    const reservasExistentes = await pool.query(
      `SELECT COUNT(*) FROM reservas WHERE id_clase = $1 AND estado_reserva = 'Confirmada'`,
      [idClase],
    );

    const reservasActuales = parseInt(reservasExistentes.rows[0].count);

    if (reservasActuales >= aforoMaximo) {
      throw new Error("No hay plazas disponibles para esta clase");
    }

    const nuevaReserva = await pool.query(
      `INSERT INTO reservas (id_usuario, id_clase, estado_reserva) VALUES ($1, $2, 'Confirmada') RETURNING *`,
      [idUsuario, idClase],
    );

    await pool.query("COMMIT");

    return nuevaReserva.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw new Error(`Error al reservar la plaza: ${error.message}`);
  }
}
