import { Link } from "react-router-dom";

import FacebookIcon from "../../assets/icons/Facebook.png";
import InstagramIcon from "../../assets/icons/Instagram.png";
import YoutubeIcon from "../../assets/icons/YouTube.png";
import WhatsappIcon from "../../assets/icons/Whatsapp.png";

import { Mail, Phone, MapPin, Clock } from "lucide-react";

function Footer() {
    return (
        <footer className="w-full bg-slate-900 text-white">

            {/* CONTEÚDO PRINCIPAL */}
            <div className="mx-auto max-w-7xl px-6 py-10">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                    {/* MARCA */}
                    <div>

                        <div className="mb-4 flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                                <span className="font-bold text-white">
                                    ST
                                </span>
                            </div>

                            <span className="text-lg font-bold">
                                Suporte-Trabalhos
                            </span>

                        </div>

                        <p className="max-w-sm text-sm leading-relaxed text-white/70">
                            Suporte informático profissional para computadores,
                            redes, software, backups e manutenção.
                        </p>

                        {/* REDES SOCIAIS */}
                        <div className="mt-5 flex gap-3">

                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="rounded-lg p-1 transition hover:bg-white/10 hover:opacity-80"
                            >
                                <img
                                    src={FacebookIcon}
                                    alt="Facebook"
                                    className="h-7 w-7"
                                />
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="rounded-lg p-1 transition hover:bg-white/10 hover:opacity-80"
                            >
                                <img
                                    src={InstagramIcon}
                                    alt="Instagram"
                                    className="h-7 w-7"
                                />
                            </a>

                            <a
                                href="https://www.youtube.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                                className="rounded-lg p-1 transition hover:bg-white/10 hover:opacity-80"
                            >
                                <img
                                    src={YoutubeIcon}
                                    alt="YouTube"
                                    className="h-7 w-7"
                                />
                            </a>

                            <a
                                href="https://www.whatsapp.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="WhatsApp"
                                className="rounded-lg p-1 transition hover:bg-white/10 hover:opacity-80"
                            >
                                <img
                                    src={WhatsappIcon}
                                    alt="WhatsApp"
                                    className="h-7 w-7"
                                />
                            </a>

                        </div>

                    </div>


                    {/* SERVIÇOS */}
                    <div>

                        <h3 className="mb-4 text-base font-semibold">
                            Serviços
                        </h3>

                        <ul className="space-y-2.5 text-sm">

                            <li>
                                <Link
                                    to="/servicos#manutencao"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Manutenção de computadores
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/servicos#instalacao"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Instalação de software
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/servicos#redes"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Redes e Internet
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/servicos#backup"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Backup e recuperação
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/servicos#remoto"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Suporte remoto
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* CONTACTOS */}
                    <div>

                        <h3 className="mb-4 text-base font-semibold">
                            Contactos
                        </h3>

                        <ul className="space-y-3 text-sm">

                            <li className="flex items-start gap-3">

                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

                                <span className="text-white/70">
                                    suportetrabalhos@gmail.com
                                </span>

                            </li>

                            <li className="flex items-start gap-3">

                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

                                <span className="text-white/70">
                                    +258 84 256 7470
                                </span>

                            </li>

                            <li className="flex items-start gap-3">

                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

                                <span className="text-white/70">
                                    Matola, Moçambique
                                </span>

                            </li>

                            <li className="flex items-start gap-3">

                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

                                <span className="text-white/70">
                                    Segunda a Sábado
                                </span>

                            </li>

                        </ul>

                    </div>

                </div>


                {/* LINHA INFERIOR */}
                <div className="mt-10 border-t border-white/10 pt-5">

                    <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/60 md:flex-row">

                        <p>
                            © {new Date().getFullYear()} Suporte-Trabalhos.
                            Todos os direitos reservados.
                        </p>

                        <div className="flex gap-5">

                            <Link
                                to="/privacidade"
                                className="transition hover:text-accent"
                            >
                                Política de Privacidade
                            </Link>

                            <Link
                                to="/termos"
                                className="transition hover:text-accent"
                            >
                                Termos de Uso
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;