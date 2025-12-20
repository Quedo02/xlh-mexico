import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const paciente = await prisma.paciente.findUnique({
      where: { id: Number(id) },
    });

    if (!paciente)
      return NextResponse.json({ error: "Paciente no encontrado" }, { status: 404 });

    return NextResponse.json(paciente);
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    return NextResponse.json({ error: "Error al obtener paciente" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await req.json();

    const updated = await prisma.paciente.update({
      where: { id: Number(id) },
      data: {
        ...data,
        edad: Number(data.edad),
        fechaNacimiento: new Date(data.fechaNacimiento),
        diagnosticoConfirmado:
          data.diagnosticoConfirmado === true ||
          data.diagnosticoConfirmado === "Sí",
        especialidades: Array.isArray(data.especialidades)
          ? data.especialidades.join(", ")
          : data.especialidades || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    return NextResponse.json({ error: "No se pudo actualizar paciente" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.paciente.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Paciente eliminado" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    return NextResponse.json({ error: "No se pudo eliminar paciente" }, { status: 500 });
  }
}
