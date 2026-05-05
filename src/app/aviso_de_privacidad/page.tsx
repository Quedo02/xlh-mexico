export default function AvisoPrivacidad() {
  return (
    <main className="bg-light py-5 px-3">
      <div className="container">
        <h1 className="mb-4 text-center">Aviso de Privacidad</h1>

        <section className="mb-4">
          <p>
            En cumplimiento con lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares,
            XLH y Otros Raquitismos México informa que los datos personales recabados a través del presente formulario serán utilizados
            exclusivamente para fines de registro, organización, seguimiento, comunicación institucional y generación de informes
            relacionados con las actividades desarrolladas por la organización.
          </p>
        </section>

        <section className="mb-4">
          <h2>Datos personales recabados</h2>
          <p>Los datos personales que podrán recabarse incluyen:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Edad</li>
            <li>Datos de contacto (teléfono y correo electrónico)</li>
            <li>Institución de atención médica</li>
            <li>Lugar de residencia</li>
            <li>Cualquier otra información proporcionada voluntariamente</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2>Finalidades del tratamiento de datos</h2>
          <ul>
            <li>Gestionar el registro y control de miembros de la asociación.</li>
            <li>Enviar información relacionada con eventos, convocatorias y programas.</li>
            <li>Elaborar estadísticas e informes institucionales.</li>
            <li>
              Difundir actividades mediante fotografías o videos en redes sociales oficiales (previa autorización expresa).
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h2>Transferencia de datos</h2>
          <p>
            XLH y Otros Raquitismos México no compartirá, venderá ni transferirá sus datos personales a terceros sin su consentimiento,
            salvo aquellas excepciones previstas por la ley.
          </p>
        </section>

        <section className="mb-4">
          <h2>Derechos ARCO</h2>
          <p>
            Las personas titulares de los datos podrán ejercer en cualquier momento sus derechos de Acceso, Rectificación,
            Cancelación u Oposición (Derechos ARCO), mediante solicitud al correo electrónico oficial de la asociación:
            <strong> xlhmexico@gmail.com</strong>.
          </p>
        </section>

        <section className="mb-4">
          <h2>Consentimiento</h2>
          <p>
            Al enviar el presente formulario, la persona participante declara haber leído y aceptado los términos del
            presente Aviso de Privacidad.
          </p>
        </section>

        <p className="text-muted text-end">
          Enero 2026
        </p>
      </div>
    </main>
  );
}