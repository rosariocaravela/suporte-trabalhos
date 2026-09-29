import { useEffect, useState } from "react";
import { MessageSquareText, Send } from "lucide-react";
import { supabase } from "../../lib/supabase";
import useAuth from "../../hooks/useAuth";
import { listRequestMessages, markRequestMessagesRead, sendRequestMessage } from "../../services/messageService";

function RequestConversation({ requestId }) {
	const { user } = useAuth();
	const [messages, setMessages] = useState([]);
	const [draft, setDraft] = useState("");
	const [loading, setLoading] = useState(true);
	const [sending, setSending] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		const refresh = async () => {
			try {
				const result = await listRequestMessages(requestId);
				if (active) setMessages(result);
				await markRequestMessagesRead(requestId);
				if (active) setError("");
			} catch (loadError) {
				console.error("Não foi possível carregar as mensagens:", loadError);
				if (active) setError("Não foi possível carregar a conversa.");
			} finally {
				if (active) setLoading(false);
			}
		};

		void refresh();
		const channel = supabase
			.channel(`request-messages-${requestId}-${user?.id}`)
			.on("postgres_changes", {
				event: "*",
				schema: "public",
				table: "messages",
				filter: `request_id=eq.${requestId}`,
			}, () => { void refresh(); })
			.subscribe();

		return () => {
			active = false;
			void supabase.removeChannel(channel);
		};
	}, [requestId, user?.id]);

	const retry = async () => {
		setLoading(true);
		setError("");
		try {
			const result = await listRequestMessages(requestId);
			setMessages(result);
			await markRequestMessagesRead(requestId);
		} catch (loadError) {
			console.error("Não foi possível carregar as mensagens:", loadError);
			setError("Não foi possível carregar a conversa.");
		} finally { setLoading(false); }
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!draft.trim()) return;
		setSending(true);
		setError("");
		try {
			const created = await sendRequestMessage(requestId, draft);
			setMessages((current) => current.some((message) => message.id === created.id) ? current : [...current, created]);
			setDraft("");
		} catch (sendError) {
			console.error("Não foi possível enviar a mensagem:", sendError);
			setError("Não foi possível enviar a mensagem. Verifique a ligação e tente novamente.");
		} finally { setSending(false); }
	};

	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-label="Conversa do pedido">
			<div className="flex items-center gap-3"><MessageSquareText className="h-5 w-5 text-secondary" /><h2 className="text-lg font-bold text-primary">Conversa do pedido</h2></div>
			<div className="mt-5 max-h-96 space-y-3 overflow-y-auto">
				{loading && <p className="text-sm text-slate-500" role="status">A carregar mensagens...</p>}
				{error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
				{!loading && !error && messages.length === 0 && <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Ainda não há mensagens neste pedido.</p>}
				{messages.map((message) => {
					const ownMessage = message.sender_id === user?.id;
					return <article key={message.id} className={`max-w-[90%] rounded-xl p-3 ${ownMessage ? "ml-auto bg-sky-50" : "mr-auto bg-slate-50"}`}><p className="whitespace-pre-wrap break-words text-sm text-slate-700">{message.message}</p><time className="mt-2 block text-right text-[11px] text-slate-400">{new Date(message.created_at).toLocaleString("pt-PT")}</time></article>;
				})}
			</div>
			<form onSubmit={handleSubmit} className="mt-4 flex items-end gap-2"><label className="sr-only" htmlFor={`message-${requestId}`}>Escreva uma mensagem</label><textarea id={`message-${requestId}`} value={draft} onChange={(event) => setDraft(event.target.value)} rows="2" maxLength="5000" placeholder="Escreva uma mensagem sobre este pedido..." className="min-h-11 flex-1 resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-secondary" /><button type="submit" disabled={sending || !draft.trim()} aria-label="Enviar mensagem" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white disabled:opacity-50"><Send className="h-4 w-4" /></button></form>
		</section>
	);
}

export default RequestConversation;