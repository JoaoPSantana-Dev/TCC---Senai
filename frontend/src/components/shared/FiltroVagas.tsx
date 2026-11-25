"use client"

interface FiltroVagasProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
  areas: string[];
  areaSelecionada: string | null;
  onAreaChange: (area: string | null) => void;
  totalResultados: number;
  placeholder?: string;
  className?: string;
}

export function FiltroVagas({
  busca,
  onBuscaChange,
  areas,
  areaSelecionada,
  onAreaChange,
  totalResultados,
  placeholder = "Buscar por cargo ou empresa",
  className = "w-full lg:w-3/4 p-6 mt-8 bg-[#f9f9f9] lg:rounded-2xl shadow-md",
}: FiltroVagasProps) {
  const temFiltro = busca.trim() !== "" || areaSelecionada !== null;

  const limpar = () => {
    onBuscaChange("");
    onAreaChange(null);
  };

  const chipBase = "px-5 py-3 rounded-full text-base font-medium transition-all duration-100 touch-manipulation select-none active:scale-95 cursor-pointer";

  return (
    <section className={className} aria-label="Filtro vagas">
      {/* Busca por cargo ou empresa */}
      <div className="flex items-center gap-3">
        <input 
          type="search"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder={placeholder} 
          className="w-full px-5 py-3 text-base lg:text-lg bg-white rounded-2xl shadow-md outline-none focus:ring-2 focus:ring-zinc-800"
        />
        {temFiltro && (
          <button
            type="button"
            onClick={limpar}
            className="px-5 py-3 shrink-0 text-base font-medium text-zinc-700 bg-white rounded-2xl shadow-md touch-manipulation select-none active:shadow-sm cursor-pointer"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Filtro por área */}
      {areas.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Filtrar por área">
          <button
            type="button"
            onClick={() => onAreaChange(null)}
            aria-pressed={areaSelecionada === null}
            className={`${chipBase} ${
              areaSelecionada === null
                ? "bg-zinc-800 text-white"
                : "bg-white text-zinc-700 shadow-sm"
            }`}
          >
            Todas
          </button>
          {areas.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => onAreaChange(areaSelecionada === area ? null : area)}
              aria-pressed={areaSelecionada === area}
              className={`${chipBase} ${
                areaSelecionada === area
                  ? "bg-zinc-800 text-white"
                  : "bg-white text-zinc-700 shadow-sm"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      )}
      <p className="pt-4">
        {totalResultados === 1 ? "1 vaga encontrada" : `${totalResultados} vagas encontradas`}
      </p>
    </section>
  );
}