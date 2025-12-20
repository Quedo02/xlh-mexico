"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    fetch("/api/pacientes")
      .then((res) => res.json())
      .then((data) => {
        setPacientes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openPaciente = async (id: number) => {
    const res = await fetch(`/api/pacientes/${id}`);
    const data = await res.json();
    setSelectedPaciente(data);
    setEditData(data);
    setShowDetail(true);
  };

  const eliminarPaciente = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar a este paciente?")) return;

    try {
      const res = await fetch(`/api/pacientes/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("Paciente eliminado correctamente");
        setPacientes((prev) => prev.filter((p: any) => p.id !== id));
        setShowDetail(false);
      } else {
        toast.error("No se pudo eliminar el paciente");
      }
    } catch (error) {
      toast.error("Error en la red");
    }
  };

  const guardarCambios = async () => {
    try {
      const res = await fetch(`/api/pacientes/${selectedPaciente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        toast.success("Paciente actualizado correctamente");

        // Actualiza lista general
        setPacientes((prev) =>
          prev.map((p) => (p.id === selectedPaciente.id ? editData : p))
        );

        setSelectedPaciente(editData);
        setEditMode(false);
      } else {
        toast.error("No se pudo actualizar el paciente");
      }
    } catch (error) {
      toast.error("Error en la red");
    }
  };

  if (loading) return (
    <div className="dashboard-container loading-state">
      Cargando pacientes...
    </div>
  );

  return (
    <div className="dashboard-container" style={{ maxWidth: "1400px" }}>
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Pacientes Registrados</h1>
        <p className="dashboard-subtitle">
          {pacientes.length} paciente{pacientes.length !== 1 ? "s" : ""} en el sistema
        </p>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="table-responsive" style={{ minWidth: "700px" }}>
            <thead className="table-header">
              <tr>
                <th className="table-th">Nombre</th>
                <th className="table-th">Edad</th>
                <th className="table-th">Residencia</th>
                <th className="table-th">Email</th>
                <th className="table-th table-th-center" style={{ width: "120px" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id} className="table-row">
                  <td className="table-td">
                    <span className="table-cell-name">{p.nombre}</span>
                  </td>
                  <td className="table-td">
                    <span className="table-cell-text">{p.edad}</span>
                  </td>
                  <td className="table-td">
                    <span className="table-cell-text">{p.residencia}</span>
                  </td>
                  <td className="table-td">
                    <span className="table-cell-email">{p.email}</span>
                  </td>
                  <td className="table-td text-center">
                    <button
                      className="btn-view-patient"
                      onClick={() => openPaciente(p.id)}
                    >
                      Ver más
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {showDetail && selectedPaciente && (
        <>
          {/* Overlay */}
          <div 
            className="panel-overlay"
            onClick={() => {
              setShowDetail(false);
              setEditMode(false);
            }}
          />

          {/* Panel */}
          <div className="detail-panel">
            {/* Header */}
            <div className="panel-header">
              <button
                className="btn-close-panel"
                onClick={() => {
                  setShowDetail(false);
                  setEditMode(false);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cerrar
              </button>
              <h2 className="panel-title">Expediente del Paciente</h2>
            </div>

            {/* Actions */}
            {!editMode && (
              <div className="actions-grid">
                <a
                  href={`https://wa.me/${selectedPaciente.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-contact"
                >
                  💬 WhatsApp
                </a>
                <a
                  href={`mailto:${selectedPaciente.email}`}
                  className="btn-contact"
                >
                  ✉️ Email
                </a>
                <a
                  href={`tel:${selectedPaciente.telefono}`}
                  className="btn-contact"
                >
                  📞 Llamar
                </a>
                <button
                  onClick={() => setEditMode(true)}
                  className="btn-edit-patient"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminarPaciente(selectedPaciente.id)}
                  className="btn-delete-patient"
                >
                  🗑️ Eliminar Paciente
                </button>
              </div>
            )}

            {/* Edit Mode */}
            {editMode ? (
              <div className="patient-section">
                <h3 className="info-section-title">Editar Información</h3>

                {[
                  { key: "nombre", label: "Nombre" },
                  { key: "sexo", label: "Sexo" },
                  { key: "edad", label: "Edad" },
                  { key: "residencia", label: "Residencia" },
                  { key: "telefono", label: "Teléfono" },
                  { key: "email", label: "Email" },
                  { key: "diagnosticoConfirmado", label: "Diagnóstico Confirmado" },
                  { key: "origenDiagnostico", label: "Origen del Diagnóstico" },
                  { key: "familiarDiagnostico", label: "Familiar Diagnosticado" },
                  { key: "tratamiento", label: "Tratamiento" },
                  { key: "especialidades", label: "Especialidades" },
                  { key: "medico", label: "Médico" },
                  { key: "especialidadMedico", label: "Especialidad del Médico" },
                  { key: "telefonoMedico", label: "Teléfono del Médico" },
                  { key: "institucion", label: "Institución" },
                  { key: "seguridadSocial", label: "Seguridad Social" },
                ].map(({ key, label }) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label}</label>
                    <input
                      value={editData[key] || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, [key]: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>
                ))}

                <button
                  onClick={guardarCambios}
                  className="btn-save-changes"
                >
                  Guardar Cambios
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="btn-cancel-edit"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              /* Information Sections */
              <div className="patient-section">
                
                {/* Personal Info */}
                <section>
                  <h3 className="info-section-title">Información Personal</h3>
                  <div className="info-fields">
                    <div>
                      <span className="field-label">Nombre</span>
                      <p className="field-value">{selectedPaciente.nombre}</p>
                    </div>
                    <div className="info-grid-2col">
                      <div>
                        <span className="field-label">Sexo</span>
                        <p className="field-value">{selectedPaciente.sexo}</p>
                      </div>
                      <div>
                        <span className="field-label">Edad</span>
                        <p className="field-value">{selectedPaciente.edad} años</p>
                      </div>
                    </div>
                    <div>
                      <span className="field-label">Fecha de nacimiento</span>
                      <p className="field-value">
                        {new Date(selectedPaciente.fechaNacimiento).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="field-label">Residencia</span>
                      <p className="field-value">{selectedPaciente.residencia}</p>
                    </div>
                    <div className="info-grid-2col">
                      <div>
                        <span className="field-label">Teléfono</span>
                        <p className="field-value-link">{selectedPaciente.telefono}</p>
                      </div>
                      <div>
                        <span className="field-label">Email</span>
                        <p className="field-value-link">{selectedPaciente.email}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Medical Info */}
                <section>
                  <h3 className="info-section-title">Información Médica</h3>
                  <div className="info-fields">
                    <div>
                      <span className="field-label">Diagnóstico confirmado</span>
                      <p className="field-value">
                        {selectedPaciente.diagnosticoConfirmado ? "Sí" : "No"}
                      </p>
                    </div>
                    <div>
                      <span className="field-label">Origen del diagnóstico</span>
                      <p className="field-value">{selectedPaciente.origenDiagnostico || "—"}</p>
                    </div>
                    <div>
                      <span className="field-label">Familiar diagnosticado</span>
                      <p className="field-value">{selectedPaciente.familiarDiagnostico || "—"}</p>
                    </div>
                    <div>
                      <span className="field-label">Tratamiento</span>
                      <p className="field-value">{selectedPaciente.tratamiento || "—"}</p>
                    </div>
                    <div>
                      <span className="field-label">Especialidades</span>
                      <p className="field-value">{selectedPaciente.especialidades || "—"}</p>
                    </div>
                  </div>
                </section>

                {/* Doctor Info */}
                <section>
                  <h3 className="info-section-title">Médico Responsable</h3>
                  <div className="info-fields">
                    <div>
                      <span className="field-label">Médico</span>
                      <p className="field-value">{selectedPaciente.medico}</p>
                    </div>
                    <div>
                      <span className="field-label">Especialidad</span>
                      <p className="field-value">{selectedPaciente.especialidadMedico}</p>
                    </div>
                    <div>
                      <span className="field-label">Teléfono del médico</span>
                      <p className="field-value-link">{selectedPaciente.telefonoMedico}</p>
                    </div>
                    <div>
                      <span className="field-label">Institución</span>
                      <p className="field-value">{selectedPaciente.institucion || "—"}</p>
                    </div>
                    <div>
                      <span className="field-label">Seguridad Social</span>
                      <p className="field-value">{selectedPaciente.seguridadSocial}</p>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="panel-footer">
                  <p className="panel-footer-text">
                    Registrado el: {new Date(selectedPaciente.creadoEn).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}