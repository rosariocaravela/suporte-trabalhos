import { useState } from "react";
import { Play, Search, Video } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";
import performanceImage from "../../assets/images/contents/performance.jpg";
import backupImage from "../../assets/images/contents/backup.jpg";
import networksImage from "../../assets/images/contents/networks.jpg";
import securityImage from "../../assets/images/contents/security.jpg";
import installationImage from "../../assets/images/services/installation.jpg";
import remoteImage from "../../assets/images/services/remote.jpg";

const videos = [
	{
		id: "video-performance",
		title: "Como melhorar o desempenho do computador",
		description: "Dicas simples para deixar o computador mais rápido e estável.",
		category: "Informática",
		image: performanceImage,
	},
	{
		id: "video-backup",
		title: "Como fazer backup dos seus ficheiros",
		description: "Aprenda a proteger documentos, fotografias e outros dados importantes.",
		category: "Backups",
		image: backupImage,
	},
	{
		id: "video-networks",
		title: "Como resolver problemas de Wi-Fi",
		description: "Verificações rápidas para identificar uma ligação lenta ou instável.",
		category: "Redes",
		image: networksImage,
	},
	{
		id: "video-security",
		title: "Boas práticas de segurança digital",
		description: "Cuidados essenciais para proteger contas, dispositivos e informações.",
		category: "Segurança",
		image: securityImage,
	},
	{
		id: "video-installation",
		title: "Cuidados antes de instalar um programa",
		description: "Verifique a origem dos programas e evite instalações inseguras.",
		category: "Instalação",
		image: installationImage,
	},
	{
		id: "video-remote",
		title: "Como funciona o suporte remoto",
		description: "Entenda como receber assistência à distância com segurança.",
		category: "Suporte remoto",
		image: remoteImage,
	},
	{
		id: "video-recovery",
		title: "O que fazer quando perde um ficheiro",
		description: "Primeiros passos para tentar recuperar um documento importante.",
		category: "Backups",
		image: backupImage,
	},
];

function Videos() {
	const [searchTerm, setSearchTerm] = useState("");
	const normalizedSearch = searchTerm.trim().toLowerCase();
	const visibleVideos = videos.filter((video) => !normalizedSearch || `${video.title} ${video.description} ${video.category}`.toLowerCase().includes(normalizedSearch));

	return (
		<PublicLayout>
			<main className="bg-[#F5F7FA] px-6 py-16 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<header className="mx-auto max-w-3xl text-center">
						<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#155E75]/15 bg-[#155E75]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#155E75]">
							<Video size={15} /> Aprenda com exemplos
						</div>
						<h1 className="text-4xl font-bold tracking-tight text-[#0F2747] md:text-5xl">
							Vídeos de tecnologia
						</h1>
						<p className="mt-5 text-lg leading-8 text-gray-600">
							Tutoriais curtos para ajudar a resolver problemas comuns e cuidar melhor dos seus equipamentos.
						</p>
					</header>

					<div className="relative mx-auto mt-10 max-w-xl">
						<Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="search"
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder="Pesquisar vídeos..."
							aria-label="Pesquisar vídeos"
							className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-[#155E75] focus:ring-2 focus:ring-[#155E75]/10"
						/>
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{visibleVideos.map((video) => (
							  <article id={video.id} key={video.title} className="group flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
								<div className="relative h-48 overflow-hidden">
									<img src={video.image} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
									<div className="absolute inset-0 bg-[#0F2747]/25" />
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A72C] text-[#0F2747] shadow-lg transition group-hover:scale-110">
											<Play size={24} fill="currentColor" />
										</span>
									</div>
								</div>
								<div className="flex flex-1 flex-col p-6">
									<span className="w-fit rounded-md bg-[#155E75]/10 px-3 py-1 text-xs font-bold text-[#155E75]">{video.category}</span>
									<h2 className="mt-4 text-lg font-bold leading-snug text-[#0F2747]">{video.title}</h2>
									<p className="mt-3 flex-1 leading-7 text-gray-600">{video.description}</p>
									<a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2747] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#155E75]">
										Assistir vídeo <Play size={16} fill="currentColor" />
									</a>
								</div>
							</article>
						))}
					</div>
					{visibleVideos.length === 0 && <p className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">Nenhum vídeo encontrado.</p>}
				</div>
			</main>
		</PublicLayout>
	);
}

export default Videos;
