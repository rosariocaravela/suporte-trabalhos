import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/logos/suporte-trabalhos.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent"
        : "text-gray-700 hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center"
          aria-label="Suporte-Trabalhos - Página inicial"
        >
          <img
            src={Logo}
            alt="Suporte-Trabalhos"
            className="h-16 w-auto object-contain sm:h-[4.5rem]"
          />
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden items-center gap-8 lg:flex">

          <NavLink to="/" end className={navLinkClass}>
            Início
          </NavLink>

          <NavLink to="/sobre" className={navLinkClass}>
            Sobre
          </NavLink>

          <NavLink to="/servicos" className={navLinkClass}>
            Serviços
          </NavLink>

          <NavLink to="/conteudos" className={navLinkClass}>
            Conteúdos
          </NavLink>

          <NavLink to="/videos" className={navLinkClass}>
            Vídeos
          </NavLink>

          <NavLink to="/faq" className={navLinkClass}>
            FAQ
          </NavLink>

          <NavLink to="/contacto" className={navLinkClass}>
            Contacto
          </NavLink>

        </div>

        {/* AÇÕES DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">

          <Link
            to="/login"
            className="
              rounded-lg
              border
              border-primary
              px-4
              py-2.5
              text-sm
              font-semibold
              text-primary
              transition-all
              duration-200
              hover:bg-primary
              hover:text-white
            "
          >
            Entrar
          </Link>

          <NavLink
            to="/solicitar-servico"
            className="
              relative
              rounded-lg
              bg-accent
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:opacity-90
              hover:shadow-md
            "
          >
            Solicitar suporte
          </NavLink>

        </div>

        {/* BOTÃO MOBILE */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-gray-300
            text-gray-700
            transition
            hover:border-primary
            hover:text-primary
            lg:hidden
          "
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <span className="text-xl leading-none">☰</span>
          )}
        </button>

      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white shadow-lg lg:hidden">

          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">

            <div className="flex flex-col gap-1">

              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={navLinkClass}
              >
                Início
              </NavLink>

              <NavLink
                to="/sobre"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Sobre
              </NavLink>

              <NavLink
                to="/servicos"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Serviços
              </NavLink>

              <NavLink
                to="/conteudos"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Conteúdos
              </NavLink>

              <NavLink
                to="/videos"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Vídeos
              </NavLink>

              <NavLink
                to="/faq"
                onClick={closeMenu}
                className={navLinkClass}
              >
                FAQ
              </NavLink>

              <NavLink
                to="/contacto"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Contacto
              </NavLink>

            </div>

            {/* AÇÕES MOBILE */}
            <div className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-5">

              <Link
                to="/login"
                onClick={closeMenu}
                className="
                  w-full
                  rounded-lg
                  border
                  border-primary
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-primary
                  transition
                  hover:bg-primary
                  hover:text-white
                "
              >
                Entrar
              </Link>

              <NavLink
                to="/solicitar-servico"
                onClick={closeMenu}
                className="
                  relative
                  w-full
                  rounded-lg
                  bg-accent
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Solicitar suporte
              </NavLink>

            </div>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;