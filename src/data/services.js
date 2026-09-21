import {
  Wrench,
  Terminal,
  Zap,
  Database,
  Wifi,
  Monitor,
} from "lucide-react";
import repairImage from "../assets/images/services/repair.png";
import installationImage from "../assets/images/services/installation.png";
import maintenanceImage from "../assets/images/services/maintenance.jpg";
import backupImage from "../assets/images/services/backup.jpg";
import networksImage from "../assets/images/services/networks.jpg";
import remoteImage from "../assets/images/services/remote.jpg";

const services = [
  {
    id: "reparacao",
    title: "Diagnóstico e Reparação",
    description:
      "Identificação e resolução de problemas de hardware e software em computadores e outros equipamentos.",
    icon: Wrench,
    image: repairImage,
  },
  {
    id: "instalacao",
    title: "Formatação e Instalação",
    description:
      "Formatação, instalação e configuração de sistemas operativos, drivers e programas essenciais.",
    icon: Terminal,
    image: installationImage,
  },
  {
    id: "manutencao",
    title: "Manutenção e Otimização",
    description:
      "Manutenção preventiva, limpeza e otimização para melhorar o desempenho e a estabilidade dos equipamentos.",
    icon: Zap,
    image: maintenanceImage,
  },
  {
    id: "backup",
    title: "Backup e Recuperação de Dados",
    description:
      "Proteção, organização e recuperação de ficheiros através de soluções de backup.",
    icon: Database,
    image: backupImage,
  },
  {
    id: "redes",
    title: "Redes e Conectividade",
    description:
      "Configuração, diagnóstico e manutenção de redes, routers, Wi-Fi e dispositivos de rede.",
    icon: Wifi,
    image: networksImage,
  },
  {
    id: "remoto",
    title: "Suporte Remoto",
    description:
      "Assistência técnica à distância para diagnóstico, configuração e resolução de problemas.",
    icon: Monitor,
    image: remoteImage,
  },
];

export default services;
