import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const evento = await prisma.evento.findUnique({ where: { id: numId } });

    if (!evento)
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });

    if (evento.imagen) {
      const cleaned = evento.imagen.replace(/^\/+/, "");
      const imagePath = path.join(process.cwd(), "public", cleaned);
      await fs.unlink(imagePath).catch(() => {});
    }

    await prisma.evento.delete({ where: { id: numId } });

    return NextResponse.json({ message: "Evento eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar evento" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const formData = await req.formData();
    const titulo = formData.get("titulo")?.toString() || "";
    const descripcion = formData.get("descripcion")?.toString() || "";
    const fecha = formData.get("fecha")?.toString() || "";
    const lugar = formData.get("lugar")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const file = formData.get("imagen") as File | null;

    const existing = await prisma.evento.findUnique({ where: { id: numId } });

    if (!existing)
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });

    const updateData: any = {
      titulo,
      descripcion,
      fecha: new Date(fecha),
      lugar,
      link,
    };

    if (file && file.size > 0) {
      if (existing.imagen) {
        const oldPath = path.join(process.cwd(), "public", existing.imagen.replace(/^\/+/, ""));
        await fs.unlink(oldPath).catch(() => {});
      }

      const bytes = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const newPath = path.join(process.cwd(), "public", "uploads", filename);

      await fs.writeFile(newPath, bytes);
      updateData.imagen = `/uploads/${filename}`;
    }

    const updated = await prisma.evento.update({
      where: { id: numId },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Error al modificar evento" }, { status: 500 });
  }
}
