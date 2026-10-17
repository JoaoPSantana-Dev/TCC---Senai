"use client";

import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef, type SubmitEvent } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  criarComponentePadrao,
  normalizarConteudo,
  registroComponentes,
  validarConteudo,
  type CampoComponente,
} from "./registroComponentes";
import {
  apiUrl,
  limiteComponentes,
  limiteNomePagina,
  mensagemDeErro,
  tiposPagina,
  validarDadosBasicos,
  type ComponentePagina,
} from "@/lib/paginas";
import { PreVisualizacaoTotem } from "./PreVisualizacaoTotem";

interface PaginaData {
  nomePagina: string;
  tipoPagina: string;
  conteudo: ComponentePagina[];
}

interface EditarPaginaFormProps {
  slug: string;
  dadosIniciais: PaginaData;
}

interface CampoEditorProps {
  id: string;
  campo: CampoComponente;
  valor: unknown;
  erro?: string;
  onChange: (valor: string | boolean) => void;
}

const classeBase =
  "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

function CampoEditor({ id, campo, valor, erro, onChange }: CampoEditorProps) {
  const idErro = `${id}-erro`;
  const textoAtual = typeof valor === "string" ? valor : "";
  const classe = `${classeBase} ${erro ? "border-red-500" : ""}`;

  if (campo.tipo === "booleano") {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="flex items-center gap-2 text-sm">
          <input
            id={id}
            type="checkbox"
            checked={Boolean(valor)}
            onChange={(e) => onChange(e.target.checked)}
          />
          {campo.rotulo}
        </label>
      </div>
    );
  }

  // se o banco tiver algum dado antigo ou inválido, também vai mostrar ele aqui
  const opcoes =
    campo.tipo === "select"
      ? [
          ...(campo.opcoes ?? []),
          ...(textoAtual &&
          !campo.opcoes?.some((opcao) => opcao.valor === textoAtual)
            ? [{ valor: textoAtual, rotulo: `${textoAtual} (valor inválido)` }]
            : []),
        ]
      : [];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {campo.rotulo}
        {campo.obrigatorio && <span className="text-red-600"> *</span>}
      </label>

      {campo.tipo === "textarea" && (
        <textarea
          id={id}
          rows={4}
          maxLength={campo.maximo}
          value={textoAtual}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? idErro : undefined}
          className={classe}
        />
      )}

      {campo.tipo === "texto" && (
        <input
          id={id}
          type="text"
          maxLength={campo.maximo}
          value={textoAtual}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? idErro : undefined}
          className={classe}
        />
      )}
      {campo.tipo === "select" && (
        <select
          id={id}
          value={textoAtual}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? idErro : undefined}
          className={classe}
        >
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </select>
      )}

      <div className="flex justify-between gap-2 text-xs text-zinc-500">
        <span>{campo.ajuda}</span>
        {campo.maximo && campo.tipo !== "select" && (
          <span>
            {textoAtual.length}/{campo.maximo}
          </span>
        )}
      </div>

      {erro && (
        <p id={idErro} role="alert" className="text-sm text-red-600">
          {erro}
        </p>
      )}
    </div>
  );
}

