import { useState } from "react";
import { Lock, Save, UserRound } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { requestPasswordReset } from "../../services/authService";

function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setFeedback("");
    try {
      await updateProfile({ name, phone });
      setFeedback("Perfil atualizado.");
    } catch (saveError) {
      console.error("Não foi possível atualizar o perfil:", saveError);
      setError("Não foi possível guardar as alterações. Verifique a ligação e tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setFeedback("");
    try {
      await requestPasswordReset(user?.email);
      setFeedback("Enviámos um link para alterar a palavra-passe para o email da conta.");
    } catch (resetError) {
      console.error("Não foi possível solicitar a alteração da palavra-passe:", resetError);
      setError("Não foi possível enviar o link. Tente novamente mais tarde.");
    }
  };

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
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary">{user?.name}</h2>
            <p className="mt-1 text-sm text-slate-500">Cliente · {user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Nome completo
            <input value={name} onChange={(event) => setName(event.target.value)} required maxLength="120" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Email
            <input value={user?.email ?? ""} type="email" readOnly className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm font-normal text-slate-500" />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Telefone
            <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" maxLength="30" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-normal outline-none focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" />
          </label>

          {error && <p className="sm:col-span-2 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}
          {feedback && <p className="sm:col-span-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700" role="status">{feedback}</p>}
          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
            <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-secondary disabled:opacity-60">
              <Save className="h-4 w-4" />
              {saving ? "A guardar..." : "Guardar alterações"}
            </button>
            <button type="button" onClick={handlePasswordReset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
              <Lock className="h-4 w-4" />
              Enviar link para alterar palavra-passe
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
