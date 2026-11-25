"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usuariosPorPagina } from "./useListaUsuarios";
import { botaoSecundario } from "./estilos";

interface PaginacaoProps {
  pagina: number;
  totalPaginas: number;
  total: number;
  inicio: number;
  aoMudar: (pagina: number) => void;
}

export function Paginacao({
  pagina,
  totalPaginas,
  total,
  inicio,
  aoMudar,
}: PaginacaoProps) {
  if (total === 0) return null;

  const fim = Math.min(inicio + usuariosPorPagina, total);

  return (
    <nav
      aria-label="Paginação"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-4 py-3"
    >
      <p className="text-sm text-zinc-600">
        Mostrando {inicio + 1} a {fim} de {total}
      </p>

      {totalPaginas > 1 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-600">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            type="button"
            onClick={() => aoMudar(pagina - 1)}
            disabled={pagina === 1}
            aria-label="Página anterior"
            className={`${botaoSecundario} size-9 px-0 py-0`}
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => aoMudar(pagina + 1)}
            disabled={pagina === totalPaginas}
            aria-label="Próxima página"
            className={`${botaoSecundario} size-9 px-0 py-0`}
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </nav>
  );
}
