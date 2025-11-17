"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registro from "../registro/page"; // Formulario Pacientes (multistep)
import EspecialistasForm from "@/components/EspecialistasForm"; // Formulario Especialistas

export default function Contacto() {
  const [showPacientes, setShowPacientes] = useState(false);
  const [showEspecialistas, setShowEspecialistas] = useState(false);

  return (
    <>
      <HeroSection
        title="Contáctanos"
        subtitle="Elige la opción que mejor se adapte a ti"
        sectionName="contacto"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <main className="container my-5">
        {/* Sección Pacientes */}
        <section className="container my-5" id="pacientes">
          <div className="row align-items-center shadow rounded p-4 bg-white flex-md-row-reverse">
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Personas con XLH</h2>
              <p>
                Si eres paciente y deseas registrarte en nuestro directorio,
                llena el siguiente formulario oficial.
              </p>
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowPacientes(true)}
              >
                Abrir formulario
              </button>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/img/unete_comunidad.png"
                className="img-fluid rounded shadow-sm"
                alt="Pacientes XLH"
              />
            </div>
          </div>
        </section>

        {/* Sección Especialistas */}
        <section className="container my-5" id="especialistas">
          <div className="row align-items-center shadow rounded p-4 bg-white">
            <div className="col-md-6 text-center">
              <img
                src="/img/unete_comunidad.png"
                className="img-fluid rounded shadow-sm"
                alt="Especialistas"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Especialistas</h2>
              <p>
                Si eres especialista y deseas formar parte del directorio,
                llena este formulario:
              </p>
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowEspecialistas(true)}
              >
                Abrir formulario
              </button>
            </div>
          </div>
        </section>

        {/* Modal Pacientes */}
        {showPacientes && (
          <>
            <div
              className="modal fade show d-block"
              tabIndex={-1}
              style={{ zIndex: 1050 }}
            >
              <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content p-3">
                  <div className="modal-header">
                    <h5 className="modal-title">Registro de Pacientes</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowPacientes(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <Registro />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              style={{ zIndex: 1040 }}
              onClick={() => setShowPacientes(false)}
            />
          </>
        )}

        {/* Modal Especialistas */}
        {showEspecialistas && (
          <>
            <div
              className="modal fade show d-block"
              tabIndex={-1}
              style={{ zIndex: 1050 }}
            >
              <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content p-3">
                  <div className="modal-header">
                    <h5 className="modal-title">Solicitud de Especialistas</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowEspecialistas(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <EspecialistasForm />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              style={{ zIndex: 1040 }}
              onClick={() => setShowEspecialistas(false)}
            />
          </>
        )}

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </main>
    </>
  );
}
