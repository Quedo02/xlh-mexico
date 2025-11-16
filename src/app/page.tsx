"use client";

import HeroSection from "@/components/HeroSection";
import { useState, useEffect } from "react";

//Para obtener las imagenes de los slots
type Media = { id: number; url: string; alt?: string; caption?: string };
type SlotMedia = { id: number; mediaId: number; orden: number; media: Media };
type MediaSlot = { id: number; slot: string; alt?: string; caption?: string; slotMedias: SlotMedia[] };


export default function Home() {
  const [slots, setSlots] = useState<MediaSlot[]>([]);
  const [homeSlotId, setHomeSlotId] = useState<number | null>(null);
  const [bannerSlotId, setBannerSlotId] = useState<number | null>(null);

  const [showObjetivos, setShowObjetivos] = useState(false);
  const [showMotivacion, setShowMotivacion] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Traer todos los slots con imágenes
      const slotsRes = await fetch("/api/media/slots").then(r => r.json());
      setSlots(slotsRes.data || []);

      // Traer configuración de slots
      const configRes = await fetch("/api/config/slots").then(r => r.json());
      const config = configRes.config || {};

      // Buscar los slots por nombre
      const homeSlotObj = (slotsRes.data || []).find((s: MediaSlot) => s.slot === config.homeCarrusel);
      const bannerSlotObj = (slotsRes.data || []).find((s: MediaSlot) => s.slot === config.homeBanner);

      setHomeSlotId(homeSlotObj?.id || null);
      setBannerSlotId(bannerSlotObj?.id || null);
    };

    fetchData();
  }, []);


  const homeImages = slots.find(s => s.id === homeSlotId)?.slotMedias || [];
  const bannerSlotObj = slots.find(s => s.id === bannerSlotId);
  const bannerImage =
    bannerSlotObj && bannerSlotObj.slotMedias.length > 0
      ? bannerSlotObj.slotMedias[0].media.url
      : "/img/banner.jpg";


  return (
    <>
      <HeroSection
        title="XLH México"
        subtitle="Acompañando personas con raquitismo hipofosfatémico."
        sectionName="homeBanner"
        overlayColor="rgba(0, 0, 0, 0.5)"
        primaryButtonText="Donar"
        //primaryButtonLink="/donar"
        secondaryButtonText="Conocer más"
        secondaryButtonLink="/nosotros"
      />

      <main className="space-y-12 px-3 px-md-6 py-10">
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
                  Contribuir a la mejora de la calidad de vida de las(os) pacientes de XLH en México mediante la divulgación de información, asesoramiento y creación de comunidad.
                </p>
                <div className="accordion mt-3" id="accordionMision">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingMision">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMision" aria-expanded="false" aria-controls="collapseMision">
                        Leer más
                      </button>
                    </h2>
                    <div id="collapseMision" className="accordion-collapse collapse" aria-labelledby="headingMision">
                      <div className="accordion-body text-start ps-2">
                        Nuestra misión es generar acciones orientadas al mejoramiento de la calidad de vida de las(os) pacientes de raquitismo hipofosfatémico ligado al cromosoma X (XLH). Partiendo de la formación, difusión, visibilización y concientización de la existencia de la enfermedad, la importancia del diagnóstico certero y temprano, la atención médica integral y el tratamiento adecuado. <br /><br />
                        Así como la creación de espacios seguros, de apoyo, acompañamiento y formación para pacientes y familiares.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visión */}
            <div className="col-12 col-md-6">
              <div className="border rounded p-4 text-center h-100 shadow-sm">
                <div className="mb-3">
                  <i className="bi bi-eye-fill display-3 verde"></i>
                </div>
                <h2 className="mb-3">Visión</h2>
                <p>Ser una asociación líder que inspire cambios positivos en el diagnóstico, tratamiento y divulgación del XLH en México.</p>
                <div className="accordion mt-3" id="accordionVision">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingVision">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVision" aria-expanded="false" aria-controls="collapseVision">
                        Leer más
                      </button>
                    </h2>
                    <div id="collapseVision" className="accordion-collapse collapse" aria-labelledby="headingVision">
                      <div className="accordion-body text-start ps-2">
                        Nuestra visión es ser una asociación civil con presencia a nivel nacional, referente en el trabajo en pos de las(os) pacientes de raquitismo hipofosfatémico ligado al cromosoma X (XLH) y otros raquitismos hereditarios.<br /><br />
                        Así como ser un espacio seguro al que las(os) pacientes y familiares puedan sentirse libres de recurrir en busca de apoyo.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objetivos */}
        <section className="container my-5" id="objetivos">
          <div className="row align-items-center shadow rounded p-4 bg-white">
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Objetivos</h2>
              <p>
                A través de nuestra Asociación buscamos propiciar la difusión sobre XLH entre autoridades, profesionales de la salud, pacientes y familias.
              </p>
              {!showObjetivos && (
                <button className="btn btn-outline-primary" onClick={() => setShowObjetivos(true)}>
                  Leer más
                </button>
              )}
              {showObjetivos && (
                <>
                  <div className="row mt-3">
                    <ul className="col-12 col-md-6 list-unstyled ps-3">
                      <li className="mb-2">✅ Formar pacientes empoderados que defiendan sus derechos.</li>
                      <li className="mb-2">✅ Acompañar a pacientes y familias en un espacio seguro.</li>
                      <li className="mb-2">✅ Facilitar acceso a atención médica adecuada.</li>
                      <li className="mb-2">✅ Difundir información práctica y comprensible.</li>
                      <li className="mb-2">✅ Visibilizar XLH y otros raquitismos hereditarios.</li>
                    </ul>
                    <ul className="col-12 col-md-6 list-unstyled ps-3">
                      <li className="mb-2">✅ Concientizar sobre tratamientos multidisciplinarios.</li>
                      <li className="mb-2">✅ Promover enseñanza en escuelas de medicina.</li>
                      <li className="mb-2">✅ Realizar un censo nacional de pacientes.</li>
                      <li className="mb-2">✅ Representar a pacientes ante autoridades.</li>
                      <li className="mb-2">✅ Facilitar acceso a tratamientos innovadores.</li>
                    </ul>
                  </div>
                  <button className="btn btn-outline-secondary btn-sm mt-3" onClick={() => setShowObjetivos(false)}>Ver menos</button>
                </>
              )}
            </div>
            <div className="col-md-6 text-center">
              <img src="/img/objetivos.png" className="img-fluid rounded shadow-sm" alt="Objetivos" />
            </div>
          </div>
        </section>

        {/* Motivación */}
        <section className="container my-5" id="motivacion">
          <div className="row align-items-center shadow rounded p-4 bg-white flex-md-row-reverse">
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Motivación</h2>
              <p>
                La motivación de este proyecto nace de la necesidad de crear conciencia y apoyo para quienes viven con XLH.
              </p>
              {!showMotivacion && (
                <button className="btn btn-outline-primary" onClick={() => setShowMotivacion(true)}>
                  Leer más
                </button>
              )}
              {showMotivacion && (
                <>
                  <p className="mt-3">
                    El Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH) es una enfermedad poco frecuente que suele ser mal diagnosticada debido a la falta de información.
                  </p>
                  <p>
                    Es una condición genética, progresiva y de por vida, por lo que es esencial contar con atención médica oportuna y apoyo emocional para mejorar la calidad de vida de quienes la padecen.
                  </p>
                  <button className="btn btn-outline-secondary btn-sm mt-3" onClick={() => setShowMotivacion(false)}>Ver menos</button>
                </>
              )}
            </div>
            <div className="col-md-6 text-center">
              <img src="/img/motivacion.png" className="img-fluid rounded shadow-sm" alt="Motivación" />
            </div>
          </div>
        </section>

      {/* Presencia del XLH México */}

        <section className="container my-5" id="presencia">
          <div className="row align-items-center shadow rounded p-4 bg-white">
            <div className="col-12 col-md-6">
              <h2 className="fw-bold mb-4">Presencia del XLH en México</h2>
              <p>
                Nuestra asociación está presente en diferentes estados de la República Mexicana, trabajando en red con pacientes, familias y profesionales de la salud para visibilizar y mejorar la atención del XLH.
              </p>
              <p>
                Este mapa refleja nuestra cobertura y el compromiso de cada comunidad involucrada.
              </p>
            </div>
            <div className="col-12 col-md-6 text-center">
              <img
                src="/img/presencia_XLH_mexico.png"
                className="img-fluid rounded shadow-sm"
                alt="Mapa de presencia de XLH en México"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          </div>
        </section>


      {/* Galería dinámica */}
      <section className="container my-5">
        <h2 className="titulo-album text-center mb-2">Galería</h2>
        <p className="subtitulo-album text-center mb-4">Acompáñanos con nuestros mejores momentos</p>

        {homeImages.length > 0 ? (
          <div className="d-flex justify-content-center">
            <div
              id="carouselXLH"
              className="carousel slide w-100"
              data-bs-ride="carousel"
              style={{ maxWidth: 600 }}
            >
              <div className="carousel-inner rounded shadow-lg">
                {homeImages.map((sm, idx) => (
                  <div
                    key={sm.id}
                    className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  >
                    <img
                      src={sm.media.url}
                      alt={sm.media.alt || ""}
                      className="d-block w-100 img-carrus"
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselXLH" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselXLH" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted">No hay imágenes en este slot todavía.</p>
        )}
      </section>
    </main>
    </>
  );
}
