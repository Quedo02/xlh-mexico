import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const nuevoPaciente = await prisma.paciente.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
        edad: parseInt(data.edad),
        diagnosticoConfirmado: data.diagnosticoConfirmado === true || data.diagnosticoConfirmado === "Sí",
        especialidades: Array.isArray(data.especialidades)
          ? data.especialidades.join(", ")
          : data.especialidades || null,
      },
    });

    return NextResponse.json(nuevoPaciente, { status: 201 });
  } catch (error) {
    console.error("Error al registrar paciente:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
