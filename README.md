# TechFit API

Este proyecto es una API REST para gestionar un gimnasio (TechFit). Permite gestionar clases, reservas y usuarios, además de incluir tareas programadas de mantenimiento.

## Estructura del Proyecto

El proyecto sigue una arquitectura de capas para separar responsabilidades:

```
src/
├── controllers/    # Controladores: Manejan la lógica de entrada/salida de las peticiones HTTP
├── services/       # Servicios: Contienen la lógica de negocio y acceso a la base de datos
├── routes/         # Rutas: Definen los endpoints y los asocian a sus controladores
├── db/             # Base de datos: Configuración de conexión y esquemas SQL
├── workers/        # Workers: Tareas en segundo plano (Cron jobs)
└── index.js        # Punto de entrada de la aplicación
```

## Instalación y Ejecución

1.  Instalar dependencias:

    ```bash
    npm install
    ```

2.  Iniciar el servidor en modo desarrollo:

    ```bash
    npm run dev
    ```

3.  El servidor se iniciará en `http://localhost:80` (o el puerto definido en `.env`).

## Endpoints de la API

Todos los endpoints tienen el prefijo `/api`.

### 1. Gestión de Clases

#### Obtener todas las clases

Devuelve un listado de clases activas con su aforo restante.

- **Método:** `GET`
- **URL:** `/api/clases`
- **Cuerpo:** No requiere.

#### Crear una nueva clase

Registra una nueva clase en el sistema.

- **Método:** `POST`
- **URL:** `/api/clases`
- **Cuerpo (JSON):**
  ```json
  {
    "nombre": "Yoga Avanzado",
    "fecha_hora": "2026-06-15T18:00:00.000Z",
    "aforo_maximo": 20
  }
  ```

### 2. Gestión de Reservas

#### Reservar plaza

Permite a un usuario inscribirse en una clase, verificando disponibilidad y suscripción.

- **Método:** `POST`
- **URL:** `/api/reservas`
- **Cuerpo (JSON):**
  ```json
  {
    "id_usuario": 1,
    "id_clase": 5
  }
  ```

#### Cancelar reserva

Cancela una reserva existente mediante su ID.

- **Método:** `PATCH`
- **URL:** `/api/reservas/:id/cancelar`
  - Ejemplo: `/api/reservas/10/cancelar`
- **Cuerpo:** No requiere.

### 3. Gestión de Usuarios

#### Eliminar usuario

Elimina un usuario y todas sus reservas asociadas (cascada).

- **Método:** `DELETE`
- **URL:** `/api/usuarios/:id`
  - Ejemplo: `/api/usuarios/3`
- **Cuerpo:** No requiere.

## Tareas Programadas (Workers)

El sistema incluye un **Cron Job** que se ejecuta diariamente a las **08:00 AM**.

- **Función:** Verifica las suscripciones de los usuarios.
- **Acción:** Imprime en consola una simulación de envío de correo para aquellos usuarios cuya suscripción caduca en 3 días.
