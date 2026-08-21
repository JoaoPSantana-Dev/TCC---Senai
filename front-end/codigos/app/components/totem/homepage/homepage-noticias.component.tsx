import { CarrosselNoticiasComponent } from "../shared/carrossel-noticias.component";

// HomepageNoticias
// seção de notícias da homepage, responsável por organizar e destacar as principais notícias e eventos da unidade

export function HomepageNoticias() {
  return (
    <section className="w-full bg-zinc-800 mt-50 py-4">
      <h2 className="text-center text-4xl font-bold my-2 text-white">
        NOTÍCIAS
      </h2>
      <CarrosselNoticiasComponent />
    </section>
  );
}
