import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import questions from "../../data/faq";

function FAQ() {
	const [openQuestion, setOpenQuestion] = useState(0);

	return (
		<PublicLayout>
			{/* FAQ */}
			<main className="bg-[#F5F7FA] px-6 py-16 lg:px-8 lg:py-24">
				<Container className="max-w-4xl">
					<SectionHeading
						eyebrow="Ajuda rápida"
						icon={<HelpCircle size={15} />}
						title="Perguntas frequentes"
						description="Encontre respostas sobre os nossos serviços e sobre como pedir assistência."
					/>

					{/* LISTA DE PERGUNTAS */}
					<div className="mt-12 space-y-4">
						{questions.map((item, index) => {
							const isOpen = openQuestion === index;

							return (
								<div
									key={item.question}
									className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
								>
									<button
										type="button"
										onClick={() => setOpenQuestion(isOpen ? null : index)}
										className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-bold text-[#0F2747] transition hover:text-[#155E75] sm:px-7"
										aria-expanded={isOpen}
									>
										<span>{item.question}</span>
										<ChevronDown
											size={20}
											className={`shrink-0 transition-transform ${
												isOpen ? "rotate-180 text-[#D4A72C]" : ""
											}`}
										/>
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

					{/* CTA */}
					<div className="mt-12 rounded-2xl bg-[#0F2747] p-8 text-center text-white">
						<h2 className="text-2xl font-bold">Ainda precisa de ajuda?</h2>
						<p className="mt-3 text-white/75">
							Envie os detalhes do problema e vamos orientar os próximos passos.
						</p>
						<Button to="/solicitar-servico" className="mt-6">
							Solicitar suporte
						</Button>
					</div>
				</Container>
			</main>
		</PublicLayout>
	);
}

export default FAQ;

