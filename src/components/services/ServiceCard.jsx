import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {
	const Icon = service.icon;

	return (
		<article
			id={service.id}
			className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
		>
			<div className="relative h-36 shrink-0 overflow-hidden">
				<img
					src={service.image}
					alt=""
					className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/35 to-transparent" />
				<div className="absolute -bottom-1 left-5 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-600 shadow-md transition duration-300 group-hover:text-amber-500">
					<Icon size={27} strokeWidth={1.8} />
				</div>
			</div>

			<div className="flex flex-1 flex-col p-7 pt-10">
				<h3 className="mb-3 text-xl font-bold text-[#0F2747] transition-colors duration-300 group-hover:text-blue-600">
					{service.title}
				</h3>

				<p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
					{service.description}
				</p>

				<Link
					to="/solicitar-servico"
					className="inline-flex items-center text-sm font-semibold text-cyan-600 transition-colors duration-300 group-hover:text-[#0F2747]"
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
