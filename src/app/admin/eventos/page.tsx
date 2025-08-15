"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Evento = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  link: string;
  imagen: string;
};

export default function AdminEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");
  const [link, setLink] = useState("");
  const [imagen, setImagen] = useState("");
  const [cargando, setCargando] = useState(false);

  // Carga eventos desde API
  async function fetchEventos() {
    try {
      const res = await fetch("/api/eventos");
      if (!res.ok) throw new Error("Error al cargar eventos");
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      toast.error("No se pudieron cargar los eventos");
    }
  }

  useEffect(() => {
    fetchEventos();
  }, []);

  // Crear evento
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
        const data = await res.json();
        throw new Error(data.error || "Error al crear evento");
      }

      toast.success("Evento creado");
      setTitulo("");
      setDescripcion("");
      setFecha("");
      setLugar("");
      setLink("");
      setImagen("");
      fetchEventos();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <h2 className="mb-4">Gestión de Eventos</h2>

      <form onSubmit={handleCrearEvento} className="mb-5">
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
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
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            id="descripcion"
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
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
          <label htmlFor="lugar" className="form-label">
            Lugar
          </label>
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
          <label htmlFor="link" className="form-label">
            Link
          </label>
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
          <label htmlFor="imagen" className="form-label">
            URL de la imagen
          </label>
          <input
            type="url"
            id="imagen"
            className="form-control"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? "Creando..." : "Crear Evento"}
        </button>
      </form>

      <h3>Eventos existentes</h3>
      {eventos.length === 0 ? (
        <p>No hay eventos aún.</p>
      ) : (
        <ul className="list-group">
          {eventos.map((evento) => (
            <li key={evento.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{evento.titulo}</strong> — {new Date(evento.fecha).toLocaleDateString()}
                <p>{evento.descripcion}</p>
                <p><strong>Lugar:</strong> {evento.lugar}</p>
                <p><strong>Link:</strong> <a href={evento.link} target="_blank" rel="noopener noreferrer">{evento.link}</a></p>
                {evento.imagen && <img src={evento.imagen} alt={evento.titulo} style={{ maxWidth: '150px' }} />}
              </div>
              {/* Aquí luego puedes agregar botones para editar o eliminar */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
