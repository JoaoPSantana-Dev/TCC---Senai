"use client";

import { useEffect, useMemo, useState } from "react";
import { alerta } from "@/lib/alerta";
import { apiUrl } from "@/lib/paginas";
import type { off } from "process";

const textoPadraoBotao = "Escolha sua Turma";
const textoPadrao = "Selecione uma turma";

interface Sala {
  idSala: number;
  nomeSala: string;
  andar: string;
  bloco: string;
}

interface HorarioAula {
  idHorariosAula: number;
  nomeCurso: string;
  turno: string;
  dia: string;
  idSala: number;
  sala?: Sala | null;
}

interface Turma {
  chave: string; // nome normalizado, serve para comparar
  nome: string; // nome como está no banco, serve para exibir
}

const ordemDias = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];
const ordemTurnos = ["manha", "tarde", "noite"];

// remove acentos e ignora maiúsculas/minúsculas: "terca" encontra "Terça"
function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

// posição do texto numa lista de ordem fixa
function posicao(texto: string, ordem: string[]): number {
  const t = normalizar(texto);
  const indice = ordem.findIndex((item) => t.startsWith(item));
  return indice === -1 ? ordem.length : indice;
};

// Turmas distintas encontradas nos horários, em ordem alfabética
function turmasDisponiveis(horarios: HorarioAula[]): Turma[] {
  const unicas = new Map<string, Turma>();
  for (const { nomeCurso } of horarios) {
    const nome = nomeCurso?.trim();
    if (!nome) continue;
    const chave = normalizar(nome);
    if (!unicas.has(chave)) unicas.set(chave, { chave, nome });
  };
  return Array.from(unicas.values()).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
};

// Aulas da turma escolhida, separadas por dia (segunda a domingo)
function agruparPorDia(horarios: HorarioAula[], chaveTurma: string | null) {
  if (!chaveTurma) return [];

  const porDia = new Map<string, HorarioAula[]>();
  for (const aula of horarios) {
    if (normalizar(aula.nomeCurso ?? "") !== chaveTurma) continue;
    const dia = aula.dia?.trim() || "Sem dia definido";
    porDia.set(dia, [...(porDia.get(dia) ?? []), aula]);
  }
}

