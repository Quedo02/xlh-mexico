import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // IMPORT CORRECTO
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET → Obtener todos los documentos
export async function GET() {
  try {
    const documentos = await prisma.documento.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ documentos }, { status: 200 });
  } catch (error) {
    console.error("❌ Error GET documentos:", error);
    return NextResponse.json(
      { error: "Error al obtener documentos" },
      { status: 500 }
    );
  }
}

// POST → Subir archivo + registrar documento
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const titulo = formData.get("titulo")?.toString();
    const descripcion = formData.get("descripcion")?.toString() || "";
    const categoria = formData.get("categoria")?.toString() || "general";
    const file = formData.get("archivo") as File | null;

    if (!titulo || !file) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Detectar tipo
    const tipo = file.type.includes("pdf")
      ? "pdf"
      : file.type.includes("image")
      ? "imagen"
      : "otro";

    // Asegurar carpeta uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Guardar archivo físicamente
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadsDir, file.name);

    await writeFile(filePath, buffer);

    const archivoUrl = `/uploads/${file.name}`;

    // Guardar en BD
    const nuevoDoc = await prisma.documento.create({
      data: {
        titulo,
        descripcion,
        categoria,
        archivoUrl,
        tipo,
      },
    });

    return NextResponse.json(
      { mensaje: "Documento creado", documento: nuevoDoc },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error POST documentos:", error);
    return NextResponse.json(
      { error: "Error al crear documento" },
      { status: 500 }
    );
  }
}
