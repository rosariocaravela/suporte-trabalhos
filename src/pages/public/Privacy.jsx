import PublicLayout from "../../layouts/PublicLayout";

function Privacy() {
  return (
    <PublicLayout>
      <div className="bg-slate-50 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Informação legal</p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Política de Privacidade</h1>
          <p className="mt-5 leading-7 text-slate-600">Esta página apresentará as regras de tratamento e proteção dos dados dos utilizadores da plataforma.</p>
          <h2 className="mt-8 text-xl font-bold text-primary">Dados recolhidos</h2>
          <p className="mt-2 leading-7 text-slate-600">Os dados enviados nos formulários serão utilizados apenas para responder a pedidos de suporte e contacto.</p>
          <h2 className="mt-8 text-xl font-bold text-primary">Atualizações</h2>
          <p className="mt-2 leading-7 text-slate-600">O conteúdo será revisto quando a política definitiva for definida para a integração com o backend.</p>
        </div>
      </div>
    </PublicLayout>
  );
}

export default Privacy;
