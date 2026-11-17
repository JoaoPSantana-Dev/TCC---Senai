'use client';

import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
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

const USAR_DADOS_MOCK = true;

// Dados inseridos diretamente no código para testes locais
const DADOS_TESTE: SalaAPI[] = [
  { idSala: 1, nomeSala: 'B18', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B18', destaque: true },
  { idSala: 2, nomeSala: 'B16', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B16', destaque: false },
  { idSala: 3, nomeSala: 'CORDENAÇÃO', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Cordenacao', destaque: false },
  { idSala: 4, nomeSala: 'B12', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B12', destaque: false },
  { idSala: 5, nomeSala: 'B10', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B10', destaque: true },
  { idSala: 6, nomeSala: 'B6', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B6', destaque: false },
  { idSala: 7, nomeSala: 'B4', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B4', destaque: true },
  { idSala: 8, nomeSala: 'B2', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B2', destaque: false },
  { idSala: 9, nomeSala: 'BANHEIRO F', bloco: 'B', andar: '1', imagem: '', destaque: false },
  { idSala: 10, nomeSala: 'B15', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B15', destaque: false },
  { idSala: 11, nomeSala: 'B13', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B13', destaque: false },
  { idSala: 12, nomeSala: 'B11', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B11', destaque: true },
  { idSala: 13, nomeSala: 'B09', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B09', destaque: true },
  { idSala: 14, nomeSala: 'B05', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B05', destaque: false },
  { idSala: 15, nomeSala: 'B03', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B03', destaque: false },
  { idSala: 16, nomeSala: 'B01', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B01', destaque: false },
];

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

export function Mapa() {
  const [salaBackend, setSalaBackend] = useState<Record<string, SalaAPI>>({});
  const [salaSelecionada, setSalaSelecionada] = useState<SalaAPI | null>(null);

  useEffect(() => {
    const processarDados = (data: SalaAPI[]) => {
      const mapa: Record<string, SalaAPI> = {};
      data.forEach((sala) => {
        mapa[sala.nomeSala.toLowerCase()] = sala
      });
      setSalaBackend(mapa)
    };

    if (USAR_DADOS_MOCK) {
      processarDados(DADOS_TESTE);
    } else {
      fetch('/salas?curso=DS')
        .then((res) => res.json())
        .then((data: SalaAPI[]) => processarDados(data))
        .catch(() => toast.error('Erro ao carregar mapa'))
    }
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
        className={`h-20 w-28 flex items-center justify-center font-bold text-zinc-800 text-center px-1 cursor-pointer border border-zinc-600 transition-all active:scale-105 select-none shadow-sm text-sm ${estaEmDestaque ? 'bg-[#d6d6d6]' : 'bg-[#b6b6b6]'
          }`}
      >
        <span>{item.nome}</span>
      </div>
    );
  };

  return (
    <Titulo texto="">
      <div className="p-4 bg-[#f9f9f9] rounded-2xl shadow-md">

        <div className="bg-[#8c8c8c] rounded-lg shadow-md flex flex-col max-w-full overflow-x-auto">

          {/* Fileira superior */}
          <div className="flex items-center ">
            <div className="w-10 h-20 bg-[#8c8c8c]" />
            <div className="flex gap-1.5">
              {LAYOUT_SALAS.superior.slice(0, 5).map(renderBloco)}
            </div>
            <div className="w-12 h-20 bg-[#8c8c8c]" />
            <div className="flex gap-1.5">
              {LAYOUT_SALAS.superior.slice(5).map(renderBloco)}
            </div>
          </div>

          {/* Corredor Central */}
          <div className="h-12 w-full bg-[#8c8c8c]" />

          {/* Fileira inferior */}
          <div className="flex items-center ">
            <div className="w-10 h-20 bg-[#8c8c8c]" />
            <div className="flex gap-1.5">
              {LAYOUT_SALAS.inferior.slice(0, 5).map(renderBloco)}
            </div>
            <div className="w-12 h-20 bg-[#8c8c8c]" />
            <div className="flex gap-1.5">
              {LAYOUT_SALAS.inferior.slice(5).map(renderBloco)}
            </div>
          </div>
        </div>

        {/* Modal */}
        {salaSelecionada && (
          <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSalaSelecionada(null)}
          >
            <div
              className="bg-white p-5 rounded-xl max-w-2xl w-full flex flex-col items-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">{salaSelecionada.nomeSala}</h2>
              <div className="w-full flex justify-center items-center bg-zinc-50 border rounded-lg p-2 min-h-[300px]">
                {salaSelecionada.imagem ? (
                  <img
                    src={salaSelecionada.imagem}
                    alt={`Imagem da ${salaSelecionada.nomeSala}`}
                    className="w-full h-auto max-h-[65vh] object-contain rounded-md"
                  />
                ) : (
                  <div className="text-center p-8 text-zinc-400">
                    <p className="text-lg font-medium">Nenhuma imagem disponível para este local</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSalaSelecionada(null)}
                className="mt-5 px-6 py-2 bg-zinc-800 text-white font-medium rounded-full transition-all duration-75 active:bg-zinc-900 select-none"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </Titulo>
  );
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
