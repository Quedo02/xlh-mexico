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
      <th className={`table-th table-th-sortable`} onClick={() => onSort(k)}>
        <div className="table-th-sort">
          {label}
          {active ? (
            sortDir === "asc" ? (
              <FaSortUp style={{ color: "#3c99ba" }} />
            ) : (
              <FaSortDown style={{ color: "#3c99ba" }} />
            )
          ) : (
            <FaSortUp style={{ opacity: 0.2, fontSize: "0.75rem" }} />
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Directorio de Especialistas</h1>
        <p className="dashboard-subtitle">
          Gestiona la información de los especialistas registrados
        </p>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="table-responsive">
            <thead className="table-header">
              <tr>
                <Th label="Nombre" k="nombre" />
                <Th label="Especialidad" k="especialidad" />
                <Th label="Ubicación" k="ubicacion" />
                <Th label="Teléfono" k="telefono" />
                <Th label="Correo" k="correo" />
                <th className="table-th">Foto</th>
                <th className="table-th table-th-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {especialistas.length === 0 && (
                <tr>
                  <td colSpan={7} className="table-empty">
                    No hay especialistas registrados
                  </td>
                </tr>
              )}

              {especialistas.map((e, i) => {
                const isEditing = editIndex === i;
                return (
                  <tr key={e.id} className="table-row">
                    <td className="table-td">
                      {isEditing ? (
                        <input 
                          name="nombre" 
                          value={editData.nombre || ""} 
                          onChange={onChange} 
                          className="input-minimal"
                          placeholder="Nombre completo"
                        />
                      ) : (
                        <span className="table-cell-name">{e.nombre}</span>
                      )}
                    </td>
                    <td className="table-td">
                      {isEditing ? (
                        <input 
                          name="especialidad" 
                          value={editData.especialidad || ""} 
                          onChange={onChange} 
                          className="input-minimal"
                          placeholder="Especialidad"
                        />
                      ) : (
                        <span className="table-cell-text">{e.especialidad}</span>
                      )}
                    </td>
                    <td className="table-td">
                      {isEditing ? (
                        <input 
                          name="ubicacion" 
                          value={editData.ubicacion || ""} 
                          onChange={onChange} 
                          className="input-minimal"
                          placeholder="Ciudad, Estado"
                        />
                      ) : (
                        <span className="table-cell-text">{e.ubicacion}</span>
                      )}
                    </td>
                    <td className="table-td">
                      {isEditing ? (
                        <input 
                          name="telefono" 
                          value={editData.telefono || ""} 
                          onChange={onChange} 
                          className="input-minimal"
                          placeholder="Teléfono"
                        />
                      ) : (
                        <span className="table-cell-text">{e.telefono}</span>
                      )}
                    </td>
                    <td className="table-td">
                      {isEditing ? (
                        <input 
                          type="email" 
                          name="correo" 
                          value={editData.correo || ""} 
                          onChange={onChange} 
                          className="input-minimal"
                          placeholder="correo@ejemplo.com"
                        />
                      ) : (
                        <span className="table-cell-email">{e.correo}</span>
                      )}
                    </td>
                    <td className="table-td">
                      {isEditing ? (
                        <input 
                          type="file" 
                          name="foto" 
                          accept="image/*" 
                          onChange={onChange} 
                          className="input-minimal"
                          style={{ fontSize: "0.8rem" }}
                        />
                      ) : e.foto ? (
                        <img 
                          src={e.foto} 
                          alt={e.nombre} 
                          className="table-avatar"
                        />
                      ) : (
                        <span className="table-cell-empty">Sin foto</span>
                      )}
                    </td>
                    <td className="table-td">
                      <div className="table-actions">
                        {isEditing ? (
                          <>
                            <button 
                              className="btn-icon btn-save" 
                              onClick={onSave}
                              title="Guardar"
                            >
                              <FaSave />
                            </button>
                            <button 
                              className="btn-icon btn-cancel" 
                              onClick={onCancelEdit}
                              title="Cancelar"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="btn-icon btn-edit" 
                              onClick={() => onEditClick(i)}
                              title="Editar"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="btn-icon btn-delete" 
                              onClick={() => onDelete(e.id)}
                              title="Eliminar"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer info */}
      {especialistas.length > 0 && (
        <div className="table-footer">
          Mostrando {especialistas.length} especialista{especialistas.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}