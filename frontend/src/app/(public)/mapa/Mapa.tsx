'use client';

import React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SalaAPI {
  idSala: number;
  nomeSala: string;
  bloco: string;
  andar: string;
  imagem: string;
  destaque: boolean;
}

const LAYOUT_SALAS = {
  superior: [
    { idPosicao: 'sup_1', nome: 'B18' },
    { idPosicao: 'sup_2', nome: 'B16' },
    { idPosicao: 'sup_3', nome: 'CORDENAÇÃO' },
    { idPosicao: 'sup_4', nome: 'B12' },
    { idPosicao: 'sup_5', nome: 'B10' },
    // Corredor vertical
    { idPosicao: 'sup_6', nome: 'B6' },
    { idPosicao: 'sup_7', nome: 'B4' },
    { idPosicao: 'sup_8', nome: 'B2' },
  ],
  inferior: [
    { idPosicao: 'inf_1', nome: 'BANHEIRO F' },
    { idPosicao: 'inf_2', nome: 'B15' },
    { idPosicao: 'inf_3', nome: 'B13' },
    { idPosicao: 'inf_4', nome: 'B11' },
    { idPosicao: 'inf_5', nome: 'B09' },
    // Corredor vertical
    { idPosicao: 'inf_6', nome: 'B05' },
    { idPosicao: 'inf_7', nome: 'B03' },
    { idPosicao: 'inf_8', nome: 'B01' },
  ]
}

export default function MapaPlantaBaixa() {
  const [salaBackend, setSalaBackend] = useState<Record<string, SalaAPI>>({});
  const [salaSelecionada, setSalaSelecionada] = useState<SalaAPI | null>(null);

  useEffect(() => {
    fetch('/salas?curso=DS')
      .then((res) => res.json())
      .then((data: SalaAPI[]) => {
        const mapa: Record<string, SalaAPI> = {};
        data.forEach((sala) => {
          mapa[sala.nomeSala.toLowerCase()] = sala
        });
        setSalaBackend(mapa);
      })
      .catch((err) => toast.error('Erro ao carregar mapa:', err));
  }, []);

  const renderBloco = (item: {
    idPosicao: string;
    nome: string;
  }) => {
    const dadosSala = salaBackend[item.nome.toLowerCase()];
    const estaEmDestaque = dadosSala?.destaque ?? false;

    return (
      <div
        key={item.idPosicao}
        onClick={() => dadosSala && setSalaSelecionada(dadosSala)}
        className={`h-20 w-24 flex items-center justify-center font-bold text-zinc-800 text-center px-1 rounded-sm cursor-pointer border border-amber-300 transition-all active:scale-105 select-none shadow-sm text-sm ${
          estaEmDestaque ? 'bg-[#fbbd61]' : 'bg-[#d99f59]'
        }`}
      >
        <span>{item.nome}</span>
      </div>
    )
  }
}






// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { MapaGrid } from "./MapaGrid";
// import { dadosCarrossel } from "./Mapa.data";

// export function Mapa() {
//   const [paginaAtual, setPaginaAtual] = useState(0);

//   const proximo = () => {
//     setPaginaAtual((prev) => (prev + 1) % dadosCarrossel.length);
//   };

//   const anterior = () => {
//     setPaginaAtual(
//       (prev) => (prev - 1 + dadosCarrossel.length) % dadosCarrossel.length,
//     );
//   };

//   const itemAtivo = dadosCarrossel[paginaAtual];

//   return (
//     <div className="mx-auto max-w-6xl w-full p-6 md:p-12 flex flex-col">
//       <div className="flex flex-row gap-6 w-full self-center">
//         <div className="mb-8 inline-block rounded-3xl bg-white px-8 py-3 text-lg font-semibold text-zinc-800 shadow-sm">
//           {itemAtivo.unidade}
//         </div>
//         <div className="mb-8 inline-block rounded-3xl bg-white px-8 py-3 text-lg font-semibold text-zinc-800 shadow-sm">
//           {itemAtivo.andar}
//         </div>
//       </div>

//       <section className="w-full flex flex-col items-center my-4">
//         <div className="flex-row w-full flex items-center justify-center gap-4">
//           {/* Seta Esquerda */}
//           <button
//             onClick={anterior}
//             className="p-2 text-black hover:opacity-75 transition-opacity"
//             aria-label="Anterior"
//           >
//             <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
//               <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
//             </svg>
//           </button>

//           {/* Mapa Modular */}
//           <MapaGrid
//             salasSuperiores={itemAtivo.superiores}
//             salasInferiores={itemAtivo.inferiores}
//             tituloCentral={itemAtivo.unidade}
//           />

//           {/* Seta Direita */}
//           <button
//             onClick={proximo}
//             className="p-2 text-black hover:opacity-75 transition-opacity"
//             aria-label="Proximo"
//           >
//             <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
//               <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
//             </svg>
//           </button>
//         </div>

//         {/* Indicadores */}
//         <div className="flex flex-row items-center justify-center gap-2 mt-4">
//           {dadosCarrossel.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setPaginaAtual(index)}
//               className={`h-2.5 rounded-full transition-all ${
//                 paginaAtual === index ? "w-8 bg-zinc-700" : "w-2.5 bg-zinc-400"
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       <section className="w-full px-7 py-7 bg-white rounded-3xl shadow-sm mt-5">
//         <figure className="relative min-h-120 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
//           <Image
//             src="/senai-mariano-ferraz.png"
//             alt="Senai Mariano-Ferraz"
//             fill
//             sizes="(max-width: 768px) 100vw, 80vw"
//             className="object-cover"
//             loading="eager"
//           />
//         </figure>
//       </section>
//     </div>
//   );
// }
