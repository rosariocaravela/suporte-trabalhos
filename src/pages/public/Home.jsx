import PublicLayout from "../../layouts/PublicLayout";

function Home() {
  return (
    <PublicLayout>

      <section className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="text-center">

          <h1 className="text-4xl font-bold text-primary md:text-5xl">
            Suporte aos Trabalhos
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Bem-vindo ao Suporte-Trabalhos
          </p>

          <button className="mt-6 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-90">
            Conhecer os serviços
          </button>

        </div>
      </section>

    </PublicLayout>
  );
}

export default Home;