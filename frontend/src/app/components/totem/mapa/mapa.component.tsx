"use client";

import { useState } from "react";
import { ImagemComponent } from "../../shared/imagem.component";
import { MapaGridComponent } from "./mapa-grid.component";
import { dadosCarrossel } from "./mapa.data";

export function MapaComponent() {
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
          <MapaGridComponent
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
          <ImagemComponent
            nomeImagem="senai-mariano-ferraz.png"
            alt="Senai Mariano-Ferraz"
            fill
          />
        </figure>
      </section>
    </div>
  );
}
