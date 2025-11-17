"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, ImageIcon, Folder, Settings, Trash2, Plus, Save } from "lucide-react";

type Media = { id: number; url: string; alt?: string; caption?: string };
type SlotMedia = { id: number; mediaId: number; media: Media };
type MediaSlot = { id: number; slot: string; alt?: string; caption?: string; slotMedias: SlotMedia[] };

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
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-dark mb-2">Administrador de Galería</h1>
          <p className="text-muted">Gestiona tus imágenes y slots de manera eficiente</p>
        </div>

        {/* Crear slot */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                <Folder className="text-primary" size={24} />
              </div>
              <h5 className="mb-0 fw-semibold">Crear nuevo slot</h5>
            </div>
            <form className="row g-3" onSubmit={createSlot}>
              <div className="col-md-4">
                <label className="form-label text-muted small">Nombre del slot</label>
                <input 
                  className="form-control border-0 bg-light" 
                  placeholder="ej. homeCarrusel" 
                  value={slotName} 
                  onChange={e => setSlotName(e.target.value)} 
                  required 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small">Nombre alternativo</label>
                <input 
                  className="form-control border-0 bg-light" 
                  placeholder="Opcional" 
                  value={slotAlt} 
                  onChange={e => setSlotAlt(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small">Descripción</label>
                <input 
                  className="form-control border-0 bg-light" 
                  placeholder="Opcional" 
                  value={slotCaption} 
                  onChange={e => setSlotCaption(e.target.value)} 
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                  <Plus size={18} />
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Subir imagen */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                <Upload className="text-success" size={24} />
              </div>
              <h5 className="mb-0 fw-semibold">Subir imagen</h5>
            </div>
            <form ref={formRef} onSubmit={onSubmitMedia} encType="multipart/form-data" className="row g-3">
              <div className="col-md-5">
                <label className="form-label text-muted small">Seleccionar archivo</label>
                <input 
                  type="file" 
                  name="file" 
                  accept="image/*" 
                  required 
                  className="form-control border-0 bg-light" 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small">Nombre</label>
                <input 
                  type="text" 
                  name="alt" 
                  placeholder="ej. Banner principal" 
                  className="form-control border-0 bg-light" 
                />
              </div>
              <div className="col-md-2">
                <label className="form-label text-muted small">Descripción</label>
                <input 
                  type="text" 
                  name="caption" 
                  placeholder="Opcional" 
                  className="form-control border-0 bg-light" 
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2">
                  <Upload size={18} />
                  Subir
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Asignar imagen a slot */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                <ImageIcon className="text-info" size={24} />
              </div>
              <h5 className="mb-0 fw-semibold">Asignar imagen a slot</h5>
            </div>
            <form className="row g-3" onSubmit={addMediaToSlot}>
              <div className="col-md-5">
                <label className="form-label text-muted small">Slot destino</label>
                <select 
                  className="form-select border-0 bg-light" 
                  value={selectedSlot} 
                  onChange={e => setSelectedSlot(Number(e.target.value))}
                >
                  <option value="">Selecciona un slot</option>
                  {slots.map(s => <option key={s.id} value={s.id}>{s.slot}</option>)}
                </select>
              </div>
              <div className="col-md-5">
                <label className="form-label text-muted small">Imagen</label>
                <select 
                  className="form-select border-0 bg-light" 
                  value={selectedMediaId} 
                  onChange={e => setSelectedMediaId(Number(e.target.value))}
                >
                  <option value="">Selecciona una imagen</option>
                  {medios.map(m => <option key={m.id} value={m.id}>{m.alt || "Sin nombre"}</option>)}
                </select>
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-info w-100 d-flex align-items-center justify-content-center gap-2">
                  <Plus size={18} />
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Configurar slots */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                  <Settings className="text-warning" size={24} />
                </div>
                <h5 className="mb-0 fw-semibold">Configurar slots de banners y carrusel</h5>
              </div>
              <button className="btn btn-warning d-flex align-items-center gap-2" onClick={updateConfigSlots}>
                <Save size={18} />
                Guardar configuración
              </button>
            </div>
            <div className="row g-3">
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
                  <div key={item.key} className="col-12">
                    <div className="p-3 bg-light rounded">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <label className="form-label text-dark fw-semibold small mb-2">{item.label}</label>
                          <select
                            className="form-select border-0 shadow-sm"
                            value={selectedConfig[item.key as keyof typeof selectedConfig]}
                            onChange={e => setSelectedConfig(prev => ({ ...prev, [item.key]: e.target.value }))}
                          >
                            <option value="">Selecciona un slot</option>
                            {slots.map(s => <option key={s.id} value={s.slot}>{s.slot}</option>)}
                          </select>
                        </div>
                        {isSingle && slotData?.slotMedias[0] && (
                          <div className="col-md-6 text-end">
                            <img 
                              src={slotData.slotMedias[0].media.url} 
                              alt={slotData.slotMedias[0].media.alt || ""} 
                              className="rounded shadow-sm"
                              style={{ width: 140, height: 90, objectFit: "cover" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Slots y sus imágenes */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-white border-0 p-4">
            <h5 className="mb-0 fw-semibold">Slots y sus imágenes asignadas</h5>
          </div>
          <div className="card-body p-4">
            {slots.map(s => (
              <div key={s.id} className="mb-4 pb-4 border-bottom">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-bold text-dark mb-1">{s.slot}</h6>
                    {s.alt && <p className="text-muted small mb-1">Nombre: {s.alt}</p>}
                    {s.caption && <p className="text-muted small mb-0">Descripción: {s.caption}</p>}
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2" 
                    onClick={() => deleteSlot(s.id)}
                  >
                    <Trash2 size={16} />
                    Eliminar slot
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-3">
                  {s.slotMedias.map(sm => (
                    <div 
                      key={sm.id} 
                      className="position-relative bg-light rounded shadow-sm overflow-hidden" 
                      style={{ width: 140 }}
                    >
                      <img 
                        src={sm.media.url} 
                        alt={sm.media.alt || ""} 
                        className="w-100"
                        style={{ height: 110, objectFit: "cover" }} 
                      />
                      {sm.media.alt && (
                        <div className="p-2 bg-white">
                          <p className="small text-muted mb-0 text-truncate">{sm.media.alt}</p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteMediaFromSlot(sm.id)}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: 28, height: 28, padding: 0 }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {s.slotMedias.length === 0 && (
                    <div className="text-muted fst-italic">No hay imágenes asignadas a este slot</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Biblioteca de medios */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-0 p-4">
            <h5 className="mb-0 fw-semibold">Biblioteca de imágenes</h5>
            <p className="text-muted small mb-0 mt-1">Todas las imágenes disponibles en el sistema</p>
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              {medios.map(m => {
                const inUse = slots.some(s => s.slotMedias.some(sm => sm.mediaId === m.id));
                return (
                  <div key={m.id} className="col-6 col-md-4 col-lg-2">
                    <div className="position-relative bg-light rounded shadow-sm overflow-hidden h-100">
                      <img 
                        src={m.url} 
                        alt={m.alt || ""} 
                        className="w-100"
                        style={{ height: 120, objectFit: "cover" }} 
                      />
                      <div className="p-2 bg-white">
                        {m.alt && <p className="small fw-semibold mb-1 text-truncate">{m.alt}</p>}
                        {m.caption && <p className="small text-muted mb-0 text-truncate">{m.caption}</p>}
                      </div>
                      {!inUse && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (!confirm("¿Deseas eliminar esta imagen?")) return;
                            const res = await fetch(`/api/media/${m.id}`, { method: "DELETE" });
                            if (res.ok) load();
                            else { const data = await res.json(); alert(data.error || "Error al eliminar"); }
                          }}
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 28, height: 28, padding: 0 }}
                        >
                          ×
                        </button>
                      )}
                      {inUse && (
                        <span className="position-absolute top-0 start-0 m-2 badge bg-success">
                          En uso
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}