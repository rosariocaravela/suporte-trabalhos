import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Services from "../pages/public/Services";
import ServiceRequest from "../pages/client/ServiceRequest";
import Contents from "../pages/public/Contents";
import Videos from "../pages/public/Videos";
import FAQ from "../pages/public/FAQ";
import Privacy from "../pages/public/Privacy";
import Terms from "../pages/public/Terms";

function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/solicitar-servico" element={<ServiceRequest />} />
            <Route path="/conteudos" element={<Contents />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default PublicRoutes;