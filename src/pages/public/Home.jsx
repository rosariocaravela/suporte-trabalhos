import PublicLayout from "../../layouts/PublicLayout";

import accountingDay from "../../assets/images/accounting-day.png";
import accountingNight from "../../assets/images/accounting-night.png";

function Home() {
  return (
    <PublicLayout>

      {/* Hero */}
      <section className="relative min-h-[76vh] overflow-hidden">

        {/* Imagem de dia */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${accountingDay})`,
          }}
        />

        {/* Imagem de noite */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 animate-hero-night"
          style={{
            backgroundImage: `url(${accountingNight})`,
          }}
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-[#0F2747]/25" />

        {/* Gradiente lateral para melhorar a leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747]/90 via-[#0F2747]/30 to-transparent" />

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-7xl items-center px-6 py-20">

          <div className="max-w-3xl">

            {/* Título */}
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">

              Simplifique a sua

              <span className="block text-[#D4A72C]">
                gestão financeira.
              </span>

            </h1>

            {/* Descrição */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Serviços de contabilidade profissionais, seguros e
              personalizados para particulares e empresas.
            </p>

            {/* Botões */}
            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="/services"
                className="rounded-full bg-[#D4A72C] px-7 py-3.5 font-semibold text-[#0F2747] shadow-lg transition duration-300 hover:scale-105 hover:bg-[#e5b936]"
              >
                Conhecer os serviços
                <span className="ml-2">→</span>
              </a>

              <a
                href="/about"
                className="rounded-full border border-white/70 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-[#0F2747]"
              >
                Saber mais
              </a>

            </div>

          </div>

        </div>

      </section>

    </PublicLayout>
  );
}

export default Home;