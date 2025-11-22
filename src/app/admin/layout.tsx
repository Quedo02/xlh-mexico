"use client";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout-wrapper">
      {/* Menu Toggle Button */}
      <button 
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`menu-toggle-icon ${menuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Overlay */}
      <div 
        className={`layout-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h4 className="sidebar-title">XLH México</h4>
          <div className="sidebar-divider"></div>
        </div>
        
        <ul className="nav-list">
          <li className="nav-item">
            <Link 
              href="/admin/dashboard" 
              className="nav-link-custom"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              href="/admin/pacientes" 
              className="nav-link-custom"
              onClick={() => setMenuOpen(false)}
            >
              Pacientes
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              href="/admin/eventos" 
              className="nav-link-custom"
              onClick={() => setMenuOpen(false)}
            >
              Eventos
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              href="/admin/directorio" 
              className="nav-link-custom"
              onClick={() => setMenuOpen(false)}
            >
              Directorio
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              href="/admin/galeria" 
              className="nav-link-custom"
              onClick={() => setMenuOpen(false)}
            >
              Galeria
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              href="/admin/solicitudes" 
              className="nav-link-custom"
              onClick={() => setMenuOpen(false)}
            >
              Solicitudes
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              href="/admin/documentos" 
              className="nav-link-custom"
              onClick={() => setMenuOpen(false)}
            >
              Documentos
            </Link>
          </li>
          <li className="nav-item logout-wrapper">
            <button
              className="logout-button"
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                window.location.href = "/";
              }}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        {children}
        <ToastContainer />
      </main>
    </div>
  );
}