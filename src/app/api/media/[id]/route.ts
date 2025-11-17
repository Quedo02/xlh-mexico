import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { unlink } from "fs/promises";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get("token")?.value;
  const ok = token && (await verifyJWTServer(token));
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const usageCount = await prisma.slotMedia.count({ where: { mediaId: id } });
  if (usageCount > 0) {
    return NextResponse.json(
      { error: "No se puede eliminar. La imagen está asignada a uno o más slots." },
      { status: 400 }
    );
  }

  // Eliminar archivo físico
  const filePath = path.join(process.cwd(), "public", media.url.replace(/^\/+/, ""));
  try {
    await unlink(filePath);
  } catch {
    console.warn("No se pudo eliminar el archivo físico");
  }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
