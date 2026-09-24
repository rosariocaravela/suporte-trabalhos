import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logos/suporte-trabalhos.png";
import useAuth from "../../hooks/useAuth";

function Register() {
	const navigate = useNavigate();
	const { register, loading } = useAuth();
	const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
	const [error, setError] = useState("");

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((current) => ({ ...current, [name]: value }));
		setError("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (formData.password.length < 6) {
			setError("A palavra-passe deve ter pelo menos 6 caracteres.");
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			setError("As palavras-passe não coincidem.");
			return;
		}

		const user = await register(formData);
		if (user) {
			navigate("/client", { replace: true });
		}
	};

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
			<div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-100 via-blue-50/60 to-transparent" />
			<section className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,39,71,0.12)] sm:p-9">
				<div className="mb-7 flex flex-col items-center text-center">
					<Link to="/" className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white p-2 shadow-lg" aria-label="Voltar à página inicial">
						<img src={Logo} alt="Suporte-Trabalhos" className="h-full w-full object-contain" />
					</Link>
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Novo cliente</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary">Criar a sua conta</h1>
					<p className="mt-2 text-sm text-slate-500">Registe-se para solicitar e acompanhar serviços de suporte.</p>
				</div>

				<form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
					<label className="text-sm font-semibold text-slate-700 sm:col-span-2">Nome completo<div className="relative"><UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder="Introduza o seu nome" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" /></div></label>
					<label className="text-sm font-semibold text-slate-700">Email<div className="relative"><Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="email@exemplo.com" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" /></div></label>
					<label className="text-sm font-semibold text-slate-700">Telefone<div className="relative"><Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input name="phone" type="tel" value={formData.phone} onChange={handleChange} required autoComplete="tel" placeholder="+258 84 000 0000" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" /></div></label>
					<label className="text-sm font-semibold text-slate-700">Palavra-passe<div className="relative"><LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input name="password" type="password" value={formData.password} onChange={handleChange} required autoComplete="new-password" placeholder="Mínimo 6 caracteres" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" /></div></label>
					<label className="text-sm font-semibold text-slate-700">Confirmar palavra-passe<div className="relative"><LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required autoComplete="new-password" placeholder="Repita a palavra-passe" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" /></div></label>
					{error && <p className="text-sm font-medium text-red-600 sm:col-span-2">{error}</p>}
					<button type="submit" disabled={loading} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">{loading ? "A criar conta..." : "Criar conta"}<ArrowRight className="h-4 w-4" /></button>
				</form>
				<p className="mt-7 text-center text-sm text-slate-500">Já tem uma conta? <Link to="/auth/login" className="font-bold text-secondary hover:text-primary">Entrar</Link></p>
			</section>
		</main>
	);
}

export default Register;
