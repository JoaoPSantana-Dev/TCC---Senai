"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { alerta } from "@/lib/alerta";
import { mensagemDoBackend } from "@/lib/autenticacao";
import {
  atualizarLista,
  avisarVagasAtualizadas,
  chamarVagas,
  corpoParaEnviar,
  idDoRegistro,
  removerDaLista,
  subtituloDoItem,
  tiposDeVaga,
  tituloDoItem,
  validarVaga,
  valoresIniciais,
  type ConfigVaga,
  type RegistroVaga,
  type TipoVaga,
} from "@/lib/vagasEditor";

// painel que aparece na barra da direita do editor quando o bloco "Vagas de emprego", "Vagas de estágio" ou "Lista de cursos" está selecionado
// lista, adiciona, edita e exclui as vagas daquele tipo
// as vagas são gravadas no banco na hora e não precisam do botão "Salvar alterações" da página

const classeCampo =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900";

export function PainelVagasNoEditor({ tipo }: { tipo: TipoVaga }) {
  const config = tiposDeVaga[tipo];
  const [registros, setRegistros] = useState<RegistroVaga[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [aberto, setAberto] = useState<number | "novo" | null>(null);

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

  async function excluir(registro: RegistroVaga) {
    const confirmou = await alerta.confirmar({
      titulo: `Excluir ${config.nomeSingular}?`,
      descricao: `"${tituloDoItem(config, registro)}" será excluíd${config.nomeSingular === "curso" ? "o" : "a"} do totem e não poderá ser recuperad${config.nomeSingular === "curso" ? "o" : "a"}.`,
      textoConfirmar: "Excluir",
      alertaPerigo: true,
    });
    if (!confirmou) return;

    try {
      const id = idDoRegistro(config, registro);
      const { ok, dados } = await chamarVagas(`${tipo}/${id}`, "DELETE");
      if (!ok) {
        toast.error(mensagemDoBackend(dados, "Não foi possível excluir"));
        return;
      }

      toast.success(
        config.nomeSingular === "curso" ? "Curso excluído!" : "Vaga excluída!",
      );
      setRegistros((atual) => removerDaLista(config, atual ?? [], id));
      setAberto(null);
      avisarVagasAtualizadas(config.caminhoBackend);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  }

  function aoSalvar(salvo: RegistroVaga) {
    setRegistros((atual) => atualizarLista(config, atual ?? [], salvo));
    setAberto(null);
    avisarVagasAtualizadas(config.caminhoBackend);
  }

  return (
    <div className="flex flex-col gap-3 text-zinc-900">
      <p className="text-xs text-zinc-500">
        Aqui as{" "}
        {config.nomeSingular === "curso" ? "informações dos cursos" : "vagas"}{" "}
        são salvas na hora, sem precisar de &quot;Salvar alterações&quot;. A
        página ao lado atualiza sozinha
      </p>

      <button
        type="button"
        onClick={() => setAberto(aberto === "novo" ? null : "novo")}
        className="cursor-pointer self-start rounded-full bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
      >
        {aberto === "novo" ? "Fechar" : config.textoNovo}
      </button>

      {aberto === "novo" && (
        <FormularioNoPainel
          key="novo"
          config={config}
          aoSalvar={aoSalvar}
          aoCancelar={() => setAberto(null)}
        />
      )}

      {erro ? (
        <div role="alert" className="flex flex-col items-start gap-2 text-sm">
          <p className="text-red-700">{erro}</p>
          <button
            type="button"
            onClick={carregar}
            className="cursor-pointer text-blue-700 hover:underline"
          >
            Tentar de novo
          </button>
        </div>
      ) : !registros ? (
        <p className="text-sm text-zinc-500">Carregando...</p>
      ) : registros.length === 0 ? (
        <p className="text-sm text-zinc-500">{config.textoVazio}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {registros.map((registro) => {
            const id = idDoRegistro(config, registro);
            const editando = aberto === id;
            const subtitulo = subtituloDoItem(config, registro);

            return (
              <li
                key={id}
                className="rounded-lg border border-zinc-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setAberto(editando ? null : id)}
                  aria-expanded={editando}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left hover:bg-zinc-50"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {tituloDoItem(config, registro)}
                    </span>
                    {subtitulo && (
                      <span className="block truncate text-xs text-zinc-500">
                        {subtitulo}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-xs text-blue-700">
                    {editando ? "Fechar" : "Editar"}
                  </span>
                </button>

                {editando && (
                  <div className="border-t border-zinc-200 p-3">
                    <FormularioNoPainel
                      key={`editar-${id}`}
                      config={config}
                      registro={registro}
                      aoSalvar={aoSalvar}
                      aoCancelar={() => setAberto(null)}
                      aoExcluir={() => excluir(registro)}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface FormularioNoPainelProps {
  config: ConfigVaga;
  registro?: RegistroVaga; // sem registro = cadastrando
  aoSalvar: (registro: RegistroVaga) => void;
  aoCancelar: () => void;
  aoExcluir?: () => void;
}

function FormularioNoPainel({
  config,
  registro,
  aoSalvar,
  aoCancelar,
  aoExcluir,
}: FormularioNoPainelProps) {
  const editando = registro !== undefined;
  const id = editando ? idDoRegistro(config, registro) : null;

  const [valores, setValores] = useState<Record<string, string>>(() =>
    valoresIniciais(config, registro),
  );
  const [erros, setErros] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();

    const encontrados = validarVaga(config, valores);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setSalvando(true);
    try {
      const corpo = corpoParaEnviar(config, valores);
      const { ok, dados } = editando
        ? await chamarVagas(`${config.tipo}/${id}`, "PATCH", corpo)
        : await chamarVagas(config.tipo, "POST", corpo);

      if (!ok) {
        toast.error(mensagemDoBackend(dados, "Não foi possível salvar"));
        return;
      }

      toast.success(
        editando ? "Alterações salvas!" : "Cadastrado com sucesso!",
      );
      aoSalvar(dados as RegistroVaga);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    } finally {
      setSalvando(false);
    }
  }

  const prefixo = `vaga-${config.tipo}-${id ?? "nova"}`;

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-3">
      {config.campos.map((campo) => (
        <div key={campo.nome} className="flex flex-col gap-1">
          <label
            htmlFor={`${prefixo}-${campo.nome}`}
            className="text-xs font-medium text-zinc-700"
          >
            {campo.rotulo}
            {campo.obrigatorio && <span className="text-red-600"> *</span>}
          </label>

          {campo.tipo === "textarea" ? (
            <textarea
              id={`${prefixo}-${campo.nome}`}
              rows={3}
              value={valores[campo.nome] ?? ""}
              onChange={(e) =>
                setValores((atual) => ({
                  ...atual,
                  [campo.nome]: e.target.value,
                }))
              }
              className={classeCampo}
            />
          ) : (
            <input
              id={`${prefixo}-${campo.nome}`}
              type="text"
              autoComplete="off"
              value={valores[campo.nome] ?? ""}
              onChange={(e) =>
                setValores((atual) => ({
                  ...atual,
                  [campo.nome]: e.target.value,
                }))
              }
              className={classeCampo}
            />
          )}

          {erros[campo.nome] && (
            <p className="text-xs text-red-600">{erros[campo.nome]}</p>
          )}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={salvando}
          className="cursor-pointer rounded-full bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-60"
        >
          {salvando ? "Salvando..." : editando ? "Salvar" : "Cadastrar"}
        </button>
        <button
          type="button"
          onClick={aoCancelar}
          className="cursor-pointer rounded-full border border-zinc-300 px-4 py-1.5 text-sm hover:bg-zinc-100"
        >
          Cancelar
        </button>
        {aoExcluir && (
          <button
            type="button"
            onClick={aoExcluir}
            className="ml-auto cursor-pointer text-sm text-red-600 hover:underline"
          >
            Excluir
          </button>
        )}
      </div>
    </form>
  );
}
