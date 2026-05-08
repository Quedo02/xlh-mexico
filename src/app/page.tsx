"use client";
import HeroSection from "@/components/HeroSection";
import { useState, useEffect } from "react";

type Media = { id: number; url: string; alt?: string; caption?: string };
type SlotMedia = { id: number; mediaId: number; orden: number; media: Media };
type MediaSlot = { id: number; slot: string; alt?: string; caption?: string; slotMedias: SlotMedia[] };

export default function Home() {
  const [slots, setSlots] = useState<MediaSlot[]>([]);
  const [homeSlotId, setHomeSlotId] = useState<number | null>(null);

  const [showObjetivos, setShowObjetivos] = useState(false);
  const [showMotivacion, setShowMotivacion] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const slotsRes = await fetch("/api/media/slots").then(r => r.json());
      setSlots(slotsRes.data || []);

      const configRes = await fetch("/api/config/slots").then(r => r.json());
      const config = configRes.config || {};

      const homeSlotObj = (slotsRes.data || []).find((s: MediaSlot) => s.slot === config.homeCarrusel);

      setHomeSlotId(homeSlotObj?.id || null);
    };

    fetchData();
  }, []);

  const homeImages = slots.find(s => s.id === homeSlotId)?.slotMedias || [];

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
                  <img src="/img/mision.png" alt="Misión" style={{ height: "80px", objectFit: "contain" }} />
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
                        Nuestra misión es generar acciones orientadas al mejoramiento de la calidad de vida de las(os) pacientes de raquitismo hipofosfatémico ligado al cromosoma X (XLH). Partiendo de la formación, difusión, visibilización y concientización de la existencia de la enfermedad, la importancia del diagnóstico certero y temprano, la atención médica integral y el tratamiento adecuado.<br /><br />
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
                  <img src="/img/vision.png" alt="Visión" style={{ height: "80px", objectFit: "contain" }} />
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
          <div className="row align-items-start shadow rounded p-4 bg-white">
            <div className="col-md-8">
              <h2 className="fw-bold mb-4">Objetivos</h2>
              <p>
                Nuestro objetivo principal como asociación es ayudar, apoyar y representar a las(os) pacientes de XLH en México, formándolos, acompañándolos, informándolos y orientándolos en vivencia personal con una enfermedad poco frecuente.
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
                      <li className="mb-3">✅ <strong>Formar</strong> pacientes empoderados que defiendan y exijan sus derechos con firmeza y conocimiento.</li>
                      <li className="mb-3">✅ <strong>Acompañar</strong> a las(os) pacientes y sus familias, a través de un espacio seguro en el que puedan compartir, preguntar, consultar, informarse y dialogar.</li>
                      <li className="mb-3">✅ <strong>Apoyar</strong> a las(os) pacientes como enlace con las instituciones de salud pública para facilitarles el acceso a una atención médica adecuada y completa.</li>
                      <li className="mb-3">✅ <strong>Informar</strong> con contenidos y materiales prácticos y comprensibles, diseñados especialmente para pacientes, padres de familia, familiares, cuidadores y allegados, acerca de las necesidades especiales, cuidados, limitantes y tratamientos para las(os) pacientes.</li>
                      <li className="mb-3">✅ <strong>Visibilizar</strong> y difundir la existencia del Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH) y otros raquitismos heredados que, aunque sean enfermedades de baja prevalencia, afectan a niñas(os) y adultas(os) mexicanas(os).</li>
                    </ul>
                    <ul className="col-12 col-md-6 list-unstyled ps-3">
                      <li className="mb-3">✅ <strong>Concientizar</strong> sobre la importancia de llevar un tratamiento médico completo, integral y multidisciplinario: ortopédico, traumatológico, endocrinológico/nefrológico, dental, nutricional y psicológico.</li>
                      <li className="mb-3">✅ <strong>Promover</strong> la instrucción y enseñanza sobre enfermedades poco frecuentes, como el Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH), en las escuelas de medicina que forman a las(os) futuros médicos del país.</li>
                      <li className="mb-3">✅ <strong>Realizar</strong> un censo nacional de pacientes con Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH).</li>
                      <li className="mb-3">✅ <strong>Representar</strong> a las(os) pacientes de Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH) ante las autoridades mexicanas y asociaciones nacionales e internacionales.</li>
                      <li className="mb-3">✅ <strong>Presentar</strong> nuestro caso ante las autoridades del sector salud, para hacerlos conscientes de la existencia de la comunidad de XLH en México, y exhortarlos a facilitar el acceso de los tratamientos innovadores a las(os) pacientes de Raquitismo Hipofosfatémico ligado al Cromosoma X.</li>
                    </ul>
                  </div>
                  <button className="btn btn-outline-secondary btn-sm mt-3" onClick={() => setShowObjetivos(false)}>Ver menos</button>
                </>
              )}
            </div>
            <div className="col-md-4 text-center pt-2">
              <img src="/img/objetivos.png" className="img-fluid sombra-logo" alt="Objetivos" style={{ maxWidth: "200px" }} />
            </div>
          </div>
        </section>

        {/* Motivación */}
        <section className="container my-5" id="motivacion">
          <div className="row align-items-center shadow rounded p-4 bg-white flex-md-row-reverse">
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Motivación</h2>
              <p>
                El raquitismo hipofosfatémico ligado al cromosoma X (XLH), sí es una enfermedad de baja prevalencia, pero no por eso es invisible ni debe vivirse en soledad. Al contrario, la generación de comunidad y el acompañamiento que esta provee es de vital importancia en el abordaje de la misma, en todos los aspectos.
              </p>
              {!showMotivacion && (
                <button className="btn btn-outline-primary" onClick={() => setShowMotivacion(true)}>
                  Leer más
                </button>
              )}
              {showMotivacion && (
                <>
                  <p className="mt-3">
                    El Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH), es una enfermedad poco frecuente que no tiene mucha investigación, en consecuencia, su diagnóstico, tratamiento y acompañamiento médico es usualmente complejo, principalmente por la falta de conocimiento al respecto.
                  </p>
                  <p>
                    Sin embargo, se trata de una enfermedad genética, hereditaria, crónica, progresiva y de por vida; por lo que resulta de suma importancia que las(os) pacientes reciban la atención médica y el tratamiento adecuado que les permita tener la mejor calidad de vida posible, y a la que tienen derecho.
                  </p>
                  <p>
                    De igual manera, al ser una enfermedad rara suele ser bastante solitaria, es por ello que el apoyo moral y el acompañamiento es también primordial para las(os) pacientes, así como para sus familias.
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