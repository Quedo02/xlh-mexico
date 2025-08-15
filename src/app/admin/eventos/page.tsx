"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EventosCard, { type Evento } from "@/components/EventosCard";

export default function AdminEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // 👈 nuevo estado
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");
  const [link, setLink] = useState("");
  const [imagen, setImagen] = useState("");
  const [cargando, setCargando] = useState(false);
  const [loadingEventos, setLoadingEventos] = useState(true);

  async function fetchEventos() {
    try {
      setLoadingEventos(true);
      const res = await fetch("/api/eventos", { cache: "no-store" });
      if (!res.ok) throw new Error("Error al cargar eventos");
      const data = await res.json();
      setEventos(data);
    } catch {
      toast.error("No se pudieron cargar los eventos");
    } finally {
      setLoadingEventos(false);
    }
  }

  useEffect(() => {
    fetchEventos();
  }, []);

  async function handleCrearEvento(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo || !descripcion || !fecha || !lugar || !link || !imagen) {
      toast.error("Por favor llena todos los campos");
      return;
    }
    setCargando(true);
    try {
      const res = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, fecha, lugar, link, imagen }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al crear evento");
      }
      toast.success("Evento creado");
      setTitulo("");
      setDescripcion("");
      setFecha("");
      setLugar("");
      setLink("");
      setImagen("");
      setMostrarFormulario(false); // 👈 cerrar formulario
      fetchEventos();
    } catch (error: any) {
      toast.error(error.message || "Error al crear evento");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
        <h2 className="mb-0">Gestión de Eventos</h2>
        <button
          className="btn btn-outline-primary mt-3 mt-md-0"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "➕ Agregar Evento"}
        </button>
      </div>

      {/* Formulario condicional */}
      {mostrarFormulario && (
        <form onSubmit={handleCrearEvento} className="mb-5 border rounded p-3 bg-light">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input
              type="date"
              id="fecha"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lugar" className="form-label">Lugar</label>
            <input
              type="text"
              id="lugar"
              className="form-control"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="link" className="form-label">Link</label>
            <input
              type="url"
              id="link"
              className="form-control"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">URL de la imagen</label>
            <input
              type="url"
              id="imagen"
              className="form-control"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success" disabled={cargando}>
            {cargando ? "Creando..." : "Guardar Evento"}
          </button>
        </form>
      )}

      <h3 className="mb-3">Eventos existentes</h3>

      {loadingEventos ? (
        <p>Cargando eventos…</p>
      ) : eventos.length === 0 ? (
        <p>No hay eventos aún.</p>
      ) : (
        <div className="row">
          {eventos.map((evento) => (
            <div className="col-md-6 col-lg-4 mb-4" key={evento.id}>
              <EventosCard
                evento={evento}
                footerSlot={
                  <div className="ms-auto d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => toast.info("Función eliminar pendiente")}
                    >
                      Eliminar
                    </button>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
