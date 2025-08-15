import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Buscar admin por email
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  // Validar contraseña
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  // Generar JWT
  const token = jwt.sign(
    { id: admin.id, role: "admin" },
    process.env.JWT_SECRET!,
    { expiresIn: "48h" }
  );

  // Guardar cookie httpOnly
  const res = NextResponse.json({ message: "Login exitoso" });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 48 * 60 * 60, // 48h
    path: "/",
    sameSite: "strict"
  });

  return res;
}
