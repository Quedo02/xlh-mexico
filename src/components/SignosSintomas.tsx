"use client";

import { useState } from "react";

const signosData = {
  ninxs: {
    huesos: [
      "Marcha de pato.",
      "Deformamiento de las extremidades inferiores...",
      "Retraso del crecimiento y baja estatura.",
      "Dolores óseos y articulares.",
      "Irregularidades en la forma de la cabeza...",
      "Dolores de cabeza, posiblemente causados por una malformación de Chiari.",
      "Rodillas o muñecas más grandes de lo normal.",
    ],
    musculos: ["Debilidad.", "Rigidez.", "Dolor."],
    dientes: ["Abscesos dentales.", "Espaciado irregular entre los dientes."],
  },
  adultxs: {
    huesos: [
      "Estatura baja.",
      "Rigidez y deterioro de la movilidad física.",
      "Fracturas recurrentes.",
      "Dolor óseo y articular.",
      "Rodillas o muñecas más grandes de lo normal.",
      "Deformidades de las extremidades inferiores.",
      "Craneosinostosis.",
      "Dolores de cabeza por malformación de Chiari.",
      "Entesiopatía.",
      "Aparición temprana de artrosis.",
      "Fracturas y pseudofracturas.",
      "Pérdida auditiva.",
      "Estenosis espinal.",
    ],
    musculos: ["Debilidad.", "Rigidez.", "Dolor."],
    dientes: ["Abscesos dentales.", "Periodontitis.", "Pérdida de piezas dentales."],
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
      <h2 className="text-center mb-4">Signos y Síntomas</h2>

      {/* Grupo */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
        {etiquetasGrupos.map((g) => (
          <button
            key={g.key}
            className={`btn ${g.clase} ${grupo === g.key ? "active" : ""}`}
            onClick={() => {
              setGrupo(g.key as any);
              setCategoria(null); // reinicia categoría al cambiar grupo
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
