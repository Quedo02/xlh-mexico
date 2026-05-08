import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";
import path from "path";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

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
  const store = await cookies();
  const token = store.get("token")?.value;
  if (!token || !(await verifyJWTServer(token))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const titulo = formData.get("titulo")?.toString();
    const descripcion = formData.get("descripcion")?.toString();
    const fecha = formData.get("fecha")?.toString();
    const lugar = formData.get("lugar")?.toString();
    const link = formData.get("link")?.toString();
    const file = formData.get("imagen") as File | null;

    if (!titulo || !descripcion || !fecha || !lugar || !link || !file) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de archivo no permitido" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Archivo demasiado grande (máx 5MB)" }, { status: 413 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${path.basename(file.name).replace(/\s+/g, "_")}`;
    const filepath = path.join(uploadsDir, filename);
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
    console.error("Error creando evento:", error);
    return NextResponse.json({ error: "Error al crear evento" }, { status: 500 });
  }
}
