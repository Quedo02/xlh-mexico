import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: { fecha: "desc" },
    });

    return NextResponse.json(eventos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener eventos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const titulo = formData.get("titulo")?.toString();
    const descripcion = formData.get("descripcion")?.toString();
    const fecha = formData.get("fecha")?.toString();
    const lugar = formData.get("lugar")?.toString();
    const link = formData.get("link")?.toString();
    const file = formData.get("imagen") as File | null;

    if (!titulo || !descripcion || !fecha || !lugar || !link || !file) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Guardar imagen
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(filepath, buffer);

    const nuevoEvento = await prisma.evento.create({
      data: {
        titulo,
        descripcion,
        fecha: new Date(fecha),
        lugar,
        link,
        imagen: `/uploads/${filename}`,
      },
    });

    return NextResponse.json(nuevoEvento, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear evento" }, { status: 500 });
  }
}
