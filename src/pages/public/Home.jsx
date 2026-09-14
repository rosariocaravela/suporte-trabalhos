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

          </div>

        </div>

      </section>

            {/* SOBRE O PROFISSIONAL - RESUMO */}
      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* IMAGEM */}
            <div className="relative">

              <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-[#D4A72C]/20" />

              <div className="relative overflow-hidden rounded-3xl shadow-lg">
                <img
                  src="/images/profissional.jpg"
                  alt="Profissional de assistência informática"
                  className="h-[380px] w-full object-cover"
                />
              </div>

            </div>


            {/* TEXTO */}
            <div>

              <h2 className="text-3xl font-bold leading-tight text-[#0F2747] md:text-4xl">
                Tecnologia, suporte e soluções para o seu dia a dia
              </h2>

              <p className="mt-6 leading-7 text-gray-600">
                Profissional de assistência informática dedicado a ajudar
                pessoas e empresas a resolver problemas tecnológicos de
                forma simples, segura e eficiente.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Oferecemos suporte técnico, manutenção, configuração de
                sistemas, redes e desenvolvimento de soluções tecnológicas.
              </p>


              {/* VALORES RESUMIDOS */}
              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                  ✓ Profissionalismo
                </span>

                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                  ✓ Confiança
                </span>

                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                  ✓ Segurança
                </span>

                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                  ✓ Organização
                </span>

              </div>


              {/* BOTÃO */}
              <div className="mt-8">

                <Link
                  to="/sobre"
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-[#D4A72C]
                    px-7
                    py-3.5
                    font-semibold
                    text-[#0F2747]
                    shadow-md
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#e5b936]
                    hover:shadow-lg
                  "
                >
                  Conheça o profissional
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </PublicLayout>
  );
}

export default Home;