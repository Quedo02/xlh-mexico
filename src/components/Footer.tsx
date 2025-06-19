export default function Footer() {
    return (
        <footer className="footer bg-footer text-white py-4 mt-auto">
            <div className="container text-center d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div>
                    <p className="mb-0 fw-bold">© {new Date().getFullYear()} XLH México</p>
                    <p className="mb-0">Todos los derechos reservados.</p>
                </div>
                <div>
                    <p className="mb-0">
                        <i className="bi bi-telephone-fill me-2"></i>
                        <a href="tel:9512241795" className="text-white text-decoration-none">951 224 1795</a>
                    </p>
                    <p className="mb-0">
                        <i className="bi bi-envelope-fill me-2"></i>
                        <a href="mailto:xlhmexico@gmail.com" className="text-white text-decoration-none">xlhmexico@gmail.com</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}