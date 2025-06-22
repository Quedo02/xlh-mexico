"use client";

import React from "react";
import Image from "next/image";

import HeroSection from "@/components/HeroSection";

export default function Informacion() {
  return (
    <>
    <HeroSection
      title="Material Educativo"
      subtitle="Sumergete en Nuestro Material Educativo"
      backgroundImage="/img/receta.jpg" // Imagen de fondo
      overlayColor="rgba(238, 49 , 107 , 0.5)" //Color de fondo
    />

    </>
  );
}
