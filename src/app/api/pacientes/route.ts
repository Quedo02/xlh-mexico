import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const nuevoPaciente = await prisma.paciente.create({
      data: {
        nombre: data.nombre,
        sexo: data.sexo,
        fechaNacimiento: new Date(data.fechaNacimiento),
        edad: parseInt(data.edad),
        residencia: data.residencia,
        telefono: data.telefono,
        email: data.email,
        origenDiagnostico: data.origenDiagnostico ?? null,
        familiarDiagnostico: data.familiarDiagnostico ?? null,
        seguridadSocial: data.seguridadSocial,
        institucion: data.institucion ?? null,
        medico: data.medico,
        especialidadMedico: data.especialidadMedico,
        telefonoMedico: data.telefonoMedico,
        diagnosticoConfirmado: data.diagnosticoConfirmado === true || data.diagnosticoConfirmado === "Sí",
        tratamiento: data.tratamiento ?? null,
        especialidades: Array.isArray(data.especialidades)
          ? data.especialidades.join(", ")
          : data.especialidades || null,
      },
    });

    return NextResponse.json(nuevoPaciente, { status: 201 });
  } catch (error) {
    console.error("Error al registrar paciente:", error);
    return NextResponse.json({ error: "Error al registrar paciente" }, { status: 500 });
  }
}
