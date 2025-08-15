import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // Ajusta estos atributos a cómo creas tu cookie en /api/login
  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,   // si así lo pones al crear
    secure: true,     // en prod true; en dev puedes poner false
    sameSite: "lax",  // o "strict"/"none" según tu caso
    path: "/",        // usa el mismo path que al crear
    expires: new Date(0), // o maxAge: 0
  });

  return res;
}
