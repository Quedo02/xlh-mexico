"use client";

import React from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParallaxSection";
import SignosSintomas from "@/components/SignosSintomas";

export default function SobreElXLH() {
  return (
    <>
      <HeroSection
        title="Conoce el Raquitismo Hipofosfatémico Ligado al Cromosoma X (XLH)"
        subtitle="Infórmate y acompáñanos en la difusión"
        backgroundImage="/img/receta.jpg"
        overlayColor="rgba(0, 38, 102, 0.6)"
      />

      <section className="seccion-info bg-light py-5">
        <div className="container">
          {/* ¿Qué es el XLH? */}
          <div className="mb-5">
            <h2 className="titulo-seccion morado">¿Qué es el XLH?</h2>
            <p className="parrafo-seccion">
              El raquitismo hipofosfatémico ligado al cromosoma X o XLH, es una enfermedad
              catalogada como rara, poco frecuente o de baja prevalencia, dado que afecta
              a 1 de cada 20,000 personas aproximadamente.
            </p>
            <p className="parrafo-seccion">
              Es una enfermedad crónica que <strong>afecta los huesos, músculos y dientes</strong> debido a la
              excesiva pérdida de fosfato (molécula producida por los riñones, compuesta por
              <strong>fósforo y oxígeno</strong>, necesaria para tener huesos, músculos y dientes sanos) en la
              orina, que causa <strong>bajos niveles de fósforo en la sangre</strong>.
            </p>
            <p className="parrafo-seccion">
              Es <strong>hereditaria</strong> (puede heredarse de padres a hijxs), <strong>progresiva</strong> (los síntomas van
              evolucionando y pueden surgir nuevos con la edad) y <strong>de por vida</strong> (los síntomas
              continúan presentes a lo largo de la vida dado que no existe una cura) y puede
              afectar a niñxs y adultxs independientemente de la edad.
            </p>
          </div>

          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <Image
                src="/img/objetivo.jpg"
                alt="FGF23 proteína XLH"
                width={600}
                height={400}
                className="img-ajustada sombra-logo"
              />
            </div>

            {/* Que provoca el XLH */}
            <div className="col-md-6">
              <h2 className="titulo-seccion morado">¿Qué provoca el XLH?</h2>
              <p className="parrafo-seccion">
                El raquitismo hipofosfatémico ligado al cromosoma X o XLH se debe a una mutación, un defecto, 
                en el cromosoma X que aumenta la producción de una proteína llamada <strong>factor de crecimiento de 
                fibroblastos 23 (FGF23)</strong>. El exceso del FGF23 hace que los riñones pierdan fosfato a través de la 
                orina y consecuentemente esto genera que haya poco fosfato en la sangre, lo que debilita y reblandece 
                los huesos.
              </p>
            </div>
          </div>

          {/* Síntomas */}
          <SignosSintomas />

          {/* Genética */}
          <div className="row align-items-center my-5">
            <div className="col-md-6">
              <Image
                src="/img/objetivo.jpg"
                alt="Herencia genética"
                width={600}
                height={400}
                className="img-ajustada sombra-logo"
              />
            </div>
            <div className="col-md-6">
              <h2 className="titulo-seccion morado">¿Quién puede tener XLH?</h2>
              <p className="parrafo-seccion">
                Es una enfermedad ligada al cromosoma X por lo que la mayoría de los casos suelen ser heredados, 
                sin embargo, un 20-30% de los pacientes son casos espontáneos, es decir, no cuentan con antecedentes familiares. <br /> <br />
                Un hombre con XLH, heredará la enfermedad a todas sus hijas; mientras que todas y todos los hijos de una mujer 
                con XLH tienen un 50% de probabilidades de heredar la enfermedad. <br /> <br />
                Y en el caso de que ambos padres tengan XLH, todos los hijxs también lo presentarán.

              </p>
            </div>
          </div>
          
          {/* Diagnóstico */}
          <div className="row align-items-center my-5 flex-md-row-reverse">
            <div className="col-md-6">
              <Image
                src="/img/objetivo.jpg"
                alt="Diagnóstico XLH"
                width={600}
                height={400}
                className="img-ajustada sombra-logo"
              />
            </div>
            <div className="col-md-6">
              <h2 className="titulo-seccion morado">¿Cómo se diagnostica?</h2>
              <p className="parrafo-seccion">
                El XLH generalmente se diagnostica durante la niñez, entre los primeros dos años de edad, 
                cuando las piernas empiezan a soportar peso y los signos físicos empiezan a notarse. 
                Sin embargo, el <strong>diagnóstico de XLH</strong> se basa en una combinación de <strong>antecedentes familiares, síntomas, 
                análisis bioquímicos</strong> y <strong>pruebas genéticas</strong>. <br /> <br />
                Un diagnóstico temprano y preciso es sumamente importante para que la enfermedad pueda tratarse de la 
                mejor manera. Dado que mientras más temprano se detecte, hay más probabilidades de tener un tratamiento 
                adecuado que permita manejar los síntomas y, por lo tanto, la enfermedad. <br /> <br />
                
              </p>
            </div>
            <p><br /><strong>Cuanto antes se diagnostique y se inicie el tratamiento es mejor para la calidad de vida de lxs pacientes.</strong> 
                Por lo tanto, es muy importante que todx niñx recién nacidx relacionadx con alguna persona con XLH se someta 
                a una consulta lo más pronto posible. Aunque  también <strong>existen casos espontáneos</strong>, es decir, que no existe 
                antecedente alguno de la enfermedad en la familia, y en muchas ocasiones estos no son diagnosticados hasta 
                la adultez. Por ello es muy importante que, <strong> si identifica alguno o varios de los síntomas descritos 
                anteriormente, acuda a su médico y le comunique sus sospechas</strong>. <br /><br />
                También hay que tomar en cuenta que, al no ser una condición frecuente, el XLH <strong>puede confundirse con 
                otras enfermedades</strong> como: <strong>raquitismo nutricional</strong> (se debe a deficiencias alimentarias), <strong>arqueamiento 
                de piernas fisiológico</strong> (variaciones normales en el aspecto de las piernas), <strong>hipofosfatasia</strong>.</p>
          </div>
        </div>

        {/* === ParallaxSection fuera del container para ancho completo === */}
        <ParallaxSection
          backgroundImage="/img/receta.jpg"
          overlayColor="rgba(0, 0, 0, 0.5)"
          speed={0.3}
          height="70vh"
          title="Conoce los tratamientos disponibles"
        />

        {/* Seguimos con el container para el resto */}
        <div className="container">
          {/* Tratamiento */}
          <div className="row g-4 my-5">
            <div className="col-12">
              <h2 className="titulo-seccion rosa-mexicano text-center">
                Tratamiento del XLH
              </h2>
              <p className="parrafo-seccion text-center">
                Al ser una enfermedad crónica y de por vida, es importante tener en cuenta que el tratamiento del raquitismo 
                hipofosfatémico ligado al cromosoma X no está enfocado en atacar la enfermedad como tal, sino que 
                <strong>se centra en ayudar a manejar los distintos síntomas y mejorar la calidad de vida de lxs pacientes</strong>; 
                y al igual que los síntomas pueden cambiar con la edad, los objetivos son diferentes en niñxs y adultxs.
              </p>
            </div>

            <div className="col-md-6">
              <div className="p-4 border rounded shadow-sm">
                <h4 className="morado">En niñxs</h4>
                <ul>
                  <li>Abordar problemas de crecimiento.</li>
                  <li>Corregir el raquitismo y mejorar la mineralización de huesos y dientes.</li>
                  <li>Corregir las deformidades de las piernas.</li>
                  <li>Mejorar la función física.</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 border rounded shadow-sm">
                <h4 className="cyan">En adultxs</h4>
                <ul>
                  <li>Reducir el dolor, la fatiga y rigidez de huesos, articulaciones y músculos.</li>
                  <li>Corregir las deformidades de las piernas.</li>
                  <li>Prevenir fracturas.</li>
                  <li>Mejorar la salud ósea y dental.</li>
                </ul>
              </div>
            </div>
            <p>Un tratamiento completo y adecuado de XLH incluye: medicamentos o suplementos 
              <strong> alimenticios, terapia física y ocupacional, manejo del dolor, cuidado dental, 
              consejería genética y supervisión audiológica</strong>. <br /><br />
              Para lograr un tratamiento integral es fundamental encontrar un <strong>equipo de atención médica 
              especializado y multidisciplinario</strong> con conocimiento del XLH, que le pueda proporcionar atención 
              personalizada, apoyo y educación sobre la enfermedad. Este debe conformarse principalmente por un 
              especialista <strong>en pediatría o medicina interna, endocrinología, nefrología, ortopedia, odontología 
              y genética</strong>, y puede ser complementado por especialistas en psicología, terapia ocupacional, 
              reumatología, fisioterapia, otorrinolaringología y nutrición. <br /><br />
              Debido a que el XLH es una enfermedad progresiva, es importante que al convertirse en 
              adultxs, lxs jóvenes hagan la transición de especialistas pediátricos a especialistas de adultxs 
              para seguir con el manejo de la enfermedad y prever y evitar futuras complicaciones.
</p>
          </div>

          {/* Contacto */}
          <div className="row text-center mt-5">
            <div className="col">
              <h3 className="titulo-seccion morado">¿Tienes dudas?</h3>
              <a href="/contacto" className="btn btn-outline-morado mt-3">
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
