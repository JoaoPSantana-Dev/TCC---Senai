import {
  Briefcase01Icon,
  Building03Icon,
  ClipboardCheckIcon,
} from "@hugeicons/core-free-icons";
import { type Vaga } from "@/components/shared/EstruturaMenuVagas.data";

export const vagasCursos: Vaga[] = [
  {
    cargo: "Técnico em Desenvolvimento de Sistemas",
    href: "/vagas-cursos/assistente-vendas",
    icone: Briefcase01Icon,
  },
  {
    cargo: "Curso de Aprendizagem Industrial",
    href: "/vagas-cursos/supervisor-producao",
    icone: Building03Icon,
  },
  {
    cargo: "Recepcionista",
    href: "/vagas-cursos/recepcionista",
    icone: ClipboardCheckIcon,
  },
];
