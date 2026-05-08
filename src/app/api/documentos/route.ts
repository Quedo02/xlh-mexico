import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";
import path from "path";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
const MAX_BYTES = 5 * 1024 * 1024;

export async function GET() {
  try {
    const documentos = await prisma.documento.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ documentos }, { status: 200 });
  } catch (error) {
    console.error("❌ Error GET documentos:", error);
    return NextResponse.json({ error: "Error al obtener documentos" }, { status: 500 });
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
    const descripcion = formData.get("descripcion")?.toString() || "";
    const categoria = formData.get("categoria")?.toString() || "general";
    const file = formData.get("archivo") as File | null;

    if (!titulo || !file) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de archivo no permitido" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Archivo demasiado grande (máx 5MB)" }, { status: 413 });
    }

    const tipo = file.type.includes("pdf") ? "pdf" : file.type.includes("image") ? "imagen" : "otro";

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = `${Date.now()}-${path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadsDir, safeName);
    await writeFile(filePath, buffer);

    const archivoUrl = `/uploads/${safeName}`;

    const nuevoDoc = await prisma.documento.create({
      data: { titulo, descripcion, categoria, archivoUrl, tipo },
    });

    return NextResponse.json({ mensaje: "Documento creado", documento: nuevoDoc }, { status: 201 });
  } catch (error) {
    console.error("❌ Error POST documentos:", error);
    return NextResponse.json({ error: "Error al crear documento" }, { status: 500 });
  }
}
