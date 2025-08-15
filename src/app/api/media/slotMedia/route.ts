import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";

export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;
  const ok = token && (await verifyJWTServer(token));
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slotId, mediaId } = await req.json();
  if (!slotId || !mediaId) return NextResponse.json({ error: "slotId y mediaId requeridos" }, { status: 400 });

  const created = await prisma.slotMedia.create({
    data: { slotId, mediaId },
    include: { media: true },
  });

  return NextResponse.json({ data: created });
}

// Eliminar imagen de un slot
export async function DELETE(req: Request) {
  const token = (await cookies()).get("token")?.value;
  const ok = token && (await verifyJWTServer(token));
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slotMediaId } = await req.json();
  if (!slotMediaId) return NextResponse.json({ error: "slotMediaId requerido" }, { status: 400 });

  await prisma.slotMedia.delete({ where: { id: slotMediaId } });
  return NextResponse.json({ success: true });
}
