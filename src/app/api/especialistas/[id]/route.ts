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
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // Trae el existente para saber si hay que borrar foto anterior, etc.
    const existente = await prisma.especialista.findUnique({ where: { id } });
    if (!existente) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    const formData = await req.formData();

    // Campos (todos opcionales; mandas solo lo que cambie)
    const nombre = formData.get("nombre")?.toString();
    const especialidad = formData.get("especialidad")?.toString();
    const ubicacion = formData.get("ubicacion")?.toString();
    const telefono = formData.get("telefono")?.toString();
    const correo = formData.get("correo")?.toString();
    const hospital = formData.get("hospital")?.toString();
    const comoConocieron = formData.get("comoConocieron")?.toString();
    const perfilUrl = formData.get("perfilUrl")?.toString();

    // Foto nueva (opcional)
    let nuevaFotoUrl: string | undefined;
    const foto = formData.get("foto");
    if (foto && foto instanceof File && foto.size > 0) {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      const filename = `${Date.now()}-${foto.name.replace(/\s+/g, "_")}`;
      const absPath = path.join(UPLOADS_DIR, filename);
      const buf = Buffer.from(await foto.arrayBuffer());
      await fs.writeFile(absPath, buf);
      nuevaFotoUrl = `/img/especialistas/${filename}`;
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
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // Obtén datos para poder borrar archivos luego
    const existente = await prisma.especialista.findUnique({ where: { id } });
    if (!existente) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    // Borra el registro
    await prisma.especialista.delete({ where: { id } });

    // 1) Borra la foto si estaba en /public
    if (existente.foto) {
      const fotoAbs = publicUrlToAbsPath(existente.foto);
      if (fotoAbs) await safeUnlink(fotoAbs);
    }

    // 2) "Elimina mi página": si perfilUrl apunta a archivo dentro de /public, bórralo
    //    (por ejemplo algo como "/perfiles/123.html" o "/perfil/juan.html")
    if (existente.perfilUrl) {
      const pageAbs = publicUrlToAbsPath(existente.perfilUrl);
      if (pageAbs) await safeUnlink(pageAbs);
    }

    // Respuesta sin contenido
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /especialistas/[id] error:", err);
    return NextResponse.json({ error: "Error al eliminar especialista" }, { status: 500 });
  }
}
