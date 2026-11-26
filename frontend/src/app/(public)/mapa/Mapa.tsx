"use client";

<<<<<<< HEAD
import { Titulo } from "@/components/shared/TituloTotem";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface HorarioAulaAPI {
  idHorariosAula: number;
  nomeCurso: string;
  Professor: String;
  materia: String;
  turno: string;
  dia: string;
  idSala: number;
}

interface SalaAPI {
  idSala: number;
  nomeSala: string;
  andar: string;
  bloco: string;
  imagem: string;
  horarios?: HorarioAulaAPI[]
}
const normalizar = (nome: string) => nome.trim().toLowerCase();

function resolverSala(
  item: {
    idPosicao: string;
    nome: string
  }, salaPorNome: Record<string, SalaAPI>
) {
  const sala = salaPorNome[normalizar(item.nome)];
  const destaque = (sala?.horarios?.length ?? 0) > 0;
  return { ...item, sala, destaque }
}



const USAR_DADOS_MOCK = false;

// Dados inseridos diretamente no código para testes locais
const DADOS_TESTE: SalaAPI[] = [
  { idSala: 1, nomeSala: 'B18', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B18', horarios: [] },
  { idSala: 2, nomeSala: 'B16', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B16', horarios: [] },
  { idSala: 3, nomeSala: 'CORDENAÇÃO', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Cordenacao', horarios: [] },
  { idSala: 4, nomeSala: 'B12', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B12', horarios: [] },
  { idSala: 5, nomeSala: 'B10', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B10', horarios: [] },
  { idSala: 6, nomeSala: 'B6', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B6', horarios: [] },
  { idSala: 7, nomeSala: 'B4', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B4', horarios: [] },
  { idSala: 8, nomeSala: 'B2', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B2', horarios: [] },
  { idSala: 9, nomeSala: 'BANHEIRO F', bloco: 'B', andar: '1', imagem: '', horarios: [] },
  { idSala: 10, nomeSala: 'B15', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B15', horarios: [] },
  { idSala: 11, nomeSala: 'B13', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B13', horarios: [] },
  { idSala: 12, nomeSala: 'B11', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B11', horarios: [] },
  { idSala: 13, nomeSala: 'B09', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B09', horarios: [] },
  { idSala: 14, nomeSala: 'B05', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B05', horarios: [] },
  { idSala: 15, nomeSala: 'B03', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B03', horarios: [] },
  { idSala: 16, nomeSala: 'B01', bloco: 'B', andar: '1', imagem: 'https://placehold.co/600x400?text=Sala+B01', horarios: [] },
];


const LAYOUT_SALAS = {
  superior: [
    // Corredor vertical    
    { idPosicao: 'sup_1', nome: 'B18' },
    { idPosicao: 'sup_2', nome: 'B16' },
    { idPosicao: 'sup_3', nome: 'CORDENAÇÃO' },
    { idPosicao: 'sup_4', nome: 'B12' },
    { idPosicao: 'sup_5', nome: 'B10' },
    { idPosicao: 'sup_6', nome: 'B6' },
    { idPosicao: 'sup_7', nome: 'B4' },
    { idPosicao: 'sup_8', nome: 'B2' },
  ],
  inferior: [
    // Corredor vertical    
    { idPosicao: 'inf_1', nome: 'BANHEIRO F' },
    { idPosicao: 'inf_2', nome: 'B15' },
    { idPosicao: 'inf_3', nome: 'B13' },
    { idPosicao: 'inf_4', nome: 'B11' },
    { idPosicao: 'inf_5', nome: 'B09' },
    { idPosicao: 'inf_6', nome: 'B05' },
    { idPosicao: 'inf_7', nome: 'B03' },
    { idPosicao: 'inf_8', nome: 'B01' },
  ]
}
=======
import { useState } from "react";
import Image from "next/image";
import { MapaGrid } from "./MapaGrid";
import { dadosCarrossel } from "./Mapa.data";
>>>>>>> parent of e47b31e8 (Merge branch 'pedro-frontend' of https://github.com/JoaoPSantana-Dev/TCC---Senai into bancoDados)

export function Mapa() {
  const [paginaAtual, setPaginaAtual] = useState(0);

<<<<<<< HEAD
  useEffect(() => {
    const processarDados = (data: SalaAPI[]) => {
      const mapa: Record<string, SalaAPI> = {};
      data.forEach((sala) => {
        mapa[normalizar(sala.nomeSala)] = sala
      });
      setSalaBackend(mapa)
    };

    if (USAR_DADOS_MOCK) {
      processarDados(DADOS_TESTE);
    } else {
      fetch('http://localhost:3001/salas')
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data: SalaAPI[]) => processarDados(data))
        .catch(() => toast.error('Erro ao carregar mapa'))
    }
  }, []);

  const renderBloco = (item: {
    idPosicao: string;
    nome: string;
  }) => {
    const { sala, destaque } = resolverSala(item, salaBackend)
    return (
      <div
        key={item.idPosicao}
        onClick={() => sala && setSalaSelecionada(sala)}
        className={`h-20 w-28 flex items-center justify-center font-bold text-zinc-800 text-center px-1 cursor-pointer border border-zinc-600 transition-all active:scale-105 select-none shadow-sm text-sm ${destaque ? 'bg-[#d6d6d6]' : 'bg-[#b6b6b6]'
          }`}
      >
        <span>{item.nome}</span>
      </div>
=======
  const proximo = () => {
    setPaginaAtual((prev) => (prev + 1) % dadosCarrossel.length);
  };

  const anterior = () => {
    setPaginaAtual(
      (prev) => (prev - 1 + dadosCarrossel.length) % dadosCarrossel.length,
>>>>>>> parent of e47b31e8 (Merge branch 'pedro-frontend' of https://github.com/JoaoPSantana-Dev/TCC---Senai into bancoDados)
    );
  };

  const itemAtivo = dadosCarrossel[paginaAtual];

  return (
    <div className="mx-auto max-w-6xl w-full p-6 md:p-12 flex flex-col">
      <div className="flex flex-row gap-6 w-full self-center">
        <div className="mb-8 inline-block rounded-3xl bg-white px-8 py-3 text-lg font-semibold text-zinc-800 shadow-sm">
          {itemAtivo.unidade}
        </div>
        <div className="mb-8 inline-block rounded-3xl bg-white px-8 py-3 text-lg font-semibold text-zinc-800 shadow-sm">
          {itemAtivo.andar}
        </div>
      </div>

      <section className="w-full flex flex-col items-center my-4">
        <div className="flex-row w-full flex items-center justify-center gap-4">
          {/* Seta Esquerda */}
          <button
            onClick={anterior}
            className="p-2 text-black hover:opacity-75 transition-opacity"
            aria-label="Anterior"
          >
            <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          {/* Mapa Modular */}
          <MapaGrid
            salasSuperiores={itemAtivo.superiores}
            salasInferiores={itemAtivo.inferiores}
            tituloCentral={itemAtivo.unidade}
          />

          {/* Seta Direita */}
          <button
            onClick={proximo}
            className="p-2 text-black hover:opacity-75 transition-opacity"
            aria-label="Proximo"
          >
            <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex flex-row items-center justify-center gap-2 mt-4">
          {dadosCarrossel.map((_, index) => (
            <button
              key={index}
              onClick={() => setPaginaAtual(index)}
              className={`h-2.5 rounded-full transition-all ${
                paginaAtual === index ? "w-8 bg-zinc-700" : "w-2.5 bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="w-full px-7 py-7 bg-white rounded-3xl shadow-sm mt-5">
        <figure className="relative min-h-120 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
          <Image
            src="/senai-mariano-ferraz.png"
            alt="Senai Mariano-Ferraz"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            loading="eager"
          />
        </figure>
      </section>
    </div>
  );
}
