import express from "express";
import pool from "./db/db.js";
import mainRouter from "./routes/mainRouter.js";
import { iniciarJobs } from "./workers/notificaciones.worker.js";

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.send("¡Bienvenido a TechFit!");
});

pool
  .connect()
  .then(() => {
    console.log("✅Conexión a la base de datos establecida");
  })
  .catch((err) => {
    console.error("❌Error al conectar a la base de datos:", err);
  });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  iniciarJobs();
});
