-- CreateTable
CREATE TABLE `Especialista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `especialidad` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NOT NULL,
    `perfilUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paciente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `edad` INTEGER NOT NULL,
    `residencia` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `origenDiagnostico` VARCHAR(191) NULL,
    `familiarDiagnostico` VARCHAR(191) NULL,
    `seguridadSocial` VARCHAR(191) NOT NULL,
    `institucion` VARCHAR(191) NULL,
    `medico` VARCHAR(191) NOT NULL,
    `especialidadMedico` VARCHAR(191) NOT NULL,
    `telefonoMedico` VARCHAR(191) NOT NULL,
    `diagnosticoConfirmado` BOOLEAN NOT NULL,
    `tratamiento` VARCHAR(191) NULL,
    `especialidades` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
