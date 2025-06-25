import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  const nuevoDoctor = await prisma.especialista.create({
    data: {
      nombre: data.nombre,
      especialidad: data.especialidad,
      ubicacion: data.ubicacion,
      telefono: data.telefono,
      correo: data.correo,
      foto: data.foto,
      perfilUrl: data.perfilUrl,
    },
  });

  return Response.json(nuevoDoctor);
}
