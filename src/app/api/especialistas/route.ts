import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nombre = formData.get("nombre")?.toString();
    const especialidad = formData.get("especialidad")?.toString();
    const ubicacion = formData.get("ubicacion")?.toString();
    const telefono = formData.get("telefono")?.toString();
    const correo = formData.get("correo")?.toString();
    const hospital = formData.get("hospital")?.toString();
    const comoConocieron = formData.get("comoConocieron")?.toString();
    const perfilUrl = formData.get("perfilUrl")?.toString() || null;
    const file = formData.get("foto") as File | null;

    if (!nombre || !especialidad || !ubicacion || !telefono || !correo || !hospital || !comoConocieron) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    let fotoPath: string | null = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await writeFile(filepath, buffer);
      fotoPath = `/uploads/${filename}`;
    }

    const nuevoDoctor = await prisma.especialista.create({
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

    return NextResponse.json(nuevoDoctor, { status: 201 });
  } catch (error) {
    console.error("Error creando especialista:", error);
    return NextResponse.json({ error: "Error al crear especialista" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const especialistas = await prisma.especialista.findMany({
      orderBy: { nombre: "asc" },
    });
    return NextResponse.json(especialistas);
  } catch (error) {
    console.error("Error obteniendo especialistas:", error);
    return NextResponse.json({ error: "Error al obtener especialistas" }, { status: 500 });
  }
}
