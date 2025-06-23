"use client";
declare global {
  interface Window {
    FB: any;
  }
}
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";

export default function Eventos() {
  useEffect(() => {
     // Facebook
   const fbScript = document.createElement("script");
   fbScript.setAttribute("async", "true");
   fbScript.setAttribute("defer", "true");
   fbScript.setAttribute("crossorigin", "anonymous");
   fbScript.setAttribute(
     "src",
     "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
   );
   document.body.appendChild(fbScript);

    // Twitter embed
    const twitterScript = document.createElement("script");
    twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
    twitterScript.setAttribute("async", "true");
    document.body.appendChild(twitterScript);

    // Instagram embed
    const instaScript = document.createElement("script");
    instaScript.setAttribute("src", "https://www.instagram.com/embed.js");
    instaScript.setAttribute("async", "true");
    document.body.appendChild(instaScript);
  }, []);

  return (
    <>
      <HeroSection
        title="Eventos"
        subtitle="Participa en nuestras actividades y encuentros"
        backgroundImage="/img/receta.jpg"
        overlayColor="rgba(0, 38, 102, 0.5)" // Azul marino
      />

      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
          <h2 className="titulo-seccion text-center text-md-start">Próximos Eventos</h2>
          <button className="btn btn-outline-verde mt-3 mt-md-0">
            <i className="bi bi-calendar-plus me-2"></i>Agregar Evento
          </button>
        </div>

        <div className="row">
          {/* Evento 1 */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 tile-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Encuentro Nacional de Familias XLH</h5>
                <p className="card-subtitle mb-2 text-muted">📅 15 de Julio, 2025 - CDMX</p>
                <p className="card-text flex-grow-1">
                  Un evento para compartir experiencias, avances médicos y actividades familiares.
                </p>
                <a href="#" className="btn btn-outline-rosa mt-auto">
                  Ver Detalles
                </a>
              </div>
            </div>
          </div>

          {/* Evento 2 */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 tile-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Taller Online: Nutrición y XLH</h5>
                <p className="card-subtitle mb-2 text-muted">📅 28 de Junio, 2025 - Vía Zoom</p>
                <p className="card-text flex-grow-1">
                  Aprende de expertos sobre cómo mejorar la alimentación de personas con XLH.
                </p>
                <a href="#" className="btn btn-outline-cyan mt-auto">
                  Inscribirse
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
      <div className="container">
        <h2 className="titulo-seccion text-center mb-4">Eventos en nuestras redes</h2>

        <div className="row g-4 justify-content-center align-items-stretch">
          {/* Facebook */}
          <div className="col-sm-6 col-lg-4 flex h-100">
            <div className="sombra-logo card-red-social">
              <h6 className="text-center mb-3">Última publicación en Facebook</h6>
              <div
                className="fb-post"
                data-href="https://www.facebook.com/XLHMexico/posts/pfbid02oPKKoPzotbhUXgDNN2LeZe342AqiJDgtCYujVSR8azf73wdqX1JMP2bWqY689eLbl"
                data-width="100%"
                data-show-text="true"
              ></div>
            </div>
          </div>

          {/* X (Twitter) */}
          <div className="col-sm-6 col-lg-4">
            <div className="sombra-logo card-red-social flex h-100">
              <h6 className="text-center mb-3">Último tweet</h6>
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/space/status/877996013147086848/photo/1"></a>
              </blockquote>
            </div>
          </div>

          {/* Instagram */}
          <div className="col-sm-6 col-lg-4">
            <div className="sombra-logo card-red-social flex h-100">
              <h6 className="text-center mb-3">Última publicación</h6>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/xlhmexico/"
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  margin: "0 auto",
                  maxWidth: "100%",
                }}
              ></blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
