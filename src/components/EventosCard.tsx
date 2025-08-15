import Image from "next/image";
import Link from "next/link";

export type Evento = {
  id: number;
  titulo: string;
  fecha: string;      // ISO string
  lugar: string;
  descripcion: string;
  link: string;
  imagen: string;     // URL absoluta o pública
};

function formatFechaES(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function EventosCard({ evento, footerSlot }: {
  evento: Evento;
  /** opcional: slot para botones (Editar/Eliminar) u otro contenido en admin */
  footerSlot?: React.ReactNode;
}) {
  return (
    <div className="card h-100 tile-card">
      <div className="position-relative" style={{ height: 180, overflow: "hidden" }}>
        <Image
          src={evento.imagen || "/img/placeholder-evento.jpg"}
          alt={evento.titulo}
          fill
          className="object-fit-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{evento.titulo}</h5>

        <p className="card-subtitle mb-2 text-muted">
          📅 {formatFechaES(evento.fecha)} — {evento.lugar}
        </p>

        <p className="card-text flex-grow-1">
          {evento.descripcion}
        </p>

        <div className="d-flex gap-2 mt-auto align-items-center">
          <Link href={evento.link} target="_blank" className="btn btn-outline-cyan">
            Ver Detalles
          </Link>
          {footerSlot /* aquí admin puede inyectar botones */}
        </div>
      </div>
    </div>
  );
}
