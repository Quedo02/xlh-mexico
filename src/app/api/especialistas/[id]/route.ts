import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SPECIALISTS_DIR = path.join(PUBLIC_DIR, "img", "especialistas");

// ---------- GET UNO ----------
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const especialista = await prisma.especialista.findUnique({
      where: { id: Number(id) },
    });

    if (!especialista)
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    return NextResponse.json(especialista);
  } catch (error) {
    console.error("GET single error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ---------- PUT ----------
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const formData = await req.formData();
    const nombre = formData.get("nombre");
    const especialidad = formData.get("especialidad");
    const imagen = formData.get("imagen") as File | null;

    let imageUrl: string | undefined;

    if (imagen && imagen.size > 0) {
      const buffer = Buffer.from(await imagen.arrayBuffer());
      const imgName = `${Date.now()}-${imagen.name}`;
      const filePath = path.join(SPECIALISTS_DIR, imgName);

      await fs.mkdir(SPECIALISTS_DIR, { recursive: true });
      await fs.writeFile(filePath, buffer);

      imageUrl = `/img/especialistas/${imgName}`;
    }

    const updated = await prisma.especialista.update({
      where: { id: numId },
      data: {
        nombre: String(nombre),
        especialidad: String(especialidad),
        ...(imageUrl && { foto: imageUrl }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ---------- DELETE ----------
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const especialista = await prisma.especialista.findUnique({
      where: { id: numId },
    });

    if (!especialista)
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    if (especialista.foto) {
      const filePath = path.join(PUBLIC_DIR, especialista.foto);
      await fs.rm(filePath, { force: true });
    }

    await prisma.especialista.delete({ where: { id: numId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
