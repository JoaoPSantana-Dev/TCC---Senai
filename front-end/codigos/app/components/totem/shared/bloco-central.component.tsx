import Link from "next/link";
import { NoticiasComponent } from "./noticias.component";
import ImagemComponent from "../../administrador/shared/imagem.component";

const pages = [
  {
    titulo: "Sobre o SENAI",
    href: "/sobre-senai",
    descricao: "Um pouco sobre a instituição SENAI",
    icon: "💼",
  },
  {
    titulo: "Sobre o SENAI Mariano Ferraz",
    href: "/sobre-senai-mariano-ferraz",
    descricao: "Um pouco sobre o SENAI Mariano Ferraz",
    icon: "🏢",
  },
  {
    titulo: "Horário das aulas",
    href: "/horario-aulas",
    descricao: "Grade de horário das aulas",
    icon: "⏰",
  },
  {
    titulo: "Mapa da escola",
    href: "/mapa-escola",
    descricao: "Visão geral do mapa da escola",
    icon: "🗺️",
  },
  {
    titulo: "Vagas de emprego",
    href: "/vagas-emprego",
    descricao: "Informações sobre vagas de emprego",
    icon: "💼",
  },
  {
    titulo: "Vagas de estágio",
    href: "/vagas-estagio",
    descricao: "Informações sobre vagas de estágio",
    icon: "💼",
  },
  {
    titulo: "Cursos",
    href: "/cursos",
    descricao: "Informações sobre os cursos",
    icon: "📚",
  },
];

const noticias = [
  {
    id: 1,
    titulo: "Notícia 1",
    imagem: "tubarao.png",
  },
  {
    id: 2,
    titulo: "Notícia 2",
    imagem: "tubarao.png",
  },
];

const cards = [
  <div key="1" className="h-32 flex items-center justify-center font-bold">
    <ImagemComponent nomeImagem="tubarao.png" />
  </div>,
  <div key="2" className="h-32 flex items-center justify-center font-bold">
    <ImagemComponent nomeImagem="tubarao.png" />
  </div>,
  <div key="3" className="h-32 flex items-center justify-center font-bold">
    <ImagemComponent nomeImagem="tubarao.png" />
  </div>,
  <div key="4" className="h-32 flex items-center justify-center font-bold">
    <ImagemComponent nomeImagem="tubarao.png" />
  </div>,
];

export function BlocoCentralComponent() {
  return (
    <main className="min-h-auto flex flex-col items-center justify-center p-4">
      <h1 className="text-center text-2xl font-semibold my-2 pb-8">
        Bem-vindo ao totem do SENAI Mariano Ferraz!
      </h1>
      <nav className="w-full max-w-4xl bg-neutral-200 p-4 rounded-xl">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="h-full justify-center flex flex-col p-4 bg-neutral-100 rounded-xl hover:shadow-md duration-150 "
              >
                <span className="text-3xl mb-3">{page.icon}</span>
                <h2 className="text-lg font-semibold">
                  <span>{page.titulo}</span>
                </h2>
                <p className="text-sm mt-1">{page.descricao}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="w-full max-w-4xl bg-neutral-200 mt-50 p-4 rounded-xl dat">
        <h1 className="text-center text-4xl font-bold my-2 pb-8">DESTAQUES</h1>
        {/* Carrossel container */}
        <div className="data-">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="...">
              <img src={noticia.imagem} alt={noticia.titulo} />
            </article>
          ))}
        </div>

        <NoticiasComponent items={cards} />
      </section>
    </main>
  );
}
