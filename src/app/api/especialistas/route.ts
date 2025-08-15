import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      nombre,
      especialidad,
      ubicacion,
      telefono,
      correo,
      hospital,
      comoConocieron,
      foto,
      perfilUrl
    } = data;

    // Validación de campos requeridos según schema.prisma
    if (!nombre || !especialidad || !ubicacion || !telefono || !correo || !hospital || !comoConocieron) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: nombre, especialidad, ubicacion, telefono, correo, hospital, comoConocieron" },
        { status: 400 }
      );
    }

    const nuevoDoctor = await prisma.especialista.create({
      data: {
        nombre: String(nombre),
        especialidad: String(especialidad),
        ubicacion: String(ubicacion),
        telefono: String(telefono),
        correo: String(correo),
        hospital: String(hospital),
        comoConocieron: String(comoConocieron),
        foto: foto ? String(foto) : null,
        perfilUrl: perfilUrl ? String(perfilUrl) : null,
      },
    });

    return NextResponse.json(nuevoDoctor, { status: 201 });
  } catch (error) {
    console.error("Error creando especialista:", error);
    return NextResponse.json({ error: "Error al crear especialista" }, { status: 500 });
  }
}
