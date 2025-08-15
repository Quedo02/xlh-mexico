export default function AvisoPrivacidad() {
  return (
    <main className="bg-light py-5 px-3">
      <div className="container">
        <h1 className="mb-4 text-center">Aviso de Privacidad</h1>

        <section className="mb-4">
          <h2>Responsable del tratamiento de los datos personales</h2>
          <p>
            Esta página web, responsable del sitio “Registro de Pacientes XLH y Otros Raquitismos México”,
            con domicilio en Ciudad de México, es la encargada de recabar, proteger y tratar los datos personales
            proporcionados por usted mediante el formulario de registro.
          </p>
        </section>

        <section className="mb-4">
          <h2>Finalidades del tratamiento de datos personales</h2>
          <p>Los datos personales recabados serán utilizados para las siguientes finalidades:</p>
          <ul>
            <li>Registrar y organizar información médica de pacientes con sospecha o diagnóstico de XLH u otros raquitismos.</li>
            <li>Contactar al paciente para seguimiento clínico o informativo.</li>
            <li>Analizar y generar estadísticas internas con fines médicos y de salud pública.</li>
            <li>Canalizar la información a médicos o instituciones relacionadas, previa autorización.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2>Datos personales recabados</h2>
          <p>Podemos recabar los siguientes datos personales:</p>
          <ul>
            <li><strong>Identificación:</strong> nombre, sexo, fecha de nacimiento, edad, residencia, teléfono, correo electrónico.</li>
            <li><strong>Datos médicos:</strong> diagnóstico, antecedentes familiares, tratamientos, médico tratante, especialidades, seguridad social e institución tratante.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2>Datos personales sensibles</h2>
          <p>
            Algunos datos recabados son considerados sensibles según la Ley Federal de Protección de Datos Personales
            en Posesión de los Particulares. Estos serán tratados bajo estrictas medidas de seguridad y confidencialidad.
          </p>
        </section>

        <section className="mb-4">
          <h2>Transferencia de datos</h2>
          <p>
            Sus datos no serán compartidos con terceros sin su consentimiento, salvo en los casos previstos por la ley.
            En caso de ser necesario compartir su información con profesionales de la salud, se solicitará su consentimiento expreso.
          </p>
        </section>

        <section className="mb-4">
          <h2>Derechos ARCO</h2>
          <p>
            Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales.
            Para ejercer estos derechos, puede escribirnos al correo: <strong>contacto@xlhmexico.org</strong>.
          </p>
        </section>

        <section className="mb-4">
          <h2>Medidas de seguridad</h2>
          <p>
            Contamos con medidas físicas, técnicas y administrativas para proteger sus datos personales contra daño,
            pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
          </p>
        </section>

        <section className="mb-4">
          <h2>Cambios al aviso de privacidad</h2>
          <p>
            Este aviso puede ser actualizado en cualquier momento. Las modificaciones estarán disponibles en esta misma sección del sitio web.
          </p>
        </section>

        <section className="mb-4">
          <h2>Consentimiento</h2>
          <p>
            Al proporcionar sus datos personales en el formulario, usted otorga su consentimiento expreso para que
            sean tratados conforme a los términos y condiciones del presente Aviso de Privacidad.
          </p>
        </section>

        <p className="text-muted text-end">
          Última actualización: 24 de julio de 2025
        </p>
      </div>
    </main>
  );
}
