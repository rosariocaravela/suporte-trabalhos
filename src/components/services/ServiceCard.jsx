import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {
	const Icon = service.icon;

	return (
		<article
			id={service.id}
			className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)]"
		>
			<div className="relative h-36 shrink-0 overflow-hidden">
				<img
					src={service.image}
					alt=""
					className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 to-transparent" />
				<div className="absolute -bottom-1 left-5 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-md transition duration-300 group-hover:text-secondary group-hover:shadow-lg">
					<Icon size={27} strokeWidth={1.8} />
				</div>
			</div>

			<div className="flex flex-1 flex-col p-7 pt-10">
				<h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-primary">
					{service.title}
				</h3>

				<p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
					{service.description}
				</p>

				<Link
					to="/solicitar-servico"
					className="inline-flex items-center text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-secondary"
				>
					<span>Saiba mais</span>
					<ArrowRight
						size={16}
						className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
					/>
				</Link>
			</div>
		</article>
	);
}

export default ServiceCard;
