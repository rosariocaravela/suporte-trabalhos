import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import useImagePreview from "../../hooks/useImagePreview";
import useImagePosition from "../../hooks/useImagePosition";
import profissionalImage from "../../assets/images/profissional.png";
import { aboutServices as services, aboutSteps as steps, technologies } from "../../data/about";

const DEFAULT_IMAGE = profissionalImage;

const About = () => {
    const {
        selectedImage,
        handleImageChange,
    } = useImagePreview(DEFAULT_IMAGE);

    const {
        imagePosition,
        imageFrameRef,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    } = useImagePosition(selectedImage);

    const photoInputId = "about-photo-upload";

    return (
        <PublicLayout>

            <section
                id="sobre"
                className="bg-white"
            >

                {/* CABEÇALHO */}

                <div className="mx-auto max-w-7xl px-6 pb-14 pt-12 lg:px-8 lg:pt-16">

                    <div className="relative overflow-hidden rounded-3xl bg-[#F5F7FA] px-6 py-12 md:px-10 md:py-16">

                        {/* Elementos decorativos */}

                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#155E75]/10 blur-3xl" />

                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#D4A72C]/10 blur-3xl" />

                        <div className="relative max-w-3xl">

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#155E75]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#155E75]">

                                <span className="h-2 w-2 rounded-full bg-[#155E75]" />

                                Perfil Profissional

                            </div>

                            <h1 className="text-4xl font-bold tracking-tight text-[#0F2747] md:text-5xl lg:text-6xl">
                                Sobre o Profissional
                            </h1>

                            <div className="mt-6 h-1 w-20 rounded-full bg-[#D4A72C]" />

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                                Engenharia informática aplicada a soluções
                                práticas, funcionais e adaptadas às necessidades
                                de cada cliente.
                            </p>

                        </div>

                    </div>

                </div>


                {/* APRESENTAÇÃO DO PROFISSIONAL */}

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        {/* FOTO */}

                        <div className="relative">

                            {/* Decoração */}

                            <div className="absolute -bottom-5 -left-5 h-full w-full rounded-3xl bg-[#D4A72C]/20" />

                            <div
                                ref={imageFrameRef}
                                className="relative h-[420px] cursor-grab overflow-hidden rounded-3xl bg-gray-100 shadow-xl active:cursor-grabbing md:h-[480px]"
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerLeave={handlePointerUp}
                            >

                                <img
                                    src={selectedImage}
                                    alt="Engenheiro Informático"
                                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                                    style={{
                                        objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                                    }}
                                />

                                {/* Escolher foto */}

                                <label
                                    htmlFor={photoInputId}
                                    className="absolute bottom-5 right-5 flex cursor-pointer items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-semibold text-[#0F2747] shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white"
                                >

                                    <span>📷</span>

                                    <span>
                                        Escolher foto
                                    </span>

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

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#155E75]">
                                Engenharia Informática
                            </p>

                            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0F2747] md:text-4xl">
                                Tecnologia, desenvolvimento e soluções digitais
                            </h2>

                            <div className="mt-6 space-y-4 text-gray-600">

                                <p className="leading-8">
                                    Sou Engenheiro Informático e trabalho no
                                    desenvolvimento de soluções tecnológicas
                                    para pessoas, profissionais e pequenos
                                    negócios.
                                </p>

                                <p className="leading-8">
                                    O meu foco está em transformar necessidades
                                    reais em soluções práticas, funcionais e
                                    seguras, utilizando tecnologias modernas de
                                    desenvolvimento de software.
                                </p>

                                <p className="leading-8">
                                    Tenho conhecimentos em desenvolvimento web,
                                    bases de dados, redes, controlo de versões,
                                    Docker e ferramentas de qualidade de
                                    software.
                                </p>

                            </div>


                            {/* CTA */}

                            <div className="mt-8">

                                <Link
                                    to="/contacto"
                                    className="inline-flex items-center rounded-full bg-[#D4A72C] px-7 py-3.5 font-bold text-[#0F2747] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#e5b936] hover:shadow-lg"
                                >
                                    Entrar em contacto

                                    <span className="ml-2 text-lg">
                                        →
                                    </span>

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* COMO POSSO AJUDAR */}

                <div className="mx-auto mt-28 max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#155E75]">
                            O que faço
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
                            Como posso ajudar
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            Soluções práticas para diferentes necessidades
                            de suporte, software, desenvolvimento e tecnologia
                            digital.
                        </p>

                    </div>


                    {/* CARDS */}

                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#155E75]/30 hover:shadow-xl"
                            >

                                {/* ÍCONE */}

                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0F2747]/5 text-[#0F2747] transition duration-300 group-hover:bg-[#155E75]/10 group-hover:text-[#155E75]">

                                    <service.icon
                                        size={28}
                                        strokeWidth={1.8}
                                    />

                                </div>


                                {/* TÍTULO */}

                                <h3 className="text-lg font-bold text-[#0F2747]">
                                    {service.title}
                                </h3>


                                {/* DESCRIÇÃO */}

                                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                                    {service.description}
                                </p>


                                {/* DESTAQUE */}

                                <div className="mt-6 border-t border-gray-100 pt-4">

                                    <span className="inline-flex items-center gap-1 text-sm font-bold text-[#155E75]">

                                        {service.label}

                                        <span className="transition group-hover:translate-x-1">
                                            →
                                        </span>

                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>


                    {/* LINK PARA SERVIÇOS */}

                    <div className="mt-8 text-center">

                        <Link
                            to="/servicos"
                            className="font-bold text-[#155E75] transition hover:text-[#0F2747]"
                        >
                            Ver todos os serviços →
                        </Link>

                    </div>

                </div>


                {/* COMO TRABALHO */}

                <div className="mt-28 bg-[#F5F7FA]">

                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#155E75]">
                                Processo
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
                                Como trabalho
                            </h2>

                            <p className="mt-4 leading-7 text-gray-600">
                                Um processo simples, claro e organizado para
                                encontrar a solução adequada para cada caso.
                            </p>

                        </div>


                        {/* ETAPAS */}

                        <div className="relative mt-14 grid gap-10 md:grid-cols-3">

                            {/* Linha */}

                            <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-[#155E75]/20 md:block" />


                            {steps.map((step, index) => (
                                <div
                                    key={step.number}
                                    className="relative z-10 text-center"
                                >

                                    {/* Número */}

                                    <div
                                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold shadow-md ${index === 0
                                                ? "bg-[#0F2747] text-white"
                                                : index === 1
                                                    ? "bg-[#155E75] text-white"
                                                    : "bg-[#D4A72C] text-[#0F2747]"
                                            }`}
                                    >
                                        {step.number}
                                    </div>


                                    {/* Título */}

                                    <h3 className="mt-5 text-xl font-bold text-[#0F2747]">
                                        {step.title}
                                    </h3>


                                    {/* Descrição */}

                                    <p className="mx-auto mt-3 max-w-sm leading-7 text-gray-600">
                                        {step.description}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>


                {/* TECNOLOGIAS */}

                <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#155E75]">
                            Tecnologias
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#0F2747] md:text-4xl">
                            Tecnologias e ferramentas
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            Tecnologias e ferramentas utilizadas no
                            desenvolvimento de soluções digitais e no trabalho
                            com software.
                        </p>

                    </div>


                    {/* GRID */}

                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                        {technologies.map((tool) => (
                            <div
                                key={tool}
                                className="group flex min-h-[100px] items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-center font-semibold text-[#0F2747] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#155E75]/30 hover:shadow-lg"
                            >

                                <span className="transition duration-300 group-hover:text-[#155E75]">
                                    {tool}
                                </span>

                            </div>
                        ))}

                    </div>

                </div>


                {/* CTA FINAL */}

                <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                    <div className="relative overflow-hidden rounded-3xl bg-[#0F2747] px-6 py-12 text-center md:px-12">

                        {/* Decoração */}

                        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#155E75]/30 blur-3xl" />

                        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#D4A72C]/20 blur-3xl" />


                        <div className="relative">

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4A72C]">
                                Precisa de apoio?
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                                Vamos encontrar a solução adequada.
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">
                                Entre em contacto para apresentar a sua
                                necessidade e saber como posso ajudar.
                            </p>


                            {/* BOTÃO */}

                            <div className="mt-8">

                                <Link
                                    to="/contacto"
                                    className="inline-flex items-center rounded-full bg-[#D4A72C] px-7 py-3.5 font-bold text-[#0F2747] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#e5b936] hover:shadow-lg"
                                >
                                    Entrar em contacto

                                    <span className="ml-2">
                                        →
                                    </span>

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </PublicLayout>
    );
};

export default About;