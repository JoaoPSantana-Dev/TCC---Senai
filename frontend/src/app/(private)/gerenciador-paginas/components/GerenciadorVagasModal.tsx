"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { alerta } from "@/lib/alerta";
import { mensagemDoBackend } from "@/lib/autenticacao";
import {
  fecharGerenciadorVagas,
  useTipoVagaAberto,
} from "@/lib/gerenciadorVagas";
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
import {
  JanelaEditor,
  classeBotaoPrimario,
  classeBotaoSecundario,
  classeCampoJanela,
  classeLinkAcao,
} from "./JanelaEditor";

// janela para listar, adicionar, editar e excluir as vagas de emprego, de estágio e os cursos
// as vagas são gravadas no banco na hora e não precisam do botão "Salvar alterações" da página

const tituloDaJanela: Record<TipoVaga, string> = {
  emprego: "Vagas de emprego",
  estagio: "Vagas de estágio",
  curso: "Cursos",
};

export function GerenciadorVagasModal() {
  const tipo = useTipoVagaAberto();
  // key: trocar de tipo recomeça do zero e recarrega a lista
  return tipo ? <Conteudo key={tipo} tipo={tipo} /> : null;
}

function Conteudo({ tipo }: { tipo: TipoVaga }) {
  const config = tiposDeVaga[tipo];
  const ehCurso = config.nomeSingular === "curso";
  const [registros, setRegistros] = useState<RegistroVaga[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [editando, setEditando] = useState<number | "novo" | null>(null);

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
    const terminacao = ehCurso ? "o" : "a";
    const confirmou = await alerta.confirmar({
      titulo: `Excluir ${config.nomeSingular}?`,
      descricao: `"${tituloDoItem(config, registro)}" será excluíd${terminacao}e não poderá ser recuperad${terminacao}.`,
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

      toast.success(ehCurso ? "Curso excluído!" : "Vaga excluída!");
      setRegistros((atual) => removerDaLista(config, atual ?? [], id));
      setEditando(null);
      avisarVagasAtualizadas(config.caminhoBackend);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  }

  function aoSalvar(salvo: RegistroVaga) {
    setRegistros((atual) => atualizarLista(config, atual ?? [], salvo));
    setEditando(null);
    avisarVagasAtualizadas(config.caminhoBackend);
  }

  return (
    <JanelaEditor
      titulo={tituloDaJanela[tipo]}
      descricao={`Aqui as ${ehCurso ? "informações dos cursos" : "vagas"} são salvas na hora, sem precisar de "Salvar alterações". A página ao fundo atualiza sozinha.`}
      aoFechar={fecharGerenciadorVagas}
    >
      <button
        type="button"
        onClick={() => setEditando(editando === "novo" ? null : "novo")}
        className={`${classeBotaoPrimario} self-start`}
      >
        {editando === "novo" ? "Cancelar" : config.textoNovo}
      </button>

      {editando === "novo" && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <FormularioVaga
            key="novo"
            config={config}
            aoSalvar={aoSalvar}
            aoCancelar={() => setEditando(null)}
          />
        </div>
      )}

      {erro ? (
        <div role="alert" className="flex flex-col items-start gap-2 text-sm">
          <p className="text-red-700">{erro}</p>
          <button
            type="button"
            onClick={carregar}
            className={classeBotaoSecundario}
          >
            Tentar de novo
          </button>
        </div>
      ) : !registros ? (
        <p className="text-sm text-zinc-500">Carregando...</p>
      ) : registros.length === 0 ? (
        <p className="text-sm text-zinc-600">{config.textoVazio}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {registros.map((registro) => {
            const id = idDoRegistro(config, registro);
            const aberto = editando === id;
            const subtitulo = subtituloDoItem(config, registro);

            return (
              <li
                key={id}
                className="rounded-xl border border-zinc-200 bg-white"
              >
                <div className="flex items-center gap-3 p-3">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {tituloDoItem(config, registro)}
                    </span>
                    {subtitulo && (
                      <span className="block truncate text-xs text-zinc-600">
                        {subtitulo}
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditando(aberto ? null : id)}
                    aria-expanded={aberto}
                    className={`${classeLinkAcao} text-red-700`}
                  >
                    {aberto ? "Fechar" : "Editar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => excluir(registro)}
                    className={`${classeLinkAcao} font-normal text-zinc-600 hover:text-red-700`}
                  >
                    Excluir
                  </button>
                </div>

                {aberto && (
                  <div className="border-t border-zinc-200 bg-zinc-50 p-4">
                    <FormularioVaga
                      key={`editar-${id}`}
                      config={config}
                      registro={registro}
                      aoSalvar={aoSalvar}
                      aoCancelar={() => setEditando(null)}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </JanelaEditor>
  );
}

interface FormularioVagaProps {
  config: ConfigVaga;
  registro?: RegistroVaga; // sem registro = cadastrando
  aoSalvar: (registro: RegistroVaga) => void;
  aoCancelar: () => void;
}

function FormularioVaga({
  config,
  registro,
  aoSalvar,
  aoCancelar,
}: FormularioVagaProps) {
  const editando = registro !== undefined;
  const id = editando ? idDoRegistro(config, registro) : null;

  const [valores, setValores] = useState<Record<string, string>>(() =>
    valoresIniciais(config, registro),
  );
  const [erros, setErros] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  async function enviar() {
    if (salvando) return;

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

  // enter dentro de um campo de uma linha salva, no textarea continua pulando linha
  function aoTeclar(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key === "Enter" && evento.target instanceof HTMLInputElement) {
      evento.preventDefault();
      enviar();
    }
  }

  const prefixo = `vaga-${config.tipo}-${id ?? "nova"}`;

  return (
    <div onKeyDown={aoTeclar} className="flex flex-col gap-4">
      {/* campos curtos em duas colunas, textos longos ocupam a linha toda */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {config.campos.map((campo) => {
          const longo = campo.tipo === "textarea";
          const idCampo = `${prefixo}-${campo.nome}`;

          return (
            <div
              key={campo.nome}
              className={`flex flex-col gap-1 ${longo ? "sm:col-span-2" : ""}`}
            >
              <label htmlFor={idCampo} className="text-sm font-medium">
                {campo.rotulo}
                {campo.obrigatorio && <span className="text-red-600"> *</span>}
              </label>

              {longo ? (
                <textarea
                  id={idCampo}
                  rows={3}
                  value={valores[campo.nome] ?? ""}
                  aria-invalid={erros[campo.nome] ? true : undefined}
                  onChange={(e) =>
                    setValores((atual) => ({
                      ...atual,
                      [campo.nome]: e.target.value,
                    }))
                  }
                  className={classeCampoJanela}
                />
              ) : (
                <input
                  id={idCampo}
                  type="text"
                  autoComplete="off"
                  value={valores[campo.nome] ?? ""}
                  aria-invalid={erros[campo.nome] ? true : undefined}
                  onChange={(e) =>
                    setValores((atual) => ({
                      ...atual,
                      [campo.nome]: e.target.value,
                    }))
                  }
                  className={classeCampoJanela}
                />
              )}

              {erros[campo.nome] && (
                <p className="text-xs text-red-700">{erros[campo.nome]}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={enviar}
          disabled={salvando}
          className={classeBotaoPrimario}
        >
          {salvando ? "Salvando..." : editando ? "Salvar" : "Cadastrar"}
        </button>
        <button
          type="button"
          onClick={aoCancelar}
          disabled={salvando}
          className={classeBotaoSecundario}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
