import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

import supportDay from "../../assets/images/support-day.png";
import supportNight from "../../assets/images/support-night.png";

function Home() {
  return (
    <PublicLayout>

      {/* HERO */}
      <section className="relative min-h-[64vh] overflow-hidden">

        {/* IMAGEM DE DIA */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${supportDay})`,
          }}
        />

        {/* IMAGEM DE NOITE */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 animate-hero-night"
          style={{
            backgroundImage: `url(${supportNight})`,
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-[#0F2747]/25" />

        {/* GRADIENTE PARA LEITURA DO TEXTO */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747]/90 via-[#0F2747]/45 to-transparent" />

        {/* CONTEÚDO */}
        <div className="relative z-10 mx-auto flex min-h-[64vh] max-w-7xl items-center px-6 py-14">

          <div className="max-w-3xl">
            {/* TÍTULO */}
            <h1 className="mt-0 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">

              <span className="block whitespace-nowrap">
                Soluções tecnológicas para
              </span>

              <span className="block whitespace-nowrap text-[#D4A72C]">
                desafios reais.
              </span>

            </h1>

            {/* DESCRIÇÃO */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Serviços profissionais de engenharia informática para desenvolvimento
              de sistemas, redes, suporte técnico, segurança, backups e soluções
              tecnológicas personalizadas.
            </p>

            {/* BOTÕES */}
            <div className="mt-8 flex flex-wrap gap-4">

              {/* SERVIÇOS */}
              <Link
                to="/servicos"
                className="
                  rounded-full
                  bg-[#D4A72C]
                  px-7
                  py-3.5
                  font-semibold
                  text-[#0F2747]
                  shadow-lg
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#e5b936]
                  hover:shadow-xl
                "
              >
                Ver serviços
                <span className="ml-2">→</span>
              </Link>

              {/* SOLICITAR SUPORTE */}
              <Link
                to="/solicitar-servico"
                className="
                  rounded-full
                  border
                  border-white/70
                  bg-white/10
                  px-7
                  py-3.5
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:text-[#0F2747]
                "
              >
                Solicitar suporte
              </Link>

            </div>

            {/* SERVIÇOS RÁPIDOS */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">

              <span>✓ Manutenção</span>

              <span>✓ Backup</span>

              <span>✓ Redes</span>

              <span>✓ Suporte remoto</span>

            </div>

          </div>

        </div>

      </section>

    </PublicLayout>
  );
}

export default Home;