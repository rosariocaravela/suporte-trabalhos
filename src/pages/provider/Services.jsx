import { useCallback, useEffect, useState } from "react";
import { Check, Pencil, Plus, ToggleLeft, ToggleRight, Trash2, Wrench, X } from "lucide-react";
import { createService, deleteService, listProviderServices, setServiceActive, updateService } from "../../services/serviceService";
import { listProviderContents } from "../../services/contentService";
import { listProviderVideos } from "../../services/videoService";

const emptyForm = { name: "", description: "", price: "", duration_minutes: "" };

function Services() {
	const [services, setServices] = useState([]);
	const [contentCount, setContentCount] = useState(null);
	const [videoCount, setVideoCount] = useState(null);
	const [statsError, setStatsError] = useState("");
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [feedback, setFeedback] = useState("");
	const [formOpen, setFormOpen] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState(emptyForm);

	const loadServices = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			setServices(await listProviderServices());
		} catch (loadError) {
			console.error("Não foi possível carregar os serviços:", loadError);
			setError("Não foi possível carregar os serviços.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		let active = true;
		listProviderServices()
			.then((result) => {
				if (active) setServices(result);
			})
			.catch((loadError) => {
				console.error("Não foi possível carregar os serviços:", loadError);
				if (active) setError("Não foi possível carregar os serviços.");
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, []);

	useEffect(() => {
		let active = true;
		Promise.all([listProviderContents(), listProviderVideos()])
			.then(([contents, videos]) => {
				if (active) {
					setContentCount(contents.length);
					setVideoCount(videos.length);
				}
			})
			.catch((statsLoadError) => {
				console.error("Não foi possível carregar o resumo:", statsLoadError);
				if (active) setStatsError("Não foi possível carregar o resumo de conteúdos e vídeos.");
			});
		return () => { active = false; };
	}, []);

	const retryStats = async () => {
		setStatsError("");
		try {
			const [contents, videos] = await Promise.all([listProviderContents(), listProviderVideos()]);
			setContentCount(contents.length);
			setVideoCount(videos.length);
		} catch (statsLoadError) {
			console.error("Não foi possível carregar o resumo:", statsLoadError);
			setStatsError("Não foi possível carregar o resumo de conteúdos e vídeos.");
		}
	};

	const openCreateForm = () => {
		setEditingId(null);
		setFormData(emptyForm);
		setError("");
		setFeedback("");
		setFormOpen(true);
	};

	const openEditForm = (service) => {
		setEditingId(service.id);
		setFormData({
			name: service.name,
			description: service.description ?? "",
			price: service.price ?? "",
			duration_minutes: service.duration_minutes ?? "",
		});
		setError("");
		setFeedback("");
		setFormOpen(true);
	};

	const handleChange = (event) => {
		setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		setError("");
		setFeedback("");
		try {
			if (editingId) {
				await updateService(editingId, formData);
				setFeedback("Serviço atualizado.");
			} else {
				await createService(formData);
				setFeedback("Serviço criado e publicado.");
			}
			setFormOpen(false);
			setFormData(emptyForm);
			setEditingId(null);
			await loadServices();
		} catch (saveError) {
			console.error("Não foi possível guardar o serviço:", saveError);
			setError(saveError.message?.startsWith("Indique") ? saveError.message : "Não foi possível guardar o serviço.");
		} finally {
			setSubmitting(false);
		}
	};

	const handleToggle = async (service) => {
		setError("");
		setFeedback("");
		try {
			await setServiceActive(service.id, !service.is_active);
			setFeedback(service.is_active ? "Serviço desativado." : "Serviço ativado.");
			await loadServices();
		} catch (toggleError) {
			console.error("Não foi possível alterar o estado do serviço:", toggleError);
			setError("Não foi possível alterar o estado do serviço.");
		}
	};

	const handleDelete = async (service) => {
		if (!window.confirm(`Eliminar o serviço “${service.name}”? Pedidos existentes mantêm-se, mas ficam sem serviço associado.`)) return;

		setError("");
		setFeedback("");
		try {
			await deleteService(service.id);
			setFeedback("Serviço eliminado.");
			await loadServices();
		} catch (deleteError) {
			console.error("Não foi possível eliminar o serviço:", deleteError);
			setError("Não foi possível eliminar o serviço.");
		}
	};

	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Oferta profissional</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meus serviços</h1>
					<p className="mt-2 text-slate-500">Crie e mantenha atualizados os serviços disponíveis aos clientes.</p>
				</div>
				<button type="button" onClick={openCreateForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-hover">
					<Plus className="h-5 w-5" />Adicionar serviço
				</button>
			</header>

			<section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="Resumo dos serviços">
				<SummaryCard title="Serviços ativos" value={services.filter((service) => service.is_active).length} description="Ofertas publicadas aos clientes" icon={<Wrench className="h-6 w-6" />} accent="bg-blue-50 text-primary" />
				<SummaryCard title="Conteúdos" value={contentCount ?? "—"} description="Registos seus no Supabase" icon={<Wrench className="h-6 w-6" />} accent="bg-cyan-50 text-secondary" />
				<SummaryCard title="Vídeos" value={videoCount ?? "—"} description="Registos seus no Supabase" icon={<Wrench className="h-6 w-6" />} accent="bg-amber-50 text-amber-600" />
			</section>
			{statsError && <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{statsError}</p><button type="button" onClick={retryStats} className="mt-2 font-bold underline">Tentar novamente</button></div>}

			{feedback && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700" role="status">{feedback}</p>}
			{error && <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><span>{error}</span><button type="button" onClick={loadServices} className="font-bold underline">Tentar novamente</button></div>}

			{formOpen && (
				<form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
					<h2 className="text-lg font-bold text-primary sm:col-span-2">{editingId ? "Editar serviço" : "Novo serviço"}</h2>
					<label className="text-sm font-semibold text-slate-700 sm:col-span-2">Nome<input name="name" value={formData.name} onChange={handleChange} required maxLength="120" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label>
					<label className="text-sm font-semibold text-slate-700 sm:col-span-2">Descrição<textarea name="description" value={formData.description} onChange={handleChange} rows="3" maxLength="2000" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal" /></label>
					<label className="text-sm font-semibold text-slate-700">Preço (MT)<input name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label>
					<label className="text-sm font-semibold text-slate-700">Duração (minutos)<input name="duration_minutes" type="number" min="1" step="1" value={formData.duration_minutes} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label>
					<div className="flex gap-3 sm:col-span-2">
						<button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"><Check className="h-4 w-4" />{submitting ? "A guardar..." : "Guardar"}</button>
						<button type="button" onClick={() => setFormOpen(false)} disabled={submitting} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"><X className="h-4 w-4" />Cancelar</button>
					</div>
				</form>
			)}

			<section className="mt-6 space-y-3" aria-label="Lista de serviços">
				{loading ? <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500" role="status">A carregar serviços...</p> : services.length === 0 ? (
					<div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
						<Wrench className="mx-auto h-8 w-8 text-slate-400" />
						<h2 className="mt-4 text-lg font-bold text-primary">Ainda não tens serviços</h2>
						<p className="mt-2 text-sm text-slate-500">Cria o primeiro serviço para o disponibilizar aos clientes.</p>
						<button type="button" onClick={openCreateForm} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white"><Plus className="h-4 w-4" />Criar serviço</button>
					</div>
				) : services.map((service) => (
					<article key={service.id} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
						<div className="min-w-0">
							<div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-primary">{service.name}</h2><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${service.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{service.is_active ? "Ativo" : "Inativo"}</span></div>
							<p className="mt-2 text-sm text-slate-600">{service.description || "Sem descrição."}</p>
							<p className="mt-2 text-sm font-semibold text-slate-500">{service.price == null ? "Preço sob consulta" : `${Number(service.price).toLocaleString("pt-MZ")} MT`}{service.duration_minutes ? ` · ${service.duration_minutes} min` : ""}</p>
						</div>
						<div className="flex shrink-0 flex-wrap gap-2">
							<button type="button" onClick={() => openEditForm(service)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"><Pencil className="h-4 w-4" />Editar</button>
							<button type="button" onClick={() => handleToggle(service)} aria-label={service.is_active ? "Desativar serviço" : "Ativar serviço"} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">{service.is_active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}{service.is_active ? "Desativar" : "Ativar"}</button>
							<button type="button" onClick={() => handleDelete(service)} aria-label={`Eliminar ${service.name}`} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700"><Trash2 className="h-4 w-4" />Eliminar</button>
						</div>
					</article>
				))}
			</section>
		</div>
	);
}

function SummaryCard({ title, value, description, icon, accent }) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="flex items-center justify-between gap-3">
				<div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>{icon}</div>
				<span className="text-3xl font-bold text-slate-900">{value}</span>
			</div>
			<h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
			<p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
		</div>
	);
}

export default Services;
