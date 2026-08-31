import { HugeiconsIconProps } from "@hugeicons/react";

// estrutura dos dados da vaga
export interface Vaga {
  titulo: string;
  href: string;
  icone: HugeiconsIconProps["icon"];
}

// estrutura padrão do menu
export const vagasPadrao: Vaga[] = [];

// compatibilidade com o restante do sistema
export const vagas = vagasPadrao;
