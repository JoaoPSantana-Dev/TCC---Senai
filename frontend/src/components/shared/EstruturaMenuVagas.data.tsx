import type { IconSvgElement } from "@hugeicons/react";

export interface VagaEmprego {
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

export const vagasEmprego: VagaEmprego[] = [];

export interface VagaEstagio {
  idEstagio: number;
  nomeEmpresa: string;
  cargo: string;
  requisitos: string;
  salario: string;
  beneficios: string;
  descricao: string;
  localizacao: string;
  contato: string;
  areaEstagio: string;
  icone?: IconSvgElement;
}

export const vagasEstagio: VagaEstagio[] = [];
