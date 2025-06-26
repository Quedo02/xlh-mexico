import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const eventos = await prisma.evento.findMany({
    orderBy: { fecha: "desc" }, // Puedes usar asc para cronológico
  });
  return NextResponse.json(eventos);
}

export async function POST(req: Request) {
  const data = await req.json();
  const nuevoEvento = await prisma.evento.create({ data });
  return NextResponse.json(nuevoEvento);
}
