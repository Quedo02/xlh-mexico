"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

interface Documento {
  id: number;
  titulo: string;
  descripcion?: string;
  categoria: string;
  archivoUrl: string;
  thumbnail?: string;
  tipo: string; // pdf | imagen | otro
  createdAt: string;
}

export default function Informacion() {
  const [docs, setDocs] = useState<Documento[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Documento[]>([]);
  const [categoria, setCategoria] = useState<string>("todos");
  const [categoriasUnicas, setCategoriasUnicas] = useState<string[]>([]);

  // Obtener documentos desde la API
  useEffect(() => {
    fetch("/api/documentos")
      .then((res) => res.json())
      .then((data: { documentos: Documento[] }) => {
        setDocs(data.documentos);

        // Extraer categorías
        const catsArray = Array.from(
          new Set(data.documentos.map((d) => d.categoria))
        );

        setCategoriasUnicas(["todos", ...catsArray]);
        setFilteredDocs(data.documentos);
      });
  }, []);

  // Filtrar documentos
  const filtrar = (cat: string) => {
    setCategoria(cat);

    if (cat === "todos") {
      setFilteredDocs(docs);
    } else {
      setFilteredDocs(docs.filter((doc) => doc.categoria === cat));
    }
  };

  return (
    <>
      <HeroSection
        title="Información"
        subtitle="Sumérgete en Nuestro Material Educativo"
        sectionName="informacion"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <section className="container my-5">
        <h2 className="titulo-seccion mb-4">Recursos Descargables</h2>

        {/* FILTROS */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {categoriasUnicas.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                categoria === cat ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => filtrar(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* GRID DE DOCUMENTOS */}
        <div className="row">
          {filteredDocs.map((doc) => (
            <div className="col-md-4 mb-4" key={doc.id}>
              <div className="card h-100 tile-card">
                <div className="card-body d-flex flex-column">
                  {/* Vista previa: imagen o ícono PDF */}
                  {doc.tipo === "imagen" ? (
                    <Image
                      src={doc.archivoUrl}
                      width={400}
                      height={250}
                      className="mb-3 rounded"
                      alt="thumbnail"
                    />
                  ) : (
                    <div className="text-center mb-3">
                      <i
                        className="bi bi-file-earmark-pdf text-danger"
                        style={{ fontSize: "50px" }}
                      ></i>
                    </div>
                  )}

                  <h5 className="card-title">{doc.titulo}</h5>
                  <p className="card-text flex-grow-1">{doc.descripcion}</p>

                  {/* Botón de descarga */}
                  <a
                    href={doc.archivoUrl}
                    className="btn btn-outline-primary mt-auto"
                    target="_blank"
                  >
                    <i className="bi bi-download me-1"></i>
                    Descargar
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredDocs.length === 0 && (
            <p className="text-center text-muted mt-5">
              No hay documentos en esta categoría.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
