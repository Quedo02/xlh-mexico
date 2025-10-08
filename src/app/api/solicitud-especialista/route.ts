// api/solicitud-especialista/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      nombre,
      especialidad,
      ubicacion,
      telefono,
      correo,
      hospital,
      comoConocieron,
      foto, // aquí esperamos base64 o ruta
      perfilUrl,
    } = data;

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

    const nuevaSolicitud = await prisma.solicitudEspecialista.create({
      data: {
        nombre,
        especialidad,
        ubicacion,
        telefono,
        correo,
        hospital,
        comoConocieron,
        foto: fotoPath,
        perfilUrl,
      },
    });

    return NextResponse.json({ success: true, data: nuevaSolicitud });
  } catch (error) {
    console.error("Error creando solicitud:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
