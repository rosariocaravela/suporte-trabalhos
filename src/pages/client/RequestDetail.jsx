import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, CircleAlert, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { cancelClientRequest, getRequestById, getRequestHistory } from "../../services/requestService";
import RequestConversation from "../../components/common/RequestConversation";
import useRequestRealtime from "../../hooks/useRequestRealtime";

const statusLabels = {
  PENDING: "Pendente",
  IN_REVIEW: "Em análise",
  SCHEDULED: "Agendado",
  IN_PROGRESS: "Em execução",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
};

async function loadRequestData(requestId) {
	const request = await getRequestById(requestId);
	if (!request) return { request: null, history: [] };
	return { request, history: await getRequestHistory(requestId) };
}

function RequestDetail() {
  const { requestId } = useParams();
  const revision = useRequestRealtime("id", requestId);
  const [request, setRequest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    loadRequestData(requestId)
      .then((result) => {
        if (active) {
          setRequest(result.request);
          setHistory(result.history);
        }
      })
      .catch((loadError) => {
        console.error("Não foi possível carregar o pedido:", loadError);
        if (active) setError("Não foi possível carregar este pedido.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [requestId, revision]);

  const retry = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await loadRequestData(requestId);
      setRequest(result.request);
      setHistory(result.history);
    } catch (loadError) {
      console.error("Não foi possível carregar o pedido:", loadError);
      setError("Não foi possível carregar este pedido.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Cancelar este pedido de suporte?")) return;
    setSaving(true);
    setError("");
    setFeedback("");
    try {
      await cancelClientRequest(request.id);
      const result = await loadRequestData(request.id);
      setRequest(result.request);
      setHistory(result.history);
      setFeedback("Pedido cancelado.");
    } catch (cancelError) {
      console.error("Não foi possível cancelar o pedido:", cancelError);
      setError("Não foi possível cancelar o pedido. Atualize a página e tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500" role="status">A carregar pedido...</p>;
  if (error && !request) return <div className="rounded-xl bg-red-50 p-5 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-3 font-bold underline">Tentar novamente</button></div>;
  if (!request) return <div className="rounded-xl border border-slate-200 bg-white p-8 text-center"><CircleAlert className="mx-auto h-8 w-8 text-slate-400" /><p className="mt-3 font-semibold text-slate-700">Pedido não encontrado ou sem autorização para o consultar.</p><Link to="/client/requests" className="mt-4 inline-flex font-bold text-secondary">Voltar aos pedidos</Link></div>;

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/client/requests" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos pedidos
          </Link>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-secondary">Detalhe do pedido</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">{request.id.slice(0, 8).toUpperCase()}</h1>
        </div>
        <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{statusLabels[request.status] ?? request.status}</span>
      </header>

      {feedback && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700" role="status">{feedback}</p>}
      {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">Pedido</p>
              <h2 className="mt-2 text-2xl font-bold text-primary">{request.subject}</h2>
            </div>
            <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-secondary">{request.service?.name ?? "Pedido geral"}</span>
          </div>

          <p className="mt-6 leading-7 text-slate-600">{request.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Prestador</p>
              <p className="mt-2 font-semibold text-primary">{request.provider?.name ?? "A aguardar atribuição"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Preço do serviço</p>
              <p className="mt-2 font-semibold text-primary">{request.service?.price == null ? "A definir" : `${Number(request.service.price).toLocaleString("pt-MZ")} MT`}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-primary">Histórico do pedido</h3>
            {history.length === 0 ? <p className="mt-4 text-sm text-slate-500">Ainda não há alterações no histórico.</p> : <div className="mt-5 space-y-4">
              {history.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{index + 1}</span>
                    {index < history.length - 1 && <span className="mt-2 h-full w-px bg-slate-200" />}
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold text-primary">{event.old_status ? `${statusLabels[event.old_status] ?? event.old_status} → ` : ""}{statusLabels[event.new_status] ?? event.new_status}</p>
                    <p className="mt-1 text-sm text-slate-500">{new Date(event.created_at).toLocaleString("pt-PT")}</p>
                  </div>
                </div>
              ))}
            </div>}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Informações</h3>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3"><span>Data de criação</span><span className="font-semibold text-primary">{new Date(request.created_at).toLocaleString("pt-PT")}</span></div>
              <div className="flex items-center justify-between gap-3"><span>Última atualização</span><span className="font-semibold text-primary">{new Date(request.updated_at).toLocaleString("pt-PT")}</span></div>
              <div className="flex items-center justify-between gap-3"><span>Prioridade</span><span className="font-semibold text-primary">{request.priority}</span></div>
              {request.scheduled_at && <div className="flex items-center justify-between gap-3"><span>Agendamento</span><span className="font-semibold text-primary">{new Date(request.scheduled_at).toLocaleString("pt-PT")}</span></div>}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-bold text-primary">Contacto</h3>
            </div>
            <p className="mt-4 text-sm text-slate-600">{request.contact_phone || "Sem telefone de contacto indicado."}</p>
            {request.status === "PENDING" && <button type="button" onClick={handleCancel} disabled={saving} className="mt-5 w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 disabled:opacity-60">{saving ? "A cancelar..." : "Cancelar pedido"}</button>}
          </div>
        </aside>
      </div>
      <div className="mt-6"><RequestConversation requestId={request.id} /></div>
    </div>
  );
}

export default RequestDetail;
