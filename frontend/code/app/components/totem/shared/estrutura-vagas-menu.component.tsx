import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { type Vaga, vagas } from "./estrutura-vagas-menu.data";

interface EstruturaVagasMenuProps {
  itens?: Vaga[];
  className?: string;
  itemClassName?: string;
}

export function EstruturaVagasMenuComponent({
  itens = vagas,
  className = "w-full max-w-6xl p-4 rounded-xl",
  itemClassName = "h-full items-center flex flex-row p-8 bg-white rounded-2xl shadow-xl hover:shadow-md",
}: EstruturaVagasMenuProps) {
  return (
    <nav className={className}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {itens.map((vaga) => (
          <li key={`${vaga.href}-${vaga.titulo}`}>
            <Link href={vaga.href} className={itemClassName}>
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
