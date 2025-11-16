"use client";

import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import React from "react";

export default function Servicios() {
  return (
    <>
      <HeroSection
        title="Servicios"
        subtitle="Nuestros servicios"
        sectionName="servicios"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <section className="container my-5">
        <h1 className="text-center mb-4 fw-bold">Generales</h1>
        <ul className="list-unstyled mb-4">
          <li>✔️ Difundir la problemática de los pacientes.</li>
          <li>✔️ Potenciar un registro oficial de afectados.</li>
          <li>✔️ Difundir información y documentación relativa a la enfermedad.</li>
          <li>
            ✔️ Apoyar y asesorar a otras patologías para recibir la información más adecuada, ya sea por nuestra parte o buscando asociaciones especializadas.
          </li>
          <li>✔️ Propiciar contacto entre miembros de Raquitismos y Osteomalacia Heredados.</li>
        </ul>

        <h2 className="text-center mb-3 fw-semibold">A pacientes y familias</h2>
        <ul className="list-unstyled mb-5">
          <li>✔️ Atención psicológica individual, familiar y grupal.</li>
          <li>✔️ Orientación a casos sin diagnóstico.</li>
          <li>✔️ Asesoría jurídica en casos de discriminación por enfermedad rara.</li>
          <li>✔️ Trámites administrativos, discapacidad y dependencia.</li>
          <li>✔️ Derivaciones hospitalarias a centros especializados.</li>
          <li>✔️ Acceso a medicamentos y segunda opinión médica.</li>
        </ul>
      </section>

      <section
        className="py-5 text-white"
        style={{
          backgroundImage: "url('/img/contact-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">¿Necesitas ayuda?</h2>
              <p>
                Contáctanos si tú o tu familia necesitan orientación médica, asesoría legal, acceso a medicamentos o apoyo psicológico.
              </p>
              <a href="/registro" className="btn btn-outline-rosa-mexicano mt-3">
                Registrarse ahora
              </a>
            </div>
            <div className="col-md-6">
              <form className="bg-white text-dark p-4 rounded shadow">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" placeholder="Tu nombre completo" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" placeholder="correo@ejemplo.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mensaje</label>
                  <textarea className="form-control" rows={3} placeholder="¿En qué podemos ayudarte?" />
                </div>
                <button type="submit" className="btn btn-outline-rosa-mexicano w-100">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
