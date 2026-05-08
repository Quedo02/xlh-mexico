const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || process.env.ADMIN_EMAIL;
  const password = process.argv[3] || process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Usage: node createAdmin.cjs <email> <password>');
    console.error('Or set ADMIN_EMAIL and ADMIN_PASSWORD env vars');
    process.exit(1);
  }

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

  console.log('Administrador creado:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
