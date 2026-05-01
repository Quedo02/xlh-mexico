import { prisma } from "@/lib/prisma";

async function main() {
  const solicitudes = await prisma.solicitudEspecialista.findMany();

  for (const sol of solicitudes) {
    if (sol.foto && sol.foto.startsWith("/img/")) { // <- chequeo null seguro
      const nuevaFoto = sol.foto.replace("/img/", "/uploads/");

      await prisma.solicitudEspecialista.update({
        where: { id: sol.id },
        data: { foto: nuevaFoto },
      });

      console.log(`Actualizada solicitud ${sol.id}: ${sol.foto} → ${nuevaFoto}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
