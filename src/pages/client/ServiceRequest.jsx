import PublicLayout from "../../layouts/PublicLayout";
import useContactForm from "../../hooks/useContactForm";
import Button from "../../components/common/Button";
import FormField from "../../components/forms/FormField";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePublicServices from "../../hooks/usePublicServices";

function ServiceRequest() {
	const [searchParams] = useSearchParams();
	const { user, loading: authLoading, isAuthenticated } = useAuth();
	const { services, loading: servicesLoading, error: servicesError, retry } = usePublicServices();
	const {
		formData,
		isSubmitting,
		successMessage,
		errorMessage,
		createdRequestId,
		handleChange,
		handleSubmit,
	} = useContactForm(searchParams.get("service") ?? "");

	if (authLoading) return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500" role="status">A verificar a sessão...</div>;
	if (!isAuthenticated) return <Navigate to="/auth/login" replace state={{ from: { pathname: "/solicitar-servico" } }} />;
	if (user?.role !== "client") return <Navigate to="/provider" replace />;

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
							<label className="text-sm font-semibold text-slate-700">Nome completo<input value={user?.name ?? ""} readOnly className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 font-normal text-slate-600" /></label>
							<label className="text-sm font-semibold text-slate-700">Email<input value={user?.email ?? ""} readOnly type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 font-normal text-slate-600" /></label>
							<label className="text-sm font-semibold text-slate-700">Telefone / WhatsApp<input name="telefone" type="tel" value={formData.telefone} onChange={handleChange} placeholder="+258 XX XXX XXXX" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 font-normal text-slate-900" /></label>

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
									disabled={servicesLoading || services.length === 0}
									className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
								>
									<option value="">{servicesLoading ? "A carregar serviços..." : "Selecione um serviço"}</option>
									{services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
								</select>
							</div>
							<label className="text-sm font-semibold text-slate-700">Prioridade<select name="prioridade" value={formData.prioridade} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 font-normal text-slate-900"><option value="LOW">Baixa</option><option value="MEDIUM">Normal</option><option value="HIGH">Alta</option><option value="URGENT">Urgente</option></select></label>

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
							{servicesError && <div className="sm:col-span-2 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{servicesError}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
							{!servicesLoading && !servicesError && services.length === 0 && <p className="sm:col-span-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Ainda não há serviços disponíveis. Tente novamente mais tarde.</p>}
							{createdRequestId && <div className="sm:col-span-2"><Link to={`/client/requests/${createdRequestId}`} className="font-bold text-secondary underline">Ver pedido criado</Link></div>}

							<Button
								type="submit"
								disabled={isSubmitting || servicesLoading || services.length === 0}
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
