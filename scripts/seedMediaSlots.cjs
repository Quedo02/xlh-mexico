const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const slots = [
    'nosotros.hero',
    'nosotros.historia',
    'nosotros.equipo.1',
    'nosotros.equipo.2',
    'nosotros.equipo.3',
  ];
  for (const slot of slots) {
    await prisma.mediaSlot.upsert({
      where: { slot },
      update: {},
      create: { slot },
    });
  }
  console.log('Slots listos');
  await prisma.$disconnect();
})();
