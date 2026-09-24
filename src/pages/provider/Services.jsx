import { BookOpenText, Clapperboard, Plus, Wrench } from "lucide-react";

function Services() {
	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Oferta profissional</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meus serviços</h1>
					<p className="mt-2 text-slate-500">Publique e mantenha atualizados os serviços, conteúdos e vídeos que oferece.</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-hover">
						<Plus className="h-5 w-5" />
						Adicionar serviço
					</button>
				</div>
			</header>

			<section className="mt-8 grid gap-4 md:grid-cols-3">
				<SummaryCard
					title="Serviços"
					value="0"
					description="Ofertas disponibilizadas aos clientes"
					icon={<Wrench className="h-6 w-6" />}
					accent="bg-blue-50 text-primary"
				/>
				<SummaryCard
					title="Conteúdos"
					value="0"
					description="Artigos, dicas e materiais educativos"
					icon={<BookOpenText className="h-6 w-6" />}
					accent="bg-cyan-50 text-secondary"
				/>
				<SummaryCard
					title="Vídeos"
					value="0"
					description="Tutoriais e demonstrações em vídeo"
					icon={<Clapperboard className="h-6 w-6" />}
					accent="bg-amber-50 text-amber-600"
				/>
			</section>

			<section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
				<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-secondary">
					<Wrench className="h-7 w-7" />
				</div>
				<h2 className="mt-5 text-xl font-bold text-primary">Ainda não publicou nada</h2>
				<p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
					Adicione serviços, conteúdos e vídeos para apresentar a sua experiência e aumentar a confiança dos clientes.
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-3">
					<button type="button" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-secondary">
						<Plus className="h-4 w-4" />
						Criar primeiro serviço
					</button>
					<button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
						<BookOpenText className="h-4 w-4" />
						Adicionar conteúdo
					</button>
				</div>
			</section>
		</div>
	);
}

function SummaryCard({ title, value, description, icon, accent }) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="flex items-center justify-between gap-3">
				<div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>{icon}</div>
				<span className="text-3xl font-bold text-slate-900">{value}</span>
			</div>
			<h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
			<p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
		</div>
	);
}

export default Services;
