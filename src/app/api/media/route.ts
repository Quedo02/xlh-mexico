// src/app/api/media/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJWTServer } from "../../../lib/auth";
export const runtime = "nodejs";

export async function GET() {
  const data = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  // (opcional) auth
  const token = cookies().get("token")?.value;
  const ok = token && await verifyJWTServer(token);
  if (!ok) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const { url, alt, caption, width, height, mime } = body;
  if (!url) return NextResponse.json({ error: "url requerida" }, { status: 400 });

  const media = await prisma.media.create({ data: { url, alt, caption, width, height, mime } });
  return NextResponse.json({ data: media });
}
