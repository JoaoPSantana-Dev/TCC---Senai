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
      className="flex h-full min-h-44 w-56 flex-col items-center justify-center gap-4 rounded-3xl
        bg-white px-5 py-7 text-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.18)]
        transition-all duration-150 hover:shadow-md active:scale-95"
    >
      <span className="text-red-600">
        {iconeEscolhido ? (
          <IconeSvg dados={iconeEscolhido.dados} tamanho={48} />
        ) : (
          <HugeiconsIcon icon={iconeDoSistema} size={48} />
        )}
      </span>
      <h2 className="text-lg font-semibold leading-snug">{titulo}</h2>
    </Link>
  );
}
