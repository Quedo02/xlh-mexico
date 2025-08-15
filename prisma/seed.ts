const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.especialista.create({
    data: {
      nombre: 'Dra. Ana López',
      especialidad: 'Oncología',
      ubicacion: 'CDMX',
      telefono: '5512345678',
      correo: 'ana.lopez@example.com',
      foto: 'https://i.pravatar.cc/150?img=5',
      perfilUrl: 'https://google.com/'
    }
  });

  await prisma.paciente.create({
    data: {
      nombre: 'Juan Pérez',
      sexo: 'Masculino',
      fechaNacimiento: new Date('1985-03-15'),
      edad: 39,
      residencia: 'Estado de México',
      telefono: '5544332211',
      email: 'juan.perez@example.com',
      origenDiagnostico: 'Campaña de salud',
      familiarDiagnostico: 'Padre',
      seguridadSocial: 'IMSS',
      institucion: 'Hospital General',
      medico: 'Dr. Fernández',
      especialidadMedico: 'Oncología',
      telefonoMedico: '5588776655',
      diagnosticoConfirmado: true,
      tratamiento: 'Quimioterapia',
      especialidades: 'Oncología, Radiología',
    }
  });

  await prisma.evento.create({
    data: {
      titulo: 'Jornada de detección',
      fecha: new Date('2025-08-10'),
      lugar: 'Parque Bicentenario, CDMX',
      descripcion: 'Evento gratuito de mastografías y charlas informativas.',
      link: 'https://google.com',
      imagen: 'https://placehold.co/600x400'
    }
  });
}

main()
  .then(() => {
    console.log('✅ Datos insertados correctamente');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
