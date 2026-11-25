"use client";

import { useSyncExternalStore } from "react";

// estado "o gerenciador de notícias está aberto?" guardado fora do react
// o botão fica na barra da direita do puck e o modal fica no EditorPuck, fora do puck
// assim, mesmo que o puck desmonte a barra da direita, o modal continua aberto

let aberto = false;
const ouvintes = new Set<() => void>();

function mudar(novo: boolean) {
  if (aberto === novo) return;
  aberto = novo;
  ouvintes.forEach((ouvinte) => ouvinte());
}

export const abrirGerenciadorNoticias = () => mudar(true);
export const fecharGerenciadorNoticias = () => mudar(false);

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function useGerenciadorNoticiasAberto() {
  return useSyncExternalStore(
    assinar,
    () => aberto,
    () => false,
  );
}
