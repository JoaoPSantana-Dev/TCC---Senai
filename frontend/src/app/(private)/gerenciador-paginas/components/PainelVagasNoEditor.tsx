"use client";

import { abrirGerenciadorVagas } from "@/lib/gerenciadorVagas";
import { tiposDeVaga, type TipoVaga } from "@/lib/vagasEditor";

// aparece na barra da direita do editor quando o bloco "Vagas de emprego", "Vagas de estágio" ou "Lista de cursos" está selecionado
// aqui fica só o botão o gerenciador de verdade abre numa janela própria GerenciadorVagasModal

export function PainelVagasNoEditor({ tipo }: { tipo: TipoVaga }) {
  const config = tiposDeVaga[tipo];
  const ehCurso = config.nomeSingular === "curso";

  return (
    <div className="flex flex-col gap-3 text-zinc-900">
      <p className="text-xs text-zinc-500">
        Aqui as {ehCurso ? "informações dos cursos" : "vagas"} são salvas na
        hora, sem precisar de &quot;Salvar alterações&quot;. A página ao lado
        atualiza sozinha
      </p>

      <button
        type="button"
        onClick={() => abrirGerenciadorVagas(tipo)}
        className="cursor-pointer self-start rounded-full bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
      >
        {ehCurso ? "Gerenciar cursos" : "Gerenciar vagas"}
      </button>
    </div>
  );
}
