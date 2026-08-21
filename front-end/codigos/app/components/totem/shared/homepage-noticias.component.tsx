import { CarrosselNoticiasComponent } from "./carrossel-noticias.component";

export function HomepageNoticias() {
  return (
    <section className="w-full max-w-4xl bg-zinc-800 mt-50 p-4 rounded-xl">
      <h2 className="text-center text-4xl font-bold my-2 text-white">
        DESTAQUES
      </h2>
      <CarrosselNoticiasComponent />
    </section>
  );
}
