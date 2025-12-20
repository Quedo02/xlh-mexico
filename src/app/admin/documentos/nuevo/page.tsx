"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoDocumento() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("informativo");
  const [archivo, setArchivo] = useState<File | null>(null);

  const enviar = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria);
    if (archivo) formData.append("archivo", archivo);

    await fetch("/api/documentos", {
      method: "POST",
      body: formData,
    });

    router.push("/admin/documentos");
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: "800px" }}>
      {/* Header */}
      <div className="dashboard-header">
        <button onClick={() => router.back()} className="btn-back">
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
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Volver
        </button>
        <h1 className="dashboard-title">Nuevo Documento</h1>
        <p className="dashboard-subtitle">
          Completa el formulario para agregar un nuevo documento
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={enviar}>
        <div className="form-card">
          {/* Título */}
          <div className="form-group">
            <label className="form-label">Título *</label>
            <input
              className="form-input"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Guía de tratamiento para pacientes"
              required
            />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe brevemente el contenido del documento..."
            />
            <p className="form-hint">
              Opcional. Ayuda a los usuarios a entender el contenido.
            </p>
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label className="form-label">Categoría *</label>
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="informativo">Material Informativo</option>
              <option value="pacientes">Documentos para Pacientes</option>
              <option value="administrativo">Administrativos</option>
            </select>
          </div>

          {/* Archivo */}
          <div className="form-group">
            <label className="form-label">Archivo (PDF o Imagen) *</label>
            <input
              className="form-file"
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setArchivo(e.target.files?.[0] || null)}
              required
            />
            {archivo && (
              <div className="file-preview">
                <p className="file-preview-text">
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
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                  <span className="file-preview-name">{archivo.name}</span>
                  <span className="file-preview-size">
                    ({(archivo.size / 1024).toFixed(1)} KB)
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel-form"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-submit">
            Guardar Documento
          </button>
        </div>
      </form>
    </div>
  );
}