import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs"; // necesario para usar fs en App Router

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SPECIALISTS_DIR = path.join(PUBLIC_DIR, "img", "especialistas");

function isValidImageType(file: File) {
  // ajusta si quieres permitir más tipos
  return ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const nombre = form.get("nombre")?.toString() ?? "";
    const especialidad = form.get("especialidad")?.toString() ?? "";
    const ubicacion = form.get("ubicacion")?.toString() ?? "";
    const telefono = form.get("telefono")?.toString() ?? "";
    const correo = form.get("correo")?.toString() ?? "";
    const hospital = form.get("hospital")?.toString() ?? "";
    const comoConocieron = form.get("comoConocieron")?.toString() ?? "";
    const perfilUrl = form.get("perfilUrl")?.toString() ?? "";

    const foto = form.get("foto");

    // ✅ SOLO los obligatorios reales
    if (!nombre || !especialidad || !telefono || !comoConocieron) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    let fotoPath: string | null = null;

    // =========================
    // FOTO OPCIONAL
    // =========================

    if (foto) {

      // STRING
      if (typeof foto === "string") {

        if (foto.startsWith("http") || foto.startsWith("/img/") || foto.startsWith("/uploads/")) {
          fotoPath = foto;
        }

        else if (foto.startsWith("data:image/")) {
          await fs.mkdir(UPLOADS_DIR, { recursive: true });

          const matches = foto.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);

          if (!matches) {
            return NextResponse.json(
              { success: false, error: "Formato de imagen base64 inválido" },
              { status: 400 }
            );
          }

          const ext = matches[1];
          const base64Data = matches[2];
          const filename = `${Date.now()}.${ext}`;
          const filePath = path.join(UPLOADS_DIR, filename);

          await fs.writeFile(filePath, Buffer.from(base64Data, "base64"));

          fotoPath = `/uploads/${filename}`;
        }
      }

      // FILE REAL
      else if (foto instanceof File) {

        if (foto.size > 0) {

          if (!isValidImageType(foto)) {
            return NextResponse.json(
              { success: false, error: "Tipo de imagen no permitido" },
              { status: 400 }
            );
          }

          await fs.mkdir(SPECIALISTS_DIR, { recursive: true });

          const safeName = `${Date.now()}-${foto.name.replace(/\s+/g, "_")}`;
          const absPath = path.join(SPECIALISTS_DIR, safeName);

          const buffer = Buffer.from(await foto.arrayBuffer());
          await fs.writeFile(absPath, buffer);

          fotoPath = `/img/especialistas/${safeName}`;
        }
      }
    }

    // =========================
    // GUARDAR EN BD
    // =========================

    const nuevaSolicitud = await prisma.solicitudEspecialista.create({
      data: {
        nombre,
        especialidad,
        ubicacion,
        telefono,
        correo,
        hospital,
        comoConocieron,
        foto: fotoPath, // 👈 puede ser null
        perfilUrl: perfilUrl || null,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaSolicitud },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creando solicitud:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}