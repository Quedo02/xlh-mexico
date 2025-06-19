
// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BootstrapClient from '@/components/BootstrapClient';


export default function RootLayout({ children }:{ children: React.ReactNode}) {
  return (
    <html>
      <body>
        <BootstrapClient />
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}