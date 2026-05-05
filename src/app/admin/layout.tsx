"use client";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <aside className="sidebar-admin">
        <h4>XLH México</h4>
        <ul className="nav flex-column">
          <li className="nav-item"><Link href="/admin/dashboard" className="nav-link">Dashboard</Link></li>
          <li className="nav-item"><Link href="/admin/eventos" className="nav-link">Eventos</Link></li>
          <li className="nav-item"><Link href="/admin/directorio" className="nav-link">Directorio</Link></li>
          <li className="nav-item"><Link href="/admin/galeria" className="nav-link">Galeria</Link></li>
          <li className="nav-item"><Link href="/admin/solicitudes" className="nav-link">Solicitudes</Link></li>
          <li className="nav-item">
            <button
              className="btn-logout"
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                window.location.href = "/login";
              }}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </aside>
      <main className="flex-grow-1 p-4 bg-light">
        {children}
        <ToastContainer />
      </main>
    </div>
  );
}