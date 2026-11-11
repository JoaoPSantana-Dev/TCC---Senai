import type { IconSvgElement } from "@hugeicons/react";

// o que o menu de vagas precisa de cada item
// os demais campos como empresa, salário, carga horária e etc ficam no registro que vem do banco
// e só são lidos pelo painel de detalhes PainelVagas, que sabe quais campos mostrar em cada tipo
export interface Vaga {
  cargo: string;
  icone?: IconSvgElement;
}

export const vagas: Vaga[] = [];
