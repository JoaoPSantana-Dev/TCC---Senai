import {
  Briefcase,
  Building2,
  Clock,
  GraduationCap,
  Info,
  LibraryBig,
  MapPinned,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { IconeEscolhido } from "@/lib/iconeSvg";
import { IconeSvg } from "@/components/shared/IconeSvg";

// ícones que podem ser escolhidos no gerenciador de páginas
// a chave é o que fica salvo no banco, o backend tem uma lista igual em paginas.constantes.ts
export const iconesMenu: Record<
  string,
  { rotulo: string; icone: LucideIcon }
> = {
  info: { rotulo: "Informação", icone: Info },
  predio: { rotulo: "Prédio", icone: Building2 },
  relogio: { rotulo: "Relógio", icone: Clock },
  mapa: { rotulo: "Mapa", icone: MapPinned },
  emprego: { rotulo: "Maleta (emprego)", icone: Briefcase },
  estagio: { rotulo: "Estágio", icone: UserRoundCheck },
  curso: { rotulo: "Capelo (cursos)", icone: GraduationCap },
  biblioteca: { rotulo: "Livros (biblioteca)", icone: LibraryBig },
};

interface CartaoMenuProps {
  titulo: string;
  href: string;
  icone: string;
  // ícone escolhido do Lucide
  iconeEscolhido?: IconeEscolhido | null;
}

export function CartaoMenu({
  titulo,
  href,
  icone,
  iconeEscolhido,
}: CartaoMenuProps) {
  const IconeDoSistema = iconesMenu[icone]?.icone ?? Info;

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
          <IconeDoSistema size={48} />
        )}
      </span>
      <h2 className="text-lg font-semibold leading-snug">{titulo}</h2>
    </Link>
  );
}
