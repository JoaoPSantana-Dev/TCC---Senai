"use client";

import { EstruturaVagasMenu } from "@/components/shared/EstruturaMenuVagas";
import type { Vaga } from "@/components/shared/EstruturaMenuVagas.data";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FiltroVagas } from "./FiltroVagas";

// Remove acentos e ignora letras maiúsculas e minúsculas
const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()

export default function Vagas() {
  const pathname = usePathname();

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Estado dos filtros
  const [busca, setBusca] = useState("");
  const [areaSelecionada, setAreaSelecionada] = useState<string | null>(null);

  let endpoint = "";
  let titulo = "";

  if (pathname === "/vagas-empregos") {
    endpoint = "http://localhost:3001/vagas-emprego";
    titulo = "Oportunidades de emprego";
  } else if (pathname === "/vagas-estagios") {
    endpoint = "http://localhost:3001/vagas-estagio";
    titulo = "Oportunidade de estágio";
  };

  useEffect(() => {
    const buscarVagas = async () => {
      setCarregando(true);
      try {
        const resposta = await fetch(endpoint);
        const dados = await resposta.json();
        console.log("dados da API: ", dados)

        if (resposta.ok) {
          setVagas(dados);
          setVagaSelecionada(null);
        } else {
          toast.error(dados.message || "Erro ao buscar oportunidades");
          setVagas([]);
        }

      } catch {
        toast.error("Falha ao conectar com o servidor");
        setVagas([]);
      } finally {
        setCarregando(false);
      }
    };

    if (endpoint) {
      // Limpa os filtros ao trocar de pagina
      setBusca("");
      setAreaSelecionada(null);
      buscarVagas();
    };

  }, [endpoint]);

  // Áreas disponíveis, geradas a partir das vagas carregadas 
  const areas = useMemo(() => {
    const unicas = new Set<string>();
    for (const vaga of vagas) {
      if (vaga.areaEmprego) unicas.add(vaga.areaEmprego);
    }
    return Array.from(unicas).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [vagas]);

  // Lista filtrada
  const vagasFiltradas = useMemo(() => {
    const termo = normalizar(busca);

    return vagas.filter((vaga) => {
      const bateArea = !areaSelecionada || vaga.areaEmprego === areaSelecionada;

      const bateBusca =
        termo === "" ||
        normalizar(vaga.cargo ?? "").includes(termo) ||
        normalizar(vaga.nomeEmpresa ?? "").includes(termo)

      return bateArea && bateBusca;
    });
  }, [vagas, busca, areaSelecionada]);

  // Se a vaga aberta sumir da lista filtrada, fecha o painel de detalhes
  useEffect(() => {
    if (vagaSelecionada && !vagasFiltradas.includes(vagaSelecionada)) {
      setVagaSelecionada(null);
    };
  }, [vagasFiltradas, vagaSelecionada]);

  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto={titulo}>
        <FiltroVagas
          busca={busca}
          onBuscaChange={setBusca}
          areas={areas}
          areaSelecionada={areaSelecionada}
          onAreaChange={setAreaSelecionada}
          totalResultados={vagasFiltradas.length}
        />
        {carregando ? (
          <p className="p-6 text-center">Carregando oportunidades...</p>
        ) : vagasFiltradas.length === 0 ? (
          <p className="p-6 text-center text-zinc-500">
            {vagas.length === 0
              ? "Nenhuma oportunidade disponivel no momento"
              : "Nenhuma vaga encontrada com esses filtros"
            }
          </p>
        ) : (
          <EstruturaVagasMenu
            key={`${busca}-${areaSelecionada ?? "todas"}`}
            itens={vagasFiltradas}
            onSelecionarVaga={setVagaSelecionada}
          />
        )}
        <section className="w-full lg:w-3/4 p-8 my-8 bg-[#f9f9f9] lg:rounded-2xl shadow-md">
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
