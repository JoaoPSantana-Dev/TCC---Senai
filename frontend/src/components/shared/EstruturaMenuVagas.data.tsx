import type { IconSvgElement } from "@hugeicons/react";

export interface Vaga {
  idEmprego: number;
  nomeEmpresa: string;
  cargo: string;
  requisitos: string;
  salario: string;
  beneficios: string;
  descricao: string;
  localizacao: string;
  contato: string;
  areaEmprego: string;
  icone?: IconSvgElement;
}

export const vagas: Vaga[] = [];
