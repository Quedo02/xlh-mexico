import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, nombre, especialidad, ubicacion, telefono, correo, hospital, comoConocieron, foto, perfilUrl } = data;

    // Crear en tabla Especialista
    await prisma.especialista.create({
      data: { nombre, especialidad, ubicacion, telefono, correo, hospital, comoConocieron, foto, perfilUrl },
    });

    // Borrar de SolicitudEspecialista
    await prisma.solicitudEspecialista.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error aceptando solicitud:", error);
    return NextResponse.json({ success: false, error: "Error al aceptar solicitud" }, { status: 500 });
  }
}
