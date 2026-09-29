import { ArrowRight } from "lucide-react";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import ServiceCard from "../../components/services/ServiceCard";
import PublicLayout from "../../layouts/PublicLayout";
import usePublicServices from "../../hooks/usePublicServices";
import toServiceCard from "../../utils/servicePresentation";

function Services() {
	const { services, loading, error, retry } = usePublicServices();

	return (
		<PublicLayout>
			<main>
			{/* SERVIÇOS */}
			<section id="servicos" className="bg-slate-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
				<Container>
					{/* CABEÇALHO */}
					<div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/5 px-3 py-1">
							<span className="h-2 w-2 rounded-full bg-accent" />
							<span className="text-xs font-semibold uppercase tracking-wide text-primary">
								Especialização Técnica
							</span>
						</div>

						<h2 className="mb-4 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
							Serviços
						</h2>

						<div className="mx-auto mb-5 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-blue-600" />

						<p className="text-base leading-relaxed text-gray-600 sm:text-lg">
							Soluções informáticas para manter os seus equipamentos, sistemas e redes
							seguros, estáveis e eficientes.
						</p>
					</div>

					{/* CARDS */}
					{loading ? <p className="py-10 text-center text-slate-500" role="status">A carregar serviços...</p> : error ? (
						<div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700" role="alert">
							<p>{error}</p><button type="button" onClick={retry} className="mt-3 font-bold underline">Tentar novamente</button>
						</div>
					) : services.length === 0 ? (
						<p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">Ainda não há serviços publicados.</p>
					) : (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
							{services.map((service) => <ServiceCard key={service.id} service={toServiceCard(service)} />)}
						</div>
					)}

					{/* CTA */}
					<div className="mt-14 md:mt-20">
						<div className="relative overflow-hidden rounded-2xl border border-primary/50 bg-gradient-to-br from-primary via-[#12345C] to-slate-900 p-8 text-white shadow-xl sm:p-10 md:rounded-3xl md:p-12">
							<div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
								<div className="max-w-xl">
									<h3 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
										Precisa de assistência informática?
									</h3>
									<p className="text-sm leading-relaxed text-slate-300 sm:text-base">
										Entre em contacto para encontrar uma solução adequada para o seu
										problema.
									</p>
								</div>

								<div className="shrink-0">
									<Button to="/solicitar-servico" className="w-full sm:w-auto">
										Solicitar suporte
										<ArrowRight size={20} className="ml-2" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
			</main>
		</PublicLayout>
	);
}

export default Services;
