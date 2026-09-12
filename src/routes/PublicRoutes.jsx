import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/public/Home";
/*import About from "../pages/public/About";
import Services from "../pages/public/Services";
import Contents from "../pages/public/Contents";
import Videos from "../pages/public/Videos";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";*/

function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            {/*
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contents" element={<Contents />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />*/}
        </Routes>
    );
}

export default PublicRoutes;