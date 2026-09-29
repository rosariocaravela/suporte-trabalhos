import { useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, Save } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { updatePassword } from "../../services/authService";

function PasswordReset() {
	const { user, loading } = useAuth();
	const [password, setPassword] = useState("");
	const [confirmation, setConfirmation] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		if (password.length < 6) {
			setError("A palavra-passe deve ter pelo menos 6 caracteres.");
			return;
		}
		if (password !== confirmation) {
			setError("As palavras-passe não coincidem.");
			return;
		}

		setSubmitting(true);
		try {
			await updatePassword(password);
			setSuccess(true);
			setPassword("");
			setConfirmation("");
		} catch (updateError) {
			console.error("Não foi possível alterar a palavra-passe:", updateError);
			setError("Não foi possível alterar a palavra-passe. O link pode ter expirado; peça outro e tente novamente.");
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) return <main className="flex min-h-screen items-center justify-center text-sm text-slate-500" role="status">A verificar a sessão...</main>;

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
			<section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
				<div className="mb-7 text-center">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-primary"><LockKeyhole className="h-6 w-6" /></div>
					<h1 className="mt-4 text-2xl font-bold text-slate-900">Nova palavra-passe</h1>
					<p className="mt-2 text-sm text-slate-500">{user ? `Conta: ${user.email}` : "Abra o link de recuperação enviado ao seu email."}</p>
				</div>

				{success ? (
					<div className="space-y-4 text-center"><p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700" role="status">Palavra-passe alterada com sucesso.</p><Link to={user?.role === "provider" ? "/provider" : "/client"} className="inline-flex font-bold text-secondary">Continuar para a conta</Link></div>
				) : !user ? (
					<div className="space-y-4 text-center"><p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">A sessão de recuperação não está ativa ou o link expirou.</p><Link to="/auth/login" className="inline-flex font-bold text-secondary">Voltar ao login</Link></div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<label className="block text-sm font-semibold text-slate-700">Nova palavra-passe<input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength="6" className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 font-normal" /></label>
						<label className="block text-sm font-semibold text-slate-700">Confirmar palavra-passe<input type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required minLength="6" className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 font-normal" /></label>
						{error && <p className="text-sm text-red-700" role="alert">{error}</p>}
						<button type="submit" disabled={submitting} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white disabled:opacity-60"><Save className="h-4 w-4" />{submitting ? "A guardar..." : "Guardar nova palavra-passe"}</button>
					</form>
				)}
			</section>
		</main>
	);
}

export default PasswordReset;