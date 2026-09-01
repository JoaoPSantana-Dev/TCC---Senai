import React from "react";

interface Sala {
  id: string | number;
  nome: string;
}

interface FloorMapGridProps {
  salasSuperiores: Sala[];
  salasInferiores: Sala[];
  tituloCentral?: string;
  onSalaClick?: (sala: Sala) => void;
}

export function FloorMapGrid({
  salasSuperiores,
  salasInferiores,
  tituloCentral = "Vista de Cima da unidade",
  onSalaClick,
}: FloorMapGridProps) {
  return (
    <div className="w-full max-w-full mx-auto border-4 border-black bg-black p-1 rounded-sm shadow-md">
      <div className="grid grid-cols-4 gap-1 text-center font-medium">
        {/* Linha Superior (4 salas) */}
        {salasSuperiores.slice(0, 4).map((sala) => (
          <button
            key={sala.id}
            onClick={() => onSalaClick && onSalaClick(sala)}
            type="button"
            className="bg-[#E2C7C7] p-4 text-zinc-900 flex items-center justify-center font-semibold text-sm md:text-base min-h-15 
              transition-all duration-150 select-none active:bg-zinc-800 active:text-white active:scale-95"
          >
            {sala.nome}
          </button>
        ))}

        {/* Faixa Central (Ocupa as 4 colunas) */}
        <div className="col-span-4 bg-[#EAEAEA] p-3 text-zinc-800 flex items-center justify-center font-semibold text-sm md:text-base border-y-2 border-black">
          {tituloCentral}
        </div>

        {/* Linha Inferior (4 Salas) */}
        {salasInferiores.slice(0, 4).map((sala) => (
          <button
            key={sala.id}
            onClick={() => onSalaClick && onSalaClick(sala)}
            type="button"
            className="bg-[#E2C7C7] p-4 text-zinc-900 flex items-center justify-center font-semibold text-sm md:text-base min-h-15 
              transition-all duration-150 select-none active:bg-zinc-800 active:text-white active:scale-95"
          >
            {sala.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
