import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Headphones, Wrench } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";
import useImagePosition from "../../hooks/useImagePosition";
import services from "../../data/services";
import ServiceCard from "../../components/services/ServiceCard";

import supportDay from "../../assets/images/support-day.png";
import supportNight from "../../assets/images/support-night.png";
import profissionalImage from "../../assets/images/profissional.png";

function Home() {
	const { imagePosition } = useImagePosition(profissionalImage);

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
							<span className="block whitespace-nowrap">Soluções tecnológicas para</span>
							<span className="block whitespace-nowrap text-[#D4A72C]">desafios reais.</span>
						</h1>

						{/* DESCRIÇÃO */}
						<p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
							Serviços profissionais de engenharia informática para desenvolvimento de
							sistemas, redes, suporte técnico, segurança, backups e soluções
							tecnológicas personalizadas.
						</p>

						{/* BOTÕES */}
						<div className="mt-8 flex flex-wrap gap-4">
							{/* SERVIÇOS */}
							<Link
								to="/servicos"
								className="rounded-full bg-[#D4A72C] px-7 py-3.5 font-semibold text-[#0F2747] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#e5b936] hover:shadow-xl"
							>
								Ver serviços
								<span className="ml-2">→</span>
							</Link>

							{/* SOLICITAR SUPORTE */}
							<Link
								to="/solicitar-servico"
								className="rounded-full border border-white/70 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#0F2747]"
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
							<div className="relative h-[380px] overflow-hidden rounded-3xl shadow-lg">
								<img
									src={profissionalImage}
									alt="Profissional de assistência informática"
									className="h-full w-full object-cover object-center"
									style={{
										objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
									}}
								/>
							</div>
						</div>

						{/* TEXTO */}
						<div>
							<h2 className="text-3xl font-bold leading-tight text-[#0F2747] md:text-4xl">
								Tecnologia, suporte e soluções para o seu dia a dia
							</h2>

							<p className="mt-6 leading-7 text-gray-600">
								Sou Engenheiro Informático e desenvolvo soluções tecnológicas práticas,
								seguras e eficientes para pessoas, profissionais.
							</p>

							<p className="mt-4 leading-7 text-gray-600">
								Presto serviços de desenvolvimento web, suporte informático,
								configuração de software, bases de dados, redes e soluções digitais,
								com foco na qualidade, simplicidade e nas necessidades de cada cliente.
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
									className="inline-flex items-center rounded-full bg-[#D4A72C] px-7 py-3.5 font-semibold text-[#0F2747] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#e5b936] hover:shadow-lg"
								>
									Conheça o profissional
									<span className="ml-2">→</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* SERVIÇOS EM DESTAQUE */}
			<section className="bg-[#F5F7FA] py-20">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
						<div className="max-w-2xl">
							<p className="text-sm font-bold uppercase tracking-[0.18em] text-[#155E75]">
								Soluções práticas
							</p>
							<h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
								Tecnologia que resolve o que importa
							</h2>
							<p className="mt-4 leading-7 text-gray-600">
								Desde uma avaria no computador até uma rede instável, encontre suporte
								adequado para cada necessidade.
							</p>
						</div>
						<Link to="/servicos" className="inline-flex items-center gap-2 font-bold text-[#155E75] hover:text-[#0F2747]">
							Ver todos os serviços <ArrowRight size={18} />
						</Link>
					</div>

					<div className="mt-10 grid gap-6 lg:grid-cols-3">
						{services.slice(0, 3).map((service) => (
							<ServiceCard key={service.id} service={service} />
						))}
					</div>
				</div>
			</section>

			{/* PROCESSO */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-[#155E75]">
							Como trabalhamos
						</p>
						<h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
							Do problema à solução
						</h2>
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-3">
						<ProcessStep
							icon={<ClipboardCheck />}
							number="01"
							title="Entendemos"
							text="Analisamos o problema e ouvimos as suas necessidades."
						/>
						<ProcessStep
							icon={<Wrench />}
							number="02"
							title="Resolvemos"
							text="Aplicamos uma solução adequada, segura e funcional."
						/>
						<ProcessStep
							icon={<Headphones />}
							number="03"
							title="Acompanhamos"
							text="Mantemos o apoio necessário depois da resolução."
						/>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}

function ProcessStep({ icon, number, title, text }) {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
			<div className="flex items-center justify-between text-[#155E75]">
				<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#155E75]/10">
					{icon}
				</div>
				<span className="text-3xl font-bold text-[#D4A72C]/70">{number}</span>
			</div>
			<h3 className="mt-6 text-xl font-bold text-[#0F2747]">{title}</h3>
			<p className="mt-3 leading-7 text-gray-600">{text}</p>
		</div>
	);
}

export default Home;