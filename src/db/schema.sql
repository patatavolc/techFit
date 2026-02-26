CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    fecha_fin_suscripcion DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS clases (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  aforo_maximo INT NOT NULL,
  fecha_hora TIMESTAMP NOT NULL,
  estado_clase VARCHAR(50) NOT NULL DEFAULT 'Activa'
);

CREATE TABLE IF NOT EXISTS reservas (
  id SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  id_clase INT NOT NULL REFERENCES clases(id) ON DELETE CASCADE,
  estado_reserva VARCHAR(50) NOT NULL DEFAULT 'Confirmada'
);

