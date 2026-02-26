import { CronJob } from "cron";
import pool from "../db/db.js";

async function verificarSuscripciones() {
  console.log("Ejecutando verificacion diaria de suscripciones...");

  try {
    const query = `
    SELECT nombre, email, fecha_fin_suscripcion
    FROM usuarios
    WHERE fecha_fin_suscripcion = CURRENT_DATE + integer '3`;

    const resultado = await pool.query(query);

    if (resultado.rows.length === 0) {
      console.log("No hay suscripciones próximas a expirar.");
      return;
    }

    resultado.rows.forEach((usuario) => {
      console.log(
        `Para: ${usuario.email} | Hola ${usuario.nombre}, tu suscripción vence el ${usuario.fecha_fin_suscripcion.toISOString().split('T')[0]}. ¡Renueva pronto!`
      );
    });

  } catch (error) {
    console.error("Error al verificar suscripciones:", error);
  }
}

// Configuracion del cron job
export const notificacionesJob = new CronJob(
  '0 8 * * *', // Ejecutar todos los días a las 8:00 AM
  verificarSuscripciones,
  null,
  true, // No iniciar automáticamente
  'Europe/Madrid' // Zona horaria
)

export function iniciarJobs() {
  notificacionesJob.start();
  console.log("Cron job de notificaciones iniciado.");
}