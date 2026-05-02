import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SPECIALISTS_DIR = path.join(PUBLIC_DIR, "img", "especialistas");

function isValidText(value: any) {
  return typeof value === "string" && value.trim().length > 0;
}

// ---------- GET: LISTAR ----------
export async function GET() {
  try {
    const especialistas = await prisma.especialista.findMany();
    return NextResponse.json(especialistas);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ---------- POST: CREAR ----------
export async function POST(req: Request) {
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

    const foto = formData.get("foto") as File | null;

    if (
      !isValidText(nombre) ||
      !isValidText(especialidad) ||
      !isValidText(telefono) ||
      !isValidText(comoConocieron)
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Manejo de imagen (opcional)
    let imageUrl: string | null = null;

    if (foto && foto.size > 0) {
      const buffer = Buffer.from(await foto.arrayBuffer());
      const imgName = `${Date.now()}-${foto.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(SPECIALISTS_DIR, imgName);

      await fs.mkdir(SPECIALISTS_DIR, { recursive: true });
      await fs.writeFile(filePath, buffer);

      imageUrl = `/img/especialistas/${imgName}`;
    }

    const newEspecialista = await prisma.especialista.create({
      data: {
        nombre,
        especialidad,
        ubicacion,
        telefono,
        correo,
        hospital,
        comoConocieron,
        foto: imageUrl,   
        perfilUrl,        
      },
    });

    return NextResponse.json(newEspecialista, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}