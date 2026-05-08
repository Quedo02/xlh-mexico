import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "slotsConfig.json");

// GET - obtener configuración actual
export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ 
        config: {
          homeCarrusel: "",
          homeBanner: "",
          sobreXLH: "",
          directorio: "",
          informacion: "",
          nosotros: "",
          registro: "",
          eventos: "",
          contacto: "",
          servicios: ""
        }
      });
    }
    const data = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(data);
    return NextResponse.json({ config: json });
  } catch {
    return NextResponse.json(
      { error: "No se pudo leer configuración", config: {} },
      { status: 500 }
    );
  }
}

// POST - guardar configuración
export async function POST(req: Request) {
  const store = await cookies();
  const token = store.get("token")?.value;
  if (!token || !(await verifyJWTServer(token))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Datos requeridos" }, { status: 400 });
    }

    // Asegurar que existe carpeta "data"
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    // Guardar en archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}
