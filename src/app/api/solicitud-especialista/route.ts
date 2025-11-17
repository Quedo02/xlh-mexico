// api/solicitud-especialista/route.ts
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

    // Validar campos obligatorios
    if (!nombre || !especialidad || !ubicacion || !telefono || !correo || !hospital || !comoConocieron) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    let fotoPath: string | null = null;

    if (foto) {
      if (foto.startsWith("/img/") || foto.startsWith("http") || foto.startsWith("/uploads/")) {
        // Fotos prediseñadas, externas o ya en uploads
        fotoPath = foto;
      } else if (foto.startsWith("data:image/")) {
        // Foto en base64 → guardamos en /uploads/
        const uploadsDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

        // Extraer extensión del base64
        const matches = foto.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (!matches) throw new Error("Formato de imagen inválido");

        const ext = matches[1]; // png, jpg, jpeg, etc.
        const base64Data = matches[2];
        const filename = `${Date.now()}.${ext}`;
        const filePath = path.join(uploadsDir, filename);

        // Escribir archivo físico
        fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));

        fotoPath = `/uploads/${filename}`;
      } else {
        // Si solo es nombre de archivo sin path, lo guardamos también en /uploads/
        const uploadsDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

        const filename = `${Date.now()}_${foto}`;
        fotoPath = `/uploads/${filename}`;
        // Aquí deberías mover/copy el archivo físico si existe en otro lado
      }
    }

    if (!foto || !(foto instanceof File) || foto.size === 0) {
      return NextResponse.json({ success: false, error: "Falta la foto" }, { status: 400 });
    }

    if (!isValidImageType(foto)) {
      return NextResponse.json({ success: false, error: "Tipo de imagen no permitido" }, { status: 400 });
    }

    // Asegura carpeta
    await fs.mkdir(SPECIALISTS_DIR, { recursive: true });

    // Nombre único seguro
    const original = foto.name.replace(/\s+/g, "_");
    const safeName = `${Date.now()}-${original}`;
    const absPath = path.join(SPECIALISTS_DIR, safeName);

    // Guarda binario
    const buffer = Buffer.from(await foto.arrayBuffer());
    await fs.writeFile(absPath, buffer);

    // Ruta pública que servirás en <img src="...">
    const publicUrl = `/img/especialistas/${safeName}`;

    // Guarda solicitud en BD con la ruta pública
    const nuevaSolicitud = await prisma.solicitudEspecialista.create({
      data: {
        nombre,
        especialidad,
        ubicacion,
        telefono,
        correo,
        hospital,
        comoConocieron,
        foto: publicUrl,
        perfilUrl: perfilUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: nuevaSolicitud }, { status: 201 });
  } catch (error) {
    console.error("Error creando solicitud:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
