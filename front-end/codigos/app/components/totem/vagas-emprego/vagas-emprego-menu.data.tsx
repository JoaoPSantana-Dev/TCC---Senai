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
import { HugeiconsIconProps } from "@hugeicons/react";

// estrutura dos dados da vaga
export interface Vaga {
  titulo: string;
  href: string;
  icone: HugeiconsIconProps["icon"];
}

// estrutura das vagas que vão pro menu
export const vagas: Vaga[] = [
  {
    titulo: "Sobre o SENAI",
    href: "/sobre-senai",
    icone: InfoIcon,
  },
  {
    titulo: "Sobre o SENAI Mariano Ferraz",
    href: "/sobre-senai-mariano-ferraz",
    icone: Building03Icon,
  },
  {
    titulo: "Horário das aulas",
    href: "/horario-aulas",
    icone: Clock01Icon,
  },
  {
    titulo: "Mapa da escola",
    href: "/mapa-escola",
    icone: MapsSearchIcon,
  },
  {
    titulo: "Vagas de emprego",
    href: "/vagas-emprego",
    icone: Briefcase01Icon,
  },
  {
    titulo: "Vagas de estágio",
    href: "/vagas-estagio",
    icone: PermanentJobIcon,
  },
  {
    titulo: "Cursos",
    href: "/cursos",
    icone: Mortarboard02Icon,
  },
  {
    titulo: "Biblioteca",
    href: "/biblioteca",
    icone: LibraryBigIcon,
  },
];
