import {
  getClasesService,
  crearClaseService,
} from "../services/clases.service.js";

export async function getClases(req, res) {
  try {
    const clases = await getClasesService();
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function crearClase(req, res) {
  const { nombre, fechaHora, aforoMaximo } = req.body;

  if (!nombre || !fechaHora || !aforoMaximo) {
    return res
      .status(400)
      .json({
        error: "Faltan datos obligatorios (nombre, fecha_hora, aforo_maximo)",
      });
  }

  try {
    const nuevaClase = await crearClaseService(nombre, fechaHora, aforoMaximo);
    res.status(201).json(nuevaClase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
