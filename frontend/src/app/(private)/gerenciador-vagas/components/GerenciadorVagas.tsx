"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { alerta } from "@/lib/alerta";
import { mensagemDoBackend } from "@/lib/autenticacao";
import { valorDoCampo } from "@/lib/painelVagas";
import { normalizar } from "@/lib/usuarios";
import {
  chamarVagas,
  ordemDosTipos,
  tiposDeVaga,
  type RegistroVaga,
  type TipoVaga,
} from "@/lib/vagasAdmin";
import { FormularioVaga } from "./FormularioVaga";

export function GerenciadorVagas({ tipoInicial }: { tipoInicial: TipoVaga }) {
  const [tipo, setTipo] = useState<TipoVaga>(tipoInicial);
  const [registros, setRegistros] = useState<RegistroVaga[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [criando, setCriando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const config = tiposDeVaga[tipo];

  const carregar = useCallback(async () => {
    try {
      const { ok, dados } = await chamarVagas(tipo);
      if (!ok) {
        setErro(mensagemDoBackend(dados, "Não foi possível carregar"));
        return;
      }
      setRegistros(Array.isArray(dados) ? (dados as RegistroVaga[]) : []);
      setErro(null);
    } catch {
      setErro("Falha ao conectar com o servidor");
    }
  }, [tipo]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function trocarTipo(novo: TipoVaga) {
    if (novo === tipo) return;
    setTipo(novo);
    setRegistros(null);
    setErro(null);
    setBusca("");
    setCriando(false);
    setEditandoId(null);
  }

  const idDe = (registro: RegistroVaga) => Number(registro[config.idCampo]);

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim());
    if (!registros) return [];
    if (!termo) return registros;

    return registros.filter((registro) =>
      normalizar(
        config.campos
          .map((campo) => valorDoCampo(registro, campo.nome))
          .join(" "),
      ).includes(termo),
    );
  }, [registros, busca, config]);

  async function excluir(registro: RegistroVaga) {
    const titulo = valorDoCampo(registro, config.campoTitulo);

    const confirmou = await alerta.confirmar({
      titulo: `Excluir ${config.nomeSingular}?`,
      descricao: `"${titulo}" será ${config.artigoExcluida} e não poderá ser recuperad${config.nomeSingular === "curso" ? "o" : "a"}.`,
      textoConfirmar: "Excluir",
      alertaPerigo: true,
    });
    if (!confirmou) return;

    try {
      const { ok, dados } = await chamarVagas(
        `${tipo}/${idDe(registro)}`,
        "DELETE",
      );
      if (!ok) {
        toast.error(mensagemDoBackend(dados, "Não foi possível excluir"));
        return;
      }

      toast.success(
        `${config.nomeSingular === "curso" ? "Curso excluído" : "Vaga excluída"}!`,
      );
      setRegistros((atual) =>
        (atual ?? []).filter((r) => idDe(r) !== idDe(registro)),
      );
      setEditandoId((atual) => (atual === idDe(registro) ? null : atual));
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="Tipo de vaga"
        className="flex flex-wrap gap-2 border-b-2 border-zinc-200"
      >
        {ordemDosTipos.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={item === tipo}
            onClick={() => trocarTipo(item)}
            className={`cursor-pointer rounded-t-lg px-4 py-2 font-medium ${
              item === tipo
                ? "border-b-4 border-red-600 text-red-700"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {tiposDeVaga[item].rotuloAba}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="busca-vagas" className="text-sm">
            Buscar
          </label>
          <input
            id="busca-vagas"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite para filtrar"
            className="w-72 max-w-full rounded-2xl border border-zinc-400 px-4 py-2 hover:border-zinc-800"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setCriando((atual) => !atual);
            setEditandoId(null);
          }}
          className="cursor-pointer rounded-3xl bg-red-600 px-5 py-2 text-white duration-150 hover:bg-red-700"
        >
          {criando ? "Fechar" : config.textoNovo}
        </button>
      </div>

      {criando && (
        <FormularioVaga
          key={`novo-${tipo}`}
          config={config}
          aoSalvar={(novo) => {
            setRegistros((atual) => [...(atual ?? []), novo]);
            setCriando(false);
          }}
          aoCancelar={() => setCriando(false)}
        />
      )}

      {erro ? (
        <div
          role="alert"
          className="flex flex-col items-start gap-3 rounded-2xl border-2 border-red-200 p-6"
        >
          <p className="text-red-700">{erro}</p>
          <button
            type="button"
            onClick={carregar}
            className="cursor-pointer rounded-3xl border border-zinc-400 px-5 py-2 hover:bg-zinc-100"
          >
            Tentar de novo
          </button>
        </div>
      ) : !registros ? (
        <p className="text-zinc-600">Carregando...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border-2 border-zinc-200">
          <table className="w-full text-left">
            <caption className="sr-only">{config.rotuloAba}</caption>
            <thead className="bg-zinc-50 text-sm text-zinc-600">
              <tr>
                {config.colunas.map((coluna) => (
                  <th
                    key={coluna.campo}
                    scope="col"
                    className="px-4 py-3 font-medium"
                  >
                    {coluna.rotulo}
                  </th>
                ))}
                <th scope="col" className="px-4 py-3 font-medium">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200">
              {filtrados.length === 0 && (
                <tr>
                  <td
                    colSpan={config.colunas.length + 1}
                    className="px-4 py-8 text-center text-zinc-500"
                  >
                    {registros.length === 0
                      ? config.textoVazio
                      : "Nada encontrado para essa busca."}
                  </td>
                </tr>
              )}

              {filtrados.map((registro) => {
                const id = idDe(registro);
                const editando = editandoId === id;

                return (
                  <Fragment key={id}>
                    <tr className={editando ? "bg-zinc-50" : undefined}>
                      {config.colunas.map((coluna, indice) => (
                        <td
                          key={coluna.campo}
                          className={`px-4 py-3 ${indice === 0 ? "" : "text-zinc-700"}`}
                        >
                          {valorDoCampo(registro, coluna.campo) || "—"}
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setEditandoId(editando ? null : id);
                            setCriando(false);
                          }}
                          aria-expanded={editando}
                          className="mr-4 cursor-pointer text-sm text-red-600 hover:underline"
                        >
                          {editando ? "Fechar" : "Editar"}
                        </button>
                        <button
                          type="button"
                          onClick={() => excluir(registro)}
                          className="cursor-pointer text-sm text-zinc-600 hover:text-red-600 hover:underline"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>

                    {editando && (
                      <tr>
                        <td
                          colSpan={config.colunas.length + 1}
                          className="px-4 pb-4"
                        >
                          <FormularioVaga
                            key={`editar-${tipo}-${id}`}
                            config={config}
                            registro={registro}
                            aoSalvar={(atualizado) => {
                              setRegistros((atual) =>
                                (atual ?? []).map((r) =>
                                  idDe(r) === id ? atualizado : r,
                                ),
                              );
                              setEditandoId(null);
                            }}
                            aoCancelar={() => setEditandoId(null)}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
