import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const DEFAULT_IMAGE = "/images/profissional.jpg";

const About = () => {
    const [selectedImage, setSelectedImage] = useState(DEFAULT_IMAGE);
    const photoInputId = "about-photo-upload";

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            setSelectedImage(DEFAULT_IMAGE);
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setSelectedImage(previewUrl);
        event.target.value = "";
    };

    return (
        <PublicLayout>

            {/* =====================================================
                SOBRE O PROFISSIONAL
            ====================================================== */}

            <section
                id="sobre"
                className="bg-white"
            >

                {/* =================================================
                    CABEÇALHO
                ================================================== */}

                <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">

                    <div className="max-w-3xl">

                        <h1 className="text-4xl font-bold tracking-tight text-[#0F2747] md:text-5xl">
                            Sobre o Profissional
                        </h1>

                        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                            Apoio técnico com experiência, clareza e rigor para resolver problemas reais com confiança.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    APRESENTAÇÃO
                ================================================== */}

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        {/* FOTO */}
                        <div className="relative">

                            {/* Elemento decorativo */}
                            <div className="absolute -bottom-5 -left-5 h-full w-full rounded-3xl bg-[#D4A72C]/20" />

                            <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl">

                                <img
                                    src={selectedImage}
                                    alt="Profissional de assistência informática"
                                    className="h-[480px] w-full object-cover"
                                />

                                <label
                                    htmlFor={photoInputId}
                                    className="absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#0F2747] shadow-md backdrop-blur-sm transition hover:bg-white"
                                >
                                    <span>📷</span>
                                    <span>Escolher foto</span>
                                    <input
                                        id={photoInputId}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>

                            </div>

                        </div>


                        {/* TEXTO */}
                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#155E75]">
                                Assistência Informática
                            </p>

                            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0F2747] md:text-4xl">
                                Experiência, apoio e soluções tecnológicas ao seu alcance
                            </h2>

                            <p className="mt-6 leading-8 text-gray-600">
                                Sou um profissional de assistência informática com foco em soluções práticas, seguras e eficazes para pessoas e empresas.
                                A minha missão é ajudar a resolver problemas tecnológicos com rapidez, clareza e atenção às necessidades de cada cliente.
                            </p>

                            <p className="mt-4 leading-8 text-gray-600">
                                Ao longo da minha atividade, tenho trabalhado em suporte técnico, manutenção de equipamentos, configuração de redes e desenvolvimento de soluções digitais,
                                sempre com uma abordagem profissional, responsável e orientada para resultados reais.
                            </p>


                            {/* VALORES */}
                            <div className="mt-8 flex flex-wrap gap-3">

                                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                                    ✓ Profissionalismo
                                </span>

                                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                                    ✓ Confiança
                                </span>

                                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                                    ✓ Segurança
                                </span>

                                <span className="rounded-full bg-[#0F2747]/5 px-4 py-2 text-sm font-medium text-[#0F2747]">
                                    ✓ Organização
                                </span>

                            </div>


                            <Link
                                to="/contacto"
                                className="
                                    mt-8
                                    inline-flex
                                    items-center
                                    rounded-full
                                    bg-[#D4A72C]
                                    px-7
                                    py-3.5
                                    font-semibold
                                    text-[#0F2747]
                                    shadow-md
                                    transition
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-[#e5b936]
                                    hover:shadow-lg
                                "
                            >
                                Entrar em contacto
                                <span className="ml-2">→</span>
                            </Link>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    COMO POSSO AJUDAR
                ================================================== */}

                <div className="mx-auto mt-28 max-w-7xl px-6 lg:px-8">

                    <div className="text-center">

                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#155E75]">
                            O que faço
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
                            Como posso ajudar
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                            Soluções práticas para diferentes necessidades de suporte, manutenção e tecnologia digital.
                        </p>

                    </div>


                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {/* SUPORTE */}
                        <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#155E75]/30 hover:shadow-xl">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747]/5 text-2xl">
                                🖥️
                            </div>

                            <h3 className="text-lg font-bold text-[#0F2747]">
                                Suporte Técnico
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Diagnóstico preciso e resolução de problemas informáticos com eficácia.
                            </p>

                        </div>


                        {/* MANUTENÇÃO */}
                        <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#155E75]/30 hover:shadow-xl">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747]/5 text-2xl">
                                🔧
                            </div>

                            <h3 className="text-lg font-bold text-[#0F2747]">
                                Manutenção
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Manutenção, atualização e configuração de computadores e equipamentos digitais.
                            </p>

                        </div>


                        {/* REDES */}
                        <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#155E75]/30 hover:shadow-xl">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747]/5 text-2xl">
                                🌐
                            </div>

                            <h3 className="text-lg font-bold text-[#0F2747]">
                                Redes
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Configuração e otimização de redes, Internet e conectividade profissional.
                            </p>

                        </div>


                        {/* SOLUÇÕES */}
                        <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#155E75]/30 hover:shadow-xl">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747]/5 text-2xl">
                                💻
                            </div>

                            <h3 className="text-lg font-bold text-[#0F2747]">
                                Soluções Digitais
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Desenvolvimento de soluções digitais adaptadas às necessidades do cliente.
                            </p>

                        </div>

                    </div>


                    {/* LINK PARA SERVIÇOS */}
                    <div className="mt-8 text-center">

                        <Link
                            to="/servicos"
                            className="font-semibold text-[#155E75] transition hover:text-[#0F2747]"
                        >
                            Ver todos os serviços →
                        </Link>

                    </div>

                </div>


                {/* =================================================
                    COMO TRABALHO
                ================================================== */}

                <div className="mt-28 bg-[#F5F7FA]">

                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                        <div className="text-center">

                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#155E75]">
                                Processo
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
                                Como trabalho
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                                Um processo simples, claro e organizado para encontrar a melhor solução para cada caso.
                            </p>

                        </div>


                        <div className="relative mt-14 grid gap-10 md:grid-cols-3">

                            {/* PASSO 1 */}
                            <div className="relative text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0F2747] text-lg font-bold text-white">
                                    01
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#0F2747]">
                                    Diagnóstico
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Análise inicial do problema e compreensão das necessidades do cliente.
                                </p>

                            </div>


                            {/* PASSO 2 */}
                            <div className="relative text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#155E75] text-lg font-bold text-white">
                                    02
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#0F2747]">
                                    Solução
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Aplicação de uma solução adequada, segura, eficiente e adaptada ao contexto.
                                </p>

                            </div>


                            {/* PASSO 3 */}
                            <div className="relative text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A72C] text-lg font-bold text-[#0F2747]">
                                    03
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#0F2747]">
                                    Acompanhamento
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Acompanhamento contínuo e apoio para garantir a melhor experiência após a resolução.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    TECNOLOGIAS E FERRAMENTAS
                ================================================== */}

                <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">

                    <div className="text-center">

                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#155E75]">
                            Tecnologias
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
                            Tecnologias e ferramentas
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                            Ferramentas utilizadas no desenvolvimento,
                            suporte e manutenção de soluções tecnológicas.
                        </p>

                    </div>


                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                        {[
                            "React",
                            "JavaScript",
                            "Vite",
                            "Tailwind CSS",
                            "Node.js",
                            "Express",
                            "PostgreSQL",
                            "Git",
                            "GitHub",
                            "Docker",
                            "SonarQube",
                            "VS Code",
                        ].map((tool) => (

                            <div
                                key={tool}
                                className="
                                    flex
                                    min-h-[100px]
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-white
                                    px-4
                                    text-center
                                    font-semibold
                                    text-[#0F2747]
                                    shadow-sm
                                    transition
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-[#155E75]/30
                                    hover:shadow-lg
                                "
                            >
                                {tool}
                            </div>

                        ))}

                    </div>

                </div>

            </section>

        </PublicLayout>
    );
};

export default About;