import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pacientes = await prisma.paciente.findMany({
      orderBy: { creadoEn: "desc" }
    });

    return NextResponse.json(pacientes);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    return NextResponse.json(
      { error: "Error al obtener los pacientes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const nuevoPaciente = await prisma.paciente.create({
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

    return NextResponse.json(nuevoPaciente, { status: 201 });
  } catch (error: any) {
    console.error("Error al registrar paciente:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
