import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";
import path from "path";

export const runtime = "nodejs";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;
const SPECIALISTS_DIR = path.join(process.cwd(), "public", "img", "especialistas");

export async function GET() {
  try {
    const especialistas = await prisma.especialista.findMany({ orderBy: { nombre: "asc" } });
    return NextResponse.json(especialistas);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const store = await cookies();
  const token = store.get("token")?.value;
  if (!token || !(await verifyJWTServer(token))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const nombre = formData.get("nombre")?.toString() ?? "";
    const especialidad = formData.get("especialidad")?.toString() ?? "";
    const ubicacion = formData.get("ubicacion")?.toString() ?? "";
    const telefono = formData.get("telefono")?.toString() ?? "";
    const correo = formData.get("correo")?.toString() ?? "";
    const hospital = formData.get("hospital")?.toString() ?? "";
    const comoConocieron = formData.get("comoConocieron")?.toString() ?? "";
    const perfilUrl = formData.get("perfilUrl")?.toString() ?? null;

    if (!nombre || !especialidad || !ubicacion || !telefono || !correo || !hospital || !comoConocieron) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const file = formData.get("foto");
    let fotoPath: string | null = null;

    if (file && file instanceof File && file.size > 0) {
      if (!ALLOWED_MIME.includes(file.type)) {
        return NextResponse.json({ error: "Tipo de archivo no permitido" }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: "Archivo demasiado grande (máx 5MB)" }, { status: 413 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = `${Date.now()}-${path.basename(file.name).replace(/\s+/g, "_")}`;
      await mkdir(SPECIALISTS_DIR, { recursive: true });
      await writeFile(path.join(SPECIALISTS_DIR, safeName), buffer);
      fotoPath = `/img/especialistas/${safeName}`;
    }

    const nuevo = await prisma.especialista.create({
      data: { nombre, especialidad, ubicacion, telefono, correo, hospital, comoConocieron, foto: fotoPath, perfilUrl },
    });

    return NextResponse.json(nuevo, { status: 201 });
  } catch (error) {
    console.error("Error creando especialista:", error);
    return NextResponse.json({ error: "Error al crear especialista" }, { status: 500 });
  }
}
