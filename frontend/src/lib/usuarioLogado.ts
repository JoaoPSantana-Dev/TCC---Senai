"use client";

import { useSyncExternalStore } from "react";
import { chamarUsuarios, type Usuario } from "./usuarios";

// quem está logado, nome, email e função, guardado fora do React
// o HeaderPrivate usa isso para mostrar o nome certo e só aparecer para administrador
// como o dado fica aqui, ao trocar de página o cabeçalho não pisca nem pede tudo de novo

interface Estado {
  carregando: boolean;
  usuario: Usuario | null;
}

const inicial: Estado = { carregando: true, usuario: null };

let estado: Estado = inicial;
let buscando = false;
const ouvintes = new Set<() => void>();

function definir(novo: Estado) {
  estado = novo;
  ouvintes.forEach((ouvinte) => ouvinte());
}

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function useUsuarioLogado() {
  return useSyncExternalStore(
    assinar,
    () => estado,
    () => inicial,
  );
}

// busca de novo no servidor, enquanto isso continua mostrando o que já tinha
export async function carregarUsuarioLogado() {
  if (buscando) return;
  buscando = true;

  try {
    const { ok, dados } = await chamarUsuarios("eu");
    definir({ carregando: false, usuario: ok ? (dados as Usuario) : null });
  } catch {
    // sem rede mantém o que já tinha em vez de esconder o cabeçalho
    definir({ carregando: false, usuario: estado.usuario });
  } finally {
    buscando = false;
  }
}

// a tela "Meus dados" chama isso depois de salvar, para o nome do cabeçalho mudar na hora
export function atualizarUsuarioLogado(usuario: Usuario) {
  definir({ carregando: false, usuario });
}

// ao sair, para o próximo login não pegar o nome de quem saiu
export function limparUsuarioLogado() {
  definir(inicial);
}
