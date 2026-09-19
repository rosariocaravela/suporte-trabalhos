import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ContentCard({ content, onRead }) {
  return (
    <article className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={content.image}
          alt={content.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/45 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-[#155E75]/10 px-3 py-1 text-xs font-bold text-[#155E75]">
            {content.category}
          </span>
          <time className="text-xs text-gray-400">{content.date}</time>
        </div>
        <h2 className="mt-5 text-xl font-bold leading-snug text-[#0F2747] transition group-hover:text-[#155E75]">
          {content.title}
        </h2>
        <p className="mt-3 flex-1 leading-7 text-gray-600">{content.description}</p>
        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={() => onRead(content)} className="font-semibold text-[#155E75] hover:text-[#0F2747]">
              Ler artigo
            </button>
            <Link to={`/videos#${content.id}`} className="inline-flex items-center gap-2 font-semibold text-[#155E75] transition group-hover:gap-3">
              Ver vídeo <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ContentCard;
