import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search, ShieldCheck } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import ContentCard from "../../components/contents/ContentCard";
import contents, { contentCategories as categories } from "../../data/contents";

function Contents() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContent, setSelectedContent] = useState(null);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleContents = contents.filter((content) => {
    const matchesCategory = activeCategory === "Todos" || content.category === activeCategory;
    const matchesSearch = !normalizedSearch || `${content.title} ${content.description} ${content.category}`.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <PublicLayout>
      <main id="conteudos" className="bg-[#F5F7FA] px-6 py-16 lg:px-8 lg:py-24">
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
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category ? "bg-[#0F2747] text-white shadow-sm" : "border border-gray-200 bg-white text-gray-600 hover:border-[#155E75] hover:text-[#155E75]"}`}
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
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-[#155E75] focus:ring-2 focus:ring-[#155E75]/10"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleContents.map((content) => <ContentCard key={content.title} content={content} onRead={setSelectedContent} />)}
          </div>
          {visibleContents.length === 0 && <p className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">Nenhum conteúdo encontrado.</p>}

          {selectedContent && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0F2747]/70 px-4 py-6" onClick={() => setSelectedContent(null)}>
              <article className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
                <img src={selectedContent.image} alt={selectedContent.title} className="h-56 w-full object-cover sm:h-72" />
                <div className="p-7 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-md bg-[#155E75]/10 px-3 py-1 text-xs font-bold text-[#155E75]">{selectedContent.category}</span>
                    <button type="button" onClick={() => setSelectedContent(null)} className="text-sm font-semibold text-gray-500 hover:text-[#0F2747]">Fechar</button>
                  </div>
                  <h2 className="mt-5 text-3xl font-bold leading-tight text-[#0F2747]">{selectedContent.title}</h2>
                  <p className="mt-5 text-lg leading-8 text-gray-600">{selectedContent.description}</p>
                  <div className="mt-7 space-y-4 text-gray-600">
                    <p>Antes de procurar uma solução, observe os sinais do problema e anote quando ele acontece. Essa informação ajuda a encontrar a causa mais rapidamente.</p>
                    <p>Faça uma alteração de cada vez e confirme o resultado. Evite apagar ficheiros ou instalar programas sem verificar a origem.</p>
                    <p>Se o problema continuar, envie um pedido de suporte com estes detalhes. A equipa poderá orientar os próximos passos com mais segurança.</p>
                  </div>
                  <Link to={`/videos#${selectedContent.id}`} onClick={() => setSelectedContent(null)} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D4A72C] px-6 py-3.5 font-bold text-[#0F2747] hover:bg-[#e5b936]">
                    Ver vídeo relacionado <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            </div>
          )}

          <section className="mt-16 rounded-3xl bg-[#0F2747] px-8 py-10 text-white md:flex md:items-center md:justify-between md:gap-10 md:px-12">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A72C]"><ShieldCheck size={17} /> Precisa de ajuda prática?</p>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Nem todo problema precisa esperar.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-white/75">Consulte os nossos serviços ou envie já um pedido de suporte com os detalhes do seu problema.</p>
            </div>
            <Link to="/solicitar-servico" className="mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D4A72C] px-6 py-3.5 font-bold text-[#0F2747] transition hover:bg-[#e5b936] md:mt-0">Solicitar suporte <ArrowRight size={18} /></Link>
          </section>
        </Container>
      </main>
    </PublicLayout>
  );
}

export default Contents;
