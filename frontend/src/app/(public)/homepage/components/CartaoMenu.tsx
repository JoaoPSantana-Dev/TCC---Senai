import {
  Building03Icon,
  Briefcase01Icon,
  InfoIcon,
  LibraryBigIcon,
  MapsSearchIcon,
  Mortarboard02Icon,
  PermanentJobIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import Link from "next/link";
import type { IconeEscolhido } from "@/lib/iconeSvg";
import { IconeSvg } from "@/components/shared/IconeSvg";

// ícones que podem ser escolhidos no gerenciador de páginas
// a chave é o que fica salvo no banco, o backend tem uma lista igual em paginas.constantes.ts
export const iconesMenu: Record<
  string,
  { rotulo: string; icone: HugeiconsIconProps["icon"] }
> = {
  info: { rotulo: "Informação", icone: InfoIcon },
  predio: { rotulo: "Prédio", icone: Building03Icon },
  relogio: { rotulo: "Relógio", icone: Clock01Icon },
  mapa: { rotulo: "Mapa", icone: MapsSearchIcon },
  emprego: { rotulo: "Maleta (emprego)", icone: Briefcase01Icon },
  estagio: { rotulo: "Estágio", icone: PermanentJobIcon },
  curso: { rotulo: "Capelo (cursos)", icone: Mortarboard02Icon },
  biblioteca: { rotulo: "Livros (biblioteca)", icone: LibraryBigIcon },
};

interface CartaoMenuProps {
  titulo: string;
  href: string;
  icone: string;
  // ícone escolhido do Hugeicons
  iconeEscolhido?: IconeEscolhido | null;
}

export function CartaoMenu({
  titulo,
  href,
  icone,
  iconeEscolhido,
}: CartaoMenuProps) {
  const iconeDoSistema = iconesMenu[icone]?.icone ?? InfoIcon;

  return (
    <Link
      href={href}
      className="h-full items-center flex flex-row p-8 bg-white rounded-2xl shadow-xl hover:shadow-md"
    >
      <span className="text-4xl mr-4">
        {iconeEscolhido ? (
          <IconeSvg dados={iconeEscolhido.dados} tamanho={40} />
        ) : (
          <HugeiconsIcon icon={iconeDoSistema} size={40} />
        )}
      </span>
      <h2 className="text-2xl font-semibold justify-self-end">{titulo}</h2>
    </Link>
  );
}
