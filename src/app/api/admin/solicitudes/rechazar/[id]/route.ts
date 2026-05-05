import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.solicitudEspecialista.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rechazando solicitud:", error);
    return NextResponse.json({ success: false, error: "Error al rechazar solicitud" }, { status: 500 });
  }
}
