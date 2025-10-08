import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, nombre, especialidad, ubicacion, telefono, correo, hospital, comoConocieron, foto, perfilUrl } = data;

    // Normalizar ruta de foto
    let fotoPath: string | null = null;

    if (foto) {
      if (foto.startsWith("/img/") || foto.startsWith("http") || foto.startsWith("/uploads/")) {
        // fotos prediseñadas, externas o ya en uploads → se mantiene
        fotoPath = foto;
      } else {
        // fotos subidas por usuarios → se guardan en /uploads/
        fotoPath = `/uploads/${foto}`;
      }
    }

    // Crear en tabla Especialista
    await prisma.especialista.create({
      data: { 
        nombre,
        especialidad,
        ubicacion,
        telefono,
        correo,
        hospital,
        comoConocieron,
        foto: fotoPath,
        perfilUrl,
      },
    });

    // Borrar de SolicitudEspecialista
    await prisma.solicitudEspecialista.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error aceptando solicitud:", error);
    return NextResponse.json({ success: false, error: "Error al aceptar solicitud" }, { status: 500 });
  }
}
