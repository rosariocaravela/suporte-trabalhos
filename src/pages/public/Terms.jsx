import PublicLayout from "../../layouts/PublicLayout";

function Terms() {
  return (
    <PublicLayout>
      <div className="bg-slate-50 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Informação legal</p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Termos de Uso</h1>
          <p className="mt-5 leading-7 text-slate-600">Esta página apresentará as condições de utilização da plataforma e dos serviços de suporte.</p>
          <h2 className="mt-8 text-xl font-bold text-primary">Utilização da plataforma</h2>
          <p className="mt-2 leading-7 text-slate-600">Os utilizadores devem fornecer informações verdadeiras e utilizar os canais de suporte de forma responsável.</p>
          <h2 className="mt-8 text-xl font-bold text-primary">Serviços</h2>
          <p className="mt-2 leading-7 text-slate-600">As condições específicas de cada serviço serão confirmadas antes do atendimento e poderão depender da avaliação técnica.</p>
        </div>
      </div>
    </PublicLayout>
  );
}

export default Terms;
