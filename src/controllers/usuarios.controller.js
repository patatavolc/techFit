import { eliminarUsuarioService } from "../services/usuarios.service.js";

export async function eliminarUsuario(req, res) {
  const { id } = req.params;

  try {
    const usuarioEliminado = await eliminarUsuarioService(id);
    if (usuarioEliminado.error) {
      return res.status(404).json({ error: usuarioEliminado.error });
    }
    res.status(200).json(usuarioEliminado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
