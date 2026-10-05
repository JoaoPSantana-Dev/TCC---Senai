"use client";

import { useState } from "react";
import { EstruturaTotem } from "@/app/components/totem/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/app/components/totem/shared/EstruturaVagasMenu";
import { Titulo } from "@/app/components/totem/shared/TituloTotem";
import { vagasEmpregos } from "@/app/components/totem/vagas-empregos/VagasEmpregos.data";
import type { Vaga } from "@/app/components/totem/shared/EstruturaVagasMenu.data";

export default function VagasEmpregos() {
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);

  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu
          itens={vagasEmpregos}
          onSelecionarVaga={setVagaSelecionada}
        />
        <section className="w-full md:w-3/4 p-8 mb-8 bg-[#f9f9f9] rounded-2xl shadow-md">
          <div className="w-full p-6 min-h-[200px] bg-white rounded-2xl shadow-md">
            {vagaSelecionada ? (
              <>
                <h2 className="text-xl md:text-2xl font-semibold text-zinc-800 mb-4">
                  {vagaSelecionada.titulo}
                </h2>
                <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
                  {vagaSelecionada.descricao}
                </p>
              </>
            ) : (
              <div className="h-full min-h-[160px] flex items-center justify-center">
                <p className="text-zinc-400 text-center">
                  Selecione uma vaga para visualizar sua descrição.
                </p>
              </div>
            )}
          </div>
        </section>
      </Titulo>
    </EstruturaTotem>
  );
}