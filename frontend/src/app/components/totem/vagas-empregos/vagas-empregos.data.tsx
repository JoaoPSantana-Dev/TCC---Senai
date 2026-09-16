import {
  Briefcase01Icon,
  Building03Icon,
  ClipboardCheckIcon,
} from "@hugeicons/core-free-icons";
import { type Vaga } from "../shared/estrutura-vagas-menu.data";

export const vagasEmpregos: Vaga[] = [
  {
    titulo: "Assistente de Vendas",
    href: "/vagas-empregos/assistente-vendas",
    icone: Briefcase01Icon,
  },
  {
    titulo: "Supervisor de Produção",
    href: "/vagas-empregos/supervisor-producao",
    icone: Building03Icon,
  },
  {
    titulo: "Recepcionista",
    href: "/vagas-empregos/recepcionista",
    icone: ClipboardCheckIcon,
  },
];
