import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyJWTServer } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Await porque cookies() devuelve una promesa en este contexto
    const cookieStore = await cookies(); 
    const tokenCookie = cookieStore.get("token"); // { name, value } | undefined
    const token = tokenCookie?.value;

    // Verificar token JWT
    if (!token || !verifyJWTServer(token)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener solicitudes de especialistas de la base de datos
    const solicitudes = await prisma.solicitudEspecialista.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Retornar datos
    return NextResponse.json({ data: solicitudes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener solicitudes" },
      { status: 500 }
    );
  }
}
