"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Inicio de sesión exitoso");
        router.push("/admin/dashboard");
      } else {
        toast.error(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      toast.error("Error en la red");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `linear-gradient(
        to right,
        rgba(0, 38, 102, 0.85),
        rgba(102, 51, 153, 0.85)
      ), url('/img/contact-bg.jpg')`,
      backgroundSize: "cover",
      }}
    >
      <div
      className="card-formulario text-white p-4"
      style={{
        background: "rgba(0, 37, 102, 0.55)", // un poco más opaco
        border: "2px solid var(--color-cyan)",
        borderRadius: "20px",
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.4)", // sombra elegante
        backdropFilter: "blur(10px)", // efecto vidrio suave
      }}
    >
      {/* Área del logo */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)", // fondo suave para hacer contraste
          borderRadius: "50%",
          padding: "15px",
          width: "120px",
          height: "120px",
          margin: "0 auto 1rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
        }}
      >
        <img
          src="/Img/logo_sin_fondo.png"
          alt="Logo XLH"
          className="sombra-logo"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))",
          }}
        />
      </div>

      <h3
        className="text-center mb-4 fw-bold"
        style={{
          color: "var(--color-rosa-mexicano)",
          textShadow: "0 0 10px rgba(255, 105, 180, 0.3)",
        }}
      >
        ADMIN XLH México
      </h3>

      {/* El formulario sigue igual */}
      <form onSubmit={handleLogin}>
        {/* Campo correo */}
        <div className="mb-4 position-relative">
          <FaUser
            className="position-absolute"
            style={{ top: "12px", left: "15px", color: "var(--color-rosa)" }}
          />
          <input
            type="email"
            className="form-control ps-5"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid var(--color-cyan)",
              borderRadius: "30px",
              color: "white",
            }}
          />
        </div>

        {/* Campo contraseña */}
        <div className="mb-4 position-relative">
          <FaLock
            className="position-absolute"
            style={{ top: "12px", left: "15px", color: "var(--color-rosa)" }}
          />
          <input
            type="password"
            className="form-control ps-5"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid var(--color-cyan)",
              borderRadius: "30px",
              color: "white",
            }}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="btn btn-outline-rosa-mexicano w-100 fw-bold"
          style={{
            borderRadius: "30px",
            padding: "0.6rem",
            backgroundColor: "var(--color-rosa-mexicano)",
            color: "#fff",
            border: "none",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-cyan)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-rosa-mexicano)")
          }
          disabled={cargando}
        >
          {cargando ? "Iniciando..." : "Entrar"}
        </button>
      </form>
    </div>
    </div>
  );
}
