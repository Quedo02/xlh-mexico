"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// Tipos mínimos; ajústalos a tu API real
type Solicitud = {
  id: number | string;
  nombre?: string;
  createdAt?: string | null;
  // ...otros campos que tengas
};

type Evento = {
  id: number | string;
  titulo: string;
  fecha: string;   // ISO
  lugar: string;
  descripcion?: string;
  link?: string;
  imagen?: string;
};

function formatFechaES(iso?: string | null) {
  if (!iso) return "Sin fecha";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t) || t <= 0) return "Sin fecha";
  return new Date(iso).toLocaleDateString("es-MX", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const [loadingSol, setLoadingSol] = useState(true);
  const [loadingEvt, setLoadingEvt] = useState(true);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [errorSol, setErrorSol] = useState<string | null>(null);
  const [errorEvt, setErrorEvt] = useState<string | null>(null);

  const solRef = useRef<HTMLDivElement>(null);
  const evtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solicitudes (todas las que llegan son pendientes)
    (async () => {
      try {
        setLoadingSol(true);
        const res = await fetch("/api/admin/solicitudes", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar las solicitudes");
        const json = await res.json();
        setSolicitudes(Array.isArray(json?.data) ? json.data : []);
      } catch (e: any) {
        setErrorSol(e?.message || "Error cargando solicitudes");
      } finally {
        setLoadingSol(false);
      }
    })();

    // Eventos
    (async () => {
      try {
        setLoadingEvt(true);
        const res = await fetch("/api/eventos", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar los eventos");
        const json = await res.json();
        setEventos(Array.isArray(json) ? json : []);
      } catch (e: any) {
        setErrorEvt(e?.message || "Error cargando eventos");
      } finally {
        setLoadingEvt(false);
      }
    })();
  }, []);

  // Ordena solicitudes (más recientes primero; si fecha inválida, al final; empate por id desc)
  const pendientes = useMemo(() => {
    const arr = Array.isArray(solicitudes) ? solicitudes.slice() : [];
    return arr.sort((a, b) => {
      const ta = new Date(a.createdAt || 0).getTime() || 0;
      const tb = new Date(b.createdAt || 0).getTime() || 0;
      if (tb === ta) return String(b.id).localeCompare(String(a.id));
      return tb - ta;
    });
  }, [solicitudes]);

  // Eventos próximos a hoy
  const proximos = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return (Array.isArray(eventos) ? eventos : [])
      .filter((e) => {
        const d = new Date(e.fecha);
        return !Number.isNaN(+d) && d >= hoy;
      })
      .sort((a, b) => +new Date(a.fecha) - +new Date(b.fecha));
  }, [eventos]);

  // Helpers de scroll
  function scrollByCard(container: HTMLDivElement | null, dir: "left" | "right") {
    if (!container) return;
    const card = container.querySelector<HTMLElement>(".snap-card");
    const step = (card?.offsetWidth || 280) + 16; // ancho aprox + gap
    container.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  }

  return (
    <div className="container py-5">
      <style jsx global>{`
        .snap-row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(260px, 320px);
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          scroll-snap-type: x mandatory;
        }
        .snap-row::-webkit-scrollbar { height: 8px; }
        .snap-row::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 8px; }
        .snap-card { scroll-snap-align: start; }
        .card-min-h { min-height: 160px; }
        .img-thumb {
          width: 100%; height: 120px; object-fit: cover; border-radius: .5rem; background: #f2f2f2;
        }
      `}</style>

      <h1 className="mb-2">Panel de Administración</h1>
      <p className="text-muted mb-4">
        Resumen rápido de <strong>solicitudes pendientes</strong> y <strong>eventos próximos</strong>.
      </p>

      <div className="row gy-4">
        {/* Solicitudes pendientes (todas las devueltas por la API) */}
        <div className="col-12 col-xl-6">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-0">Solicitudes pendientes</h5>
                <small className="text-muted">
                  {loadingSol ? "Cargando…" : `${pendientes.length} pendiente(s)`}
                </small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => scrollByCard(solRef.current, "left")}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => scrollByCard(solRef.current, "right")}
                  aria-label="Siguiente"
                >
                  ›
                </button>
                <Link href="/admin/solicitudes" className="btn btn-sm btn-primary">
                  Ver todas
                </Link>
              </div>
            </div>

            <div className="card-body">
              {errorSol && <div className="alert alert-danger">{errorSol}</div>}
              {loadingSol ? (
                <p className="text-muted">Cargando…</p>
              ) : pendientes.length === 0 ? (
                <p className="text-muted">No hay solicitudes pendientes.</p>
              ) : (
                <div className="snap-row" ref={solRef}>
                  {pendientes.map((s) => (
                    <div className="snap-card card card-min-h p-3" key={String(s.id)}>
                      <div className="d-flex flex-column h-100">
                        <div className="d-flex justify-content-between align-items-start">
                          <span className="badge text-bg-warning">Pendiente</span>
                          <small className="text-muted">{formatFechaES(s.createdAt)}</small>
                        </div>
                        <div className="mt-2">
                          <strong>Solicitante:</strong> {s.nombre || "—"}
                        </div>
                        <div className="mt-auto pt-2">
                          <Link
                            href={`/admin/solicitudes?id=${encodeURIComponent(String(s.id))}`}
                            className="btn btn-sm btn-outline-primary w-100"
                          >
                            Revisar
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Eventos próximos */}
        <div className="col-12 col-xl-6">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-0">Eventos próximos</h5>
                <small className="text-muted">
                  {loadingEvt ? "Cargando…" : `${proximos.length} evento(s)`}
                </small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => scrollByCard(evtRef.current, "left")}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => scrollByCard(evtRef.current, "right")}
                  aria-label="Siguiente"
                >
                  ›
                </button>
                <Link href="/admin/eventos" className="btn btn-sm btn-primary">
                  Ver todos
                </Link>
              </div>
            </div>

            <div className="card-body">
              {errorEvt && <div className="alert alert-danger">{errorEvt}</div>}
              {loadingEvt ? (
                <p className="text-muted">Cargando…</p>
              ) : proximos.length === 0 ? (
                <p className="text-muted">No hay eventos próximos.</p>
              ) : (
                <div className="snap-row" ref={evtRef}>
                  {proximos.map((e) => (
                    <div className="snap-card card p-0" key={String(e.id)}>
                      {/* Evito next/image para no depender de dominios configurados */}
                      <img
                        className="img-thumb"
                        src={e.imagen || "/img/placeholder-evento.jpg"}
                        alt={e.titulo}
                      />
                      <div className="p-3 d-flex flex-column">
                        <h6 className="mb-1">{e.titulo}</h6>
                        <small className="text-muted">
                          📅 {formatFechaES(e.fecha)} — {e.lugar}
                        </small>
                        <div className="mt-auto pt-2 d-flex gap-2">
                          {e.link && (
                            <a
                              href={e.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-secondary flex-grow-1"
                            >
                              Detalles
                            </a>
                          )}
                          <Link
                            href={`/admin/eventos?focus=${encodeURIComponent(String(e.id))}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Editar
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="mt-4 d-flex flex-wrap gap-2">
        <Link href="/admin/eventos" className="btn btn-outline-success">
          ➕ Agregar evento
        </Link>
        <Link href="/admin/solicitudes" className="btn btn-outline-dark">
          Gestionar solicitudes
        </Link>
      </div>
    </div>
  );
}
