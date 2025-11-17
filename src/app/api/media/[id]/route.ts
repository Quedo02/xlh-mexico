import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { unlink } from "fs/promises";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  // Verificar si la media está siendo usada en algún slot
  const usageCount = await prisma.slotMedia.count({
    where: { mediaId: id },
  });

  if (usageCount > 0) {
    return NextResponse.json(
      { error: "No se puede eliminar. La imagen está asignada a uno o más slots." },
      { status: 400 }
    );
  }

  // Intentar eliminar archivo físico
  const filePath = path.join(process.cwd(), "public", media.url);
  try {
    await unlink(filePath);
  } catch {
    console.warn("No se pudo eliminar el archivo físico");
  }

  // Eliminar registro de la base de datos
  await prisma.media.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
