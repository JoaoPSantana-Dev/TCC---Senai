"use client";

import { useState } from "react";
import { HeaderComponent } from "../shared/header.component";
import { FloorMapGrid } from "./mapa-grid.component";
import { ImagemComponent } from "../../shared/imagem.component";
import { FooterComponent } from "../../shared/footer.component";

//Dados pra Teste
const dadosCarrossel = [
  {
    id: 1,
    unidade: "Bloco A",
    andar: "Terreo",
    superiores: [
      { id: 1, nome: "Sala1" },
      { id: 2, nome: "sala2" },
      { id: 3, nome: "sala3" },
      { id: 4, nome: "sala4" },
    ],
    inferiores: [
      { id: 5, nome: "sala5" },
      { id: 6, nome: "sala6" },
      { id: 7, nome: "sala7" },
      { id: 8, nome: "sala8" },
    ],
  },
  {
    id: 2,
    unidade: "Bloco B",
    andar: "1° Andar",
    superiores: [
      { id: 9, nome: "Sala9" },
      { id: 10, nome: "sala10" },
      { id: 11, nome: "sala11" },
      { id: 12, nome: "sala12" },
    ],
    inferiores: [
      { id: 13, nome: "sala13" },
      { id: 14, nome: "sala14" },
      { id: 15, nome: "sala15" },
      { id: 16, nome: "sala16" },
    ],
  },
  {
    id: 3,
    unidade: "Bloco B",
    andar: "Terreo",
    superiores: [
      { id: 17, nome: "Sala17" },
      { id: 18, nome: "sala18" },
      { id: 19, nome: "sala19" },
      { id: 20, nome: "sala20" },
    ],
    inferiores: [
      { id: 21, nome: "sala21" },
      { id: 22, nome: "sala22" },
      { id: 23, nome: "sala23" },
      { id: 24, nome: "sala24" },
    ],
  },
];

export default function MapaComponent() {
  const [paginaAtual, setPaginaAtual] = useState(0);

  const proximo = () => {
    setPaginaAtual((prev) => (prev + 1) % dadosCarrossel.length);
  };

  const anterior = () => {
    setPaginaAtual(
      (prev) => (prev - 1 + dadosCarrossel.length) % dadosCarrossel.length,
    );
  };

  const itemAtivo = dadosCarrossel[paginaAtual];

  return (
    <div className="w-full min-h-screen bg-[#EAEAEA] flex flex-col justify-between items-center">
      <HeaderComponent />
      <main className="w-full flex-1 flex flex-col items-center justify-start">
        <div className="mx-auto max-w-6xl w-full p-6 md:p-12 flex flex-col">
          <div className="flex flex-row gap-6 w-ful self-center">
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
              <FloorMapGrid
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
                    paginaAtual === index
                      ? "w-8 bg-zinc-700"
                      : "w-2.5 bg-zinc-400"
                  }`}
                />
              ))}
            </div>
          </section>

          <section className="w-full px-7 py-7 bg-white rounded-3xl shadow-sm mt-5">
            <div className="relative min-h-[480px] overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
              <ImagemComponent
                nomeImagem="senai-mariano-ferraz.png"
                alt="Senai Mariano-Ferraz"
                fill
              />
            </div>
          </section>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}
