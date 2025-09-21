import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";

function ensureUploadsDir() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  return uploadsDir;
}

export async function GET() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: media });
}

export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;
  const ok = token && (await verifyJWTServer(token));
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt")?.toString();
    const caption = formData.get("caption")?.toString();

    if (!file) return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });

    const uploadsDir = ensureUploadsDir();
    const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    const saved = await prisma.media.create({
      data: {
        url: `/uploads/${fileName}`,
        alt,
        caption,
      },
    });

    return NextResponse.json({ data: saved });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
  }
}
