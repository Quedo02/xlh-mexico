import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// DELETE → eliminar documento y archivo
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const doc = await prisma.documento.findUnique({
      where: { id: numId },
    });

    if (!doc) {
      return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "public", doc.archivoUrl);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await prisma.documento.delete({ where: { id: numId } });

    return NextResponse.json({ mensaje: "Documento eliminado" });
  } catch (error) {
    console.error("❌ Error DELETE documento:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// PUT → actualizar info sin archivo
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const data = await req.json();

    const updated = await prisma.documento.update({
      where: { id: numId },
      data,
    });

    return NextResponse.json({ mensaje: "Documento actualizado", updated });
  } catch (error) {
    console.error("❌ Error PUT documento:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
