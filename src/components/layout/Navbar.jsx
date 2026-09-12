import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logos/suporte-trabalhos.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-10 py-2 md:px-12">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Suporte-Trabalhos"
            className="h-16 w-auto object-contain md:h-20"
          />
        </a>

        {/* MENU DESKTOP */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium transition hover:text-primary ${
                isActive
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-gray-700"
              }`
            }
          >
            Início
          </NavLink>

          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `font-medium transition hover:text-primary ${
                isActive
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-gray-700"
              }`
            }
          >
            Sobre
          </NavLink>

          <NavLink
            to="/servicos"
            className={({ isActive }) =>
              `font-medium transition hover:text-primary ${
                isActive
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-gray-700"
              }`
            }
          >
            Serviços
          </NavLink>

          <NavLink
            to="/conteudos"
            className={({ isActive }) =>
              `font-medium transition hover:text-primary ${
                isActive
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-gray-700"
              }`
            }
          >
            Conteúdos
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `font-medium transition hover:text-primary ${
                isActive
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-gray-700"
              }`
            }
          >
            Contacto
          </NavLink>
        </div>

        {/* BOTÕES DESKTOP */}
        <div className="hidden items-center gap-3 md:flex">

          <button
            className="
              rounded-lg
              border
              border-primary
              px-4
              py-2
              font-medium
              text-primary
              transition
              hover:bg-primary
              hover:text-white
            "
          >
            Entrar
          </button>

          <button
            className="
              rounded-lg
              bg-accent
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:opacity-90
            "
          >
            Solicitar serviço
          </button>

        </div>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-gray-300 p-2 md:hidden"
          aria-label="Abrir menu"
        >
          {menuOpen ? (
            <span className="text-2xl">×</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>

      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="border-t bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              end
              className={({ isActive }) =>
                `font-medium hover:text-primary ${
                  isActive
                    ? "border-b-2 border-primary pb-1 text-primary"
                    : "text-gray-700"
                }`
              }
            >
              Início
            </NavLink>

            <NavLink
              to="/sobre"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-medium hover:text-primary ${
                  isActive
                    ? "border-b-2 border-primary pb-1 text-primary"
                    : "text-gray-700"
                }`
              }
            >
              Sobre
            </NavLink>

            <NavLink
              to="/servicos"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-medium hover:text-primary ${
                  isActive
                    ? "border-b-2 border-primary pb-1 text-primary"
                    : "text-gray-700"
                }`
              }
            >
              Serviços
            </NavLink>

            <NavLink
              to="/conteudos"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-medium hover:text-primary ${
                  isActive
                    ? "border-b-2 border-primary pb-1 text-primary"
                    : "text-gray-700"
                }`
              }
            >
              Conteúdos
            </NavLink>

            <NavLink
              to="/contacto"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-medium hover:text-primary ${
                  isActive
                    ? "border-b-2 border-primary pb-1 text-primary"
                    : "text-gray-700"
                }`
              }
            >
              Contacto
            </NavLink>

            {/* BOTÕES MOBILE */}
            <div className="mt-2 flex flex-col gap-3 border-t pt-4">

              <button
                className="
                  w-full
                  rounded-lg
                  border
                  border-primary
                  px-4
                  py-2
                  font-medium
                  text-primary
                "
              >
                Entrar
              </button>

              <button
                className="
                  w-full
                  rounded-lg
                  bg-accent
                  px-4
                  py-2
                  font-medium
                  text-white
                "
              >
                Solicitar serviço
              </button>

            </div>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;