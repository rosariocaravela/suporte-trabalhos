import { ArrowLeft, BadgeCheck, CalendarDays, CheckCircle2, MessageSquareText, Phone, WalletCards } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import requests, { requestStatuses } from "../../data/requests";

function RequestDetail() {
  const { requestId } = useParams();
  const request = requests.find((item) => item.id.toLowerCase() === requestId?.toLowerCase()) || requests[0];

  const requestStatus = requestStatuses[request.status] || request.status;

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/client/requests" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos pedidos
          </Link>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-secondary">Detalhe do pedido</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">{request.id}</h1>
        </div>
        <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{requestStatus}</span>
      </header>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">Pedido</p>
              <h2 className="mt-2 text-2xl font-bold text-primary">{request.title}</h2>
            </div>
            <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-secondary">{request.service}</span>
          </div>

          <p className="mt-6 leading-7 text-slate-600">{request.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Provider</p>
              <p className="mt-2 font-semibold text-primary">{request.provider}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Valor</p>
              <p className="mt-2 font-semibold text-primary">{request.budget}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <MessageSquareText className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Resposta do provider</h3>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Após análise do problema, o serviço recomendado é a otimização e limpeza do sistema com validação das aplicações essenciais. O plano inclui diagnóstico, eliminação de programas desnecessários e reforço da segurança.
            </p>
            <div className="mt-5 rounded-xl bg-white p-4">
              <p className="text-sm text-slate-500">Valor</p>
              <p className="mt-1 text-2xl font-bold text-primary">{request.budget}</p>
              <p className="mt-2 text-sm text-slate-500">Estado: Aguardando pagamento</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-primary">Histórico do pedido</h3>
            <div className="mt-5 space-y-4">
              {request.timeline.map((event, index) => (
                <div key={event.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{index + 1}</span>
                    {index < request.timeline.length - 1 && <span className="mt-2 h-full w-px bg-slate-200" />}
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold text-primary">{event.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{event.date}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{event.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Informações</h3>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3"><span>Data de criação</span><span className="font-semibold text-primary">{new Date(request.createdAt).toLocaleDateString("pt-PT")}</span></div>
              <div className="flex items-center justify-between gap-3"><span>Última atualização</span><span className="font-semibold text-primary">{new Date(request.updatedAt).toLocaleDateString("pt-PT")}</span></div>
              <div className="flex items-center justify-between gap-3"><span>Prioridade</span><span className="font-semibold text-primary">Alta</span></div>
              <div className="flex items-center justify-between gap-3"><span>Pagamento</span><span className="font-semibold text-primary">Pendente</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Contactos</h3>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p><span className="font-semibold text-primary">Telefone:</span> {request.contact.phone}</p>
              <p><span className="font-semibold text-primary">Email:</span> {request.contact.email}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <WalletCards className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Pagamento</h3>
            </div>
            <div className="mt-5 rounded-xl bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Pagamento pendente</p>
              <p className="mt-2 text-2xl font-bold text-primary">{request.budget}</p>
              <Link to="/client/payments" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-secondary">
                <CheckCircle2 className="h-4 w-4" />
                Ir para pagamento
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default RequestDetail;
