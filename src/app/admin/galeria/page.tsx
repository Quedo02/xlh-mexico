"use client";
import { useEffect, useState } from "react";

type Media = { id:number; url:string; alt?:string; caption?:string };
type Slot = { id:number; slot:string; mediaId?:number|null; alt?:string|null; caption?:string|null; media?:Media|null };

export default function AdminGaleria() {
  const [medios, setMedios] = useState<Media[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [url, setUrl] = useState(""); // alta rápida por URL
  const [slotName, setSlotName] = useState("");
    const [slotAlt, setSlotAlt] = useState("");
    const [slotCaption, setSlotCaption] = useState("");
    const [slotMediaId, setSlotMediaId] = useState<number | "">("");

  async function load() {
    const m = await fetch("/api/media", { cache: "no-store" }).then(r => r.json());
    setMedios(m.data || []);
    const s = await fetch("/api/media/slots", { cache: "no-store" }).then(r => r.json());
    setSlots(s.data || []);
  }

  useEffect(() => { load(); }, []);

  async function addMedia(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ url }),
    });
    setUrl("");
    load();
  }

  async function saveSlot(slot: string, mediaId?: number|null, alt?: string, caption?: string) {
    await fetch("/api/media/slots", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ slot, mediaId, alt, caption }),
    });
    load();
  }

  async function createSlot(e: React.FormEvent) {
  e.preventDefault();
  if (!slotName) return;
  await fetch("/api/media/slots", {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({
      slot: slotName.trim(),
      mediaId: slotMediaId === "" ? null : Number(slotMediaId),
      alt: slotAlt || undefined,
      caption: slotCaption || undefined,
    }),
  });
  setSlotName(""); setSlotAlt(""); setSlotCaption(""); setSlotMediaId("");
  load();
}

  return (
    <div className="container py-4">
        <div className="border rounded p-3 mb-3">
  <h6 className="mb-3">Crear nuevo slot</h6>
  <form className="row g-2 align-items-end" onSubmit={createSlot}>
    <div className="col-md-3">
      <label className="form-label">Nombre del slot</label>
      <input className="form-control" placeholder="ej. nosotros.hero"
             value={slotName} onChange={e=>setSlotName(e.target.value)} required />
    </div>
    <div className="col-md-3">
      <label className="form-label">Media</label>
      <select className="form-select" value={slotMediaId}
              onChange={e=>setSlotMediaId(e.target.value === "" ? "" : Number(e.target.value))}>
        <option value="">(sin imagen)</option>
        {medios.map(m => (
          <option key={m.id} value={m.id}>{m.id} — {m.url}</option>
        ))}
      </select>
    </div>
    <div className="col-md-2">
      <label className="form-label">Alt</label>
      <input className="form-control" value={slotAlt} onChange={e=>setSlotAlt(e.target.value)} />
    </div>
    <div className="col-md-3">
      <label className="form-label">Caption</label>
      <input className="form-control" value={slotCaption} onChange={e=>setSlotCaption(e.target.value)} />
    </div>
    <div className="col-md-1">
      <button type="submit" className="btn btn-primary w-100">Crear</button>
    </div>
  </form>

  <div className="small text-muted mt-2">
    Sugerencias de slots: <code>nosotros.hero</code>, <code>nosotros.historia</code>, <code>nosotros.equipo.1</code>, <code>nosotros.equipo.2</code>, <code>nosotros.equipo.3</code>
  </div>
</div>

      <h2 className="mb-3">Galería (Biblioteca & Ubicaciones)</h2>

      {/* Biblioteca */}
      <div className="card mb-4">
        <div className="card-header"><strong>Biblioteca de medios</strong></div>
        <div className="card-body">
          <form className="row g-2 mb-3" onSubmit={addMedia}>
            <div className="col-md-8">
              <input className="form-control" placeholder="Pega una URL de imagen (temporal)"
                     value={url} onChange={e=>setUrl(e.target.value)} />
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary w-100" type="submit">Agregar</button>
            </div>
          </form>

          <div className="row g-3">
            {medios.map(m => (
              <div key={m.id} className="col-6 col-md-3">
                <div className="border rounded p-2 h-100">
                  <img src={m.url} alt={m.alt || ""} style={{width:"100%", height:120, objectFit:"cover"}} />
                  <div className="small mt-2 text-truncate">{m.url}</div>
                </div>
              </div>
            ))}
            {medios.length === 0 && <p className="text-muted">No hay medios aún.</p>}
          </div>
        </div>
      </div>

      {/* Ubicaciones */}
      <div className="card">
        <div className="card-header"><strong>Ubicaciones (slots)</strong></div>
        <div className="card-body">
          {slots.length === 0 && (
            <p className="text-muted">
              No hay slots creados. Crea alguno posteando: <code>{`{ "slot": "home.hero", "mediaId": 1 }`}</code> a <code>/api/media/slots</code>
              {" "}o crea un pequeño formulario para slots nuevos.
            </p>
          )}
          {slots.map(s => (
            <div key={s.id} className="row g-2 align-items-center border rounded p-2 mb-2">
              <div className="col-md-3">
                <div className="fw-semibold">{s.slot}</div>
                <div className="text-muted small">ID actual: {s.mediaId ?? "—"}</div>
              </div>
              <div className="col-md-3">
                <select className="form-select" value={s.mediaId ?? ""} onChange={e => {
                  const v = e.target.value ? Number(e.target.value) : null;
                  saveSlot(s.slot, v, s.alt ?? undefined, s.caption ?? undefined);
                }}>
                  <option value="">(sin imagen)</option>
                  {medios.map(m => <option key={m.id} value={m.id}>{m.id} — {new URL(m.url).hostname}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <input className="form-control" placeholder="Alt (override)" defaultValue={s.alt ?? ""} 
                  onBlur={e => saveSlot(s.slot, s.mediaId ?? null, e.target.value, s.caption ?? undefined)} />
              </div>
              <div className="col-md-3">
                <input className="form-control" placeholder="Caption (override)" defaultValue={s.caption ?? ""} 
                  onBlur={e => saveSlot(s.slot, s.mediaId ?? null, s.alt ?? undefined, e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
