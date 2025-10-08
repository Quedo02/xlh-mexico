"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const especialidadesList = [
  "Medicina interna", "Pediatría", "Nefrología", "Endocrinología",
  "Ortopedia", "Odontología", "Genética", "Nutrición", "Fisioterapia",
  "Psicología", "Manejo del dolor", "Terapia ocupacional",
];

export default function EspecialistasForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    especialidad: "",
    ubicacion: "",
    telefono: "",
    correo: "",
    hospital: "",
    comoConocieron: "",
    foto: "", // Será base64 o URL
    perfilUrl: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, foto: reader.result as string });
    };
    reader.readAsDataURL(file); // Convierte el archivo a base64
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/solicitud-especialista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar solicitud");

      toast.success("Solicitud enviada correctamente");
      setFormData({
        nombre: "",
        especialidad: "",
        ubicacion: "",
        telefono: "",
        correo: "",
        hospital: "",
        comoConocieron: "",
        foto: "",
        perfilUrl: ""
      });
      setStep(1);
    } catch (error) {
      toast.error("Error al enviar la solicitud");
      console.error(error);
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
            <input type="tel" className="form-control" name="telefono" maxLength={10} value={formData.telefono} onChange={handleChange} required />
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
