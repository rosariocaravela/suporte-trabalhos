import { useEffect, useState } from "react";
import { Play, Search, Video } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import { listPublishedVideos } from "../../services/videoService";

function Videos() {
	const [searchTerm, setSearchTerm] = useState("");
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listPublishedVideos()
			.then((result) => { if (active) setVideos(result); })
			.catch((loadError) => {
				console.error("Não foi possível carregar os vídeos:", loadError);
				if (active) setError("Não foi possível carregar os vídeos publicados.");
			})
			.finally(() => { if (active) setLoading(false); });
		return () => { active = false; };
	}, []);

	const retry = async () => {
		setLoading(true);
		setError("");
		try {
			setVideos(await listPublishedVideos());
		} catch (loadError) {
			console.error("Não foi possível carregar os vídeos:", loadError);
			setError("Não foi possível carregar os vídeos publicados.");
		} finally {
			setLoading(false);
		}
	};

	const normalizedSearch = searchTerm.trim().toLowerCase();
	const visibleVideos = videos.filter(
		(video) =>
			!normalizedSearch ||
			`${video.title} ${video.description} ${video.category}`
				.toLowerCase()
				.includes(normalizedSearch),
	);

	return (
		<PublicLayout>
			{/* VÍDEOS */}
			<div className="bg-[#F5F7FA] px-6 py-16 lg:px-8 lg:py-24">
				<Container>
					<SectionHeading
						eyebrow="Aprenda com exemplos"
						icon={<Video size={15} />}
						title="Vídeos de tecnologia"
						description="Tutoriais curtos para ajudar a resolver problemas comuns e cuidar melhor dos seus equipamentos."
					/>

					{/* PESQUISA */}
					<div className="relative mx-auto mt-10 max-w-xl">
						<Search
							size={19}
							className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
						/>
						<input
							type="search"
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder="Pesquisar vídeos..."
							aria-label="Pesquisar vídeos"
							className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
						/>
					</div>

					{/* GRID */}
					{loading ? <p className="mt-12 text-center text-slate-500" role="status">A carregar vídeos...</p> : error ? (
						<div className="mt-12 rounded-xl bg-red-50 p-5 text-center text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-3 font-bold underline">Tentar novamente</button></div>
					) : visibleVideos.length === 0 ? <p className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">{videos.length ? "Nenhum vídeo encontrado." : "Ainda não há vídeos publicados."}</p> : (
					<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{visibleVideos.map((video) => (
							<article
								id={video.id}
								key={video.id}
								className="group flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
							>
								<div className="relative h-48 overflow-hidden">
									<div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-cyan-50" />
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-slate-900 shadow-lg transition group-hover:scale-110">
											<Play size={24} fill="currentColor" />
										</span>
									</div>
								</div>
								<div className="flex flex-1 flex-col p-6">
									<span className="w-fit rounded-md bg-cyan-50 px-3 py-1 text-xs font-bold text-primary">
										{video.category}
									</span>
									<h2 className="mt-4 text-lg font-bold leading-snug text-slate-900">
										{video.title}
									</h2>
									<p className="mt-3 flex-1 leading-7 text-gray-600">{video.description}</p>
									<a
										href={video.url}
										target="_blank"
										rel="noreferrer"
										className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-secondary"
									>
										Assistir vídeo <Play size={16} fill="currentColor" />
									</a>
								</div>
							</article>
						))}
					</div>
					)}
				</Container>
			</div>
		</PublicLayout>
	);
}

export default Videos;

