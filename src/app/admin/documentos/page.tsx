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
    <section className="container my-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Documentos</h1>
        <Link href="/admin/documentos/nuevo" className="btn btn-primary">
          + Agregar Documento
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {docs.map((d: any) => (
            <tr key={d.id}>
              <td>{d.titulo}</td>
              <td>{d.categoria}</td>
              <td>
                <a href={d.archivoUrl} target="_blank">Ver archivo</a>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminar(d.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
