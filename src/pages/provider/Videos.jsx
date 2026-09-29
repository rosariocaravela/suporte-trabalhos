import { useEffect, useState } from "react";
import { Clapperboard, ExternalLink, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { createVideo, deleteVideo, listProviderVideos, updateVideo } from "../../services/videoService";

const emptyForm = { title: "", description: "", url: "", category: "", is_published: false };

function Videos() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [publication, setPublication] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    let active = true;
    listProviderVideos()
      .then((result) => { if (active) setVideos(result); })
      .catch((loadError) => {
        console.error("Não foi possível carregar os vídeos:", loadError);
        if (active) setError("Não foi possível carregar os vídeos.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const retry = async () => {
    setLoading(true); setError("");
    try { setVideos(await listProviderVideos()); }
    catch (loadError) { console.error("Não foi possível carregar os vídeos:", loadError); setError("Não foi possível carregar os vídeos."); }
    finally { setLoading(false); }
  };
  const startCreate = () => { setEditingId(null); setFormData(emptyForm); setFormOpen(true); setError(""); setFeedback(""); };
  const startEdit = (video) => { setEditingId(video.id); setFormData({ title: video.title, description: video.description ?? "", url: video.url, category: video.category ?? "", is_published: video.is_published }); setFormOpen(true); setError(""); setFeedback(""); };
  const handleChange = (event) => { const { name, value, checked, type } = event.target; setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value })); };
  const handleSubmit = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setFeedback("");
    try {
      if (editingId) await updateVideo(editingId, formData);
      else await createVideo(formData);
      setFormOpen(false); setEditingId(null); setFormData(emptyForm);
      setFeedback(editingId ? "Vídeo atualizado." : "Vídeo criado.");
      setVideos(await listProviderVideos());
    } catch (saveError) {
      console.error("Não foi possível guardar o vídeo:", saveError);
      setError(saveError.message?.includes("Indique") || saveError.message?.includes("endereço") ? saveError.message : "Não foi possível guardar o vídeo.");
    } finally { setSaving(false); }
  };
  const togglePublication = async (video) => {
    try {
      await updateVideo(video.id, { ...video, is_published: !video.is_published });
      setVideos(await listProviderVideos());
      setFeedback(video.is_published ? "Vídeo guardado como rascunho." : "Vídeo publicado.");
    } catch (publishError) {
      console.error("Não foi possível alterar a publicação:", publishError);
      setError("Não foi possível alterar o estado de publicação.");
    }
  };
  const handleDelete = async (video) => {
    if (!window.confirm(`Eliminar “${video.title}”?`)) return;
    try { await deleteVideo(video.id); setVideos(await listProviderVideos()); setFeedback("Vídeo eliminado."); }
    catch (deleteError) { console.error("Não foi possível eliminar o vídeo:", deleteError); setError("Não foi possível eliminar o vídeo."); }
  };
  const query = search.trim().toLowerCase();
  const visibleVideos = videos.filter((video) => (!query || `${video.title} ${video.description ?? ""} ${video.category ?? ""}`.toLowerCase().includes(query)) && (publication === "all" || video.is_published === (publication === "published")));

  return (
    <div>
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Vídeos</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Os meus vídeos</h1>
          <p className="mt-2 text-slate-500">Partilhe demonstrações, tutoriais e conteúdos visuais para apoiar os clientes.</p>
        </div>

        <button type="button" onClick={startCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-hover">
          <Plus className="h-5 w-5" />
          Novo vídeo
        </button>
      </header>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar vídeos"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10"
            />
          </div>

          <select value={publication} onChange={(event) => setPublication(event.target.value)} aria-label="Filtrar publicação" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"><option value="all">Todos</option><option value="published">Publicados</option><option value="draft">Rascunhos</option></select>
        </div>
      </section>

    {feedback && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700" role="status">{feedback}</p>}
    {error && <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}

    {formOpen && <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
      <h2 className="text-lg font-bold text-primary sm:col-span-2">{editingId ? "Editar vídeo" : "Novo vídeo"}</h2>
      <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Título<input name="title" value={formData.title} onChange={handleChange} required maxLength="180" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label>
      <label className="text-sm font-semibold text-slate-700 sm:col-span-2">URL do vídeo<input name="url" type="url" value={formData.url} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label>
      <label className="text-sm font-semibold text-slate-700">Categoria<input name="category" value={formData.category} onChange={handleChange} maxLength="60" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label>
      <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Descrição<textarea name="description" value={formData.description} onChange={handleChange} rows="3" maxLength="2000" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal" /></label>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 sm:col-span-2"><input name="is_published" type="checkbox" checked={formData.is_published} onChange={handleChange} />Publicar agora</label>
      <div className="flex gap-3 sm:col-span-2"><button type="submit" disabled={saving} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">{saving ? "A guardar..." : "Guardar"}</button><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancelar</button></div>
    </form>}

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {loading && <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 md:col-span-2" role="status">A carregar vídeos...</p>}
    {!loading && !error && visibleVideos.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 md:col-span-2">{videos.length ? "Nenhum vídeo corresponde aos filtros." : "Ainda não criaste vídeos."}</p>}
    {!loading && !error && visibleVideos.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative h-48 bg-gradient-to-br from-sky-100 via-white to-cyan-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                  <Clapperboard className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                  {video.category || "Sem categoria"}
                </span>
								<span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${video.is_published ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
									{video.is_published ? "Publicado" : "Rascunho"}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">{video.title}</h2>

              <div className="mt-5 flex gap-2">
                <button type="button" onClick={() => startEdit(video)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Pencil className="h-4 w-4" />Editar</button>
                <button type="button" onClick={() => togglePublication(video)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{video.is_published ? "Tornar rascunho" : "Publicar"}</button>
                <a href={video.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-secondary"><ExternalLink className="h-4 w-4" />Abrir</a>
                <button type="button" onClick={() => handleDelete(video)} aria-label={`Eliminar ${video.title}`} className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700"><Trash2 className="h-4 w-4" />Eliminar</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Videos;
