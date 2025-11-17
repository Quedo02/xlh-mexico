import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// DELETE → eliminar documento y borrar archivo físico
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const doc = await prisma.documento.findUnique({
      where: { id },
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    // Ruta del archivo físico
    const filePath = path.join(process.cwd(), "public", doc.archivoUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.documento.delete({ where: { id } });

    return NextResponse.json(
      { mensaje: "Documento eliminado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error DELETE documento:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// PUT → Actualizar info del documento (sin archivo)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = await req.json();

    const updated = await prisma.documento.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      { mensaje: "Documento actualizado", updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error PUT documento:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
