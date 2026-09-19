import PublicLayout from "../../layouts/PublicLayout";
import { Link } from "react-router-dom";

import {
    Mail,
    Phone,
    MessageCircle,
    MapPin,
    Clock,
    ArrowRight,
} from "lucide-react";

const Contact = () => {
    return (
        <PublicLayout>
            <main className="bg-white">

                {/* HERO */}
                <section className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

                        <div className="max-w-4xl">

                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-1 w-10 rounded-full bg-[#D4A72C]" />

                                <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#155E75]">
                                    Contacte-nos
                                </span>
                            </div>

                            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[#0F2747] sm:text-6xl lg:text-7xl">
                                Vamos encontrar a{" "}
                                <span className="text-[#D4A72C]">
                                    solução tecnológica
                                </span>{" "}
                                certa para si.
                            </h1>

                            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
                                Conte-nos o que precisa. Estamos disponíveis para
                                ajudar a encontrar a solução adequada às suas necessidades.
                            </p>

                        </div>
                    </div>
                </section>


                {/* CONTACTOS + FORMULÁRIO */}
                <section className="bg-gray-50 py-20 lg:py-28">

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">

                            {/* CONTACTOS */}
                            <div>

                                <h2 className="text-3xl font-bold text-[#0F2747]">
                                    Fale connosco
                                </h2>

                                <p className="mt-4 max-w-lg text-gray-600">
                                    Tem alguma dúvida ou precisa de suporte?
                                    Entre em contacto connosco através de um dos
                                    nossos canais.
                                </p>


                                <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                                    {/* EMAIL */}
                                    <ContactItem
                                        icon={<Mail size={24} />}
                                        title="Email"
                                        value="suportetrabalhos@gmail.com"
                                        href="mailto:suportetrabalhos@gmail.com"
                                    />

                                    {/* WHATSAPP */}
                                    <ContactItem
                                        icon={<MessageCircle size={24} />}
                                        title="WhatsApp"
                                        value="+258 84 256 7470"
                                        href="https://wa.me/258842567470"
                                    />

                                    {/* TELEFONE */}
                                    <ContactItem
                                        icon={<Phone size={24} />}
                                        title="Telefone"
                                        value="+258 84 256 7470"
                                        href="tel:+258842567470"
                                    />

                                    {/* LOCALIZAÇÃO */}
                                    <ContactItem
                                        icon={<MapPin size={24} />}
                                        title="Localização"
                                        value="Maputo, Moçambique"
                                    />

                                    {/* HORÁRIO */}
                                    <ContactItem
                                        icon={<Clock size={24} />}
                                        title="Horário de atendimento"
                                        value="Segunda a Sexta — 08:00 às 17:00"
                                        last
                                    />

                                </div>


                                {/* WHATSAPP */}
                                <div className="mt-6 rounded-2xl bg-[#0F2747] p-8">

                                    <h3 className="text-xl font-bold text-[#D4A72C]">
                                        Precisa de uma resposta rápida?
                                    </h3>

                                    <p className="mt-3 text-gray-200">
                                        Fale connosco diretamente pelo WhatsApp.
                                    </p>

                                    <a
                                        href="https://wa.me/258842567470"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4A72C] px-6 py-3 font-semibold text-[#0F2747] transition hover:bg-[#c29620]"
                                    >
                                        Falar pelo WhatsApp
                                        <ArrowRight size={18} />
                                    </a>

                                </div>

                            </div>

                            {/* AÇÕES RÁPIDAS */}
                            <div className="flex flex-col justify-center rounded-2xl bg-[#0F2747] p-8 text-white shadow-sm sm:p-10">

                                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D4A72C]">
                                    Próximo passo
                                </p>

                                <h2 className="mt-4 text-3xl font-bold">
                                    Já sabe do que precisa?
                                </h2>

                                <p className="mt-4 leading-7 text-white/75">
                                    Envie um pedido de suporte com os detalhes do
                                    problema para receber uma orientação mais rápida.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Link
                                        to="/solicitar-servico"
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#D4A72C] px-5 py-3 font-bold text-[#0F2747] transition hover:bg-[#e5b936]"
                                    >
                                        Solicitar suporte
                                        <ArrowRight size={18} />
                                    </Link>

                                    <Link
                                        to="/servicos"
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
                                    >
                                        Ver serviços
                                    </Link>
                                </div>

                                <div className="mt-10 border-t border-white/15 pt-6">
                                    <p className="text-sm font-semibold text-white">
                                        Atendimento
                                    </p>
                                    <p className="mt-2 text-sm text-white/70">
                                        Segunda a Sábado, das 08:00 às 17:00
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* LOCALIZAÇÃO */}
                <section className="bg-white py-20">

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <h2 className="text-3xl font-bold text-[#0F2747]">
                            Encontre-nos
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Estamos disponíveis para atender às suas necessidades tecnológicas.
                        </p>

                        <div className="mt-8 flex min-h-[350px] items-center justify-center rounded-2xl bg-gray-100">

                            <div className="text-center">

                                <MapPin
                                    size={40}
                                    className="mx-auto text-[#155E75]"
                                />

                                <h3 className="mt-4 text-xl font-bold text-[#0F2747]">
                                    Maputo, Moçambique
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Mapa disponível para futura integração.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </PublicLayout>
    );
}


/* =====================================================
   COMPONENTE DE CONTACTO
===================================================== */

function ContactItem({ icon, title, value, href, last = false }) {
    return (
        <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noreferrer" : undefined}
            className={`flex items-center gap-5 p-6 ${!last ? "border-b border-gray-200" : ""
                } transition hover:bg-gray-50`}
        >

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#155E75]">
                {icon}
            </div>

            <div>

                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <p className="mt-1 font-semibold text-[#0F2747]">
                    {value}
                </p>

            </div>

        </a>
    );
}


export default Contact;