import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ContentCard({ content, onRead }) {
  return (
    <article className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_38px_rgba(37,99,235,0.08)]">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={content.image}
          alt={content.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-cyan-50 px-3 py-1 text-xs font-bold text-primary">
            {content.category}
          </span>
          <time className="text-xs text-slate-400">{content.date}</time>
        </div>
        <h2 className="mt-5 text-xl font-bold leading-snug text-slate-900 transition group-hover:text-primary">
          {content.title}
        </h2>
        <p className="mt-3 flex-1 leading-7 text-slate-600">{content.description}</p>
        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={() => onRead(content)} className="font-semibold text-primary hover:text-secondary">
              Ler artigo
            </button>
            <Link to={`/videos#${content.id}`} className="inline-flex items-center gap-2 font-semibold text-primary transition group-hover:gap-3 hover:text-secondary">
              Ver vídeo <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ContentCard;
