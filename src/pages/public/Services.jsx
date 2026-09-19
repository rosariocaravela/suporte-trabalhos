import {
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import services from "../../data/services";
import ServiceCard from "../../components/services/ServiceCard";
import PublicLayout from "../../layouts/PublicLayout";

function Services() {
  return (
    <PublicLayout>
      <section
        id="servicos"
        className="bg-slate-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

        {/* Cabeçalho */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />

            <span className="text-xs font-semibold uppercase tracking-wide text-[#0F2747]">
              Especialização Técnica
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0F2747] sm:text-4xl">
            Serviços
          </h2>

          <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-blue-600" />

          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Soluções informáticas para manter os seus equipamentos,
            sistemas e redes seguros, estáveis e eficientes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">

          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 md:mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-[#0F2747] via-[#12345C] to-slate-900 p-8 text-white shadow-xl sm:p-10 md:rounded-3xl md:p-12">

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">

              <div className="max-w-xl">
                <h3 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Precisa de assistência informática?
                </h3>

                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  Entre em contacto para encontrar uma solução adequada
                  para o seu problema.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/solicitar-servico"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-7 py-3.5 text-base font-bold text-[#0F2747] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 sm:w-auto"
                >
                  Solicitar suporte

                  <ArrowRight
                    size={20}
                    className="ml-2"
                  />
                </Link>
              </div>

            </div>
          </div>
        </div>

        </div>
      </section>
    </PublicLayout>
  );
}

export default Services;