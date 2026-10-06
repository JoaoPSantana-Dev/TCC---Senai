"use client";

import { EstruturaVagasMenu } from "@/components/shared/EstruturaMenuVagas";
import type { Vaga } from "@/components/shared/EstruturaMenuVagas.data";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function VagasEmpregos() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarVagas = async () => {
      try {
        const resposta = await fetch("http://localhost:3001/vagas-estagio", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dados = await resposta.json();

        if (resposta.ok) {
          setVagas(dados);
          return;
        }

        toast.error(dados.message || "Erro ao buscar vagas");
      } catch {
        toast.error("Falha ao conectar com o servidor");
      } finally {
        setCarregando(false);
      }
    };

    buscarVagas();
  }, []);

  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto="Oportunidades de Estagio">
        <EstruturaVagasMenu
          itens={vagas}
          onSelecionarVaga={setVagaSelecionada}
        />
        <section className="w-full lg:w-3/4 p-8 mb-8 bg-[#f9f9f9] lg:rounded-2xl shadow-md">
          <div className="w-full p-6 min-h-50 bg-white rounded-2xl shadow-md">
            {vagaSelecionada ? (
              <>
                <h2 className="text-xl lg:text-2xl font-semibold text-zinc-700 mb-4">
                  <b>Empresa:</b> {vagaSelecionada.nomeEmpresa}
                </h2>
                <h2 className="text-lg lg:text-xl font-semibold text-zinc-700 mb-4">
                  <b>Cargo:</b> {vagaSelecionada.cargo}
                </h2>
                <p className="text-base lg:text-lg text-zinc-600 mb-2">
                  <b>Requisitos:</b> {vagaSelecionada.requisitos}
                </p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2">
                  <b>Salário:</b> {vagaSelecionada.salario}
                </p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2">
                  <b>Beneficios:</b> {vagaSelecionada.beneficios}
                </p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2">
                  <b>Descrição:</b> {vagaSelecionada.descricao}
                </p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2">
                  <b>Localização:</b> {vagaSelecionada.localizacao}
                </p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2">
                  <b>Contato:</b> {vagaSelecionada.contato}
                </p>
                <p className="text-base lg:text-lg text-zinc-600 mb-2">
                  <b>Área da vaga:</b> {vagaSelecionada.areaEmprego}
                </p>
              </>
            ) : (
              <div className="h-full min-h-40 flex items-center justify-center">
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
