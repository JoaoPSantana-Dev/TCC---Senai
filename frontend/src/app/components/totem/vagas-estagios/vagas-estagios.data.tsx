import {
  Briefcase01Icon,
  Building03Icon,
  ClipboardCheckIcon,
} from "@hugeicons/core-free-icons";
import { type Vaga } from "../shared/estrutura-vagas-menu.data";

export const vagasEstagios: Vaga[] = [
  {
    titulo: "Assistente de Vendas",
    href: "/vagas-estagios/assistente-vendas",
    icone: Briefcase01Icon,
  },
  {
    titulo: "Supervisor de Produção",
    href: "/vagas-estagios/supervisor-producao",
    icone: Building03Icon,
  },
  {
    titulo: "Recepcionista",
    href: "/vagas-estagios/recepcionista",
    icone: ClipboardCheckIcon,
  },
];
