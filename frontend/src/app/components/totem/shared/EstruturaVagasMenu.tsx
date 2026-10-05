"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { type Vaga, vagas } from "./EstruturaVagasMenu.data";
import { useState } from "react";

interface EstruturaVagasMenuProps {
  itens?: Vaga[];
  className?: string;
  itemClassName?: string;
  onSelecionarVaga?: (vaga: Vaga) => void;
}

const ITENS_POR_PAGINA = 6;

export function EstruturaVagasMenu({
  itens = vagas,
  className = "w-full flex flex-col items-center max-w-6xl p-8 rounded-xl",
  itemClassName = "h-full items-center flex flex-row p-8 bg-white rounded-2xl shadow-xl hover:shadow-md",
  onSelecionarVaga,
}: EstruturaVagasMenuProps) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const totalPaginas = Math.max(1, Math.ceil(itens.length / ITENS_POR_PAGINA));

  const proximo = () => {
    setPaginaAtual((prev) => (prev + 1) % totalPaginas);
  };

  const anterior = () => {
    setPaginaAtual((prev) => (prev - 1 + totalPaginas) % totalPaginas);
  };

  const inicio = paginaAtual * ITENS_POR_PAGINA;
  const itensExibidos = itens.slice(inicio, inicio + ITENS_POR_PAGINA);

  return (
    <section className={className}>
      <div className="flex items-center w-full justify-between gap-4">
        {/* Seta so aparece se houver mais de uma página */}
        {totalPaginas > 1 && (
          <button
            onClick={anterior}
            className="p-2 text-zinc-600 hover:text-zinc-900 hover:scale-110 transition-all flex-shrink-0"
            aria-label="Anterior"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}

        {/* Grid do Bloco de Vagas */}
        <nav className="w-full bg-[#f9f9f9] p-6 md:p-8 rounded-2xl shadow-md">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itensExibidos.map((vaga, index) => (
              <li key={`${vaga.href}-${vaga.titulo}-${inicio + index}`}>
                <button
                  type="button"
                  onClick={() => onSelecionarVaga?.(vaga)}
                  className={`${itemClassName} w-full text-left`}
                >
                  {vaga.icone && (
                    <span className="text-zinc-800 flex-shrink-0">
                      <HugeiconsIcon icon={vaga.icone} />
                    </span>
                  )}
                  <h2 className="text-base pl-2 md:text-lg font-medium text-zinc-800">{vaga.titulo}</h2>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {totalPaginas > 1 && (
          <button
            onClick={proximo}
            className="p-2 text-zinc-600 hover:text-zinc-900 hover:scale-110 transition-all flex-shrink-0"
            aria-label="Próximo"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        )}
      </div>

      {/* Aparece apenas se houver mais de uma página */}
      {totalPaginas > 1 && (
        <div className="flex gap-2 mt-6">
          {Array.from({ length: totalPaginas }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPaginaAtual(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                paginaAtual === index ? "w-6 bg-zinc-800" : "w-2 bg-zinc-300"
              }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/*<nav className={className}>
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {itens.map((vaga) => (
      <li key={`${vaga.href}-${vaga.titulo}`}>
        <Link href={vaga.href} className={itemClassName}>
          <span className="text-4xl mr-4">
            <HugeiconsIcon icon={vaga.icone} size={40} />
          </span>
          <h2 className="text-2xl font-semibold justify-self-end">
            {vaga.titulo}
          </h2>
        </Link>
      </li>
    ))}
  </ul>
</nav>*/
