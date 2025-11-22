"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFotoUrl } from "@/lib/utils";

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
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1rem" }}>
      <style jsx global>{`
        .solicitud-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        
        .solicitud-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 38, 102, 0.06);
        }
        
        .btn-accept {
          background: #79bd44;
          color: white;
          border: none;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-accept:hover {
          background: #6aa838;
          transform: translateY(-1px);
        }
        
        .btn-reject {
          background: white;
          color: #ee316b;
          border: 1px solid #e2e8f0;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-reject:hover {
          background: #ee316b;
          color: white;
          border-color: #ee316b;
          transform: translateY(-1px);
        }
        
        .btn-contact {
          background: white;
          color: #3c99ba;
          border: 1px solid #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s ease;
        }
        
        .btn-contact:hover {
          background: #3c99ba;
          color: white;
          border-color: #3c99ba;
        }
        
        .badge-pending {
          display: inline-block;
          background: #fff7ed;
          color: #ff9743;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid #ffedd5;
        }
        
        @media (max-width: 768px) {
          .solicitud-grid {
            grid-template-columns: 1fr !important;
          }
          
          .card-content {
            flex-direction: column !important;
          }
          
          .card-image {
            width: 100% !important;
            height: 140px !important;
          }
          
          .card-actions {
            flex-direction: column;
            gap: 0.75rem !important;
          }
          
          .card-actions > div {
            width: 100%;
            display: flex;
            gap: 0.5rem;
          }
          
          .card-actions button,
          .card-actions a {
            flex: 1;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "0.5rem"
        }}>
          <h1 style={{ 
            color: "#0f172a", 
            fontSize: "1.875rem", 
            fontWeight: "600",
            margin: 0,
            letterSpacing: "-0.025em"
          }}>
            Solicitudes de Especialistas
          </h1>
          {!loading && solicitudes.length > 0 && (
            <span className="badge-pending">
              {solicitudes.length} pendiente{solicitudes.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
          Revisa y gestiona las solicitudes de nuevos especialistas
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{
          textAlign: "center",
          padding: "4rem 0",
          color: "#94a3b8"
        }}>
          Cargando solicitudes...
        </div>
      ) : solicitudes.length === 0 ? (
        <div style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "3rem",
          textAlign: "center"
        }}>
          <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0 }}>
            No hay solicitudes pendientes
          </p>
        </div>
      ) : (
        <div className="solicitud-grid" style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))",
          gap: "1.5rem"
        }}>
          {solicitudes.map((sol) => (
            <div className="solicitud-card" key={sol.id}>
              <div className="card-content" style={{ 
                display: "flex",
                gap: "1.25rem"
              }}>
                {/* Image */}
                {sol.foto && (
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src={sol.foto.startsWith("/img/especialistas/") ? sol.foto : `/img/especialistas/${sol.foto}`}
                      alt={sol.nombre}
                      className="card-image"
                      style={{
                        width: "140px",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        background: "#f1f5f9",
                        margin: "1.25rem 0 1.25rem 1.25rem"
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div style={{ 
                  flex: 1,
                  padding: sol.foto ? "1.25rem 1.25rem 1.25rem 0" : "1.25rem",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <h3 style={{ 
                    color: "#0f172a",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    margin: "0 0 0.75rem 0"
                  }}>
                    {sol.nombre}
                  </h3>

                  <div style={{ 
                    display: "grid",
                    gap: "0.625rem",
                    fontSize: "0.875rem",
                    marginBottom: "1rem"
                  }}>
                    <div>
                      <span style={{ 
                        color: "#002666",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em"
                      }}>
                        Especialidad
                      </span>
                      <p style={{ color: "#475569", margin: "0.25rem 0 0 0" }}>
                        {sol.especialidad}
                      </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                      <div>
                        <span style={{ 
                          color: "#002666",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.05em"
                        }}>
                          Ubicación
                        </span>
                        <p style={{ color: "#475569", margin: "0.25rem 0 0 0" }}>
                          {sol.ubicacion}
                        </p>
                      </div>
                      <div>
                        <span style={{ 
                          color: "#002666",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.05em"
                        }}>
                          Hospital
                        </span>
                        <p style={{ color: "#475569", margin: "0.25rem 0 0 0" }}>
                          {sol.hospital}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span style={{ 
                        color: "#002666",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em"
                      }}>
                        ¿Cómo conoció el programa?
                      </span>
                      <p style={{ color: "#475569", margin: "0.25rem 0 0 0" }}>
                        {sol.comoConocieron}
                      </p>
                    </div>

                    {sol.perfilUrl && (
                      <div>
                        <a 
                          href={sol.perfilUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            color: "#3c99ba",
                            fontSize: "0.8rem",
                            textDecoration: "none",
                            fontWeight: "500"
                          }}
                        >
                          → Ver perfil profesional
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                padding: "1rem 1.25rem",
                borderTop: "1px solid #f1f5f9",
                background: "#fafafa"
              }}>
                <div className="card-actions" style={{ 
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap"
                }}>
                  <div style={{ display: "flex", gap: "0.625rem" }}>
                    <button 
                      className="btn-accept" 
                      onClick={() => aceptarSolicitud(sol)}
                    >
                      Aceptar
                    </button>
                    <button 
                      className="btn-reject" 
                      onClick={() => rechazarSolicitud(sol.id)}
                    >
                      Rechazar
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {sol.telefono && (
                      <a 
                        className="btn-contact" 
                        href={`tel:${sol.telefono}`}
                      >
                        📞 Llamar
                      </a>
                    )}
                    {sol.correo && (
                      <a 
                        className="btn-contact" 
                        href={`mailto:${sol.correo}`}
                      >
                        ✉️ Email
                      </a>
                    )}
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