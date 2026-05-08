import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const store = await cookies();
  const token = store.get("token")?.value;
  if (!token || !(await verifyJWTServer(token))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    await prisma.solicitudEspecialista.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rechazando solicitud:", error);
    return NextResponse.json({ success: false, error: "Error al rechazar solicitud" }, { status: 500 });
  }
}
