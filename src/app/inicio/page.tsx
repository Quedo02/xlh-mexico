"use client";

import React from "react";
import Image from "next/image";

import HeroSection from "@/components/HeroSection";

export default function Informacion() {
  return (
    <>
    <HeroSection
      title="Conoce el Raquitismo Hipofosfatémico Ligado al Cromosoma (XLH)"
      subtitle="Acompañanos"
      backgroundImage="/img/receta.jpg" // Imagen de fondo
      overlayColor="rgba(238, 49 , 107 , 0.5)" //Color de fondo
    />

    <section className="seccion-info bg-light">
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0 imagen-seccion">
            <Image src="/img/objetivo.jpg" alt="Causas del Raquitismo" width={600} height={400} className="img-ajustada sombra-logo"/>
          </div>
          <div className="col-md-6 contenido-texto">
            <h2 className="titulo-seccion morado">¿Qué es el raquitismo?</h2>
            <p className="parrafo-seccion">
              Enfermedad hereditaria cuya principal caracteristica son los niveles bajos de fosfato en la sange, debido a la deficiencia de un gen que favorece a la
              excesiva perdida de fósforo a tráves del riñón y causado distintos problemas, principalmente óseos.
            </p>
            <p className="parrafo-seccion">
              También puede ser hereditario, como en el caso del raquitismo hipofosfatémico ligado al cromosoma X (XLH), 
              una forma rara pero importante de conocer.
            </p>
          </div>
        </div>

        <div className="row align-items-center flex-md-row-reverse mb-5">
          <div className="col-md-6 mb-4 mb-md-0 imagen-seccion">
            <Image src="/img/objetivo.jpg" alt="Importancia de la vitamina D" width={600} height={400} className="img-ajustada sombra-logo"/>
          </div>
          <div className="col-md-6 contenido-texto">
            <h2 className="titulo-seccion cyan">¿Quién la puede presentar?</h2>
            <p className="parrafo-seccion">
              Al ser una enefermedad hereditaria ligada al cromosoma X significa que el gen está ubicado es ese cromosoma
            </p>
            <p className="parrafo-seccion">
              Los hombres con XLH transmitirán el cromosoma X a sus hijas, todas presentarán XLH y las mujeres siempre transmitiránun cromosoma X a cada uno de sus hijos,
              independientemente del género por lo que cada uno de ellos tendrá el 50% de probabilidades de presentar XLH.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Image src="/img/cromosomas.jpg" alt="Padre con XLH" width={900} height={600} className="img-fluid d-block mx-auto" />
        </div>

        <section className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Sintomas */}
          <div className="col-12 col-md-6">
            <div className="border rounded p-4 text-center h-100 shadow-sm">
              <div className="mb-3">
                <i className="bi bi-clipboard-pulse display-3 morado"></i>
              </div>
              <h2 className="mb-3">Sintomas</h2>
              <p>
                Nuestra misión es mejorar la calidad de vida de las personas con XLH en México mediante información, apoyo y comunidad.
              </p>
            </div>
          </div>
          {/* Tratamiento */}
          <div className="col-12 col-md-6">
            <div className="border rounded p-4 text-center h-100 shadow-sm">
              <div className="mb-3">
                <i className="bi bi-hospital display-3 cyan"></i>
              </div>
              <h2 className="mb-3">Tratamiento</h2>
              <p>
                Ser una asociación líder que inspire cambios positivos en el diagnóstico, tratamiento y comprensión del XLH en Latinoamérica.
              </p>
            </div>
          </div>
        </div>
      </section>

        <div className="row text-center">
          <div className="col">
            <h2 className="titulo-seccion rosa-mexicano">Conocer es prevenir</h2>
            <p className="parrafo-seccion mx-auto" style={{ maxWidth: "700px" }}>
              Informarse sobre los tipos de raquitismo y su impacto en el desarrollo infantil ayuda a una detección oportuna, tratamiento adecuado y mejor calidad de vida para quienes lo padecen.
            </p>
            <a href="/contacto" className="btn btn-outline-rosa-mexicano mt-3">¿Tienes dudas? Contáctanos</a>
          </div>
        </div>
      </div>
    </section>

    </>
  );
}
