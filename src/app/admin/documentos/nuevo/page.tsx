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
    <section className="container my-5">
      <h1>Nuevo Documento</h1>

      <form onSubmit={enviar} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
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

        <div className="mb-3">
          <label className="form-label">Archivo PDF/Imagen</label>
          <input
            className="form-control"
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button className="btn btn-success">Guardar</button>
      </form>
    </section>
  );
}
