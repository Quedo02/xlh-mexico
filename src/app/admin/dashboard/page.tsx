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
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Administración</h1>
        <p className="dashboard-subtitle">
          Gestiona solicitudes y eventos desde un solo lugar
        </p>
      </div>

      {/* Grid principal */}
      <div className="grid-responsive mb-2">
        
        {/* Solicitudes pendientes */}
        <div className="card-minimal card-padding-none">
          <div className="section-header">
            <div className="header-actions">
              <div>
                <h2 className="section-title">Solicitudes pendientes</h2>
                <p className="section-count">
                  {loadingSol ? "Cargando…" : `${pendientes.length} pendientes`}
                </p>
              </div>
              <div className="flex-center-gap">
                <button
                  className="btn-icon"
                  onClick={() => scrollByCard(solRef.current, "left")}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  className="btn-icon"
                  onClick={() => scrollByCard(solRef.current, "right")}
                  aria-label="Siguiente"
                >
                  ›
                </button>
                <Link href="/admin/solicitudes" className="btn-primary-minimal">
                  Ver todas
                </Link>
              </div>
            </div>
          </div>

          <div className="section-content">
            {errorSol && (
              <div className="error-message">{errorSol}</div>
            )}
            {loadingSol ? (
              <p className="empty-state">Cargando…</p>
            ) : pendientes.length === 0 ? (
              <p className="empty-state">No hay solicitudes pendientes</p>
            ) : (
              <div className="snap-row" ref={solRef}>
                {pendientes.map((s) => (
                  <div className="snap-card" key={String(s.id)}>
                    <div className="card-minimal solicitud-card-inner">
                      <div className="card-header-row">
                        <span className="badge-minimal">Pendiente</span>
                        <span className="fecha-badge">
                          {formatFechaES(s.createdAt)}
                        </span>
                      </div>
                      <div className="card-body">
                        <p className="label-small">Solicitante</p>
                        <p className="value-text">{s.nombre || "—"}</p>
                      </div>
                      <Link
                        href={`/admin/solicitudes?id=${encodeURIComponent(String(s.id))}`}
                        className="btn-outline-minimal w-full text-center"
                      >
                        Revisar solicitud
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Eventos próximos */}
        <div className="card-minimal card-padding-none">
          <div className="section-header">
            <div className="header-actions">
              <div>
                <h2 className="section-title">Eventos próximos</h2>
                <p className="section-count">
                  {loadingEvt ? "Cargando…" : `${proximos.length} próximos`}
                </p>
              </div>
              <div className="flex-center-gap">
                <button
                  className="btn-icon"
                  onClick={() => scrollByCard(evtRef.current, "left")}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  className="btn-icon"
                  onClick={() => scrollByCard(evtRef.current, "right")}
                  aria-label="Siguiente"
                >
                  ›
                </button>
                <Link href="/admin/eventos" className="btn-primary-minimal">
                  Ver todos
                </Link>
              </div>
            </div>
          </div>

          <div className="section-content">
            {errorEvt && (
              <div className="error-message">{errorEvt}</div>
            )}
            {loadingEvt ? (
              <p className="empty-state">Cargando…</p>
            ) : proximos.length === 0 ? (
              <p className="empty-state">No hay eventos próximos</p>
            ) : (
              <div className="snap-row" ref={evtRef}>
                {proximos.map((e) => (
                  <div className="snap-card" key={String(e.id)}>
                    <div className="card-minimal card-padding-none">
                      <img
                        className="img-event"
                        src={e.imagen || "/img/placeholder-evento.jpg"}
                        alt={e.titulo}
                      />
                      <div className="evento-card-content">
                        <h3 className="evento-title">{e.titulo}</h3>
                        <div className="evento-info">
                          <div className="evento-info-item">
                            📅 {formatFechaES(e.fecha)}
                          </div>
                          <div>📍 {e.lugar}</div>
                        </div>
                        <div className="button-group">
                          {e.link && (
                            <a
                              href={e.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-outline-secondary button-full"
                            >
                              Ver detalles
                            </a>
                          )}
                          <Link
                            href={`/admin/eventos?focus=${encodeURIComponent(String(e.id))}`}
                            className="btn-outline-minimal text-center"
                          >
                            Editar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="quick-actions">
        <Link href="/admin/eventos" className="btn-outline-secondary">
          + Agregar evento
        </Link>
        <Link href="/admin/solicitudes" className="btn-outline-minimal">
          Gestionar solicitudes
        </Link>
        <Link href="/admin/directorio" className="btn-outline-minimal">
          Ver directorio
        </Link>
        <Link href="/admin/galeria" className="btn-outline-secondary">
          Administrar galería
        </Link>
      </div>
    </div>
  );
}