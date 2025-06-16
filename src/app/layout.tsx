
// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }:{ children: React.ReactNode}) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}