"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login Administrador</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
            {cargando ? "Iniciando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
