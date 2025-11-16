import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Especialista } from "@prisma/client";

export default async function Directorio() {
  const especialistas: Especialista[] = await prisma.especialista.findMany();
  
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
                  <Image
                    src={doctor.foto}
                    alt={doctor.nombre}
                    width={100}
                    height={100}
                    className="rounded-circle mb-3 sombra-logo"
                  />
                  <h5 className="card-title">{doctor.nombre}</h5>
                  <p className="card-subtitle text-muted mb-2">{doctor.especialidad}</p>
                  <p className="mb-2">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.ubicacion)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-muted"
                    >
                      {doctor.ubicacion}
                    </a>
                  </p>

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

                  {doctor.perfilUrl && (
                    <a
                      href={doctor.perfilUrl}
                      className="btn btn-outline-cyan btn-sm mt-2"
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
