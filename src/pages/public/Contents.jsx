import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search, ShieldCheck } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import ContentCard from "../../components/contents/ContentCard";
import { listPublishedContents } from "../../services/contentService";

function Contents() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContent, setSelectedContent] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listPublishedContents()
      .then((result) => { if (active) setContents(result); })
      .catch((loadError) => {
        console.error("Não foi possível carregar os conteúdos:", loadError);
        if (active) setError("Não foi possível carregar os conteúdos publicados.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const retry = async () => {
    setLoading(true);
    setError("");
    try {
      setContents(await listPublishedContents());
    } catch (loadError) {
      console.error("Não foi possível carregar os conteúdos:", loadError);
      setError("Não foi possível carregar os conteúdos publicados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedContent) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedContent(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedContent]);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const categories = ["Todos", ...new Set(contents.map((content) => content.category).filter(Boolean))];
  const visibleContents = contents.filter((content) => {
    const matchesCategory = activeCategory === "Todos" || content.category === activeCategory;
    const matchesSearch = !normalizedSearch || `${content.title} ${content.description} ${content.category}`.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <PublicLayout>
      <div id="conteudos" className="bg-[#F5F7FA] px-6 py-16 lg:px-8 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Conhecimento e tecnologia"
            icon={<BookOpen size={15} />}
            title="Conteúdos para resolver melhor"
            description="Dicas práticas para cuidar dos seus equipamentos, melhorar a ligação e proteger os seus dados."
          />

          <div className="mt-12 flex gap-2 overflow-x-auto pb-2" aria-label="Categorias de conteúdos">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category ? "bg-primary text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative mt-6 max-w-xl">
            <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Pesquisar conteúdos..."
              aria-label="Pesquisar conteúdos"
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {loading ? <p className="mt-10 text-center text-slate-500" role="status">A carregar conteúdos...</p> : error ? (
            <div className="mt-10 rounded-xl bg-red-50 p-5 text-center text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-3 font-bold underline">Tentar novamente</button></div>
          ) : visibleContents.length === 0 ? <p className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">{contents.length ? "Nenhum conteúdo encontrado." : "Ainda não há conteúdos publicados."}</p> : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleContents.map((content) => <ContentCard key={content.id} content={content} onRead={setSelectedContent} />)}
            </div>
          )}

          {selectedContent && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="content-dialog-title" onClick={() => setSelectedContent(null)}>
              <article className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
                {selectedContent.image_url && <img src={selectedContent.image_url} alt={selectedContent.title} className="h-56 w-full object-cover sm:h-72" />}
                <div className="p-7 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-md bg-cyan-50 px-3 py-1 text-xs font-bold text-primary">{selectedContent.category || "Informática"}</span>
                    <button type="button" onClick={() => setSelectedContent(null)} className="text-sm font-semibold text-gray-500 hover:text-slate-900">Fechar</button>
                  </div>
                  <h2 id="content-dialog-title" className="mt-5 text-3xl font-bold leading-tight text-slate-900">{selectedContent.title}</h2>
                  <p className="mt-5 text-lg leading-8 text-gray-600">{selectedContent.description}</p>
                  {selectedContent.url && <a href={selectedContent.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 font-bold text-white hover:shadow-md">Abrir recurso <ArrowRight size={18} /></a>}
                </div>
              </article>
            </div>
          )}

          <section className="mt-16 rounded-3xl bg-primary px-8 py-10 text-white md:flex md:items-center md:justify-between md:gap-10 md:px-12">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-accent"><ShieldCheck size={17} /> Precisa de ajuda prática?</p>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Nem todo problema precisa esperar.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-white/75">Consulte os nossos serviços ou envie já um pedido de suporte com os detalhes do seu problema.</p>
            </div>
            <Link to="/solicitar-servico" className="mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-slate-900 transition hover:bg-orange-400 md:mt-0">Solicitar suporte <ArrowRight size={18} /></Link>
          </section>
        </Container>
      </div>
    </PublicLayout>
  );
}

export default Contents;
