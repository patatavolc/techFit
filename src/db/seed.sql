
INSERT INTO usuarios (nombre, email, fecha_fin_suscripcion) VALUES
('Edry Moros', 'edry@ejemplo.com', '2026-12-31'),
('Carlos Perez', 'carlos@ejemplo.com', '2024-01-01'),
('Ana Garcia', 'ana@ejemplo.com', '2026-03-05');


INSERT INTO clases (nombre, aforo_maximo, fecha_hora, estado_clase) VALUES
('Yoga Iniciación', 20, '2026-02-26 18:00:00', 'Activa'),
('CrossFit Hardcore', 1, '2026-02-27 10:00:00', 'Activa'),
('Spinning HIIT', 15, '2026-02-20 09:00:00', 'Activa');

INSERT INTO reservas (id_usuario, id_clase, estado_reserva) VALUES
(1, 1, 'Confirmada'),
(3, 2, 'Confirmada');