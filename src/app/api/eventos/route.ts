import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: { fecha: "desc" },
    });
    return NextResponse.json(eventos, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo eventos:", error);
    return NextResponse.json({ error: "Error al obtener eventos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { titulo, descripcion, fecha, lugar, link, imagen } = data;

    if (!titulo || !descripcion || !fecha || !lugar || !link || !imagen) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: titulo, descripcion, fecha, lugar, link, imagen" },
        { status: 400 }
      );
    }

    const nuevoEvento = await prisma.evento.create({
      data: {
        titulo: String(titulo),
        descripcion: String(descripcion),
        fecha: new Date(fecha),
        lugar: String(lugar),
        link: String(link),
        imagen: String(imagen),
      },
    });

    return NextResponse.json(nuevoEvento, { status: 201 });
  } catch (error) {
    console.error("Error creando evento:", error);
    return NextResponse.json({ error: "Error al crear evento" }, { status: 500 });
  }
}
