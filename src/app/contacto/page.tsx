"use client";

import React from "react";
import Image from "next/image";

import HeroSection from "@/components/HeroSection";

export default function Contacto() {
  return (
    <>
    <HeroSection
      title="Material Educativo"
      subtitle="Sumergete en Nuestro Material Educativo"
      backgroundImage="/img/receta.jpg" // Imagen de fondo
      overlayColor="rgba(20, 38, 102, 0.6)" //Color de fondo
    />

    </>
  );
}
