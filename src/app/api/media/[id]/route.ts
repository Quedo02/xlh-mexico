import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { unlink } from "fs/promises";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const token = (await cookies()).get("token")?.value;
  const ok = token && (await verifyJWTServer(token));
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await context.params;
  const numId = Number(id);

  const media = await prisma.media.findUnique({ where: { id: numId } });
  if (!media)
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const usageCount = await prisma.slotMedia.count({ where: { mediaId: numId } });
  if (usageCount > 0)
    return NextResponse.json(
      { error: "No se puede eliminar: la imagen está asignada a un slot." },
      { status: 400 }
    );

  const filePath = path.join(process.cwd(), "public", media.url.replace(/^\/+/, ""));
  try {
    await unlink(filePath);
  } catch {}

  await prisma.media.delete({ where: { id: numId } });

  return NextResponse.json({ success: true });
}
