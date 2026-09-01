import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { paginas } from "./homepage-menu.data";

// HomepageMenuComponent
// monta o menu principal da homepage do totem com links para as páginas do projeto

export function HomepageMenuComponent() {
  return (
    <nav className="w-full max-w-6xl p-4 rounded-xl">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {paginas.map((pagina) => (
          <li key={pagina.href}>
            <Link
              href={pagina.href}
              className="h-full items-center flex flex-row p-8 bg-white rounded-2xl shadow-xl hover:shadow-md"
            >
              <span className="text-4xl mr-4">
                <HugeiconsIcon icon={pagina.icone} size={40} />
              </span>
              <h2 className="text-2xl font-semibold justify-self-end">
                {pagina.titulo}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
