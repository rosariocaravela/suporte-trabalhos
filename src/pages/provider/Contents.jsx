import { BookOpenText, Plus, Search } from "lucide-react";

const demoContents = [
  {
    id: 1,
    title: "Dicas para manter o PC mais rápido",
    category: "Manutenção",
    status: "Publicado",
    excerpt: "Checklist simples para melhorar desempenho sem perder dados importantes.",
  },
  {
    id: 2,
    title: "Como proteger o Wi‑Fi da sua casa",
    category: "Redes",
    status: "Rascunho",
    excerpt: "Boas práticas para reforçar segurança e reduzir falhas de conectividade.",
  },
];

function Contents() {
  return (
    <div>
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Conteúdos</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Os meus conteúdos</h1>
          <p className="mt-2 text-slate-500">Partilhe dicas, tutoriais e materiais úteis para reforçar a sua presença.</p>
        </div>

        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-hover">
          <Plus className="h-5 w-5" />
          Novo conteúdo
        </button>
      </header>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Pesquisar conteúdos"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10"
            />
          </div>

          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <BookOpenText className="h-4 w-4" />
            Todos
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {demoContents.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                    {item.category}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${item.status === "Publicado" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {item.status}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.excerpt}</p>
              </div>

              <div className="flex gap-2 sm:flex-col">
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

export default Contents;
