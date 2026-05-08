import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import BootstrapClient from '@/components/BootstrapClient';
import NavbarClient, { FooterClient } from '@/components/NavbarClient';
import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XLH México',
  description: 'Asociación de pacientes con Hipofosfatemia Ligada al Cromosoma X en México',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body>
        <BootstrapClient />
        <NavbarClient />
        {children}
        <FooterClient />
        <ToastContainer />
      </body>
    </html>
  );
}
