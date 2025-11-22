"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DocumentosAdmin() {
  const [docs, setDocs] = useState([]);

  const cargarDocs = async () => {
    const res = await fetch("/api/documentos");
    const data = await res.json();
    setDocs(data.documentos || []);
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este documento?")) return;

    await fetch(`/api/documentos/${id}`, { method: "DELETE" });
    cargarDocs();
  };

  useEffect(() => {
    cargarDocs();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header-section">
        <div>
          <h1 className="dashboard-title">Documentos</h1>
          <p className="dashboard-subtitle">
            Gestiona los documentos disponibles para los usuarios
          </p>
        </div>
        <Link href="/admin/documentos/nuevo" className="btn-add-doc">
          + Agregar Documento
        </Link>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="table-responsive" style={{ minWidth: "600px" }}>
            <thead className="table-header">
              <tr>
                <th className="table-th">Título</th>
                <th className="table-th">Categoría</th>
                <th className="table-th">Archivo</th>
                <th className="table-th table-th-center" style={{ width: "140px" }}>
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {docs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="table-empty">
                    No hay documentos registrados
                  </td>
                </tr>
              ) : (
                docs.map((d: any) => (
                  <tr key={d.id} className="table-row">
                    <td className="table-td">
                      <span className="table-cell-name">{d.titulo}</span>
                    </td>
                    <td className="table-td">
                      <span className="badge-category">{d.categoria}</span>
                    </td>
                    <td className="table-td">
                      <a 
                        href={d.archivoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-view-doc"
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Ver archivo
                      </a>
                    </td>
                    <td className="table-td text-center">
                      <button
                        className="btn-delete-doc"
                        onClick={() => eliminar(d.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer info */}
      {docs.length > 0 && (
        <div className="table-footer">
          Mostrando {docs.length} documento{docs.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}