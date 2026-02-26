import pool from "../db/db.js";

export async function eliminarUsuarioService(id) {
  try {
    const usuarioEliminado = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id],
    );

    if (usuarioEliminado.rows.length === 0) {
      return { error: "Usuario no encontrado" };
    }

    return usuarioEliminado.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${error.message}`);
  }
}