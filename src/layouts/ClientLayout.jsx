import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { BookOpen, CircleHelp, LayoutDashboard, LogOut, PlayCircle, ReceiptText, Wrench } from "lucide-react";
import Logo from "../assets/logos/suporte-trabalhos.png";
import useAuth from "../hooks/useAuth";

function ClientLayout() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const navLinkClass = ({ isActive }) =>
		`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
			isActive
				? "bg-gradient-to-r from-primary to-secondary text-white shadow-sm"
				: "text-slate-600 hover:bg-slate-100 hover:text-primary"
		}`;

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
			<aside className="flex w-full flex-col border-b border-slate-200 bg-white px-5 py-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
				<Link to="/client" className="mb-6 flex items-center gap-3 px-2" aria-label="Dashboard do cliente">
					<img src={Logo} alt="Suporte-Trabalhos" className="h-12 w-12 object-contain" />
					<div>
						<span className="block text-sm font-bold text-primary">Área do cliente</span>
						<span className="block max-w-32 truncate text-xs text-slate-400">{user?.email}</span>
					</div>
				</Link>

				<nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Navegação do cliente">
					<NavLink to="/client" end className={navLinkClass}>
						<LayoutDashboard className="h-5 w-5" />
						Dashboard
					</NavLink>
					<NavLink to="/client/request" className={navLinkClass}>
						<Wrench className="h-5 w-5" />
						Solicitar suporte
					</NavLink>
					<NavLink to="/client/requests" className={navLinkClass}>
						<Wrench className="h-5 w-5" />
						Meus pedidos
					</NavLink>
					<NavLink to="/client/payments" className={navLinkClass}>
						<ReceiptText className="h-5 w-5" />
						Pagamentos
					</NavLink>
					<NavLink to="/client/profile" className={navLinkClass}>
						<CircleHelp className="h-5 w-5" />
						Perfil
					</NavLink>
				</nav>

				<div className="mt-7">
					<p className="mb-2 px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Explorar</p>
					<nav className="flex flex-col gap-1" aria-label="Conteúdos públicos">
						<NavLink to="/servicos" className={navLinkClass}>
							<Wrench className="h-5 w-5" />
							Serviços
						</NavLink>
						<NavLink to="/conteudos" className={navLinkClass}>
							<BookOpen className="h-5 w-5" />
							Conteúdos
						</NavLink>
						<NavLink to="/videos" className={navLinkClass}>
							<PlayCircle className="h-5 w-5" />
							Vídeos
						</NavLink>
						<NavLink to="/faq" className={navLinkClass}>
							<CircleHelp className="h-5 w-5" />
							FAQ
						</NavLink>
					</nav>
				</div>

				<button type="button" onClick={handleLogout} className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-primary lg:mt-auto">
					<LogOut className="h-5 w-5" />
					Sair
				</button>
			</aside>

			<main className="min-w-0 flex-1">
				<div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default ClientLayout;
