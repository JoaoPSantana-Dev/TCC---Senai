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
        <section className="w-full lg:w-3/4 p-8 mb-8 bg-[#f9f9f9] lg:rounded-2xl shadow-md">
          <div className="w-full p-6 min-h-[200px] bg-white rounded-2xl shadow-md">
            {vagaSelecionada ? (
              <>
                <h2 className="text-xl lg:text-2xl font-semibold text-zinc-700 mb-4"><b>Empresa:</b> {vagaSelecionada.nomeEmpresa}</h2>
                <h2 className="text-lg lg:text-xl font-semibold text-zinc-700 mb-4"><b>Cargo:</b> {vagaSelecionada.cargo}</h2>
                <p className="text-base lg:text-lg text-zinc-600 mb-2"><b>Requisitos:</b> {vagaSelecionada.requisitos}</p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2"><b>Salário:</b> {vagaSelecionada.salario}</p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2"><b>Beneficios:</b> {vagaSelecionada.beneficios}</p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2"><b>Descrição:</b> {vagaSelecionada.descricao}</p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2"><b>Localização:</b> {vagaSelecionada.localizacao}</p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2"><b>Contato:</b> {vagaSelecionada.contato}</p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2"><b>Área da vaga:</b> {vagaSelecionada.areaEmprego}</p>
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