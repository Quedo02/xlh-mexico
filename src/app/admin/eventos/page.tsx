"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EventosCard, { type Evento } from "@/components/EventosCard";

export default function AdminEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");
  const [link, setLink] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);
  const [loadingEventos, setLoadingEventos] = useState(true);
  
  const [editandoId, setEditandoId] = useState<number | null>(null);

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
    if (!titulo || !descripcion || !fecha || !lugar || !link) {
      toast.error("Por favor llena todos los campos");
      return;
    }

    if (!editandoId && !imagen) {
      toast.error("Por favor selecciona una imagen");
      return;
    }

    setCargando(true);
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("fecha", fecha);
      formData.append("lugar", lugar);
      formData.append("link", link);
      if (imagen) formData.append("imagen", imagen);

      const url = editandoId ? `/api/eventos/${editandoId}` : "/api/eventos";
      const method = editandoId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error al ${editandoId ? "actualizar" : "crear"} evento`);
      }

      toast.success(editandoId ? "Evento actualizado" : "Evento creado");
      setTitulo("");
      setDescripcion("");
      setFecha("");
      setLugar("");
      setLink("");
      setImagen(null);
      setEditandoId(null);
      setMostrarFormulario(false);
      fetchEventos();
    } catch (error: any) {
      toast.error(error.message || `Error al ${editandoId ? "actualizar" : "crear"} evento`);
    } finally {
      setCargando(false);
    }
  }

  async function handleEliminarEvento(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este evento?")) return;

    try {
      const res = await fetch(`/api/eventos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Evento eliminado correctamente");
        fetchEventos();
      } else {
        toast.error("No se pudo eliminar el evento");
      }
    } catch (error) {
      toast.error("Error en la red");
    }
  }

  function handleEditarEvento(evento: Evento) {
    setTitulo(evento.titulo);
    setDescripcion(evento.descripcion);
    setFecha(evento.fecha.split('T')[0]); // Formato YYYY-MM-DD para input date
    setLugar(evento.lugar);
    setLink(evento.link);
    setEditandoId(evento.id);
    setImagen(null);
    setMostrarFormulario(true);
  }

  function cancelarFormulario() {
    setTitulo("");
    setDescripcion("");
    setFecha("");
    setLugar("");
    setLink("");
    setImagen(null);
    setEditandoId(null);
    setMostrarFormulario(false);
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: "1400px" }}>
      {/* Header */}
      <div className="header-eventos">
        <div>
          <h1 className="dashboard-title">Gestión de Eventos</h1>
          <p className="dashboard-subtitle">
            Crea y administra los eventos de la comunidad
          </p>
        </div>
        <button
          className={mostrarFormulario ? "btn-cancel-evento" : "btn-add-evento"}
          onClick={() => {
            if (mostrarFormulario) {
              cancelarFormulario();
            } else {
              setMostrarFormulario(true);
            }
          }}
        >
          {mostrarFormulario ? "Cancelar" : "+ Agregar Evento"}
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="form-card">
          <h2 className="section-subtitle">
            {editandoId ? "Editar Evento" : "Nuevo Evento"}
          </h2>

          <form onSubmit={handleCrearEvento}>
            <div className="form-grid-2col">
              <div className="form-group">
                <label className="form-label">Título *</label>
                <input
                  type="text"
                  className="form-input"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Nombre del evento"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Fecha *</label>
                <input
                  type="date"
                  className="form-input"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Descripción *</label>
              <textarea
                className="form-textarea"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe el evento..."
                required
              />
            </div>

            <div className="form-grid-2col">
              <div className="form-group">
                <label className="form-label">Lugar *</label>
                <input
                  type="text"
                  className="form-input"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder="Ubicación del evento"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Link *</label>
                <input
                  type="url"
                  className="form-input"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Imagen del evento *</label>
              <input
                type="file"
                className="form-file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImagen(file);
                }}
                required={!editandoId}
              />
              {imagen && (
                <div className="file-preview">
                  <p className="file-preview-text">
                    📷 <span className="file-preview-name">{imagen.name}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="submit"
                className="btn-save-evento" 
                disabled={cargando}
              >
                {cargando ? "Guardando..." : (editandoId ? "Actualizar Evento" : "Guardar Evento")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de eventos */}
      <div className="dashboard-header">
        <h2 className="section-subtitle">Eventos existentes</h2>
        <p className="section-description">
          {loadingEventos ? "Cargando..." : `${eventos.length} evento${eventos.length !== 1 ? "s" : ""} registrado${eventos.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {loadingEventos ? (
        <div className="loading-state">
          Cargando eventos...
        </div>
      ) : eventos.length === 0 ? (
        <div className="empty-state-card">
          <p className="empty-state-text">
            No hay eventos registrados aún
          </p>
        </div>
      ) : (
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <div key={evento.id}>
              <EventosCard
                evento={evento}
                footerSlot={
                  <div className="evento-actions">
                    <button
                      className="btn-edit-evento"
                      onClick={() => handleEditarEvento(evento)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete-evento"
                      onClick={() => handleEliminarEvento(evento.id)}
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