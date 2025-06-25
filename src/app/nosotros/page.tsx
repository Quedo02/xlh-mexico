"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";

export default function Nosotros() {
  return (
    <>
      {/* Hero independiente, fuera del main */}
      <HeroSection
        title="¿Quiénes somos?"
        subtitle="Conoce a la asociación detrás del apoyo a personas con XLH en México."
        backgroundImage="/img/receta.jpg"
        overlayColor="rgba(0, 38, 102, 0.6)" // azul-marino semitransparente
      />

      <main className="space-y-12 px-3 px-md-6 py-10">
        {/* Nuestra Historia */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img src="/img/doctor.jpg" alt="Nuestra Historia" className="img-ajustada w-100" />
            </div>
            <div className="col-md-6 contenido-texto">
              <h2 className="titulo-seccion">Nuestra Historia</h2>
              <p className="parrafo-seccion">
                XLH México nace con el compromiso de acompañar a las personas que enfrentan raquitismos hereditarios, creando un espacio de apoyo, información y comunidad.
              </p>
              <p className="parrafo-seccion">
                Desde nuestra fundación, hemos trabajado por visibilizar la enfermedad, brindar recursos educativos y generar redes entre pacientes, médicos y familias.
              </p>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="seccion-info bg-light">
          <div className="container text-center">
            <h2 className="titulo-seccion mb-4">Nuestros Valores</h2>
            <div className="row g-4">
              {[
                { icon: "bi-heart-fill", color: "rosa-mexicano", title: "Empatía", info: "Nos ponemos en el lugar de cada persona con XLH, escuchando y entendiendo sus necesidades." },
                { icon: "bi-people-fill", color: "verde", title: "Comunidad", info: "Fomentamos redes de apoyo entre pacientes, familiares y especialistas." },
                { icon: "bi-lightbulb-fill", color: "cyan", title: "Conciencia", info: "Promovemos el conocimiento y la sensibilización sobre el XLH." },
                { icon: "bi-award-fill", color: "naranja", title: "Compromiso", info: "Trabajamos de forma constante para mejorar la calidad de vida de quienes viven con XLH." },
              ].map(({ icon, color, title, info }) => (
                <div className="col-6 col-md-3" key={title}>
                  <div className="tile-card valor-expandible text-center p-4 border rounded h-100 shadow-sm">
                    <i className={`bi ${icon} display-4 ${color}`}></i>
                    <h5 className="mt-3">{title}</h5>
                    <p className="detalle-valor">{info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="container py-5">
          <h2 className="titulo-seccion text-center mb-5">Nuestro Equipo</h2>
          <div className="row g-4 justify-content-center">
            {[
              { name: "María González", role: "Presidenta", img: "/img/doctora.jpg" },
              { name: "Carlos Pérez", role: "Vicepresidente", img: "/img/doctor.jpg" },
              { name: "Enrique Ramírez", role: "Comunicación", img: "/img/doctor1.jpg" },
            ].map(({ name, role, img }) => (
              <div className="col-6 col-md-4" key={name}>
                <div className="text-center">
                  <img
                    src={img}
                    alt={name}
                    className="rounded-circle shadow-lg mb-3"
                    style={{ width: "160px", height: "160px", objectFit: "cover" }}
                  />
                  <h5>{name}</h5>
                  <p className="text-muted">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
