import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function PublicLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">

            {/* Navbar */}
            <Navbar />

            {/* Conteúdo da página */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default PublicLayout;