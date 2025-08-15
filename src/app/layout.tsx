"use client";
// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BootstrapClient from '@/components/BootstrapClient';
import { usePathname } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarFooter = ["/marcas_y_licencias","/aviso_de_privacidad", "/contacto", "/material", "/nosotros", "/registro", "/servicios", "/informacion", "/eventos", "/directorio", "contacto","/sobre-el-xlh", "/"].includes(pathname);

  return (
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body className={hideNavbarFooter ? "with-navbar" : ""}>
        <BootstrapClient />
        {hideNavbarFooter && <Navbar />}
        {children}
        <ToastContainer />
        {hideNavbarFooter && <Footer />}
      </body>
    </html>
  );
}
