"use client";

import PorcentajeCircular from "@/components/ui/PorcentajeCircular";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
    <HeroSection
      title="Bienvenidos a XLH México"
      subtitle="Apoyando a las familias con raquitismos hereditarios"
      backgroundImage="/img/banner.jpg"
      overlayColor="rgba(0, 0, 0, 0.5)"
      primaryButtonText="Donar"
      primaryButtonLink="/donar"
      secondaryButtonText="Conocer más"
      secondaryButtonLink="/nosotros"
    />
    
    <main className="space-y-12 px-3 px-md-6 py-10">
      {/* Bienvenidos texto
      <section id="aboutHome" className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <h2>Nosotros</h2>
            <p></p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium doloribus sapiente nostrum quos placeat at totam quisquam,
              voluptate tempore! Mollitia, ullam? Ex saepe rerum harum dolorem eum cupiditate minima eaque. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Officiis, reprehenderit ullam. Velit odit, corrupti, quidem facilis minus officia consequatur perspiciatis deleniti
              optio maxime quae. Aut adipisci voluptatem ullam dolorum reprehenderit.
            </p>
          </div>
        </div>
      </section> */}

      {/* Misión y Visión */}
      <section className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Misión */}
          <div className="col-12 col-md-6">
            <div className="border rounded p-4 text-center h-100 shadow-sm">
              <div className="mb-3">
                <i className="bi bi-bullseye display-3 cyan"></i>
              </div>
              <h2 className="mb-3">Misión</h2>
              <p>
                Nuestra misión es mejorar la calidad de vida de las personas con XLH en México mediante información, apoyo y comunidad.
              </p>
              <a href="#mision" className="btn btn-outline-cyan">
                Conoce más
              </a>
            </div>
          </div>
          {/* Visión */}
          <div className="col-12 col-md-6">
            <div className="border rounded p-4 text-center h-100 shadow-sm">
              <div className="mb-3">
                <i className="bi bi-eye-fill display-3 verde"></i>
              </div>
              <h2 className="mb-3">Visión</h2>
              <p>
                Ser una asociación líder que inspire cambios positivos en el diagnóstico, tratamiento y comprensión del XLH en Latinoamérica.
              </p>
              <a href="#vision" className="btn btn-outline-verde">
                Ver más
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos y Motivación */}
      <section id="objetivos" className="seccion-info bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 mb-4 mb-md-0 contenido-texto">
              <h2 className="titulo-seccion">Objetivos</h2>
              <p className="parrafo-seccion">
                A través de nuestra Asociación buscamos propiciar la difusión sobre XLH entre autoridades, profesionales de la salud, pacientes y familias.
                Uno de nuestros principales objetivos es fomentar la investigación y estar al tanto de los avances sobre esta enfermedad.
              </p>
              <a href="#" className="btn btn-outline-cyan" target="_blank" rel="noopener noreferrer">
                Leer más
              </a>
            </div>
            <div className="col-md-7 imagen-seccion">
              <img src="/img/objetivo.jpg" alt="Objetivos XLH" className="rounded shadow-lg img-ajustada w-100" />
            </div>
          </div>
        </div>
      </section>

      <section id="motivacion" className="seccion-info bg-light py-5">
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            <div className="col-md-5 mb-4 mb-md-0 contenido-texto">
              <h2 className="titulo-seccion">Motivación</h2>
              <p className="parrafo-seccion">
                La motivación detrás de este proyecto nace de la necesidad de crear conciencia y apoyo para quienes viven con XLH. Queremos generar comunidad y esperanza.
              </p>
              <a href="#" className="btn btn-outline-cyan" target="_blank" rel="noopener noreferrer">
                Leer más
              </a>
            </div>
            <div className="col-md-7 imagen-seccion">
              <img src="/img/objetivo.jpg" alt="Motivación XLH" className="rounded shadow-lg img-ajustada w-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Álbum de la Asociación */}
      <section className="container my-5">
        <h2 className="titulo-album text-center mb-2">Albúm de la Asociación</h2>
        <p className="subtitulo-album text-center mb-4">Acompáñanos con nuestros mejores momentos</p>
        <div className="d-flex justify-content-center">
          <div id="carouselXLH" className="carousel slide w-100" data-bs-ride="carousel" style={{ maxWidth: 600 }}>
            <div className="carousel-inner rounded shadow-lg">
              <div className="carousel-item active">
                <img src="/img/ImgAlbumUs.jpg" className="d-block w-100 img-carrus" alt="Cuidados" />
              </div>
              <div className="carousel-item">
                <img src="/img/ImgAlbumUs2.jpg" className="d-block w-100 img-carrus" alt="Apoyo" />
              </div>
              <div className="carousel-item">
                <img src="/img/ImgAlbumUs3.jpg" className="d-block w-100 img-carrus" alt="Donaciones" />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselXLH"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselXLH"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </section>

      {/* Estadísticas Comunidad */}
      <section id="comunidad" className="seccion-comunidad py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center g-4">
            {/* Integrantes */}
            <div className="col-md-6">
              <div className="tile-comunidad text-center p-4 shadow-sm h-100">
                <PorcentajeCircular porcentaje={75} color="naranja" size={105} />
                <h3 className="titulo-comunidad mt-3">Integrantes</h3>
                <p className="texto-comunidad">
                  Conoce a las personas que conforman el comité de la asociación, su historia, compromiso y labor por mejorar la vida de quienes viven con XLH.
                </p>
                <a href="#integrantes" className="btn btn-outline-naranja mt-2">
                  Ver más
                </a>
              </div>
            </div>

            {/* Pacientes */}
            <div className="col-md-6">
              <div className="tile-comunidad text-center p-4 shadow-sm h-100">
                <PorcentajeCircular porcentaje={90} color="morado" size={105} />
                <h3 className="titulo-comunidad mt-3">Pacientes</h3>
                <p className="texto-comunidad">
                  Historias y testimonios de pacientes que enfrentan día a día los retos del raquitismo hipofosfatémico. Una comunidad unida e inspiradora.
                </p>
                <a href="#pacientes" className="btn btn-outline-morado mt-2">
                  Conocer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Donar */}
      <section id="donar" className="seccion-donar bg-light-custom py-5">
        <div className="container text-center">
          <h2 className="titulo-seccion mb-3">XLH MÉXICO</h2>
          <p className="lead mb-4 px-3 px-md-5">
            Somos una asociación comprometida con mejorar la calidad de vida de las personas con raquitismo hereditario como la XLH. Nos enfocamos en la inclusión,
            el acompañamiento y la visibilidad de esta condición.
          </p>
          <div className="mb-4">
            <img
              src="/img/thumbnail_logo_hd.png"
              alt="Logo XLH México"
              className="img-fluid sombra-logo logo-xlh"
            />
          </div>
          <a href="#donaciones" className="btn btn-donar btn-outline-morado btn-lg">
            DONAR
          </a>
        </div>
      </section>
    </main>
    </>
  );
}
