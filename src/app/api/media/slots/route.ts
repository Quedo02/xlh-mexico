// src/app/api/media/slots/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJWTServer } from "../../../../lib/auth";
export const runtime = "nodejs";

export async function GET() {
  const slots = await prisma.mediaSlot.findMany({
    include: { media: true },
    orderBy: { slot: "asc" },
  });
  return NextResponse.json({ data: slots });
}

export async function POST(req: Request) {
  const token = cookies().get("token")?.value;
  const ok = token && await verifyJWTServer(token);
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slot, mediaId, alt, caption } = await req.json();
  if (!slot) return NextResponse.json({ error: "slot requerido" }, { status: 400 });

  const upserted = await prisma.mediaSlot.upsert({
    where: { slot },
    update: { mediaId, alt, caption },
    create: { slot, mediaId, alt, caption },
    include: { media: true },
  });
  return NextResponse.json({ data: upserted });
}
