import performanceImage from "../assets/images/contents/performance.jpg";
import backupImage from "../assets/images/contents/backup.jpg";
import networksImage from "../assets/images/contents/networks.jpg";
import securityImage from "../assets/images/contents/security.jpg";
import installationImage from "../assets/images/services/installation.png";
import remoteImage from "../assets/images/services/remote.jpg";

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

export default videos;
