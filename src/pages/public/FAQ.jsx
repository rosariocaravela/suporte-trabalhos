import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";

const questions = [
	{
		question: "Que tipo de suporte informático está disponível?",
		answer: "Prestamos apoio em diagnóstico e reparação, instalação de software, manutenção, redes, backups e suporte remoto.",
	},
	{
		question: "Como posso solicitar suporte?",
		answer: "Aceda a Solicitar suporte no menu, preencha os seus dados e descreva o problema. Depois entraremos em contacto para combinar os próximos passos.",
	},
	{
		question: "O suporte remoto é seguro?",
		answer: "Sim. O acesso remoto só acontece com a sua autorização e durante o período necessário para analisar e resolver o problema.",
	},
	{
		question: "Também fazem manutenção preventiva?",
		answer: "Sim. Podemos verificar o desempenho, atualizações, armazenamento, segurança e outros pontos importantes antes que surjam falhas.",
	},
	{
		question: "Podem ajudar a recuperar ficheiros?",
		answer: "Fazemos uma avaliação inicial e orientamos o processo de recuperação. Para aumentar as possibilidades, evite continuar a usar o dispositivo afetado.",
	},
	{
		question: "Quanto tempo demora a resposta?",
		answer: "Respondemos durante o horário de atendimento. O tempo de resolução depende do tipo de problema e da disponibilidade do equipamento ou acesso remoto.",
	},
];

function FAQ() {
	const [openQuestion, setOpenQuestion] = useState(0);

	return (
		<PublicLayout>
			<main className="bg-[#F5F7FA] px-6 py-16 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-4xl">
					<header className="mx-auto max-w-3xl text-center">
						<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#155E75]/15 bg-[#155E75]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#155E75]">
							<HelpCircle size={15} /> Ajuda rápida
						</div>
						<h1 className="text-4xl font-bold tracking-tight text-[#0F2747] md:text-5xl">
							Perguntas frequentes
						</h1>
						<p className="mt-5 text-lg leading-8 text-gray-600">
							Encontre respostas sobre os nossos serviços e sobre como pedir assistência.
						</p>
					</header>

					<div className="mt-12 space-y-4">
						{questions.map((item, index) => {
							const isOpen = openQuestion === index;

							return (
								<div key={item.question} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
									<button
										type="button"
										onClick={() => setOpenQuestion(isOpen ? null : index)}
										className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-bold text-[#0F2747] transition hover:text-[#155E75] sm:px-7"
										aria-expanded={isOpen}
									>
										<span>{item.question}</span>
										<ChevronDown size={20} className={`shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#D4A72C]" : ""}`} />
									</button>
									{isOpen && (
										<div className="border-t border-gray-100 px-6 pb-6 pt-4 leading-7 text-gray-600 sm:px-7">
											{item.answer}
										</div>
									)}
								</div>
							);
						})}
					</div>

					<div className="mt-12 rounded-2xl bg-[#0F2747] p-8 text-center text-white">
						<h2 className="text-2xl font-bold">Ainda precisa de ajuda?</h2>
						<p className="mt-3 text-white/75">Envie os detalhes do problema e vamos orientar os próximos passos.</p>
						<a href="/solicitar-servico" className="mt-6 inline-flex rounded-xl bg-[#D4A72C] px-6 py-3.5 font-bold text-[#0F2747] transition hover:bg-[#e5b936]">
							Solicitar suporte
						</a>
					</div>
				</div>
			</main>
		</PublicLayout>
	);
}

export default FAQ;
