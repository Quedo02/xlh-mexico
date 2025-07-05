import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import ScriptSocialEmbeds from "@/components/ScriptSocialEmbeds";

type Evento = {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  link: string;
  imagen: string;
};

const eventosPorPagina = 6;

export default async function EventosPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("La variable de entorno NEXT_PUBLIC_BASE_URL no está definida.");
  }

  const res = await fetch(`${baseUrl}/api/eventos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Error al obtener eventos: ${res.status} ${res.statusText}`);
    return (
      <>
        <HeroSection
          title="Eventos"
          subtitle="Participa en nuestras actividades y encuentros"
          backgroundImage="/img/receta.jpg"
          overlayColor="rgba(0, 38, 102, 0.6)"
        />
        <section className="container my-5">
          <h2 className="text-danger">No se pudieron cargar los eventos.</h2>
        </section>
      </>
    );
  }

  let eventos: Evento[] = [];

  try {
    eventos = await res.json();
  } catch (error) {
    console.error("Error al parsear JSON:", error);
    return (
      <>
        <HeroSection
          title="Eventos"
          subtitle="Participa en nuestras actividades y encuentros"
          backgroundImage="/img/receta.jpg"
          overlayColor="rgba(0, 38, 102, 0.6)"
        />
        <section className="container my-5">
          <h2 className="text-danger">Error de formato en la respuesta del servidor.</h2>
        </section>
      </>
    );
  }

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
            Historial de Eventos
          </h2>
          <button className="btn btn-outline-verde mt-3 mt-md-0">
            <i className="bi bi-calendar-plus me-2"></i>Agregar Evento
          </button>
        </div>

        <div className="row">
          {eventos.slice(0, eventosPorPagina).map((evento) => (
            <div className="col-md-6 col-lg-4 mb-4" key={evento.id}>
              <div className="card h-100 tile-card">
                <Image
                  src={evento.imagen}
                  alt={evento.titulo}
                  width={500}
                  height={250}
                  className="card-img-top object-fit-cover"
                />
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
      </section>

      <ScriptSocialEmbeds />
    </>
  );
}
