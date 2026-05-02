"use client";

import { useState } from "react";

const signosData = {
  ninxs: {
    general: [
      "Marcha de pato.",
    ],
    huesos: [
      "Deformamiento de las extremidades inferiores (usualmente se vuelve notorio a los 2 años de edad, dado que es cuando las piernas normalmente empiezan a soportar peso): piernas arqueadas, rodillas valgas.",
      "Retraso del crecimiento y baja estatura.",
      "Dolores óseos y articulares.",
      "Irregularidades en la forma de la cabeza (craneosinostosis).",
      "Dolores de cabeza, posiblemente causados por una afección llamada malformación de Chiari (el tejido cerebral ocupa espacio del conducto vertebral).",
      "Rodillas o muñecas más grandes de lo normal.",
    ],
    musculos: ["Debilidad.", "Rigidez.", "Dolor."],
    dientes: ["Abscesos.", "Espaciado irregular entre los dientes."],
  },
  adultxs: {
    general: [
      "Rigidez y deterioro de la movilidad física.",
      "Fatiga.",
    ],
    huesos: [
      "Estatura baja.",
      "Osteomalacia (reblandecimiento de los huesos).",
      "Dolor óseo y articular.",
      "Rodillas o muñecas más grandes de lo normal.",
      "Deformidades de las extremidades inferiores: piernas arqueadas y rodillas valgas.",
      "Craneosinostosis (irregularidades en la forma de la cabeza).",
      "Dolores de cabeza, posiblemente causados por una afección llamada malformación de Chiari (el tejido cerebral ocupa espacio del conducto vertebral).",
      "Entesiopatía (mineralización de tendones y ligamentos alrededor de los tendones de Aquiles, rodillas, caderas y columna vertebral).",
      "Aparición temprana de artrosis (inflamación de huesos y articulaciones).",
      "Fracturas y pseudofracturas.",
      "Pérdida auditiva.",
      "Estenosis espinal (los espacios en la columna vertebral se estrechan y ejercen presión en la médula espinal y las raíces de los nervios).",
    ],
    musculos: ["Debilidad.", "Rigidez.", "Dolor."],
    dientes: ["Abscesos.", "Periodontitis.", "Pérdida de piezas dentales."],
  },
};

export default function SignosSintomas() {
  const [grupo, setGrupo] = useState<"ninxs" | "adultxs" | null>(null);
  const [categoria, setCategoria] = useState<"huesos" | "musculos" | "dientes" | null>(null);

  const etiquetasGrupos = [
    { key: "ninxs", label: "Niñxs", clase: "btn-outline-azul-marino" },
    { key: "adultxs", label: "Adultxs", clase: "btn-outline-azul-marino" },
  ];
  const etiquetasCat = [
    { key: "huesos", label: "Huesos y articulaciones", clase: "btn-outline-azul-marino" },
    { key: "musculos", label: "Músculos", clase: "btn-outline-azul-marino" },
    { key: "dientes", label: "Dientes", clase: "btn-outline-azul-marino" },
  ];

  const limpiar = () => {
    setGrupo(null);
    setCategoria(null);
  };

  return (
    <section className="container my-5">
      <h2 className="text-center mb-3">Signos y Síntomas</h2>
      <p className="parrafo-seccion text-center mb-4">
        Los síntomas varían de persona a persona y afectan a niñxs y adultxs de diferente manera.
        Así mismo, a medida que avanza la enfermedad, los síntomas pueden empeorar o pueden aparecer nuevos.
      </p>

      {/* Grupo */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
        {etiquetasGrupos.map((g) => (
          <button
            key={g.key}
            className={`btn ${g.clase} ${grupo === g.key ? "active" : ""}`}
            onClick={() => {
              setGrupo(g.key as any);
              setCategoria(null);
            }}
          >
            + {g.label}
          </button>
        ))}
        <button className="btn btn-outline-rosa-mexicano limpiar" onClick={limpiar}>
          - Limpiar
        </button>
      </div>

      {/* Subcategorías */}
      {grupo && (
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          {etiquetasCat.map((c) => (
            <button
              key={c.key}
              className={`btn ${c.clase} ${categoria === c.key ? "active" : ""}`}
              onClick={() => setCategoria(c.key as any)}
            >
              + {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Contenido */}
      {grupo && categoria && (
        <div className="border rounded p-4 bg-white shadow-sm">
          {/* Síntomas generales del grupo (siempre visibles al seleccionar categoría) */}
          {signosData[grupo].general.length > 0 && (
            <ul className="list-unstyled mb-3">
              {signosData[grupo].general.map((item, idx) => (
                <li key={idx} className="mb-2">• {item}</li>
              ))}
            </ul>
          )}
          {/* Síntomas de la categoría seleccionada */}
          <ul className="list-unstyled mb-0">
            {signosData[grupo][categoria].map((item, idx) => (
              <li key={idx} className="mb-2">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}