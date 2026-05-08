import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";
import fs from "fs";
import path from "path";

async function requireAuth() {
  const store = await cookies();
  const token = store.get("token")?.value;
  if (!token || !(await verifyJWTServer(token))) return false;
  return true;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    const doc = await prisma.documento.findUnique({ where: { id } });
    if (!doc) {
      return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "public", doc.archivoUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await prisma.documento.delete({ where: { id } });
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
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id: rawId } = await params;
    const id = Number(rawId);
    const { titulo, descripcion, categoria } = await req.json();

    const updated = await prisma.documento.update({
      where: { id },
      data: { titulo, descripcion, categoria },
    });

    return NextResponse.json({ mensaje: "Documento actualizado", updated }, { status: 200 });
  } catch (error) {
    console.error("❌ Error PUT documento:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
