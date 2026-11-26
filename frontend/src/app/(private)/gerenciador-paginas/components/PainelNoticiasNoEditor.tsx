"use client";

import { abrirGerenciadorNoticias } from "@/lib/gerenciadorNoticias";

// aparece na barra da direita do editor quando o bloco "Carrossel de notícias" está selecionado
// aqui fica só o botão, o gerenciador de verdade abre numa janela própria GerenciadorNoticiasModal
// o motivo é que escolher a imagem abre a janela de arquivos do computador
// e nesse momento o puck desmonta a barra da direita, o que perdia a imagem escolhida

export function PainelNoticiasNoEditor() {
  return (
    <div className="flex flex-col gap-3 text-zinc-900">
      <p className="text-xs text-zinc-500">
        As notícias são salvas na hora, sem precisar de &quot;Salvar
        alterações&quot;. A mais nova fica em destaque na homepage
      </p>

      <button
        type="button"
        onClick={abrirGerenciadorNoticias}
        className="cursor-pointer self-start rounded-full bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
      >
        Gerenciar notícias
      </button>
    </div>
  );
}
