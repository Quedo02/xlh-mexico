import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    await prisma.solicitudEspecialista.delete({ where: { id: numId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rechazando solicitud:", error);
    return NextResponse.json(
      { success: false, error: "Error al rechazar solicitud" },
      { status: 500 }
    );
  }
}
