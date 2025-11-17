import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Especialista } from "@prisma/client";

// Función para sanear la ruta de la foto
const getFoto = (foto: string | null) => {
  if (!foto || foto.trim() === "") return "/img/default-doctor.png";

  // Si ya es URL absoluta (http/https), se devuelve tal cual
  if (foto.startsWith("http://") || foto.startsWith("https://")) return foto;

  // Si es relativa, nos aseguramos de que empiece con "/"
  return foto.startsWith("/") ? foto : `/${foto}`;
};

export default async function Directorio() {
  const especialistas: Especialista[] = await prisma.especialista.findMany({
    orderBy: { nombre: "asc" },
  });

  return (
    <>
      <HeroSection
        title="Directorio Médico"
        subtitle="Conoce a nuestros especialistas aliados"
        sectionName="directorio"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <section className="container my-5">
        <h2 className="titulo-seccion text-center mb-4">
          Doctores Especialistas en XLH y Raquitismos
        </h2>

        <div className="row g-4">
          {especialistas.map((doctor) => (
            <div className="col-md-6 col-lg-4" key={doctor.id}>
              <div className="card h-100 tile-card">
                <div className="card-body text-center">
                  {/* Imagen del doctor con fallback y saneamiento */}
                  <Image
                    src={getFoto(doctor.foto)}
                    alt={doctor.nombre || "Doctor"}
                    width={100}
                    height={100}
                    className="rounded-circle mb-3 sombra-logo"
                  />

                  <h5 className="card-title">{doctor.nombre}</h5>
                  <p className="card-subtitle text-muted mb-2">
                    {doctor.especialidad}
                  </p>

                  {/* Ubicación con enlace a Google Maps */}
                  {doctor.ubicacion && (
                    <p className="mb-2">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          doctor.ubicacion
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-muted"
                      >
                        {doctor.ubicacion}
                      </a>
                    </p>
                  )}

                  {/* Teléfono */}
                  {doctor.telefono && (
                    <p className="mb-1">
                      <i className="bi bi-telephone-fill me-1"></i>
                      <a
                        href={`tel:${doctor.telefono}`}
                        className="text-decoration-none text-muted"
                      >
                        {doctor.telefono}
                      </a>
                    </p>
                  )}

                  {/* Correo */}
                  {doctor.correo && (
                    <p className="mb-2">
                      <i className="bi bi-envelope-fill me-1"></i>
                      <a
                        href={`mailto:${doctor.correo}`}
                        className="text-decoration-none text-muted"
                      >
                        {doctor.correo}
                      </a>
                    </p>
                  )}

                  {/* Perfil externo */}
                  {doctor.perfilUrl && doctor.perfilUrl.trim() !== "" && (
                    <a
                      href={doctor.perfilUrl}
                      className="btn btn-outline-cyan btn-sm mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Perfil
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
