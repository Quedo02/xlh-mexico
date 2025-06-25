"use client";

import React from "react";
import Image from "next/image";


import HeroSection from "@/components/HeroSection";


export default function Material() {
  return (
    <>
    <HeroSection
      title="Material Educativo"
      subtitle="Sumergete en Nuestro Material Educativo"
      backgroundImage="/img/receta.jpg" // Imagen de fondo
      overlayColor="rgba(0, 38, 102, 0.6)" //Color de fondo
    />

    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
        <h2 className="titulo-seccion text-center text-md-start">Recursos Descargables</h2>
        <button className="btn btn-outline-morado mt-3 mt-md-0">
          <i className="bi bi-plus-lg me-2"></i>Agregar Material
        </button>
      </div>

      <div className="row">
        {/* Material 1 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 tile-card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Guía Nutricional para Niños</h5>
              <p className="card-text flex-grow-1">Archivo PDF informativo con consejos de nutrición para familias con XLH.</p>
              <a href="/docs/guia_nutricional.pdf" className="btn btn-outline-rosa-mexicano mt-auto">
                <i className="bi bi-download me-1"></i>Descargar
              </a>
            </div>
          </div>
        </div>

        {/* Material 2 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 tile-card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Ejercicios Fisioterapia</h5>
              <p className="card-text flex-grow-1">Rutinas ilustradas de fisioterapia adaptadas a personas con raquitismo.</p>
              <a href="/docs/ejercicios_fisio.pdf" className="btn btn-outline-rosa mt-auto">
                <i className="bi bi-download me-1"></i>Descargar
              </a>
            </div>
          </div>
        </div>

        {/* Material 3 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 tile-card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manual para Escuelas</h5>
              <p className="card-text flex-grow-1">Material educativo dirigido a docentes para incluir a niños con XLH.</p>
              <a href="/docs/manual_escuelas.pdf" className="btn btn-outline-cyan mt-auto">
                <i className="bi bi-download me-1"></i>Descargar
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Material 1 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 tile-card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Guía Nutricional para Adultos</h5>
              <p className="card-text flex-grow-1">Archivo PDF informativo con consejos de nutrición para familias con XLH.</p>
              <a href="/docs/guia_nutricional.pdf" className="btn btn-outline-azul-marino mt-auto">
                <i className="bi bi-download me-1"></i>Descargar
              </a>
            </div>
          </div>
        </div>

        {/* Material 2 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 tile-card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Ejercicios Fisioterapia</h5>
              <p className="card-text flex-grow-1">Rutinas ilustradas de fisioterapia adaptadas a personas con raquitismo.</p>
              <a href="/docs/ejercicios_fisio.pdf" className="btn btn-outline-naranja mt-auto">
                <i className="bi bi-download me-1"></i>Descargar
              </a>
            </div>
          </div>
        </div>

        {/* Material 3 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 tile-card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manual para Escuelas</h5>
              <p className="card-text flex-grow-1">Material educativo dirigido a docentes para incluir a niños con XLH.</p>
              <a href="/docs/manual_escuelas.pdf" className="btn btn-outline-verde mt-auto">
                <i className="bi bi-download me-1"></i>Descargar
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>

    </>
  );
}
