import { Clapperboard, Plus, Search } from "lucide-react";

const demoVideos = [
  {
    id: 1,
    title: "Como otimizar o desempenho do computador",
    category: "Manutenção",
    status: "Publicado",
    duration: "4:32",
  },
  {
    id: 2,
    title: "Teste rápido de rede e Wi‑Fi",
    category: "Redes",
    status: "Rascunho",
    duration: "3:18",
  },
];

function Videos() {
  return (
    <div>
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Vídeos</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Os meus vídeos</h1>
          <p className="mt-2 text-slate-500">Partilhe demonstrações, tutoriais e conteúdos visuais para apoiar os clientes.</p>
        </div>

        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-hover">
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
              placeholder="Pesquisar vídeos"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10"
            />
          </div>

          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Clapperboard className="h-4 w-4" />
            Todos
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {demoVideos.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative h-48 bg-gradient-to-br from-sky-100 via-white to-cyan-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                  <Clapperboard className="h-8 w-8" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {video.duration}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                  {video.category}
                </span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${video.status === "Publicado" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {video.status}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">{video.title}</h2>

              <div className="mt-5 flex gap-2">
                <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Editar
                </button>
                <button type="button" className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-secondary">
                  Ver
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Videos;
