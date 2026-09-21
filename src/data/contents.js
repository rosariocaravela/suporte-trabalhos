import performanceImage from "../assets/images/contents/performance.jpg";
import maintenanceImage from "../assets/images/contents/maintenance.jpg";
import backupImage from "../assets/images/contents/backup.jpg";
import networksImage from "../assets/images/contents/networks.jpg";
import securityImage from "../assets/images/contents/security.jpg";
import installationImage from "../assets/images/services/installation.png";
import remoteImage from "../assets/images/services/remote.jpg";

export const contentCategories = [
	"Todos",
	"Informática",
	"Redes",
	"Segurança",
	"Manutenção",
	"Backups",
	"Instalação",
	"Suporte remoto",
];

const contents = [
	{
		id: "video-performance",
		category: "Informática",
		date: "20 Set 2026",
		title: "Como melhorar o desempenho do computador",
		description: "Passos simples para identificar lentidão, libertar espaço e tornar o equipamento mais estável.",
		image: performanceImage,
	},
	{
		id: "video-maintenance",
		category: "Manutenção",
		date: "18 Set 2026",
		title: "Manutenção preventiva: por onde começar",
		description: "Cuidados práticos para reduzir falhas e prolongar a vida útil do computador.",
		image: maintenanceImage,
	},
	{
		id: "video-networks",
		category: "Redes",
		date: "15 Set 2026",
		title: "Wi-Fi lento: causas mais comuns",
		description: "Veja o que pode afetar a ligação e quais verificações fazer antes de pedir assistência.",
		image: networksImage,
	},
	{
		id: "video-security",
		category: "Segurança",
		date: "12 Set 2026",
		title: "Como proteger os seus equipamentos",
		description: "Boas práticas para reduzir riscos, proteger contas e manter os dados mais seguros.",
		image: securityImage,
	},
	{
		id: "video-backup",
		category: "Backups",
		date: "10 Set 2026",
		title: "Backup: o que deve guardar primeiro",
		description: "Organize cópias dos seus documentos importantes e evite perder dados quando algo falhar.",
		image: backupImage,
	},
	{
		id: "video-installation",
		category: "Instalação",
		date: "08 Set 2026",
		title: "Cuidados antes de instalar um programa",
		description: "Saiba como verificar a origem dos programas e evitar instalações desnecessárias ou inseguras.",
		image: installationImage,
	},
	{
		id: "video-remote",
		category: "Suporte remoto",
		date: "05 Set 2026",
		title: "Como funciona o suporte remoto",
		description: "Entenda como receber assistência à distância com segurança e acompanhamento profissional.",
		image: remoteImage,
	},
	{
		id: "video-recovery",
		category: "Backups",
		date: "02 Set 2026",
		title: "O que fazer quando perde um ficheiro",
		description: "Primeiros passos para tentar recuperar um documento apagado ou inacessível.",
		image: backupImage,
	},
];

export default contents;
