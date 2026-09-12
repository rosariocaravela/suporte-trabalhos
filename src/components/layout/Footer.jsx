import FacebookIcon from "../../assets/icons/Facebook.png";
import InstagramIcon from "../../assets/icons/Instagram.png";
import YoutubeIcon from "../../assets/icons/YouTube.png";
import WhatsappIcon from "../../assets/icons/Whatsapp.png";

import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
    return (
        <footer className="w-full bg-primary text-white">

            {/* CONTEÚDO PRINCIPAL */}
            <div className="mx-auto max-w-7xl px-6 py-8">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

                    {/* MARCA */}
                    <div>

                        <div className="mb-3 flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                                <span className="font-bold text-white">
                                    ST
                                </span>
                            </div>

                            <span className="text-lg font-bold">
                                Suporte-Trabalhos
                            </span>

                        </div>

                        <p className="max-w-sm text-sm leading-relaxed text-white/70">
                            Serviços de contabilidade com profissionalismo,
                            confiança, segurança e simplicidade.
                        </p>

                        {/* REDES SOCIAIS */}
                        <div className="mt-4 flex gap-4">

                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="transition hover:opacity-80"
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
                                className="transition hover:opacity-80"
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
                                className="transition hover:opacity-80"
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
                                className="transition hover:opacity-80"
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

                        <h3 className="mb-3 text-base font-semibold">
                            Serviços
                        </h3>

                        <ul className="space-y-2 text-sm">

                            <li>
                                <a
                                    href="/servicos"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Contabilidade
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/servicos"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Consultoria
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/servicos"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Gestão financeira
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/servicos"
                                    className="text-white/70 transition hover:text-accent"
                                >
                                    Declarações fiscais
                                </a>
                            </li>

                        </ul>

                    </div>


                    {/* CONTACTOS */}
                    <div>

                        <h3 className="mb-3 text-base font-semibold">
                            Contactos
                        </h3>

                        <ul className="space-y-2.5 text-sm">

                            <li className="flex items-center gap-3">

                                <Mail className="h-4 w-4 shrink-0 text-accent" />

                                <span className="text-white/70">
                                    email@suporte-trabalhos.com
                                </span>

                            </li>

                            <li className="flex items-center gap-3">

                                <Phone className="h-4 w-4 shrink-0 text-accent" />

                                <span className="text-white/70">
                                    +258 XX XXX XXXX
                                </span>

                            </li>

                            <li className="flex items-center gap-3">

                                <MapPin className="h-4 w-4 shrink-0 text-accent" />

                                <span className="text-white/70">
                                    Maputo, Moçambique
                                </span>

                            </li>

                        </ul>

                    </div>

                </div>


                {/* LINHA INFERIOR */}
                <div className="mt-7 border-t border-white/10 pt-5">

                    <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/60 md:flex-row">

                        <p>
                            © {new Date().getFullYear()} Suporte-Trabalhos.
                            Todos os direitos reservados.
                        </p>

                        <div className="flex gap-5">

                            <a
                                href="/privacidade"
                                className="transition hover:text-accent"
                            >
                                Política de Privacidade
                            </a>

                            <a
                                href="/termos"
                                className="transition hover:text-accent"
                            >
                                Termos de Uso
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
