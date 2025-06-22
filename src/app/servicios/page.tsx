"use client";

import React from "react";
import Image from "next/image";

import HeroSection from "@/components/HeroSection";

export default function Servicios() {
  return (
    <>
    <HeroSection
        title="Servicios"
        subtitle="Nuestros servicios"
        backgroundImage="/img/receta.jpg" // Imagen de fondo
        overlayColor="rgba(238, 49 , 107 , 0.5)" //Color de fondo
      />

      <section className="container my-5">
        <h1 className="text-3xl font-bold text-center mb-6">Generales</h1>

        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Difundir la problemática de los pacientes.</li>
          <li>Potenciar un registro oficial de afectados.</li>
          <li>Difundir información y documentación relativa a la enfermedad.</li>
          <li>
            Apoyar y asesorar a otras patologías para que reciban la información más adecuada, ya sea por nuestra parte o buscando asociaciones especializadas.
          </li>
          <li>
            Propiciar contacto entre miembros de Raquitismos y Osteomalacia Heredados, ya sea afectado o familiar.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-center">A pacientes y familias</h2>

        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Atención psicológica y asesoramiento de forma individual, familiar y grupal.</li>
          <li>Orientación y atención de casos sin diagnóstico.</li>
          <li>
            Asesoría jurídica para todo caso en el que la enfermedad rara suponga la razón de ser de la discriminación o trato desigual.
          </li>
          <li>Materias relacionadas con el derecho Administrativo.</li>
          <li>Reconocimiento o revisión de grado de discapacidad o dependencia.</li>
          <li>Derivaciones hospitalarias a centros de referencia.</li>
          <li>Acceso a medicamentos.</li>
          <li>Segunda opinión médica.</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Image src="/img/doctor.jpg" alt="Padre con XLH" width={400} height={300} className="img-fluid d-block mx-auto" />
        </div>
      </section>


    </>
  );
}
