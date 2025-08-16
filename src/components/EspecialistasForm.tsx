"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const especialidadesList = [
  "Medicina interna", "Pediatría", "Nefrología", "Endocrinología",
  "Ortopedia", "Odontología", "Genética", "Nutrición", "Fisioterapia",
  "Psicología", "Manejo del dolor", "Terapia ocupacional",
];

type FormState = {
  nombre: string;
  especialidad: string;
  ubicacion: string;
  telefono: string;
  correo: string;
  hospital: string;
  comoConocieron: string;
  perfilUrl: string;
};

export default function EspecialistasForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormState>({
    nombre: "", especialidad: "", ubicacion: "", telefono: "",
    correo: "", hospital: "", comoConocieron: "", perfilUrl: ""
  });

  // Guardamos el archivo real aquí
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFotoFile(file);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fotoFile) {
      toast.error("Falta la foto");
      return;
    }

    try {
      const fd = new FormData();
      // Campos de texto
      Object.entries(formData).forEach(([key, value]) => fd.append(key, value));
      // Archivo
      fd.append("foto", fotoFile);

      const res = await fetch("/api/solicitud-especialista", {
        method: "POST",
        body: fd, // ← IMPORTANTE: sin headers Content-Type
      });

      if (!res.ok) throw new Error("Error al enviar solicitud");

      toast.success("Solicitud enviada correctamente");
      setFormData({
        nombre: "", especialidad: "", ubicacion: "", telefono: "",
        correo: "", hospital: "", comoConocieron: "", perfilUrl: ""
      });
      setFotoFile(null);
      setStep(1);
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar la solicitud");
    }
  };

  return (
    <form onSubmit={step === 3 ? handleSubmit : handleNext}>
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <h3>Datos básicos</h3>
          <div className="mb-3">
            <label>Nombre completo *</label>
            <input className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Especialidad *</label>
            <select className="form-select" name="especialidad" value={formData.especialidad} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              {especialidadesList.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Ubicación *</label>
            <input type="text" className="form-control" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <h3>Contacto y hospital</h3>
          <div className="mb-3">
            <label>Teléfono *</label>
            <input
              type="tel"
              className="form-control"
              name="telefono"
              maxLength={10}
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Correo electrónico *</label>
            <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Hospital *</label>
            <input className="form-control" name="hospital" value={formData.hospital} onChange={handleChange} required />
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <h3>Detalles adicionales</h3>
          <div className="mb-3">
            <label>¿Cómo nos conociste? *</label>
            <input className="form-control" name="comoConocieron" value={formData.comoConocieron} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Foto *</label>
            <input type="file" className="form-control" name="foto" accept="image/*" onChange={handleFileChange} required />
            {/* Si quieres ver el nombre seleccionado:
            {fotoFile && <small className="text-muted">Archivo: {fotoFile.name}</small>} */}
          </div>
          <div className="mb-3">
            <label>Perfil (URL opcional)</label>
            <input className="form-control" name="perfilUrl" value={formData.perfilUrl} onChange={handleChange} />
          </div>
        </motion.div>
      )}

      <div className="d-flex justify-content-between mt-4">
        {step > 1 && (
          <button type="button" className="btn btn-outline-secondary" onClick={handleBack}>
            Atrás
          </button>
        )}
        {step < 3 && (
          <button type="submit" className="btn btn-outline-primary">
            Siguiente
          </button>
        )}
        {step === 3 && (
          <button type="submit" className="btn btn-outline-success">
            Enviar solicitud
          </button>
        )}
      </div>
    </form>
  );
}
