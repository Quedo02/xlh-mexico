import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// Ruta absoluta a la carpeta uploads
const uploadDir = path.join(process.cwd(), "uploads");

// Verificar si existe la carpeta "uploads" y crearla si no
function ensureUploadDir() {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

// Obtener todos los slots con sus imágenes
export async function GET() {
  ensureUploadDir();

  const slots = await prisma.mediaSlot.findMany({
    include: { slotMedias: { include: { media: true } } },
    orderBy: { slot: "asc" },
  });
  return NextResponse.json({ data: slots });
}

// Crear un nuevo slot
export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;
  const ok = token && (await verifyJWTServer(token));
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  ensureUploadDir();

  const { slot, alt, caption } = await req.json();
  if (!slot) return NextResponse.json({ error: "slot requerido" }, { status: 400 });

  const created = await prisma.mediaSlot.create({
    data: { slot, alt, caption },
  });

  return NextResponse.json({ data: created });
}

// Eliminar un slot
export async function DELETE(req: Request) {
  const token = (await cookies()).get("token")?.value;
  const ok = token && (await verifyJWTServer(token));
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slotId } = await req.json();
  if (!slotId) return NextResponse.json({ error: "slotId requerido" }, { status: 400 });

  await prisma.mediaSlot.delete({ where: { id: slotId } });
  return NextResponse.json({ success: true });
}
