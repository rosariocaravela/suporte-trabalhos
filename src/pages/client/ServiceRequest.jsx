import PublicLayout from "../../layouts/PublicLayout";
import useContactForm from "../../hooks/useContactForm";
import Button from "../../components/common/Button";
import FormField from "../../components/forms/FormField";

function ServiceRequest() {
	const {
		formData,
		isSubmitting,
		successMessage,
		errorMessage,
		handleChange,
		handleSubmit,
	} = useContactForm();

	return (
		<PublicLayout>
			<div className="bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.10),_transparent_50%),_#f8fafc] px-6 py-16 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-5xl">
					<div className="mb-8 max-w-2xl">
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
							Pedido de assistência
						</p>
						<h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
							Solicitar suporte
						</h1>
						<p className="mt-5 text-lg leading-8 text-gray-600">
							Explique o problema ou a solução de que precisa. Entraremos em
							contacto para avaliar o pedido e combinar os próximos passos.
						</p>
					</div>

					<div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
						<div className="border-b border-slate-200 bg-gradient-to-r from-primary/10 via-cyan-50 to-white px-6 py-5 sm:px-8">
							<div className="flex items-center justify-between gap-4">
								<div>
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
										Formulário
									</p>
									<h2 className="mt-2 text-xl font-bold text-slate-900">Descreva a sua necessidade</h2>
								</div>
								<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
									Resposta rápida
								</span>
							</div>
						</div>

						<form
							onSubmit={handleSubmit}
							className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8"
						>
							<FormField
								label="Nome completo"
								name="nome"
								value={formData.nome}
								onChange={handleChange}
								placeholder="Digite o seu nome"
								required
							/>
							<FormField
								label="Email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="exemplo@email.com"
								required
							/>
							<FormField
								label="Telefone / WhatsApp"
								name="telefone"
								type="tel"
								value={formData.telefone}
								onChange={handleChange}
								placeholder="+258 XX XXX XXXX"
							/>

							<div>
								<label htmlFor="servico" className="mb-2 block text-sm font-semibold text-slate-700">
									Tipo de suporte
								</label>
								<select
									id="servico"
									name="servico"
									value={formData.servico}
									onChange={handleChange}
									required
									className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
								>
									<option value="">Selecione uma opção</option>
									<option value="reparacao">Diagnóstico e reparação</option>
									<option value="instalacao">Formatação e instalação</option>
									<option value="manutencao">Manutenção e otimização</option>
									<option value="backup">Backup e recuperação de dados</option>
									<option value="redes">Redes e conectividade</option>
									<option value="remoto">Suporte remoto</option>
								</select>
							</div>

							<FormField
								label="Assunto"
								name="assunto"
								value={formData.assunto}
								onChange={handleChange}
								placeholder="Ex.: computador lento"
								required
								className="sm:col-span-2"
							/>

							<div className="sm:col-span-2">
								<label htmlFor="mensagem" className="mb-2 block text-sm font-semibold text-slate-700">
									Descreva o problema
								</label>
								<textarea
									id="mensagem"
									name="mensagem"
									value={formData.mensagem}
									onChange={handleChange}
									placeholder="Explique o que aconteceu, qual o impacto e o que precisa"
									rows="6"
									required
									className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
								/>
							</div>

							{successMessage && (
								<p className="sm:col-span-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
									{successMessage}
								</p>
							)}
							{errorMessage && (
								<p className="sm:col-span-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
									{errorMessage}
								</p>
							)}

							<Button
								type="submit"
								disabled={isSubmitting}
								className="sm:col-span-2 mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-base font-bold shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isSubmitting ? "A enviar..." : "Enviar pedido de suporte"}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</PublicLayout>
	);
}

export default ServiceRequest;
