"use client";

import { useEffect, useState, useRef } from "react";

type Media = { id: number; url: string; alt?: string; caption?: string };
type SlotMedia = { id: number; mediaId: number; media: Media };
type MediaSlot = { id: number; slot: string; alt?: string; caption?: string; slotMedias: SlotMedia[] };

// Slots que solo pueden tener una imagen
const singleImageSlots = [
  "homeBanner",
  "sobreXLH",
  "directorio",
  "informacion",
  "nosotros",
  "registro",
  "eventos",
  "contacto",
  "servicios" 
];

export default function AdminGaleria() {
  const [medios, setMedios] = useState<Media[]>([]);
  const [slots, setSlots] = useState<MediaSlot[]>([]);
  const [slotName, setSlotName] = useState("");
  const [slotAlt, setSlotAlt] = useState("");
  const [slotCaption, setSlotCaption] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | "">("");
  const [selectedMediaId, setSelectedMediaId] = useState<number | "">("");
  const [selectedConfig, setSelectedConfig] = useState({
    homeCarrusel: "",
    homeBanner: "",
    sobreXLH: "",
    directorio: "",
    informacion: "",
    nosotros: "",
    registro: "",
    eventos: "",
    contacto: "",
    servicios: "" 
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const load = async () => {
    try {
      const medias = await fetch("/api/media", { cache: "no-store" }).then(r => r.json());
      setMedios(medias.data || []);
      const s = await fetch("/api/media/slots", { cache: "no-store" }).then(r => r.json());
      setSlots(s.data || []);
    } catch (error) {
      console.error("Error al cargar medios/slots:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await load();
      try {
        const resConfig = await fetch("/api/config/slots");
        if (resConfig.ok) {
          const data = await resConfig.json();
          if (data?.config) setSelectedConfig(prev => ({ ...prev, ...data.config }));
        }
      } catch (error) {
        console.error("Error al cargar configuración de slots:", error);
      }
    };
    init();
  }, []);

  const updateConfigSlots = async () => {
    try {
      const res = await fetch("/api/config/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedConfig),
      });
      if (res.ok) alert("Configuración de slots actualizada");
      else alert("Error al actualizar configuración");
    } catch {
      alert("Error de conexión al guardar configuración");
    }
  };

  const onSubmitMedia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const res = await fetch("/api/media", { method: "POST", body: formData });
    if (res.ok) {
      const newItem: Media = (await res.json()).data;
      setMedios(prev => [newItem, ...prev]);
      formRef.current.reset();
    }
  };

  const createSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotName) return;
    const res = await fetch("/api/media/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: slotName.trim(), alt: slotAlt || undefined, caption: slotCaption || undefined }),
    });
    if (res.ok) {
      setSlotName(""); setSlotAlt(""); setSlotCaption("");
      load();
    }
  };

  const addMediaToSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlot === "" || selectedMediaId === "") return;

    const slotInfo = slots.find(s => s.id === selectedSlot);
    if (slotInfo && singleImageSlots.includes(slotInfo.slot)) {
      // eliminar media existente
      for (const sm of slotInfo.slotMedias) {
        await fetch("/api/media/slotMedia", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slotMediaId: sm.id }),
        });
      }
    }

    await fetch("/api/media/slotMedia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId: selectedSlot, mediaId: selectedMediaId }),
    });

    setSelectedSlot(""); 
    setSelectedMediaId("");
    load();
  };

  const deleteMediaFromSlot = async (slotMediaId: number) => {
    await fetch("/api/media/slotMedia", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotMediaId }),
    });
    load();
  };

  const deleteSlot = async (slotId: number) => {
    if (!confirm("¿Deseas eliminar este slot y todas sus imágenes?")) return;
    await fetch("/api/media/slots", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId }),
    });
    load();
  };

  return (
    <div className="container py-4">

      {/* Crear slot */}
      <div className="border rounded p-3 mb-3">
        <h6 className="mb-3">Crear nuevo slot</h6>
        <form className="row g-2 align-items-end" onSubmit={createSlot}>
          <div className="col-md-3">
            <input className="form-control" placeholder="Nombre del slot" value={slotName} onChange={e => setSlotName(e.target.value)} required />
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Nombre alternativo" value={slotAlt} onChange={e => setSlotAlt(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Descripción" value={slotCaption} onChange={e => setSlotCaption(e.target.value)} />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">Crear</button>
          </div>
        </form>
      </div>

      {/* Subir imagen */}
      <div className="border rounded p-3 mb-3">
        <h6 className="mb-2">Subir imagen</h6>
        <form ref={formRef} onSubmit={onSubmitMedia} encType="multipart/form-data" className="row g-2 align-items-end">
          <div className="col-md-4">
            <input type="file" name="file" required className="form-control" />
          </div>
          <div className="col-md-3">
            <input type="text" name="alt" placeholder="Nombre" className="form-control" />
          </div>
          <div className="col-md-3">
            <input type="text" name="caption" placeholder="Descripción" className="form-control" />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Subir</button>
          </div>
        </form>
      </div>

      {/* Configurar slots de banners y carrusel */}
      <div className="border rounded p-3 mb-3">
        <h6 className="mb-2">Configurar slots de banners y carrusel</h6>
        {[
          { key: "homeCarrusel", label: "Carrusel Home" },
          { key: "homeBanner", label: "Banner Home" },
          { key: "sobreXLH", label: "Banner Sobre el XLH" },
          { key: "directorio", label: "Banner Directorio" },
          { key: "informacion", label: "Banner Información" },
          { key: "nosotros", label: "Banner Nosotros" },
          { key: "registro", label: "Banner Registro" },
          { key: "eventos", label: "Banner Eventos" },
          { key: "contacto", label: "Banner Contáctanos" },
          { key: "servicios", label: "Banner Servicios" }
        ].map(item => {
          const isSingle = singleImageSlots.includes(item.key);
          const slotData = slots.find(s => s.slot === selectedConfig[item.key as keyof typeof selectedConfig]);
          return (
            <div key={item.key} className="row g-2 align-items-end mb-2">
              <div className="col-md-6">
                <label className="form-label">{item.label}</label>
                <select
                  className="form-select"
                  value={selectedConfig[item.key as keyof typeof selectedConfig]}
                  onChange={e => setSelectedConfig(prev => ({ ...prev, [item.key]: e.target.value }))}
                >
                  <option value="">Selecciona un slot</option>
                  {slots.map(s => <option key={s.id} value={s.slot}>{s.slot}</option>)}
                </select>
              </div>
              {isSingle && slotData?.slotMedias[0] && (
                <div className="col-md-4">
                  <img 
                    src={slotData.slotMedias[0].media.url} 
                    alt={slotData.slotMedias[0].media.alt || ""} 
                    style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
        <div className="mt-2">
          <button className="btn btn-primary" onClick={updateConfigSlots}>
            Guardar configuración
          </button>
        </div>
      </div>

      {/* Asignar imagen a slot */}
      <div className="border rounded p-3 mb-3">
        <h6 className="mb-2">Asignar imagen a slot</h6>
        <form className="row g-2 align-items-end" onSubmit={addMediaToSlot}>
          <div className="col-md-4">
            <select className="form-select" value={selectedSlot} onChange={e => setSelectedSlot(Number(e.target.value))}>
              <option value="">Selecciona un slot</option>
              {slots.map(s => <option key={s.id} value={s.id}>{s.slot}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={selectedMediaId} onChange={e => setSelectedMediaId(Number(e.target.value))}>
              <option value="">Selecciona una imagen</option>
              {medios.map(m => <option key={m.id} value={m.id}>{m.alt || "Sin alt"}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Agregar</button>
          </div>
        </form>
      </div>

      {/* Slots y sus imágenes */}
      <div className="card">
        <div className="card-header"><strong>Slots y sus imágenes</strong></div>
        <div className="card-body">
          {slots.map(s => (
            <div key={s.id} className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">{s.slot}</div>
                  {s.alt && <div className="text-muted small">Nombre Alternativo: {s.alt}</div>}
                  {s.caption && <div className="text-muted small">Descripción: {s.caption}</div>}
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => deleteSlot(s.id)}>Eliminar slot</button>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {s.slotMedias.map(sm => (
                  <div key={sm.id} className="border rounded p-1 position-relative text-center" style={{ width: 110 }}>
                    <img 
                      src={sm.media.url} 
                      alt={sm.media.alt || ""} 
                      style={{ width: 100, height: 80, objectFit: "cover" }} 
                    />
                    {sm.media.alt && (
                      <div className="small text-muted mt-1" style={{ maxWidth: 100, whiteSpace: "normal" }}>
                        {sm.media.alt}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteMediaFromSlot(sm.id)}
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {s.slotMedias.length === 0 && <span className="text-muted">No hay imágenes asignadas</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Biblioteca de medios */}
      <div className="mt-4">
        <h6 className="mb-2">Todas las imágenes</h6>
        <div className="d-flex flex-wrap gap-2">
          {medios.map(m => {
            const inUse = slots.some(s => s.slotMedias.some(sm => sm.mediaId === m.id));
            return (
              <div key={m.id} className="border rounded p-1 position-relative text-center" style={{ width: 110 }}>
                <img src={m.url} alt={m.alt || ""} style={{ width: 100, height: 80, objectFit: "cover" }} />
                {m.alt && <div className="small text-muted mt-1" style={{ maxWidth: 100 }}>{m.alt}</div>}
                {m.caption && <div className="small text-muted mt-1" style={{ maxWidth: 100 }}>{m.caption}</div>}
                {!inUse && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm("¿Deseas eliminar esta imagen?")) return;
                      const res = await fetch(`/api/media/${m.id}`, { method: "DELETE" });
                      if (res.ok) load();
                      else { const data = await res.json(); alert(data.error || "Error al eliminar"); }
                    }}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  >
                    ×
                  </button>
                )}
                {inUse && <span className="position-absolute top-0 start-0 badge bg-warning text-dark">En uso</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
