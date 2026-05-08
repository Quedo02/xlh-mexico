import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "img/especialistas");

async function safeUnlink(absPath: string) {
  try { await fs.unlink(absPath); } catch {}
}

function isInsidePublic(absPath: string) {
  return path.normalize(absPath).startsWith(path.normalize(PUBLIC_DIR + path.sep));
}

function publicUrlToAbsPath(publicUrl: string) {
  if (!publicUrl.startsWith("/")) return null;
  const abs = path.join(PUBLIC_DIR, publicUrl);
  return isInsidePublic(abs) ? abs : null;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);
    if (Number.isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    const especialista = await prisma.especialista.findUnique({ where: { id } });
    if (!especialista) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(especialista);
  } catch (error) {
    console.error("GET single error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);
    if (Number.isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    const existente = await prisma.especialista.findUnique({ where: { id } });
    if (!existente) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    const formData = await req.formData();
    const nombre = formData.get("nombre")?.toString();
    const especialidad = formData.get("especialidad")?.toString();
    const ubicacion = formData.get("ubicacion")?.toString();
    const telefono = formData.get("telefono")?.toString();
    const correo = formData.get("correo")?.toString();
    const hospital = formData.get("hospital")?.toString();
    const comoConocieron = formData.get("comoConocieron")?.toString();
    const perfilUrl = formData.get("perfilUrl")?.toString();

    let nuevaFotoUrl: string | undefined;
    const foto = formData.get("foto");
    if (foto && foto instanceof File && foto.size > 0) {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      const filename = `${Date.now()}-${foto.name.replace(/\s+/g, "_")}`;
      const absPath = path.join(UPLOADS_DIR, filename);
      await fs.writeFile(absPath, Buffer.from(await foto.arrayBuffer()));
      nuevaFotoUrl = `/img/especialistas/${filename}`;
    }

    const data: Record<string, string> = {};
    if (nombre !== undefined) data.nombre = nombre;
    if (especialidad !== undefined) data.especialidad = especialidad;
    if (ubicacion !== undefined) data.ubicacion = ubicacion;
    if (telefono !== undefined) data.telefono = telefono;
    if (correo !== undefined) data.correo = correo;
    if (hospital !== undefined) data.hospital = hospital;
    if (comoConocieron !== undefined) data.comoConocieron = comoConocieron;
    if (perfilUrl !== undefined) data.perfilUrl = perfilUrl;
    if (nuevaFotoUrl) data.foto = nuevaFotoUrl;

    const updated = await prisma.especialista.update({ where: { id }, data });

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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);
    if (Number.isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    const existente = await prisma.especialista.findUnique({ where: { id } });
    if (!existente) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    await prisma.especialista.delete({ where: { id } });

    if (existente.foto) {
      const fotoAbs = publicUrlToAbsPath(existente.foto);
      if (fotoAbs) await safeUnlink(fotoAbs);
    }
    if (existente.perfilUrl) {
      const pageAbs = publicUrlToAbsPath(existente.perfilUrl);
      if (pageAbs) await safeUnlink(pageAbs);
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /especialistas/[id] error:", err);
    return NextResponse.json({ error: "Error al eliminar especialista" }, { status: 500 });
  }
}
