import Link from "next/link";

const paginas = [
  {
    titulo: "Sobre o SENAI",
    href: "/sobre-senai",
    icone: "💼",
  },
  {
    titulo: "Sobre o SENAI Mariano Ferraz",
    href: "/sobre-senai-mariano-ferraz",
    icone: "🏢",
  },
  {
    titulo: "Horário das aulas",
    href: "/horario-aulas",
    icone: "⏰",
  },
  {
    titulo: "Mapa da escola",
    href: "/mapa-escola",
    icone: "🗺️",
  },
  {
    titulo: "Vagas de emprego",
    href: "/vagas-emprego",
    icone: "💼",
  },
  {
    titulo: "Vagas de estágio",
    href: "/vagas-estagio",
    icone: "💼",
  },
  {
    titulo: "Cursos",
    href: "/cursos",
    icone: "📚",
  },
  {
    titulo: "Biblioteca",
    href: "/biblioteca",
    icone: "📖",
  },
];

export function BlocoListasComponent() {
  <nav className="w-full max-w-6xl p-4 rounded-xl">
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {paginas.map((pagina) => (
        <li key={pagina.href}>
          <Link
            href={pagina.href}
            className="h-full items-center flex flex-row p-8 bg-white rounded-2xl shadow-xl hover:shadow-md"
          >
            <span className="text-4xl mr-4">{pagina.icone}</span>
            <h2 className="text-2xl font-semibold justify-self-end">
              {pagina.titulo}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  </nav>;
}
