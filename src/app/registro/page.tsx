"use client";

import HeroSection from "@/components/HeroSection";
import { useRegistroForm } from "@/hooks/useRegistroForm";

export default function Registro() {
  const { formData, handleChange, handleSubmit } = useRegistroForm();

  return (
    <>
      <HeroSection
        title="Registro de Pacientes XLH"
        subtitle="Formulario oficial de XLH y Otros Raquitismos México"
        backgroundImage="/img/receta.jpg"
        overlayColor="rgba(112, 8, 114, 0.6)"
      />
      <main className="container py-5">
        <h2 className="text-center mb-4">Formulario de Registro</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre completo del paciente *</label>
            <input name="nombre" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Sexo *</label>
            <select name="sexo" className="form-select" required onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Prefiero no responder</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Fecha de nacimiento *</label>
            <input name="fechaNacimiento" type="date" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Edad actual *</label>
            <input name="edad" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Lugar de residencia *</label>
            <input name="residencia" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Número de teléfono *</label>
            <input name="telefono" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Correo electrónico *</label>
            <input name="email" type="email" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Origen del diagnóstico</label>
            <select name="origenDiagnostico" className="form-select" onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option>Antecedentes familiares</option>
              <option>Espontáneo</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Familiar con antecedente (si aplica)</label>
            <input name="familiarDiagnostico" className="form-control" onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Seguridad social *</label>
            <input name="seguridadSocial" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Institución tratante</label>
            <input name="institucion" className="form-control" onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Nombre del médico *</label>
            <input name="medico" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Especialidad del médico *</label>
            <input name="especialidadMedico" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Teléfono del médico *</label>
            <input name="telefonoMedico" className="form-control" required onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">¿Diagnóstico confirmado? *</label>
            <select name="diagnosticoConfirmado" className="form-select" required onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">¿Qué tratamiento recibe?</label>
            <input name="tratamiento" className="form-control" onChange={handleChange} />
          </div>

          <div className="col-12">
            <label className="form-label">Especialidades que consulta:</label>
            <div className="row">
              {[
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
              ].map((especialidad) => (
                <div key={especialidad} className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="especialidades"
                      value={especialidad}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">{especialidad}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-outline-morado">
              Enviar registro
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
