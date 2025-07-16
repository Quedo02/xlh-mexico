"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";

export default function Nosotros() {
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      {/* Hero independiente, fuera del main */}
      <HeroSection
        title="¿Quiénes somos?"
        subtitle="Conoce a la asociación detrás del apoyo a personas con XLH en México."
        backgroundImage="/img/receta.jpg"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <main>
        {/* Sección de introducción XLH México */}
        <section className="py-5">
          <div className="container">
            <motion.h2
              className="text-center mb-4 display-5"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              XLH México
            </motion.h2>
            <motion.p
              className="lead text-center mb-3"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Somos una asociación mexicana sin fines de lucro fundada en 2019, que brinda apoyo a personas diagnosticadas 
              con <strong>Raquitismo Hipofosfatémico ligado al Cromosoma X (XLH)</strong> y otros raquitismos hereditarios, 
              y sus familias.
            </motion.p>
            <motion.p
              className="text-center"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Nuestra comunidad está conformada por familias mexicanas que conviven con <strong>XLH</strong>, que buscan informarse, 
              encontrar mejores tratamientos y difundir el conocimiento de la enfermedad.
            </motion.p>
          </div>
        </section>

        {/* Nuestra Historia con texto completo */}
        <section className="py-5 bg-light">
          <div className="container">
            <motion.h2
              className="text-center mb-5 display-5"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              Nuestra Historia
            </motion.h2>
            <div className="row align-items-center gy-4">
              <div className="col-md-6">
                <motion.img
                  src="/img/doctor.jpg"
                  alt="Nuestra Historia"
                  className="img-fluid rounded shadow"
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="col-md-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="lead">
                    XLH México nació con el compromiso de acompañar a las personas que enfrentan raquitismos hereditarios, creando un espacio de apoyo, información y comunidad.
                  </p>
                  <p>
                    La asociación <strong>XLH y Otros Raquitismos México</strong> fue fundada en 2019 por iniciativa de 
                    la Sra. Adriana Caro Ocampo, madre de una paciente de <strong>raquitismo hipofosfatémico ligado al cromosoma X (XLH)</strong> quien, al darse cuenta de la falta de 
                    conocimiento e información sobre la enfermedad en el país, decidió buscar y contactar a más pacientes 
                    para levantar un censo y crear comunidad.
                  </p>
                  <p>
                    Al momento hemos logrado realizar y participar en diferentes simposios y congresos a nivel nacional, así como colaborar con diversos medios de comunicación para dar visibilidad al XLH y concientizar a la comunidad médica y sociedad mexicana sobre la importancia del diagnóstico temprano y el tratamiento adecuado.
                  </p>
                  <p>
                    De igual forma, hemos asistido ante tomadores de decisiones del gobierno, presentando un pliego petitorio para incluir el XLH en el catálogo de enfermedades raras en el país, garantizando así mejor atención médica en instituciones de seguridad social.
                  </p>
                  <p>
                    En 2021 solicitamos a COFEPRIS la aprobación de un tratamiento innovador para XLH, ya vigente en EE.UU. y otros países con excelentes resultados. En julio de ese año, fue aprobado por unanimidad para su distribución en instituciones de salud.
                  </p>
                  <p>
                    Actualmente seguimos gestionando con IMSS, ISSSTE, INSABI, etc., para garantizar el acceso al tratamiento tanto en niños como en adultos.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="py-5">
          <div className="container">
            <motion.h2
              className="text-center mb-5 display-5"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
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
                  <motion.div
                    className="p-4 shadow-sm rounded h-100 bg-white"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
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
            <motion.h2
              className="text-center mb-5 display-5"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              Nuestro Equipo
            </motion.h2>
            <div className="row g-4 justify-content-center">
              {[
                { name: "María González", role: "Presidenta", img: "/img/doctora.jpg" },
                { name: "Carlos Pérez", role: "Vicepresidente", img: "/img/doctor.jpg" },
                { name: "Enrique Ramírez", role: "Comunicación", img: "/img/doctor1.jpg" },
              ].map(({ name, role, img }) => (
                <div key={name} className="col-6 col-md-4 text-center">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <img
                      src={img}
                      alt={name}
                      className="rounded-circle shadow-lg mb-3"
                      style={{ width: "160px", height: "160px", objectFit: "cover" }}
                    />
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
