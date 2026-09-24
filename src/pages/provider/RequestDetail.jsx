import { ArrowLeft, BadgeCheck, CalendarDays, MessageSquareText, UserRound, WalletCards } from "lucide-react";
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
          <Link to="/provider/requests" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos pedidos
          </Link>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-secondary">Pedido recebido</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">{request.id}</h1>
        </div>
        <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{requestStatus}</span>
      </header>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">Cliente</p>
              <h2 className="mt-2 text-2xl font-bold text-primary">{request.clientName}</h2>
            </div>
            <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-secondary">{request.service}</span>
          </div>

          <p className="mt-6 leading-7 text-slate-600">{request.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Contacto</p>
              <p className="mt-2 font-semibold text-primary">{request.contact.phone}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Email</p>
              <p className="mt-2 font-semibold text-primary">{request.contact.email}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <MessageSquareText className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Resposta ao cliente</h3>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Após análise do problema, o serviço recomendado é a otimização e limpeza do sistema com validação das aplicações essenciais. O plano inclui diagnóstico, eliminação de programas desnecessários e reforço da segurança.
            </p>
            <div className="mt-5 rounded-xl bg-white p-4">
              <p className="text-sm text-slate-500">Valor proposto</p>
              <p className="mt-1 text-2xl font-bold text-primary">{request.budget}</p>
              <p className="mt-2 text-sm text-slate-500">Prazo estimado: 2 dias úteis</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-primary">Mensagens e histórico</h3>
            <div className="mt-5 space-y-4">
              {request.messages.map((message) => (
                <div key={message.id} className={`rounded-2xl border p-4 ${message.sender === "provider" ? "border-sky-200 bg-sky-50" : "border-slate-200 bg-white"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-primary">{message.author}</span>
                    <span className="text-xs text-slate-500">{message.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{message.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Resumo</h3>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3"><span>Prioridade</span><span className="font-semibold text-primary">Alta</span></div>
              <div className="flex items-center justify-between gap-3"><span>Estado</span><span className="font-semibold text-primary">{requestStatus}</span></div>
              <div className="flex items-center justify-between gap-3"><span>Pagamento</span><span className="font-semibold text-primary">Pendente</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Cliente</h3>
            </div>
            <p className="mt-4 text-lg font-semibold text-primary">{request.clientName}</p>
            <p className="mt-2 text-sm text-slate-500">{request.contact.email}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <WalletCards className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Ações</h3>
            </div>
            <div className="mt-5 space-y-3">
              <button type="button" className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-secondary">Aceitar pedido</button>
              <button type="button" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Solicitar mais informações</button>
              <button type="button" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Enviar orçamento</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default RequestDetail;
