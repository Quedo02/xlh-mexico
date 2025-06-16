"use client";
import Link from "next/link";

export default function Navbar() {
return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navbar">
    <div className="container-fluid">
        <Link className="navbar-brand" href="#">XLH México</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link " href="/inicio">Inicio</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="/eventos">Eventos</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="/directorio">Directorio</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="/material">Material</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="/registro">Registro</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="/servicios">Servicios</Link>
            </li>
        </ul>
        </div>
    </div>
    </nav>
);
}
