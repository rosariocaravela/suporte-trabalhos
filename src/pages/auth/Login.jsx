import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logos/suporte-trabalhos.png";
import useAuth from "../../hooks/useAuth";

function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { login, loading } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((current) => ({ ...current, [name]: value }));
		setError("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!formData.email || !formData.password) {
			setError("Preencha o email e a palavra-passe para continuar.");
			return;
		}

		const authenticatedUser = await login(formData.email, formData.password);
		if (authenticatedUser) {
			const defaultPath = authenticatedUser.role === "provider" ? "/provider" : "/client";
			navigate(location.state?.from || defaultPath, { replace: true });
		}
	};

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
			<div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-100 via-blue-50/60 to-transparent" />
			<div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl" />
			<div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-sky-100/80 blur-3xl" />

			<section className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,39,71,0.12)] sm:p-9">
				<div className="mb-8 flex flex-col items-center text-center">
					<Link
						to="/"
						className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-lg"
						aria-label="Voltar à página inicial"
					>
						<img src={Logo} alt="Suporte-Trabalhos" className="h-full w-full object-contain" />
					</Link>
					<h1 className="text-3xl font-bold tracking-tight text-primary">Bem-vindo de volta</h1>
					<p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
						Entre na sua conta para acompanhar os seus pedidos de suporte.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
							Email ou telefone
						</label>
						<div className="relative">
							<Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
							<input
								id="email"
								name="email"
								type="text"
								autoComplete="username"
								value={formData.email}
								onChange={handleChange}
								placeholder="Introduza o seu email ou telefone"
								className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10"
							/>
						</div>
					</div>

					<div>
						<div className="mb-2 flex items-center justify-between gap-3">
							<label htmlFor="password" className="text-sm font-semibold text-slate-700">
								Palavra-passe
							</label>
							<button type="button" className="text-xs font-semibold text-secondary transition hover:text-primary">
								Esqueceu-se?
							</button>
						</div>
						<div className="relative">
							<LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Introduza a sua palavra-passe"
								className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10"
							/>
							<button
								type="button"
								onClick={() => setShowPassword((current) => !current)}
								className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-secondary"
								aria-label={showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
							>
								{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>

					{error && <p className="text-sm font-medium text-red-600">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-secondary hover:shadow-lg active:translate-y-0"
					>
						{loading ? "A entrar..." : "Entrar na conta"}
						<ArrowRight className="h-4 w-4" />
					</button>
				</form>

				<div className="my-7 flex items-center gap-3 text-xs text-slate-400">
					<span className="h-px flex-1 bg-slate-200" />
					<span>ou continue com</span>
					<span className="h-px flex-1 bg-slate-200" />
				</div>

				<div className="grid grid-cols-2 gap-3">
					<button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
						<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
							<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
							<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
							<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
						</svg>
						<span>Google</span>
					</button>
					<button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
						<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.01-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.42.36.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.69.83.57C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" fill="#24292F" />
						</svg>
						<span>GitHub</span>
					</button>
				</div>

				<p className="mt-7 text-center text-sm text-slate-500">
					Ainda não tem uma conta?{" "}
					  <Link to="/auth/registar" className="font-bold text-secondary transition hover:text-primary">
						Criar conta
					</Link>
				</p>
			</section>
		</main>
	);
}

export default Login;
