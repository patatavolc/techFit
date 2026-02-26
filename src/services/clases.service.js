import pool from "../db/db.js";

export async function getClasesService() {
  try {
    const query = `
    SELECT
      c.id,
      c.nombre,
      c.fecha_hora,
      c.aforo_maximo,
      (c.aforo_maximo - COUNT(r.id))::int AS aforo_restante
    FROM
      clases c
    LEFT JOIN
      reservas r ON c.id = r.id_clase AND r.estado_reserva = 'Confirmada'
    WHERE
      c.estado_clase = 'Activa'
    GROUP BY
      c.id
    ORDER BY
      c.fecha_hora ASC;
  `;

    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener las clases: ${error.message}`);
  }
}

export async function crearClaseService(nombre, fechaHora, aforoMaximo) {
  try {
    const query = `
      INSERT INTO clases (nombre, fecha_hora, aforo_maximo, estado_clase)
      VALUES ($1, $2, $3, 'Activa')
      RETURNING *;
    `;
    const result = await pool.query(query, [nombre, fechaHora, aforoMaximo]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear la clase: ${error.message}`);
  }
}
