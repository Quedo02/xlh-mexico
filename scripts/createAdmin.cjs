const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@xlhmexico.org';
  const password = 'admin123';

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.admin.findUnique({ where: { email } });

  if (existingAdmin) {
    console.log('Ya existe un administrador con ese correo.');
    return;
  }

  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log('Administrador creado:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
