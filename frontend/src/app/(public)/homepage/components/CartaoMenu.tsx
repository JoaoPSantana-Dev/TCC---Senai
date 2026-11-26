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

  // Atraso e duração derivados do titulo: cada card flutua em tempo proprio
  const semente = [...titulo].reduce((soma, c) => soma + c.charCodeAt(0), 0);
  const atraso = (semente % 7) * 0.8;
  const duracao = 5 + (semente % 4) * 0.7

  return (
    <Link
      href={href}
      className="h-full items-center flex flex-row p-8 bg-white rounded-2xl ring-1 ring-white/50 animate-flutuar will-change-transform 
      shadow-[0_2px_4px_rgba(0,0,0,0.25),0_10px_20px_rgba(0,0,0,0.3),0_28px_56px_rgba(0,0,0,0.4)] transition-[scale,box-shadow] duration-300
      hover:scale-[1.03] hover:shadow-[0_4px_8px_rgba(0,0,0,0.25),0_16px_32px_rgba(0,0,0,0.35),0_40px_80px_rgba(0,0,0,0.5)]"
      style={{
        animationDelay: `-${atraso}s`,
        animationDuration: `${duracao}s`
      }}
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
