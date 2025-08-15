"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const estadosMexico = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
  "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
  "Zacatecas"
];

const especialidadesList = [
  "Medicina interna",
  "Pediatría",
  "Nefrología",
  "Endocrinología",
  "Ortopedia",
  "Odontología",
  "Genética",
  "Nutrición",
  "Fisioterapia",
  "Psicología",
  "Manejo del dolor",
  "Terapia ocupacional",
];

const comoConocieronOptions = [
  "Redes sociales",
  "Otro especialista",
  "Evento médico",
  "Página web",
  "Recomendación",
  "Otro"
];

type FormData = {
  nombre: string;
  especialidad: string;
  ubicacion: string;
  telefono: string;
  correo: string;
  hospital: string;
  comoConocieron: string;
  fotoFile?: File | null; // ahora guardamos archivo
  perfilUrl?: string;
};

export default function RegistroEspecialista() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    especialidad: "",
    ubicacion: "",
    telefono: "",
    correo: "",
    hospital: "",
    comoConocieron: "",
    fotoFile: null,
    perfilUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "telefono") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "fotoFile" && type === "file") {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setFormData({ ...formData, fotoFile: target.files[0] });
      } else {
        setFormData({ ...formData, fotoFile: null });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    return (
      formData.nombre.trim() !== "" &&
      formData.especialidad !== "" &&
      formData.ubicacion !== "" &&
      formData.telefono.length === 10 &&
      /^\S+@\S+\.\S+$/.test(formData.correo) &&
      formData.correo.trim() !== "" &&
      formData.hospital.trim() !== "" &&
      formData.comoConocieron !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor completa todos los campos obligatorios correctamente.");
      return;
    }

    try {
      // Usamos FormData para enviar archivo
      const body = new FormData();
      body.append("nombre", formData.nombre);
      body.append("especialidad", formData.especialidad);
      body.append("ubicacion", formData.ubicacion);
      body.append("telefono", formData.telefono);
      body.append("correo", formData.correo);
      body.append("hospital", formData.hospital);
      body.append("comoConocieron", formData.comoConocieron);
      if (formData.fotoFile) {
        body.append("foto", formData.fotoFile);
      }
      if (formData.perfilUrl) {
        body.append("perfilUrl", formData.perfilUrl);
      }

      const res = await fetch("/api/solicitud-especialista", {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error("Error al enviar datos");

      toast.success("Especialista registrado correctamente");
      setFormData({
        nombre: "",
        especialidad: "",
        ubicacion: "",
        telefono: "",
        correo: "",
        hospital: "",
        comoConocieron: "",
        fotoFile: null,
        perfilUrl: "",
      });
    } catch (error) {
      toast.error("Error al enviar el formulario");
      console.error(error);
    }
  };

  return (
    <>
      <main className="bg-formulario container py-5" style={{ maxWidth: "600px" }}>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card shadow p-4"
          encType="multipart/form-data"
        >
          <h2 className="mb-4 text-center">Registro de Especialista</h2>

          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre completo <span className="text-danger">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="form-control"
              required
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          {/* Especialidad */}
          <div className="mb-3">
            <label htmlFor="especialidad" className="form-label">
              Especialidad <span className="text-danger">*</span>
            </label>
            <select
              id="especialidad"
              name="especialidad"
              className="form-select"
              required
              value={formData.especialidad}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {especialidadesList.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>

          {/* Ubicación (Estados) */}
          <div className="mb-3">
            <label htmlFor="ubicacion" className="form-label">
              Estado de residencia <span className="text-danger">*</span>
            </label>
            <select
              id="ubicacion"
              name="ubicacion"
              className="form-select"
              required
              value={formData.ubicacion}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {estadosMexico.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono <span className="text-danger">*</span>
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              pattern="\d{10}"
              inputMode="numeric"
              maxLength={10}
              className="form-control"
              required
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo electrónico <span className="text-danger">*</span>
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              className="form-control"
              required
              value={formData.correo}
              onChange={handleChange}
            />
          </div>

          {/* Hospital */}
          <div className="mb-3">
            <label htmlFor="hospital" className="form-label">
              Hospital o institución <span className="text-danger">*</span>
            </label>
            <input
              id="hospital"
              name="hospital"
              type="text"
              className="form-control"
              required
              value={formData.hospital}
              onChange={handleChange}
            />
          </div>

          {/* Como conocieron */}
          <div className="mb-3">
            <label htmlFor="comoConocieron" className="form-label">
              ¿Cómo conoció la asociación? <span className="text-danger">*</span>
            </label>
            <select
              id="comoConocieron"
              name="comoConocieron"
              className="form-select"
              required
              value={formData.comoConocieron}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {comoConocieronOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Foto */}
          <div className="mb-3">
            <label htmlFor="fotoFile" className="form-label">
              Subir foto (opcional)
            </label>
            <input
              id="fotoFile"
              name="fotoFile"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          {/* Perfil URL (opcional) */}
          <div className="mb-3">
            <label htmlFor="perfilUrl" className="form-label">
              URL de perfil (opcional)
            </label>
            <input
              id="perfilUrl"
              name="perfilUrl"
              type="url"
              className="form-control"
              placeholder="https://ejemplo.com/perfil"
              value={formData.perfilUrl || ""}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Enviar registro
          </button>
        </motion.form>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </main>
    </>
  );
}
