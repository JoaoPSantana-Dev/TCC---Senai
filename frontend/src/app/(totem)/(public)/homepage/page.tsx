import { paginas } from "@/app/components/totem/homepage/homepage-menu.data";
import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { TituloComponent } from "@/app/components/totem/shared/titulo.component";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function Homepage() {
  return (
    <EstruturaTotemComponent>
      <TituloComponent texto="Bem-vindo ao totem do SENAI Mariano Ferraz!">
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
      </TituloComponent>
    </EstruturaTotemComponent>
  );
}
