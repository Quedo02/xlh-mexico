"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes, FaTrash, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from "react-toastify";

interface Especialista {
  id: number;
  nombre: string;
  especialidad: string;
  ubicacion: string;
  telefono: string;
  correo: string;
  hospital: string;
  comoConocieron: string;
  foto?: string | null;
  perfilUrl?: string | null;
}

type SortKey = keyof Pick<
  Especialista,
  "nombre" | "especialidad" | "ubicacion" | "telefono" | "correo"
>;
type SortDir = "asc" | "desc";

export default function Directorio() {
  const [especialistas, setEspecialistas] = useState<Especialista[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Especialista>>({});
  const [sortKey, setSortKey] = useState<SortKey>("nombre");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    fetchEspecialistas();
  }, []);

  async function fetchEspecialistas() {
    const res = await fetch("/api/especialistas");
    const data = await res.json();
    setEspecialistas(data);
  }

  function onSort(key: SortKey) {
    const dir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(dir);
    setEspecialistas((prev) =>
      [...prev].sort((a, b) => {
        if (a[key]! < b[key]!) return dir === "asc" ? -1 : 1;
        if (a[key]! > b[key]!) return dir === "asc" ? 1 : -1;
        return 0;
      })
    );
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files[0]) {
      setEditData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function onEditClick(index: number) {
    setEditIndex(index);
    setEditData({ ...especialistas[index] });
  }

  function onCancelEdit() {
    setEditIndex(null);
    setEditData({});
  }

  async function onSave() {
    if (!editData.nombre || !editData.especialidad) {
      toast.error("Faltan campos obligatorios");
      return;
    }

    const formData = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    const res = await fetch(`/api/especialistas/${editData.id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      toast.success("Especialista actualizado");
      fetchEspecialistas();
      setEditIndex(null);
      setEditData({});
    } else {
      toast.error("Error al actualizar");
    }
  }

  async function onDelete(id: number) {
    if (!confirm("¿Seguro que quieres eliminar este especialista?")) return;
    const res = await fetch(`/api/especialistas/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Especialista eliminado");
      fetchEspecialistas();
    } else {
      toast.error("Error al eliminar");
    }
  }

  const Th = ({ label, k }: { label: string; k: SortKey }) => {
    const active = sortKey === k;
    return (
      <th className="text-center" onClick={() => onSort(k)} style={{ cursor: "pointer" }}>
        {label}{" "}
        {active ? (
          sortDir === "asc" ? <FaSortUp /> : <FaSortDown />
        ) : (
          <span style={{ opacity: 0.4 }}>
            <FaSortUp />
          </span>
        )}
      </th>
    );
  };

  return (
    <div className="container mt-4">
      <h2>Directorio de Especialistas</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-primary">
            <tr>
              <Th label="Nombre" k="nombre" />
              <Th label="Especialidad" k="especialidad" />
              <Th label="Ubicación" k="ubicacion" />
              <Th label="Teléfono" k="telefono" />
              <Th label="Correo" k="correo" />
              <th>Foto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialistas.length === 0 && (
              <tr>
                <td colSpan={7}>No hay especialistas registrados.</td>
              </tr>
            )}

            {especialistas.map((e, i) => {
              const isEditing = editIndex === i;
              return (
                <tr key={e.id}>
                  <td>
                    {isEditing ? (
                      <input name="nombre" value={editData.nombre || ""} onChange={onChange} className="form-control" />
                    ) : (
                      e.nombre
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input name="especialidad" value={editData.especialidad || ""} onChange={onChange} className="form-control" />
                    ) : (
                      e.especialidad
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input name="ubicacion" value={editData.ubicacion || ""} onChange={onChange} className="form-control" />
                    ) : (
                      e.ubicacion
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input name="telefono" value={editData.telefono || ""} onChange={onChange} className="form-control" />
                    ) : (
                      e.telefono
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input type="email" name="correo" value={editData.correo || ""} onChange={onChange} className="form-control" />
                    ) : (
                      e.correo
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input type="file" name="foto" accept="image/*" onChange={onChange} className="form-control" />
                    ) : e.foto ? (
                      <img src={e.foto} alt={e.nombre} width={50} height={50} style={{ objectFit: "cover" }} />
                    ) : (
                      "Sin foto"
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button className="btn btn-success btn-sm me-2" onClick={onSave}><FaSave /></button>
                        <button className="btn btn-secondary btn-sm" onClick={onCancelEdit}><FaTimes /></button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => onEditClick(i)}><FaEdit /></button>
                        <button className="btn btn-danger btn-sm" onClick={() => onDelete(e.id)}><FaTrash /></button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
