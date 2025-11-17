"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFotoUrl } from "@/lib/utils"; // <- importar helper

interface Solicitud {
  id: number;
  nombre: string;
  especialidad: string;
  ubicacion: string;
  telefono: string;
  correo: string;
  hospital: string;
  comoConocieron: string;
  foto: string | null;
  perfilUrl: string | null;
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSolicitudes = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/solicitudes", { credentials: "include" });
    const data = await res.json();
    if (res.ok) setSolicitudes(data.data);
    else toast.error(data.error);
    setLoading(false);
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const aceptarSolicitud = async (sol: Solicitud) => {
    try {
      const res = await fetch("/api/admin/solicitudes/aceptar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sol),
      });
      if (!res.ok) throw new Error("Error al aceptar solicitud");
      toast.success("Solicitud aceptada");
      fetchSolicitudes();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo aceptar la solicitud");
    }
  };

  const rechazarSolicitud = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/solicitudes/rechazar/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al rechazar solicitud");
      toast.success("Solicitud rechazada");
      fetchSolicitudes();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo rechazar la solicitud");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Solicitudes de Especialistas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : solicitudes.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {solicitudes.map((sol) => (
            <div className="col" key={sol.id}>
              <div className="card h-100 shadow-sm">
                {sol.foto && (
                  <img
                    src={sol.foto.startsWith("/img/especialistas/") ? sol.foto : `/img/especialistas/${sol.foto}`}
                    alt={sol.nombre}
                    className="card-img-top"
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{sol.nombre}</h5>
                  <p className="card-text"><strong>Especialidad:</strong> {sol.especialidad}</p>
                  <p className="card-text"><strong>Ubicación:</strong> {sol.ubicacion}</p>
                  <p className="card-text"><strong>Teléfono:</strong> {sol.telefono}</p>
                  <p className="card-text"><strong>Correo:</strong> {sol.correo}</p>
                  <p className="card-text"><strong>Hospital:</strong> {sol.hospital}</p>
                  <p className="card-text"><strong>¿Cómo conoció?:</strong> {sol.comoConocieron}</p>
                  {sol.perfilUrl && (
                    <p>
                      <a href={sol.perfilUrl} target="_blank" rel="noopener noreferrer">
                        Ver perfil profesional
                      </a>
                    </p>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <div>
                    <button className="btn btn-success me-2" onClick={() => aceptarSolicitud(sol)}>Aceptar</button>
                    <button className="btn btn-danger" onClick={() => rechazarSolicitud(sol.id)}>Rechazar</button>
                  </div>
                  <div>
                    {sol.telefono && <a className="btn btn-outline-primary me-2" href={`tel:${sol.telefono}`}>Llamar</a>}
                    {sol.correo && <a className="btn btn-outline-secondary" href={`mailto:${sol.correo}`}>Correo</a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}