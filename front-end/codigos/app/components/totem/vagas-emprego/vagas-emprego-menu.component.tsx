import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { vagas } from "./vagas-emprego-menu.data";

// VagasEmpregoMenuComponent
// monta o menu de oportunidades de emprego do totem com links para as vagas disponíveis.

export function VagasEmpregoMenuComponent() {
  return (
    <nav className="w-full max-w-6xl p-4 rounded-xl">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vagas.map((vaga) => (
          <li key={vaga.href}>
            <Link
              href={vaga.href}
              className="h-full items-center flex flex-row p-8 bg-white rounded-2xl shadow-xl hover:shadow-md"
            >
              <span className="text-4xl mr-4">
                <HugeiconsIcon icon={vaga.icone} size={40} />
              </span>
              <h2 className="text-2xl font-semibold justify-self-end">
                {vaga.titulo}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
