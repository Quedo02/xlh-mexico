"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    const res = await fetch("/api/admin/solicitudes", { credentials: "include" });
    const data = await res.json();
    if (res.ok) setSolicitudes(data.data);
    else toast.error(data.error);
    setLoading(false);
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

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
                    src={`/uploads/${sol.foto}`}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
