"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGES_WITH_NAV = [
  "/",
  "/contacto",
  "/directorio",
  "/eventos",
  "/informacion",
  "/marcas_y_licencias",
  "/aviso_de_privacidad",
  "/nosotros",
  "/registro",
  "/servicios",
  "/sobre-el-xlh",
  "/registroEspecialista",
];

function useShowNav() {
  const pathname = usePathname();
  return PAGES_WITH_NAV.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default function NavbarClient() {
  const show = useShowNav();
  if (!show) return null;
  return <Navbar />;
}

export function FooterClient() {
  const show = useShowNav();
  if (!show) return null;
  return <Footer />;
}
