import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "homeSlot.json");

// GET - obtener slot actual
export async function GET() {
  try {
    if (!fs.existsSync(filePath)) return NextResponse.json({ slot: "home.hero" });
    const data = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(data);
    return NextResponse.json({ slot: json.slot || "home.hero" });
  } catch {
    return NextResponse.json({ slot: "home.hero" });
  }
}

// POST - actualizar slot
export async function POST(req: Request) {
  const { slot } = await req.json();
  if (!slot) return NextResponse.json({ error: "slot requerido" }, { status: 400 });

  try {
    if (!fs.existsSync(path.join(process.cwd(), "data"))) fs.mkdirSync(path.join(process.cwd(), "data"));
    fs.writeFileSync(filePath, JSON.stringify({ slot }));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}
