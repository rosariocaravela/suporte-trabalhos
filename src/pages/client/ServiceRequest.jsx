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
			<div className="bg-gray-50 px-6 py-16 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-4xl">
					<div className="max-w-2xl">
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-[#155E75]">
							Pedido de assistência
						</p>
						<h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0F2747] sm:text-5xl">
							Solicitar suporte
						</h1>
						<p className="mt-5 text-lg leading-8 text-gray-600">
							Explique o problema ou a solução de que precisa. Entraremos em
							contacto para avaliar o pedido e combinar os próximos passos.
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
						className="mt-10 grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
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
							<label htmlFor="servico" className="mb-2 block text-sm font-semibold text-primary">
								Tipo de suporte
							</label>
							<select
								id="servico"
								name="servico"
								value={formData.servico}
								onChange={handleChange}
								required
								className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10"
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
							<label htmlFor="mensagem" className="mb-2 block text-sm font-semibold text-primary">
								Descreva o problema
							</label>
							<textarea
								id="mensagem"
								name="mensagem"
								value={formData.mensagem}
								onChange={handleChange}
								placeholder="Explique o que aconteceu e o que precisa"
								rows="6"
								required
								className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3.5 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10"
							/>
						</div>

						{successMessage && (
							<p className="sm:col-span-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
								{successMessage}
							</p>
						)}
						{errorMessage && (
							<p className="sm:col-span-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
								{errorMessage}
							</p>
						)}

						<Button
							type="submit"
							disabled={isSubmitting}
							className="sm:col-span-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isSubmitting ? "A enviar..." : "Enviar pedido de suporte"}
						</Button>
					</form>
				</div>
			</div>
		</PublicLayout>
	);
}

export default ServiceRequest;
