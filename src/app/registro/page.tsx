"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

const estadosMexico = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
  "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
  "Zacatecas"
];

type FormData = {
  nombre: string;
  sexo: string;
  fechaNacimiento: string;
  edad: string;
  residencia: string;
  telefono: string;
  email: string;
  origenDiagnostico: string;
  familiarDiagnostico: string;
  seguridadSocial: string;
  institucion: string;
  medico: string;
  especialidadMedico: string;
  telefonoMedico: string;
  diagnosticoConfirmado: string;
  tratamiento: string;
  especialidades: string[];
};

export default function Registro() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "", sexo: "", fechaNacimiento: "", edad: "", residencia: "", telefono: "",
    email: "", origenDiagnostico: "", familiarDiagnostico: "", seguridadSocial: "",
    institucion: "", medico: "", especialidadMedico: "", telefonoMedico: "", diagnosticoConfirmado: "",
    tratamiento: "", especialidades: []
  });

  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    if (name === "especialidades" && type === "checkbox") {
      let newEspecialidades = [...formData.especialidades];
      if (checked) {
        newEspecialidades.push(value);
      } else {
        newEspecialidades = newEspecialidades.filter((esp) => esp !== value);
      }
      setFormData({ ...formData, especialidades: newEspecialidades });
    } else if (name === "edad") {
      if (value === "" || /^\d{0,2}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "telefono" || name === "telefonoMedico") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    if (step === 1) {
      return (
        formData.nombre.trim() !== "" &&
        formData.sexo !== "" &&
        formData.fechaNacimiento !== "" &&
        formData.edad !== "" &&
        Number(formData.edad) > 0 &&
        formData.residencia.trim() !== ""
      );
    }
    if (step === 2) {
      return (
        formData.telefono.length === 10 &&
        formData.email.trim() !== "" &&
        formData.seguridadSocial.trim() !== "" &&
        formData.medico.trim() !== "" &&
        formData.especialidadMedico.trim() !== "" &&
        formData.telefonoMedico.length === 10 &&
        formData.diagnosticoConfirmado !== ""
      );
    }
    return true;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    } else {
      toast.error("Completa los campos obligatorios antes de continuar.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) {
      toast.error("Completa los campos obligatorios antes de enviar.");
      return;
    }

    try {
      const res = await fetch("/api/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          edad: Number(formData.edad),
          fechaNacimiento: formData.fechaNacimiento,
          diagnosticoConfirmado: formData.diagnosticoConfirmado === "Sí",
          especialidades: formData.especialidades,
        }),
      });

      if (!res.ok) throw new Error("Error al enviar datos");

      toast.success("Registro enviado correctamente");
      setFormData({
        nombre: "", sexo: "", fechaNacimiento: "", edad: "", residencia: "", telefono: "",
        email: "", origenDiagnostico: "", familiarDiagnostico: "", seguridadSocial: "",
        institucion: "", medico: "", especialidadMedico: "", telefonoMedico: "", diagnosticoConfirmado: "",
        tratamiento: "", especialidades: []
      });
      setStep(1);
    } catch (error) {
      toast.error("Error al enviar el formulario");
      console.error(error);
    }
  };

    // Limitar fechas entre hace 120 años y hoy
  const maxDate = new Date().toISOString().split("T")[0];

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <>
      <HeroSection
        title="Registro de Pacientes XLH"
        subtitle="Formulario oficial de XLH y Otros Raquitismos México"
        sectionName="registro"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />
      <main className="bg-formulario">

        <div className="container">
          <div className="container py-5">
            <div className="card-formulario">
              <form
                onSubmit={step === 3 ? handleSubmit : handleNext}
                className="formulario-registro"
              >
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="mb-4 text-center">Datos personales</h2>

                    <div className="mb-3">
                      <p className="text-danger mb-3 text-left fw-bold">
                        * Los campos marcados con asterisco son obligatorios
                      </p>
                      <label className="form-label" htmlFor="nombre">
                        Nombre completo del paciente <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-person-fill"></i>
                        </span>
                        <input
                          id="nombre"
                          name="nombre"
                          className="form-control"
                          required
                          value={formData.nombre}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="sexo">
                        Sexo <span className="text-danger">*</span>
                      </label>
                      <select
                        id="sexo"
                        name="sexo"
                        className="form-select"
                        required
                        value={formData.sexo}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option>Femenino</option>
                        <option>Masculino</option>
                        <option>Prefiero no responder</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="fechaNacimiento">
                        Fecha de nacimiento <span className="text-danger">*</span>
                      </label>
                      <input
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        className="form-control"
                        required
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        max={maxDate}
                        min={minDateStr}
                        onKeyDown={(e) => e.preventDefault()}
                        onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="edad">
                        Edad actual <span className="text-danger">*</span>
                      </label>
                      <input
                        id="edad"
                        name="edad"
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={2}
                        className="form-control"
                        required
                        value={formData.edad}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="residencia">
                        Estado de residencia <span className="text-danger">*</span>
                      </label>
                      <select
                        id="residencia"
                        name="residencia"
                        className="form-select"
                        required
                        value={formData.residencia}
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
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    >
                    
                    <h2 className="mb-4 text-center">Datos médicos y diagnóstico</h2>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="telefono">
                        Número de teléfono <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-telephone-fill"></i>
                        </span>
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
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Correo electrónico <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-control"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="origenDiagnostico">
                        Origen del diagnóstico
                      </label>
                      <select
                        id="origenDiagnostico"
                        name="origenDiagnostico"
                        className="form-select"
                        value={formData.origenDiagnostico}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option>Antecedentes familiares</option>
                        <option>Espontáneo</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="familiarDiagnostico">
                        Familiar con antecedente (si aplica)
                      </label>
                      <input
                        id="familiarDiagnostico"
                        name="familiarDiagnostico"
                        className="form-control"
                        value={formData.familiarDiagnostico}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="seguridadSocial">
                        Seguridad social <span className="text-danger">*</span>
                      </label>
                      <select
                        id="seguridadSocial"
                        name="seguridadSocial"
                        className="form-select"
                        required
                        value={formData.seguridadSocial}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="IMSS">IMSS</option>
                        <option value="ISSSTE">ISSSTE</option>
                        <option value="Particular">Particular</option>
                        <option value="IMSS Bienestar">IMSS Bienestar</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="institucion">
                        Institución tratante
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-building"></i>
                        </span>
                        <input
                          id="institucion"
                          name="institucion"
                          className="form-control"
                          value={formData.institucion}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="medico">
                        Nombre del médico <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-person-badge-fill"></i>
                        </span>
                        <input
                          id="medico"
                          name="medico"
                          className="form-control"
                          required
                          value={formData.medico}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="especialidadMedico">
                        Especialidad del médico <span className="text-danger">*</span>
                      </label>
                      <input
                        id="especialidadMedico"
                        name="especialidadMedico"
                        className="form-control"
                        required
                        value={formData.especialidadMedico}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="telefonoMedico">
                        Teléfono del médico <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-telephone-fill"></i>
                        </span>
                        <input
                          id="telefonoMedico"
                          name="telefonoMedico"
                          type="tel"
                          pattern="\d{10}"
                          inputMode="numeric"
                          maxLength={10}
                          className="form-control"
                          required
                          value={formData.telefonoMedico}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="diagnosticoConfirmado">
                        ¿Diagnóstico confirmado? <span className="text-danger">*</span>
                      </label>
                      <select
                        id="diagnosticoConfirmado"
                        name="diagnosticoConfirmado"
                        className="form-select"
                        required
                        value={formData.diagnosticoConfirmado}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option>Sí</option>
                        <option>No</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                  >

                    <h2 className="mb-4 text-center">Tratamiento y especialidades</h2>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="tratamiento">
                        ¿Qué tratamiento recibe?
                      </label>
                      <input
                        id="tratamiento"
                        name="tratamiento"
                        className="form-control"
                        value={formData.tratamiento}
                        onChange={handleChange}
                      />
                    </div>

                    <fieldset>
                      <legend>Especialidades que consulta:</legend>
                      <div className="row">
                        {especialidadesList.map((esp) => (
                          <div className="col-md-4" key={esp}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="especialidades"
                                id={esp}
                                value={esp}
                                checked={formData.especialidades.includes(esp)}
                                onChange={handleChange}
                              />
                              <label className="form-check-label" htmlFor={esp}>
                                {esp}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </motion.div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  {step > 1 && (
                    <button type="button" className="btn btn-outline-cyan" onClick={() => setStep(step - 1)}>
                      Atrás
                    </button>
                  )}
                  {step < 3 && (
                    <button type="submit" className="btn btn-outline-rosa-mexicano">
                      Siguiente
                    </button>
                  )}
                  {step === 3 && (
                    <button type="submit" className="btn btn-outline-azul-marino">
                      Enviar registro
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </main>
    </>
  );
}
