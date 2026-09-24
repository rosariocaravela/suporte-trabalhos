import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, LayoutDashboard, LogOut, ReceiptText, UserRound, Wrench } from "lucide-react";
import Logo from "../assets/logos/suporte-trabalhos.png";
import useAuth from "../hooks/useAuth";

function ProviderLayout() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const navLinkClass = ({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-primary text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-primary"}`;

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
			<aside className="flex w-full flex-col border-b border-slate-200 bg-white px-5 py-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
				<Link to="/provider" className="mb-6 flex items-center gap-3 px-2" aria-label="Dashboard do prestador">
					<img src={Logo} alt="Suporte-Trabalhos" className="h-12 w-12 object-contain" />
					<div><span className="block text-sm font-bold text-primary">Área do prestador</span><span className="block max-w-32 truncate text-xs text-slate-400">{user?.email}</span></div>
				</Link>
				<nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Navegação do prestador">
					<NavLink to="/provider" end className={navLinkClass}><LayoutDashboard className="h-5 w-5" />Dashboard</NavLink>
					<NavLink to="/provider/requests" className={navLinkClass}><BriefcaseBusiness className="h-5 w-5" />Pedidos recebidos</NavLink>
					<NavLink to="/provider/services" className={navLinkClass}><Wrench className="h-5 w-5" />Meus serviços</NavLink>
					<NavLink to="/provider/payments" className={navLinkClass}><ReceiptText className="h-5 w-5" />Pagamentos</NavLink>
					<NavLink to="/provider/profile" className={navLinkClass}><UserRound className="h-5 w-5" />Meu perfil</NavLink>
				</nav>
				<button type="button" onClick={handleLogout} className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-primary lg:mt-auto"><LogOut className="h-5 w-5" />Sair</button>
			</aside>
			<main className="min-w-0 flex-1"><div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10"><Outlet /></div></main>
		</div>
	);
}

export default ProviderLayout;
