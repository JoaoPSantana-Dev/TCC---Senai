"use client";

import { useSyncExternalStore } from "react";
import type { TipoVaga } from "./vagasEditor";

// qual gerenciador de vagas está aberto, emprego, estagio ou curso, ou null se nenhum
// guardado fora do react pelo mesmo motivo do gerenciadorNoticias de ser cancelado a aba e perder informações
// o botão fica na barra da direita do puck e a janela fica no EditorPuck, fora do puck

let tipoAberto: TipoVaga | null = null;
const ouvintes = new Set<() => void>();

function mudar(novo: TipoVaga | null) {
  if (tipoAberto === novo) return;
  tipoAberto = novo;
  ouvintes.forEach((ouvinte) => ouvinte());
}

export const abrirGerenciadorVagas = (tipo: TipoVaga) => mudar(tipo);
export const fecharGerenciadorVagas = () => mudar(null);

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function useTipoVagaAberto() {
  return useSyncExternalStore(
    assinar,
    () => tipoAberto,
    () => null,
  );
}
