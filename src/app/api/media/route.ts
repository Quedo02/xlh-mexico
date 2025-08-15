import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function GET() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: media });
}

export async function POST(req: Request) {
  try {
    // Leer FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt")?.toString();
    const caption = formData.get("caption")?.toString();

    if (!file) return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });

    // Guardar archivo en /public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    // Guardar en la base de datos
    const saved = await prisma.media.create({
      data: {
        url: `/uploads/${fileName}`,
        alt,
        caption,
      },
    });

    return NextResponse.json({ data: saved });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
  }
}