export function EditarPaginaForm({
  slug,
  dadosIniciais,
}: EditarPaginaFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [nomePagina, setNomePagina] = useState(dadosIniciais.nomePagina);
  const [tipoPagina, setTipoPagina] = useState(dadosIniciais.tipoPagina);
  const [conteudo, setConteudo] = useState<ComponentePagina[]>(
    dadosIniciais.conteudo,
  );
  const [novoTipo, setNovoTipo] = useState(Object.keys(registroComponentes)[0]);
  const [editando, setEditando] = useState(false);
  const [tentativas, setTentativas] = useState(0);
  const [erroBasico, setErroBasico] = useState<string | null>(null);

  const [estadoSalvo, setEstadoSalvo] = useState(() =>
    JSON.stringify([
      dadosIniciais.nomePagina,
      dadosIniciais.tipoPagina,
      dadosIniciais.conteudo,
    ]),
  );
  const alterado =
    JSON.stringify([nomePagina, tipoPagina, conteudo]) !== estadoSalvo;

  // os erros só aparecem depois da primeira tentativa de salvar e depois ficam sempre atualizados
  const errosConteudo = useMemo(
    () => (tentativas > 0 ? validarConteudo(conteudo) : null),
    [tentativas, conteudo],
  );

  // avisa antes de fechar a aba com alterações não salvas
  useEffect(() => {
    if (!alterado) return;

    const avisar = (evento: BeforeUnloadEvent) => {
      evento.preventDefault();
    };

    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [alterado]);

  // depois de um salvamento com erro, leva o foco para o primeiro campo com problema
  useEffect(() => {
    if (tentativas === 0) return;

    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [tentativas]);

  const editarPagina = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editando) return;

    const erroDeValidacao = validarDadosBasicos({ nomePagina, tipoPagina });
    const erros = validarConteudo(conteudo);

    setErroBasico(erroDeValidacao);
    setTentativas((atual) => atual + 1);

    if (erroDeValidacao || erros.temErros) {
      toast.error(
        erroDeValidacao ?? "Corrija os campos destacados antes de salvar",
      );
      return;
    }

    setEditando(true);

    try {
      const conteudoLimpo = normalizarConteudo(conteudo);

      const resposta = await fetch(
        `${apiUrl}/paginas/${encodeURIComponent(slug)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nomePagina: nomePagina.trim(),
            tipoPagina,
            conteudo: conteudoLimpo,
          }),
        },
      );

      if (!resposta.ok) {
        throw new Error(
          await mensagemDeErro(resposta, "Falha ao editar a página"),
        );
      }

      // marca como salvo para o aviso de "alterações não salvas" não aparecer
      setEstadoSalvo(JSON.stringify([nomePagina, tipoPagina, conteudo]));

      toast.success("Página editada com sucesso!");
      router.push("/gerenciador-paginas");
    } catch (erro) {
      toast.error(
        erro instanceof Error ? erro.message : "Falha ao editar a página",
      );
    } finally {
      setEditando(false);
    }
  };

  function atualizarPropriedade(
    index: number,
    propriedade: string,
    valor: string | boolean,
  ) {
    setConteudo((atual) =>
      atual.map((componente, i) =>
        i === index
          ? {
              ...componente,
              props: { ...componente.props, [propriedade]: valor },
            }
          : componente,
      ),
    );
  }

  function adicionarComponente() {
    if (conteudo.length >= limiteComponentes) {
      toast.error(
        `A página pode ter no máximo ${limiteComponentes} componentes`,
      );
      return;
    }

    setConteudo((atual) => [...atual, criarComponentePadrao(novoTipo)]);
  }

  function removerComponente(index: number) {
    const confirmou = window.confirm(
      'Remover esse componente da página? (a página só vai mudar quando você clicar em "Salvar alterações")',
    );
    if (!confirmou) return;

    setConteudo((atual) => atual.filter((_, i) => i !== index));
  }

  function moverComponente(index: number, direcao: -1 | 1) {
    const destino = index + direcao;

    setConteudo((atual) => {
      if (destino < 0 || destino >= atual.length) return atual;

      const copia = [...atual];
      [copia[index], copia[destino]] = [copia[destino], copia[index]];
      return copia;
    });
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="flex flex-col justify-center items-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm mb-40">
          <h2 className="text-xl font-semibold mb-6 text-zinc-800">
            Editando a página &quot;{slug}&quot;
          </h2>

          <form
            ref={formRef}
            onSubmit={editarPagina}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="nomePagina"
                className="text-sm font-medium text-zinc-700"
              >
                Nome da página
              </label>
              <input
                required
                id="nomePagina"
                name="nomePagina"
                type="text"
                max={limiteNomePagina}
                value={nomePagina}
                onChange={(e) => setNomePagina(e.target.value)}
                placeholder="Exemplo: Homepage, Vagas de Emprego"
                aria-invalid={Boolean(erroBasico) && !nomePagina.trim()}
                className={classeBase}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="tipoPagina"
                className="text-sm font-medium text-zinc-700"
              >
                Tipo da página
              </label>
              <select
                required
                id="tipoPagina"
                name="tipoPagina"
                value={tipoPagina}
                onChange={(e) => setTipoPagina(e.target.value)}
                className={classeBase}
              >
                <option value="" disabled>
                  Selecione o tipo da página
                </option>
                {tiposPagina.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            {erroBasico && (
              <p role="alert" className="text-sm text-red-600">
                {erroBasico}
              </p>
            )}

            <div className="mt-4 border-t-2 border-zinc-200 pt-4">
              <h3 className="text-lg font-semibold text-zinc-800 mb-1">
                Componentes da página
              </h3>
              <p className="text-sm text-zinc-500 mb-4">
                {conteudo.length} de {limiteComponentes} componentes
              </p>

              {errosConteudo?.geral.map((mensagem) => (
                <p key={mensagem} role="alert" className="text-sm text-red-600">
                  {mensagem}
                </p>
              ))}

              {conteudo.length === 0 && (
                <p className="text-zinc-500 mb-4">
                  Essa página ainda não tem componentes. Adicione o primeiro
                  abaixo
                </p>
              )}

              <ol className="flex flex-col gap-6">
                {conteudo.map((componente, index) => {
                  const definicao = registroComponentes[componente.type];
                  const erros = errosConteudo?.porComponente[index] ?? {};

                  return (
                    <li
                      key={`${componente.type}-${index}`}
                      className="border border-zinc-200 rounded-xl p-4 bg-zinc-50"
                    >
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <h4 className="font-medium text-zinc-700">
                          {index + 1}. {definicao?.rotulo ?? componente.type}
                        </h4>

                        <div className="flex items-center gap-2 text-sm">
                          <button
                            type="button"
                            onClick={() => moverComponente(index, -1)}
                            disabled={index === 0}
                            title="Mover para cima"
                            className="px-2 py-1 border rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            ↑
                          </button>

                          <button
                            type="button"
                            onClick={() => moverComponente(index, 1)}
                            disabled={index === conteudo.length - 1}
                            title="Mover para baixo"
                            className="px-2 py-1 border rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            ↓
                          </button>

                          <button
                            type="button"
                            onClick={() => removerComponente(index)}
                            className="px-2 py-1 border border-red-300 text-red-600 rounded-md cursor-pointer hover:bg-red-50"
                          >
                            Remover
                          </button>
                        </div>
                      </div>

                      {!definicao ? (
                        <p
                          id={`componente-${index}-tipo-erro`}
                          role="alert"
                          aria-invalid="true"
                          tabIndex={-1}
                          className="text-sm text-red-600"
                        >
                          {erros._tipo ??
                            `O componente "${componente.type}" não existe mais. Remova para conseguir salvar`}
                        </p>
                      ) : (
                        <>
                          <div className="flex flex-col gap-3">
                            {definicao.campos.map((campo) => (
                              <CampoEditor
                                key={campo.nome}
                                id={`componente-${index}-${campo.nome}`}
                                campo={campo}
                                valor={componente.props[campo.nome]}
                                erro={erros[campo.nome]}
                                onChange={(valor) =>
                                  atualizarPropriedade(index, campo.nome, valor)
                                }
                              />
                            ))}
                          </div>

                          <div className="mt-6">
                            <p className="text-xs text-zinc-500 mb-2">
                              Pré-visualização da página
                            </p>
                            <PreVisualizacaoTotem
                              slug={slug}
                              nomePagina={nomePagina || "Sem nome"}
                              conteudo={conteudo}
                            />
                          </div>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <label htmlFor="novoComponente" className="sr-only">
                  Tipo do novo componente
                </label>
                <select
                  id="novoComponente"
                  value={novoTipo}
                  onChange={(e) => setNovoTipo(e.target.value)}
                  className={`${classeBase} flex-1`}
                >
                  {Object.entries(registroComponentes).map(
                    ([tipo, definicao]) => (
                      <option key={tipo} value={tipo}>
                        {definicao.rotulo}
                      </option>
                    ),
                  )}
                </select>
                <button
                  type="button"
                  onClick={adicionarComponente}
                  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md"
                >
                  Adicionar componente
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={editando}
              className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {editando ? "Salvando..." : "Salvar alterações"}
            </button>

            <div className="text-center">
              <Link
                href={`/gerenciador-paginas`}
                onClick={(e) => {
                  if (
                    alterado &&
                    !window.confirm(
                      "Você tem alterações não salvas, deseja sair mesmo assim?",
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                Voltar
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
