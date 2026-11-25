"use client";

import { useEffect, useMemo, useState } from "react";
import { alerta } from "@/lib/alerta";
import { apiUrl } from "@/lib/paginas";
import type { off } from "process";

const textoPadraoBotao = "Escolha sua Turma";
const textoPadrao = "Selecione uma turma";

interface Sala {
  idSala: number;
  nomeSala: string;
  andar: string;
  bloco: string;
}

interface HorarioAula {
  idHorariosAula: number;
  nomeCurso: string;
  turno: string;
  dia: string;
  idSala: number;
  sala?: Sala | null;
}

interface Turma {
  chave: string; // nome normalizado, serve para comparar
  nome: string; // nome como está no banco, serve para exibir
}

const ordemDias = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];
const ordemTurnos = ["manha", "tarde", "noite"];

// remove acentos e ignora maiúsculas/minúsculas: "terca" encontra "Terça"
function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

// posição do texto numa lista de ordem fixa
function posicao(texto: string, ordem: string[]): number {
  const t = normalizar(texto);
  const indice = ordem.findIndex((item) => t.startsWith(item));
  return indice === -1 ? ordem.length : indice;
};

// Turmas distintas encontradas nos horários, em ordem alfabética
function turmasDisponiveis(horarios: HorarioAula[]): Turma[] {
  const unicas = new Map<string, Turma>();
  for (const { nomeCurso } of horarios) {
    const nome = nomeCurso?.trim();
    if (!nome) continue;
    const chave = normalizar(nome);
    if (!unicas.has(chave)) unicas.set(chave, { chave, nome });
  };
  return Array.from(unicas.values()).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
};

// Aulas da turma escolhida, separadas por dia (segunda a domingo)
function agruparPorDia(horarios: HorarioAula[], chaveTurma: string | null) {
  if (!chaveTurma) return [];

  const porDia = new Map<string, HorarioAula[]>();
  for (const aula of horarios) {
    if (normalizar(aula.nomeCurso ?? "") !== chaveTurma) continue;
    const dia = aula.dia?.trim() || "Sem dia definido";
    porDia.set(dia, [...(porDia.get(dia) ?? []), aula]);
  }
  return Array.from(porDia, ([dia, aulas]) => ({
    dia,
    aulas: [...aulas].sort(
      (a, b) =>
        posicao(a.turno ?? "", ordemTurnos) -
        posicao(b.turno ?? "", ordemTurnos) ||
        (a.turno ?? "").localeCompare(b.turno ?? "", "pt-BR"),
    ),
  })).sort(
    (a, b) =>
      posicao(a.dia, ordemDias) - posicao(b.dia, ordemDias) ||
      a.dia.localeCompare(b.dia, "pt-BR"),
  );
}

function descricaoSala(sala?: Sala | null): string {
  if (!sala) return "Sala não informada";
  return [sala.nomeSala, sala.bloco, sala.andar].filter(Boolean).join(" · ");
}

export function FiltroTurmas() {
  const [horarios, setHorarios] = useState<HorarioAula[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [erro, setErro] = useState(false);

  const [aberto, setAberto] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let ativo = true;

    async function buscar() {
      try {
        const resposta = await fetch(`${apiUrl}/horarios-aula`, {
          cache: "no-store",
        });
        const dados = await resposta.json().catch(() => null);
        if (!ativo) return;

        if (!resposta.ok) {
          setErro(true);
          alerta.erro(dados?.message || "Erro ao buscar os horários");
          return;
        }
        setHorarios(Array.isArray(dados) ? dados : []);
      } catch {
        if (!ativo) return;
        setErro(true);
        alerta.erro("Falha ao conectar com o servidor");
      } finally {
        if (ativo) setCarregado(true);
      }
    }

    buscar();
    return () => {
      ativo = false;
    };
  }, []);

  const turmas = useMemo(() => turmasDisponiveis(horarios), [horarios]);

  const dias = useMemo(
    () => agruparPorDia(horarios, turmaSelecionada),
    [horarios, turmaSelecionada],
  );

  const nomeTurma =
    turmas.find((turma) => turma.chave === turmaSelecionada)?.nome ?? null;

  const escolher = (chave: string) => {
    // clicar na turma já escolhida desmarca
    setTurmaSelecionada((atual) => (atual === chave ? null : chave));
    setAberto(false);
  };

  const chipBase =
    "px-5 py-3 rounded-full text-base font-medium transition-all duration-100 touch-manipulation select-none active:scale-95";

  // o que aparece na caixa de exibição quando não há horário para mostrar
  const mensagem = !carregado
    ? "Carregando horários..."
    : erro
      ? "Não foi possível carregar os horários."
      : turmas.length === 0
        ? "Nenhum horário cadastrado ainda."
        : !nomeTurma
          ? textoPadrao
          : dias.length === 0
            ? `${nomeTurma} ainda não tem aulas cadastradas.`
            : null;

  return (
    <section className="flex w-full flex-col items-center">
      <div className="w-fit p-4 my-2 bg-[#f9f9f9] rounded-full lg:rounded-full shadow-md">
        <button
          id="filter"
          type="button"
          disabled={turmas.length === 0}
          aria-expanded={aberto}
          aria-controls="lista-turmas"
          onClick={() => setAberto((atual) => !atual)}
          className="text-center text-xl font-semibold my-2 touch-manipulation select-none disabled:text-zinc-400"
        >
          {nomeTurma ? `Turma: ${nomeTurma}` : textoPadraoBotao}
        </button>
      </div>

      {aberto && (
        <div
          id="lista-turmas"
          role="group"
          aria-label="Escolher turma"
          className="w-full lg:w-2/4 p-6 mb-2 flex flex-wrap gap-2 bg-[#f9f9f9] lg:rounded-2xl shadow-md"
        >
          {turmas.map(({ chave, nome }) => (
            <button
              key={chave}
              type="button"
              onClick={() => escolher(chave)}
              aria-pressed={turmaSelecionada === chave}
              className={`${chipBase} ${turmaSelecionada === chave
                ? "bg-zinc-800 text-white"
                : "bg-white text-zinc-700 shadow-sm"
              }`}
            >
              {nome}
            </button>
          ))}
        </div>
      )}

      <div className="w-full lg:w-2/4 p-8 my-8 bg-[#f9f9f9] lg:rounded-2xl shadow-md">
        <div
          id="exibicao"
          aria-live="polite"
          className="w-full flex flex-col p-6 min-h-50 bg-white rounded-2xl shadow-md items-center justify-center"
        >
          {mensagem ? (
            <p className="text-center text-zinc-400">{mensagem}</p>
          ) : (
            <div className="w-full self-start">
              <h2 className="mb-2 text-lg lg:text-xl font-semibold text-zinc-700">{nomeTurma}</h2>
              {dias.map(({ dia, aulas }) => (
                <div key={dia} className="mb-4 last:mb-0">
                  <h3 className="mb-2 text-lg lg:text-xl font-semibold text-zinc-700">{dia}</h3>
                  <ul className="flex flex-col gap-2">
                    {aulas.map((aula) => (
                      <li
                        key={aula.idHorariosAula}
                        className="rounded-2xl bg-[#f9f9f9] px-5 py-3 text-base lg:text-lg text-zinc-600 shadow-sm"
                      >
                        <b>{aula.turno}:</b> {descricaoSala(aula.sala)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

