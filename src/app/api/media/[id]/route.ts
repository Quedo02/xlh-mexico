// src/app/api/media/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJWTServer } from "../../../../lib/auth";
export const runtime = "nodejs";

export async function PUT(_: Request, { params }: { params: { id: string } }) {
  const token = cookies().get("token")?.value;
  const ok = token && await verifyJWTServer(token);
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const id = Number(params.id);
  const body = await _.json();
  const media = await prisma.media.update({ where: { id }, data: body });
  return NextResponse.json({ data: media });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  // (opcional) checa usos: await prisma.mediaSlot.count({ where: { mediaId: id } })
  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
