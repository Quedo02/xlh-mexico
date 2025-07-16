/*import React, { useState, useEffect, useRef } from "react";


interface PorcentajeCircularProps {
  porcentaje: number;
  color: "azul-marino" | "morado" | "cyan" | "rosa-mexicano" | "rosa" | "naranja" | "azul-cielo" | "verde" | string;
  size?: number;
}


export default function PorcentajeCircular({ porcentaje, color, size = 200 }: PorcentajeCircularProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const radio = 15.9155;
  const circunferencia = 2 * Math.PI * radio;
  const dashOffset = visible ? circunferencia - (porcentaje / 100) * circunferencia : circunferencia;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="circulo-porcentaje position-relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" width={size} height={size} className={`circular-chart ${color}`} style={{ transform: "rotate(-90deg)" }}>
        <path
          className="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3.8"
        />
        <path
          className="circle"
          strokeDasharray={circunferencia}
          strokeDashoffset={dashOffset}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeLinecap="round"
          strokeWidth="2.8"
          style={{
            stroke: color === "naranja" ? "orange" : color === "morado" ? "purple" : "black",
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
        />
      </svg>
      <span
        className="porcentaje-texto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: size * 0.16,
          fontWeight: 600,
          color: "#333",
          userSelect: "none",
        }}
      >
        {porcentaje}%
      </span>
    </div>
  );
}*/