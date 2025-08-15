import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, especialidad, ubicacion, telefono, correo, hospital, comoConocieron, foto, perfilUrl } = data;

    if (!nombre || !especialidad || !ubicacion || !telefono || !correo || !hospital || !comoConocieron) {
      return NextResponse.json({ success: false, error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const nuevaSolicitud = await prisma.solicitudEspecialista.create({
      data: { nombre, especialidad, ubicacion, telefono, correo, hospital, comoConocieron, foto, perfilUrl },
    });

    return NextResponse.json({ success: true, data: nuevaSolicitud });
  } catch (error) {
    console.error("Error creando solicitud:", error);
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
  }
}
