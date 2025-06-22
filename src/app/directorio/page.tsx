"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Directorio() {
  return (
    <>
      <HeroSection
        title="Directorio Médico"
        subtitle="Conoce a nuestros especialistas aliados"
        backgroundImage="/img/receta.jpg"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <section className="container my-5">
        <h2 className="titulo-seccion text-center mb-4">Doctores Especialistas en XLH y Raquitismos</h2>
        
        <div className="row g-4">
          {/* Doctor 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 tile-card">
              <div className="card-body text-center">
                <Image
                  src="/img/doctor.jpg"
                  alt="Dra. Ana Martínez"
                  width={100}
                  height={100}
                  className="rounded-circle mb-3 sombra-logo"
                />
                <h5 className="card-title">Dra. Ana Martínez</h5>
                <p className="card-subtitle text-muted mb-2">Endocrinóloga Pediatra</p>
                <p className="mb-2">Oaxaca</p>
                <p className="text-muted">951753648</p>
                <a href="mailto:ana.martinez@hospital.com" className="btn btn-outline-verde btn-sm mt-2">
                  Contactar
                </a>
              </div>
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 tile-card">
              <div className="card-body text-center">
                <Image
                  src="/img/doctor.jpg"
                  alt="Dr. Luis Pérez"
                  width={100}
                  height={100}
                  className="rounded-circle mb-3 sombra-logo"
                />
                <h5 className="card-title">Dr. Luis Pérez</h5>
                <p className="card-subtitle text-muted mb-2">Genetista Clínico</p>
                <p className="mb-2">IMSS, UMAE Monterrey</p>
                <p className="text-muted">222586471</p>
                <a href="mailto:luis.perez@umae.mx" className="btn btn-outline-cyan btn-sm mt-2">
                  Contactar
                </a>
              </div>
            </div>
          </div>

          {/* Doctor 3 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 tile-card">
              <div className="card-body text-center">
                <Image
                  src="/img/doctor.jpg"
                  alt="Dra. Karla López"
                  width={100}
                  height={100}
                  className="rounded-circle mb-3 sombra-logo"
                />
                <h5 className="card-title">Dra. Karla López</h5>
                <p className="card-subtitle text-muted mb-2">Nefróloga Pediatra</p>
                <p className="mb-2">Hospital de Pediatría, CMN</p>
                <p className="text-muted">Jalisco</p>
                <a href="#" className="btn btn-outline-rosa btn-sm mt-2">
                  Ver Perfil
                </a>
              </div>
            </div>
          </div>

          {/* Puedes seguir agregando más tarjetas aquí */}
        </div>
      </section>
    </>
  );
}
