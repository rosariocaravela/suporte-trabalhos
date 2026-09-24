import { Camera, Lock, PencilLine, Save, UserRound } from "lucide-react";

function Profile() {
  return (
    <div>
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Perfil</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meu perfil</h1>
        <p className="mt-2 text-slate-500">Mantenha os seus dados pessoais e preferências atualizados.</p>
      </header>

      <section className="mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-primary">
              <UserRound className="h-10 w-10" />
            </div>
            <button type="button" className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-sm hover:bg-secondary">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary">Maria Costa</h2>
            <p className="mt-1 text-sm text-slate-500">Cliente • m.costa@email.com</p>
          </div>
        </div>

        <form className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Nome completo
            <input defaultValue="Maria Costa" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Email
            <input defaultValue="m.costa@email.com" type="email" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Telefone
            <input defaultValue="+258 84 123 4567" type="tel" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Preferências
            <input defaultValue="Suporte remoto, redes e backup" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" />
          </label>

          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-secondary">
              <Save className="h-4 w-4" />
              Guardar alterações
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
              <Lock className="h-4 w-4" />
              Alterar palavra-passe
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
