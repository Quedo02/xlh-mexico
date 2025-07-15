"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {
    useEffect(() => {
        const loadBootstrap = async () => {
    // @ts-expect-error: No hay declaración de tipos para este módulo
        const bootstrapModule = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
        const navLinks = document.querySelectorAll(".nav-link");
        const navbarCollapse = document.getElementById("navbarNav");

        navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbarCollapse?.classList.contains("show")) {
            const bsCollapse = new bootstrapModule.Collapse(navbarCollapse, {
                toggle: false,
            });
            bsCollapse.hide();
            }
        });
        });
    };

    loadBootstrap();
    }, []);

return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-navbar shadow-sm">
    <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
        <img src="/Img/logo_sin_fondo.png" alt="XLH México Logo" className="logo-img me-2"/>
        <span className="fw-bold">XLH México</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-2 align-items-lg-center">
        {[
            { href: "/inicio", label: "Sobre el XLH" },
            { href: "/eventos", label: "Eventos" },
            { href: "/directorio", label: "Directorio" },
            { href: "/material", label: "Información" },
            { href: "/nosotros", label: "Nosotros" },
            { href: "/registro", label: "Registro" },
            // { href: "/servicios", label: "Servicios" },
        ].map((item) => (
            <li key={item.href} className="nav-item">
            <Link className="nav-link text-center" href={item.href}>
                {item.label}
            </Link>
            </li>
        ))}

        {/* BOTÓN DONACIONES */}
        {/* <li className="nav-item text-center">
            <Link href="/donaciones" className="btn btn-donaciones ms-lg-3 mt-2 mt-lg-0">
            Donaciones
            </Link>
        </li> */}
        </ul>
        </div>
    </div>
    </nav>
);
}
