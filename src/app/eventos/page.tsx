"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

type Evento = {
  titulo: string;
  fecha: string; // formato ISO (ej. "2025-07-15")
  lugar: string;
  descripcion: string;
  link: string;
};

const eventos: Evento[] = [
  {
    titulo: "Encuentro Nacional de Familias XLH",
    fecha: "2025-07-15",
    lugar: "CDMX",
    descripcion:
      "Un evento para compartir experiencias, avances médicos y actividades familiares.",
    link: "#",
  },
  {
    titulo: "Taller Online: Nutrición y XLH",
    fecha: "2025-06-28",
    lugar: "Vía Zoom",
    descripcion:
      "Aprende de expertos sobre cómo mejorar la alimentación de personas con XLH.",
    link: "#",
  },
  {
    titulo: "Encuentro Nacional de Familias XLH",
    fecha: "2025-07-15",
    lugar: "CDMX",
    descripcion:
      "Un evento para compartir experiencias, avances médicos y actividades familiares.",
    link: "#",
  },
  {
    titulo: "Taller Online: Nutrición y XLH",
    fecha: "2025-06-28",
    lugar: "Vía Zoom",
    descripcion:
      "Aprende de expertos sobre cómo mejorar la alimentación de personas con XLH.",
    link: "#",
  },
  {
    titulo: "Encuentro Nacional de Familias XLH",
    fecha: "2025-07-15",
    lugar: "CDMX",
    descripcion:
      "Un evento para compartir experiencias, avances médicos y actividades familiares.",
    link: "#",
  },
  {
    titulo: "Taller Online: Nutrición y XLH",
    fecha: "2025-06-28",
    lugar: "Vía Zoom",
    descripcion:
      "Aprende de expertos sobre cómo mejorar la alimentación de personas con XLH.",
    link: "#",
  },
  {
    titulo: "Encuentro Nacional de Familias XLH",
    fecha: "2025-07-15",
    lugar: "CDMX",
    descripcion:
      "Un evento para compartir experiencias, avances médicos y actividades familiares.",
    link: "#",
  },
  {
    titulo: "Taller Online: Nutrición y XLH",
    fecha: "2025-06-28",
    lugar: "Vía Zoom",
    descripcion:
      "Aprende de expertos sobre cómo mejorar la alimentación de personas con XLH.",
    link: "#",
  },
  {
    titulo: "Evento Pasado (no se debe mostrar)",
    fecha: "2023-01-01",
    lugar: "Antiguo",
    descripcion: "Este evento ya pasó.",
    link: "#",
  },
];

const eventosPorPagina = 6;

export default function Eventos() {
  const [cantidadVisible, setCantidadVisible] = useState(eventosPorPagina);

  const hoy = new Date();

  // Filtrar solo eventos futuros o del día actual
  const eventosFuturos = eventos.filter(
    (evento) => new Date(evento.fecha) >= hoy
  );

  useEffect(() => {
    // Facebook
    const fbScript = document.createElement("script");
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = "anonymous";
    fbScript.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    fbScript.onload = () => {
      window.FB?.XFBML.parse();
    };
    document.body.appendChild(fbScript);

    // Twitter
    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    // Instagram
    const instaScript = document.createElement("script");
    instaScript.src = "https://www.instagram.com/embed.js";
    instaScript.async = true;
    instaScript.onload = () => {
      window.instgrm?.Embeds.process();
    };
    document.body.appendChild(instaScript);
  }, []);

  const mostrarMas = () => {
    setCantidadVisible((prev) => prev + eventosPorPagina);
  };

  return (
    <>
      <HeroSection
        title="Eventos"
        subtitle="Participa en nuestras actividades y encuentros"
        backgroundImage="/img/receta.jpg"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
          <h2 className="titulo-seccion text-center text-md-start">
            Próximos Eventos
          </h2>
          <button className="btn btn-outline-verde mt-3 mt-md-0">
            <i className="bi bi-calendar-plus me-2"></i>Agregar Evento
          </button>
        </div>

        <div className="row">
          {eventosFuturos.slice(0, cantidadVisible).map((evento, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100 tile-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{evento.titulo}</h5>
                  <p className="card-subtitle mb-2 text-muted">
                    📅{" "}
                    {new Date(evento.fecha).toLocaleDateString("es-MX", {
                      weekday: "short",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    - {evento.lugar}
                  </p>
                  <p className="card-text flex-grow-1">{evento.descripcion}</p>
                  <a href={evento.link} className="btn btn-outline-cyan mt-auto">
                    Ver Detalles
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cantidadVisible < eventosFuturos.length && (
          <div className="text-center mt-4">
            <button className="btn btn-outline-primary" onClick={mostrarMas}>
              Ver más eventos
            </button>
          </div>
        )}
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="titulo-seccion text-center mb-4">
            Eventos en nuestras redes
          </h2>

          <div className="row g-4 justify-content-center align-items-stretch">
            {/* Facebook */}
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="sombra-logo card-red-social flex-fill d-flex flex-column">
                <h6 className="text-center mb-3">
                  Última publicación en Facebook
                </h6>
                <div
                  className="fb-post"
                  data-href="https://www.facebook.com/XLHMexico/posts/pfbid02oPKKoPzotbhUXgDNN2LeZe342AqiJDgtCYujVSR8azf73wdqX1JMP2bWqY689eLbl"
                  data-width="100%"
                  data-show-text="true"
                ></div>
              </div>
            </div>

            {/* Twitter */}
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="sombra-logo card-red-social flex-fill d-flex flex-column">
                <h6 className="text-center mb-3">Último tweet</h6>
                <blockquote className="twitter-tweet">
                  <a href="https://twitter.com/space/status/877996013147086848/photo/1"></a>
                </blockquote>
              </div>
            </div>

            {/* Instagram */}
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="sombra-logo card-red-social flex-fill d-flex flex-column">
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
