"use client";

import { useEffect, useState, useRef } from "react";

type Media = { id: number; url: string; alt?: string; caption?: string };
type SlotMedia = { id: number; mediaId: number; media: Media; orden: number };
type MediaSlot = { id: number; slot: string; alt?: string; caption?: string; slotMedias: SlotMedia[] };

export default function AdminGaleria() {
  const [medios, setMedios] = useState<Media[]>([]);
  const [slots, setSlots] = useState<MediaSlot[]>([]);
  const [slotName, setSlotName] = useState("");
  const [slotAlt, setSlotAlt] = useState("");
  const [slotCaption, setSlotCaption] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | "">("");
  const [selectedMediaId, setSelectedMediaId] = useState<number | "">("");
  const [selectedHomeSlot, setSelectedHomeSlot] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);

  // Cargar slots y medios
  const load = async () => {
    const medias = await fetch("/api/media", { cache: "no-store" }).then(r => r.json());
    setMedios(medias.data || []);

    const s = await fetch("/api/media/slots", { cache: "no-store" }).then(r => r.json());
    setSlots(s.data || []);
  };

  useEffect(() => { 
    load();
    fetch("/api/config/homeSlot")
      .then(res => res.json())
      .then(data => setSelectedHomeSlot(data.slot || ""));
  }, []);

  // Subir imagen desde archivo
  const onSubmitMedia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const res = await fetch("/api/media", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const newItem: Media = (await res.json()).data;
      setMedios(prev => [newItem, ...prev]);
      formRef.current.reset();
    }
  };

  // Crear slot
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

  // Asignar media a slot
  const addMediaToSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlot === "" || selectedMediaId === "") return;

    await fetch("/api/media/slotMedia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId: selectedSlot, mediaId: selectedMediaId }),
    });

    setSelectedSlot(""); setSelectedMediaId("");
    load();
  };

  // Eliminar imagen de slot
  const deleteMediaFromSlot = async (slotMediaId: number) => {
    await fetch("/api/media/slotMedia", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotMediaId }),
    });
    load();
  };

  // Eliminar slot
  const deleteSlot = async (slotId: number) => {
    if (!confirm("¿Deseas eliminar este slot y todas sus imágenes?")) return;
    await fetch("/api/media/slots", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId }),
    });
    load();
  };

  // Guardar slot para home
  const updateHomeSlot = async () => {
    if (!selectedHomeSlot) return;
    const res = await fetch("/api/config/homeSlot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: selectedHomeSlot }),
    });
    if (res.ok) alert("Slot de home actualizado");
    else alert("Error al actualizar");
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
            <input className="form-control" placeholder="Alt" value={slotAlt} onChange={e => setSlotAlt(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Caption" value={slotCaption} onChange={e => setSlotCaption(e.target.value)} />
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
            <input type="text" name="alt" placeholder="Alt" className="form-control" />
          </div>
          <div className="col-md-3">
            <input type="text" name="caption" placeholder="Caption" className="form-control" />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Subir</button>
          </div>
        </form>
      </div>

      {/* Seleccionar slot para Home */}
      <div className="border rounded p-3 mb-3">
        <h6 className="mb-2">Seleccionar slot para Home</h6>
        <div className="row g-2 align-items-end">
          <div className="col-md-6">
            <select
              className="form-select"
              value={selectedHomeSlot}
              onChange={e => setSelectedHomeSlot(e.target.value)}
            >
              <option value="">Selecciona un slot</option>
              {slots.map(s => (
                <option key={s.id} value={s.slot}>{s.slot}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={updateHomeSlot}
            >
              Guardar
            </button>
          </div>
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
              {medios.map(m => <option key={m.id} value={m.id}>{m.id} - {m.alt || "Sin alt"}</option>)}
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
                <div className="fw-bold">{s.slot}</div>
                <button className="btn btn-sm btn-danger" onClick={() => deleteSlot(s.id)}>Eliminar slot</button>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {s.slotMedias.map(sm => (
                  <div key={sm.id} className="border rounded p-1 position-relative">
                    <img src={sm.media.url} alt={sm.media.alt || ""} style={{ width: 100, height: 80, objectFit: "cover" }} />
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
              <div key={m.id} className="border rounded p-1 position-relative">
                <img src={m.url} alt={m.alt || ""} style={{ width: 100, height: 80, objectFit: "cover" }} />
                {!inUse && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm("¿Deseas eliminar esta imagen?")) return;
                      const res = await fetch(`/api/media/${m.id}`, { method: "DELETE" });
                      if (res.ok) load();
                      else {
                        const data = await res.json();
                        alert(data.error || "Error al eliminar");
                      }
                    }}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  >
                    ×
                  </button>
                )}
                {inUse && (
                  <span className="position-absolute top-0 start-0 badge bg-warning text-dark">En uso</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
