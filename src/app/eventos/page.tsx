import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import ScriptSocialEmbeds from "@/components/ScriptSocialEmbeds";
import EventosCard, { type Evento } from "@/components/EventosCard";

export const dynamic = "force-dynamic";

const eventosPorPagina = 6;

export default async function EventosPage() {
  const raw = await prisma.evento.findMany({ orderBy: { fecha: "desc" } });
  const eventos: Evento[] = raw.map((e) => ({ ...e, fecha: e.fecha.toISOString() }));

  return (
    <>
      <HeroSection
        title="Eventos"
        subtitle="Participa en nuestras actividades y encuentros"
        sectionName="eventos"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
          <h2 className="titulo-seccion text-center text-md-start">Historial de Eventos</h2>
        </div>

        <div className="row">
          {eventos.slice(0, eventosPorPagina).map((evento) => (
            <div className="col-md-6 col-lg-4 mb-4" key={evento.id}>
              <EventosCard evento={evento} />
            </div>
          ))}
        </div>
      </section>

      <ScriptSocialEmbeds />
    </>
  );
}
