"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

type MediaInfo = { url: string; alt?: string; caption?: string } | null;

export default function NosotrosClient({
  historia, eq1, eq2, eq3,
}: { hero: MediaInfo; historia: MediaInfo; eq1: MediaInfo; eq2: MediaInfo; eq3: MediaInfo }) {

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <HeroSection
        title="¿Quiénes somos?"
        subtitle="Conoce a la asociación detrás del apoyo a personas con XLH en México."
        sectionName="nosotros"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <main>
        {/* Sección de introducción */}
        <section className="container my-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">XLH México</h2>
          </div>

          <div className="row align-items-center shadow rounded p-4 bg-white">
            {/* Imagen izquierda */}
            <div className="col-md-6 text-center">
              <Image
                src="/img/nostros-xlh.png"
                className="img-fluid rounded shadow-sm"
                alt="XLH México"
                width={500}
                height={350}
              />
            </div>
          
            {/* Texto derecha */}
            <div className="col-md-6">
              <p>
                Somos una asociación mexicana sin fines de lucro fundada en 2019, que brinda
                apoyo a personas diagnosticadas con <strong>Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH)</strong> y otros raquitismos hereditarios, y sus familias.
              </p>
              <p>
                Nuestra comunidad está conformada por familias mexicanas que conviven con <strong>XLH</strong>, que buscan informarse,
                encontrar mejores tratamientos y difundir el conocimiento de la enfermedad.
              </p>
            </div>
          
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="py-5 bg-light">
          <div className="container">
            <motion.h2 className="text-center mb-5 display-5" initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}>
              Nuestra Historia
            </motion.h2>
            <div className="row align-items-center gy-4">
              <div className="col-md-6">
                <motion.img
                  src={historia?.url || "/img/historia-xlh.png"}
                  alt={historia?.alt || "Nuestra Historia"}
                  className="img-fluid rounded shadow"
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                {historia?.caption && (
                  <p className="small text-muted mt-2 text-center">{historia.caption}</p>
                )}
              </div>
              <div className="col-md-6">
                <motion.div initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>

                  <p className="lead">
                    XLH México nació con el compromiso de acompañar a las personas que enfrentan raquitismos hereditarios, creando un espacio de apoyo, información y comunidad.
                  </p>
                  <p>La asociación <strong>XLH y Otros Raquitismos México</strong> fue fundada en 2019 por iniciativa de la Sra. Adriana Caro Ocampo, 
                  madre de una paciente de <strong>raquitismo hipofosfatémico ligado al cromosoma X (XLH)</strong> quien, al darse cuenta de la falta 
                  de conocimiento, información y apoyo sobre la enfermedad en el país, decidió empezar a buscar y contactar a más pacientes con la finalidad 
                  de levantar un censo y conectarnos.</p>
                  <p>Al momento hemos logrado realizar y participar en diferentes simposios y congresos a nivel nacional, así como platicar con diversos medios de comunicación, 
                    con la finalidad de dar visibilidad al XLH y concientizar a la comunidad médica y sociedad mexicana sobre la importancia del diagnóstico temprano y el 
                    tratamiento adecuado, ya que estos pueden cambiar por completo la calidad de vida de las(os) pacientes.</p>
                  <p>De igual forma, hemos asistido ante los tomadores de decisiones del gobierno, presentando pliego petitorio para que el XLH sea incluido en el catálogo 
                    de enfermedades raras o de baja prevalencia en el país, y así las(os) pacientes puedan tener acceso a una mejor atención médica dentro de las instituciones 
                    de seguridad social.</p>
                  <p>Así mismo, en 2021 solicitamos a COFEPRIS la aceptación de un tratamiento innovador especial para el XLH, mismo que ya está aprobado en EE.UU. y otros países 
                    con increíbles resultados en pacientes, afortunadamente este fue aprobado y en julio del mismo año se sometió a votación para que las instituciones de seguridad 
                    social lo proporcionen a sus pacientes, y con gran éxito fue aceptado de forma unánime.</p>
                  <p>Actualmente estamos trabajando para que el IMSS, ISSTE, IMSS Bienestar, etc. empiecen a suministrar el tratamiento a las(os) pacientes, tanto infantes como adultos.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="py-5">
          <div className="container">
            <motion.h2 className="text-center mb-5 display-5" initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}>
              Nuestros Valores
            </motion.h2>
            <div className="row g-4 text-center">
              {[
                { icon: "bi-heart-fill text-danger", title: "Empatía", info: "Nos ponemos en el lugar de cada persona con XLH, escuchando y entendiendo sus necesidades." },
                { icon: "bi-people-fill text-success", title: "Comunidad", info: "Fomentamos redes de apoyo entre pacientes, familiares y especialistas." },
                { icon: "bi-lightbulb-fill text-info", title: "Conciencia", info: "Promovemos el conocimiento y sensibilización sobre el XLH." },
                { icon: "bi-award-fill text-warning", title: "Compromiso", info: "Trabajamos constantemente para mejorar la calidad de vida de quienes viven con XLH." },
              ].map(({ icon, title, info }) => (
                <div key={title} className="col-6 col-md-3">
                  <motion.div className="p-4 shadow-sm rounded h-100 bg-white" initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
                    <i className={`bi ${icon} display-4`}></i>
                    <h5 className="mt-3">{title}</h5>
                    <p className="small text-muted">{info}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="py-5 bg-light">
          <div className="container">
            <motion.h2 className="text-center mb-5 display-5" initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}>
              Nuestro Equipo
            </motion.h2>
            <div className="row g-4 justify-content-center">
              {[
                { name: "Adriana Caro Campos", role: "Presidenta", media: eq1, fallback: "/img/presidenta-xlh.png" },
                { name: "Julissa Caro Caro", role: "vicepresidenta", media: eq2, fallback: "/img/vicepresidenta-xlh.png" },
                { name: "Kelly Castillo", role: "Relaciones Publicas", media: eq3, fallback: "/img/redes-sociales-paciente-xlh.png" },
              ].map(({ name, role, media, fallback }) => (
                <div key={name} className="col-6 col-md-4 text-center">
                  <motion.div initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <img
                      src={media?.url || fallback}
                      alt={media?.alt || name}
                      className="rounded-circle shadow-lg mb-3"
                      style={{ width: "160px", height: "160px", objectFit: "cover" }}
                    />
                    {media?.caption && <p className="small text-muted">{media.caption}</p>}
                    <h5>{name}</h5>
                    <p className="text-muted">{role}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
