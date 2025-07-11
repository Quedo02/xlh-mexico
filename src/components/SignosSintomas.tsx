import { useState } from "react";

const signosData = {
  ninxs: {
    huesos: [
      "Marcha de pato.",
      "Deformamiento de las extremidades inferiores (usualmente se vuelve notorio a los 2 años de edad, dado que es cuando las piernas normalmente empiezan a soportar peso): piernas arqueadas, rodillas valgas.",
      "Retraso del crecimiento y baja estatura.",
      "Dolores óseos y articulares.",
      "Irregularidades en la forma de la cabeza (craneositosis).",
      "Dolores de cabeza, posiblemente causados por una afección llamada malformación de Chiari (el tejido cerebral ocupa espacio del conducto vertebral).",
      "Rodillas o muñecas más grandes de lo normal."
    ],
    musculos: [
      "Debilidad.",
      "Rigidez.",
      "Dolor."
    ],
    dientes: [
      "Abscesos dentales.",
      "Espaciado irregular entre los dientes."
    ]
  },
  adultxs: {
    huesos: [
      "Estatura baja.",
      "Rigidez y deterioro de la movilidad física.",
      "Fracturas recurrentes",
      "Dolor óseo y articular.",
      "Rodillas o muñecas más grandes de lo normal.",
      "Deformidades de las extremidades inferiores: piernas arqueadas y rodillas valgas.",
      "Craneosinostosis (irregularidades en la forma de la cabeza).",
      "Dolores de cabeza, posiblemente causados por una afección llamada malformación de Chiari (el tejido cerebral ocupa espacio del conducto vertebral)",
      "Entesiopatía (mineralización de tendones y ligamentos alrededor de los tendones de Aquiles, rodillas, caderas y columna vertebral.",
      "Aparición temprana de artrosis (inflamación de huesos y articulaciones).",
      "Fracturas y pseudofracturas.",
      "Pérdida auditiva.",
      "Estenosis espinal (los espacios en la columna vertebral se estrechan y ejercen presión en la médula espinal y las raíces de los nervios)."
    ],
    musculos: [
      "Debilidad.",
      "Rigidez.",
      "Dolor."
    ],
    dientes: [
      "Abscesos dentales.",
      "Periodontitis.",
      "Pérdida de piezas dentales."
    ]
  }
};

export default function SignosSintomas() {
  const [grupo, setGrupo] = useState<"ninxs" | "adultxs">("ninxs");
  const [categoria, setCategoria] = useState<"huesos" | "musculos" | "dientes">("huesos");

  const etiquetasGrupos = [
    { key: "ninxs", label: "Niñxs" },
    { key: "adultxs", label: "Adultxs" }
  ];
  const etiquetasCat = [
    { key: "huesos", label: "Huesos y articulaciones" },
    { key: "musculos", label: "Músculos" },
    { key: "dientes", label: "Dientes" }
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Signos y Síntomas</h2>

      {/* Grupo Niñxs / Adultxs con colores personalizados */}
      <div className="d-flex justify-content-center mb-3">
        {etiquetasGrupos.map(g => {
          const outlineClass = g.key === 'ninxs' ? 'btn-outline-verde' : 'btn-outline-azul-marino';
          return (
            <button
              key={g.key}
              className={`btn me-2 ${outlineClass} ${grupo === g.key ? 'active' : ''}`}
              onClick={() => { setGrupo(g.key as any); setCategoria('huesos'); }}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Categorías */}
      <div className="d-flex justify-content-center mb-4">
        {etiquetasCat.map(c => {
            const outlineClass =
            c.key === "huesos"
                ? "btn-outline-cyan"
                : c.key === "musculos"
                ? "btn-outline-rosa-mexicano"
                : "btn-outline-naranja"; // dientes

            return (
            <button
                key={c.key}
                className={`btn me-2 ${outlineClass} ${categoria === c.key ? "active" : ""}`}
                onClick={() => setCategoria(c.key as any)}
            >
                {c.label}
            </button>
            );
        })}
      </div>

      {/* Lista de síntomas */}
      <div className="border rounded p-4 bg-white shadow-sm">
        <ul className="list-unstyled mb-0">
          {signosData[grupo][categoria].map((item, idx) => (
            <li key={idx} className="mb-2">• {item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}