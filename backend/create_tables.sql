CREATE TABLE postulantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    rut VARCHAR(20) NOT NULL UNIQUE,
    correo VARCHAR(255) NOT NULL UNIQUE,
    codigo_carrera INT NOT NULL,
    asignatura VARCHAR(255) NOT NULL,
    nota DECIMAL(3,1) CHECK (nota >= 1.0 AND nota <= 7.0),
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('Pendiente', 'Rechazado', 'Aprobado')),
    pre_aprobacion BOOLEAN NOT NULL,
    observacion TEXT,
    fecha_postulacion DATE DEFAULT CURRENT_DATE
);

CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL
);

CREATE TABLE asignaturas (
    id SERIAL PRIMARY KEY,
    profesor_id INT NOT NULL,
    carrera VARCHAR(255) NOT NULL,
    codigo_carrera INT NOT NULL,
    seccion VARCHAR(255) NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES profesores(id) ON DELETE CASCADE
);

CREATE TABLE administradores (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL
);

CREATE TABLE seleccionados (
    id SERIAL PRIMARY KEY,
    postulante_id INT NOT NULL,
    asignatura_id INT NOT NULL,
    FOREIGN KEY (postulante_id) REFERENCES postulantes(id) ON DELETE CASCADE,
    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id) ON DELETE CASCADE
);

CREATE TABLE requisitos(
    id SERIAL PRIMARY KEY,
    requisito TEXT NOT NULL
);