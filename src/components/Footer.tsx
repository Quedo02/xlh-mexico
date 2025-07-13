export default function Footer() {
    const year = new Date().getFullYear();
    return (
    <footer className="footer bg-footer text-white py-5 mt-auto">
        <div className="container">
            <div className="row text-center text-md-start">
                {/* Columna Empresa */}
                <div className="col-12 col-md-3 mb-4">
                    <h5 className="fw-bold">XlHMexico</h5>
                    <ul className="list-unstyled">
                        <li><a href="/nosotros" className="text-white text-decoration-none">Quiénes somos</a></li>
                        <li><a href="#" className="text-white text-decoration-none">Contacto</a></li>
                    </ul>
                </div>
                {/* Columna Recursos */}
                <div className="col-12 col-md-3 mb-4">
                    <h5 className="fw-bold">Recursos</h5>
                    <ul className="list-unstyled">
                        <li><a href="#" className="text-white text-decoration-none">Aviso de privacidad</a></li>
                        <li><a href="#" className="text-white text-decoration-none">Marcas y licencias</a></li>
                    </ul>
                </div>
                {/* Columna Ayuda */}
                <div className="col-12 col-md-3 mb-4">
                    <h5 className="fw-bold">Ayuda</h5>
                    <ul className="list-unstyled">
                        <li><a href="#" className="text-white text-decoration-none">Centro de soporte</a></li>
                        <li><a href="#" className="text-white text-decoration-none">Reportar un problema</a></li>
                    </ul>
                </div>
                {/* Columna Redes */}
                <div className="col-12 col-md-3 mb-4">
                    <h5 className="fw-bold">Síguenos</h5>
                    <div className="d-flex justify-content-center justify-content-md-start gap-3">
                        <a href="https://www.facebook.com/XLHMexico" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
                        <a href="https://instagram.com/xlhmexico" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
                        <a href="https://www.youtube.com/channel/UCptD44u67BRvNuU-q8dtslg" className="text-white fs-5"><i className="bi bi-youtube"></i></a>
                        <a href="https://twitter.com/xlhmexico" target="_blank" rel="noopener noreferrer" className="text-white fs-5"><i className="bi bi-twitter-x"></i></a>
                        <a href="https://www.linkedin.com/in/xlh-mexico" target="_blank" rel="noopener noreferrer" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>
            {/* Línea inferior */}
            <hr className="border-white opacity-50" />
            <div className="text-center small">
                <p className="mb-0 fw-bold">© {year} XLH México</p>
                <p className="mb-0">Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  );
}
