import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    const doc = await prisma.documento.findUnique({ where: { id: numericId } });
    if (!doc) {
      return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "public", doc.archivoUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await prisma.documento.delete({ where: { id: numericId } });
    return NextResponse.json({ mensaje: "Documento eliminado" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error DELETE documento:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    const data = await req.json();

    const updated = await prisma.documento.update({
      where: { id: numericId },
      data,
    });

    return NextResponse.json({ mensaje: "Documento actualizado", updated }, { status: 200 });
  } catch (error) {
    console.error("❌ Error PUT documento:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
