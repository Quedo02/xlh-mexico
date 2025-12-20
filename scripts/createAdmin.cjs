// scripts/create-admin.js
require("dotenv").config(); // si corres en VPS con env ya cargadas, esto no estorba

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const readline = require("readline");

const prisma = new PrismaClient();

function createRl() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ask(rl, q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

// Prompt oculto (muestra * por cada char). Funciona bien en terminal normal.
function askHidden(q) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const stdout = process.stdout;

    let value = "";

    stdout.write(q);
    stdin.resume();
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");

    function onData(ch) {
      // Enter
      if (ch === "\r" || ch === "\n") {
        stdout.write("\n");
        cleanup();
        return resolve(value);
      }

      // Ctrl+C
      if (ch === "\u0003") {
        stdout.write("\nCancelado.\n");
        cleanup();
        process.exit(1);
      }

      // Backspace (Linux/Mac suele ser \u007f; en Windows a veces \b)
      if (ch === "\u007f" || ch === "\b") {
        if (value.length > 0) {
          value = value.slice(0, -1);
          // borra un asterisco de la consola
          stdout.write("\b \b");
        }
        return;
      }

      // Ignora otras teclas raras
      if (typeof ch !== "string" || ch.length === 0) return;

      value += ch;
      stdout.write("*");
    }

    function cleanup() {
      stdin.removeListener("data", onData);
      try {
        stdin.setRawMode(false);
      } catch {}
      stdin.pause();
    }

    stdin.on("data", onData);
  });
}

async function createOrUpdateAdmin(email, plainPassword) {
  const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
  const hashedPassword = await bcrypt.hash(plainPassword, rounds);

  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing) {
    return { action: "exists", admin: existing };
  }

  const admin = await prisma.admin.create({
    data: { email, password: hashedPassword },
    select: { id: true, email: true, createdAt: true },
  });

  return { action: "created", admin };
}

async function updateAdminPassword(email, plainPassword) {
  const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
  const hashedPassword = await bcrypt.hash(plainPassword, rounds);

  const admin = await prisma.admin.update({
    where: { email },
    data: { password: hashedPassword },
    select: { id: true, email: true, createdAt: true },
  });

  return admin;
}

async function main() {
  const rl = createRl();

  try {
    while (true) {
      let email = (await ask(rl, "Correo del admin: ")).trim().toLowerCase();
      if (!email) {
        console.log("Email vacío. Intenta otra vez.\n");
        continue;
      }

      const password = await askHidden("Contraseña: ");
      const confirm = await askHidden("Confirmar contraseña: ");

      if (!password) {
        console.log("Contraseña vacía. Intenta otra vez.\n");
        continue;
      }

      if (password !== confirm) {
        console.log("No coinciden las contraseñas. Intenta otra vez.\n");
        continue;
      }

      const result = await createOrUpdateAdmin(email, password);

      if (result.action === "exists") {
        const ans = (await ask(rl, "Ya existe ese correo. ¿Actualizar contraseña? (s/N): "))
          .trim()
          .toLowerCase();

        if (ans === "s" || ans === "si" || ans === "sí") {
          const updated = await updateAdminPassword(email, password);
          console.log("✅ Contraseña actualizada:", updated);
        } else {
          console.log("⏭️  Sin cambios.\n");
        }
      } else {
        console.log("✅ Administrador creado:", result.admin);
      }

      const again = (await ask(rl, "¿Crear/actualizar otro admin? (s/N): "))
        .trim()
        .toLowerCase();

      if (!(again === "s" || again === "si" || again === "sí")) break;

      console.log("");
    }
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
