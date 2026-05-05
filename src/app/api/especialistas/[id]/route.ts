import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

/** ───────── helpers ───────── */
const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "img/especialistas");

async function safeUnlink(absPath: string) {
  try {
    await fs.unlink(absPath);
  } catch {}
}

function isInsidePublic(absPath: string) {
  const normalizedPublic = path.normalize(PUBLIC_DIR + path.sep);
  const normalizedTarget = path.normalize(absPath);
  return normalizedTarget.startsWith(normalizedPublic);
}

function publicUrlToAbsPath(publicUrl: string) {
  // solo convierte rutas que empiezan con "/"
  if (!publicUrl.startsWith("/")) return null;
  const abs = path.join(PUBLIC_DIR, publicUrl);
  return isInsidePublic(abs) ? abs : null;
}

/** ===================== PUT ===================== **/
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await context.params;

    const especialista = await prisma.especialista.findUnique({
      where: { id: Number(id) },
    });

    if (!especialista) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

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

    // ✅ CAMBIO AQUÍ TAMBIÉN
    const foto = formData.get("foto") as File | null;

    let imageUrl: string | undefined;

    if (foto && foto.size > 0) {
      const buffer = Buffer.from(await foto.arrayBuffer());
      const imgName = `${Date.now()}-${foto.name}`;
      const filePath = path.join(SPECIALISTS_DIR, imgName);

      await fs.mkdir(SPECIALISTS_DIR, { recursive: true });
      await fs.writeFile(filePath, buffer);

      imageUrl = `/img/especialistas/${imgName}`;
    }

    // Construye el "data" dinámico
    const data: Record<string, any> = {};
    if (nombre !== undefined) data.nombre = nombre;
    if (especialidad !== undefined) data.especialidad = especialidad;
    if (ubicacion !== undefined) data.ubicacion = ubicacion;
    if (telefono !== undefined) data.telefono = telefono;
    if (correo !== undefined) data.correo = correo;
    if (hospital !== undefined) data.hospital = hospital;
    if (comoConocieron !== undefined) data.comoConocieron = comoConocieron;
    if (perfilUrl !== undefined) data.perfilUrl = perfilUrl;
    if (nuevaFotoUrl) data.foto = nuevaFotoUrl;

    const updated = await prisma.especialista.update({
      where: { id },
      data,
    });

    // Si cambiaste foto, intenta borrar la anterior (solo si estaba dentro de /public)
    if (nuevaFotoUrl && existente.foto && existente.foto !== nuevaFotoUrl) {
      const oldAbs = publicUrlToAbsPath(existente.foto);
      if (oldAbs) await safeUnlink(oldAbs);
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("PUT /especialistas/[id] error:", err);
    return NextResponse.json({ error: "Error al actualizar especialista" }, { status: 500 });
  }
}

/** ===================== DELETE ===================== **/
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const especialista = await prisma.especialista.findUnique({
      where: { id: numId },
    });

    if (!especialista) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    if (especialista.foto) {
      const filePath = path.join(PUBLIC_DIR, especialista.foto);
      await fs.rm(filePath, { force: true });
    }

    await prisma.especialista.delete({
      where: { id: numId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}