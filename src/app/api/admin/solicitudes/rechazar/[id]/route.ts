import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    await prisma.solicitudEspecialista.delete({ where: { id: numericId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rechazando solicitud:", error);
    return NextResponse.json(
      { success: false, error: "Error al rechazar solicitud" },
      { status: 500 }
    );
  }
}
