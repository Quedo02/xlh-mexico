"use client";
// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

export default function RootLayout({ children }:{ children: React.ReactNode}) {
  const pathname = usePathname();

  const hideNavbarFooter = ["/inicio", "/materia", "/nosotros", "registro", "servicios", "/"].includes(pathname);

  return (
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body>
        {hideNavbarFooter && <Navbar />}
        {children}
        {hideNavbarFooter && <Footer />}
        </body>
    </html>
  );
}