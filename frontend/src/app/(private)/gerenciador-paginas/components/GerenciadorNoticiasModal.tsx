"use client";

import { useEffect, useState, type ChangeEvent, type DragEvent } from "react";
import { toast } from "sonner";
import { alerta } from "@/lib/alerta";
import { mensagemDoBackend } from "@/lib/autenticacao";
import {
  fecharGerenciadorNoticias,
  useGerenciadorNoticiasAberto,
} from "@/lib/gerenciadorNoticias";
import {
  avisarNoticiasAtualizadas,
  buscarNoticias,
  tiposImagemAceitos,
  tituloMaximoNoticia,
  urlImagemNoticia,
  validarArquivoImagem,
  type Noticia,
} from "@/lib/noticias";
import {
  JanelaEditor,
  classeBotaoPrimario,
  classeBotaoSecundario,
  classeCampoJanela,
  classeLinkAcao,
} from "./JanelaEditor";

// janela para listar, adicionar, editar e excluir as notícias
// a imagem é escolhida ou arrastada do computador
// as notícias são gravadas na hora e não precisam do botão "Salvar alterações" da página

export function GerenciadorNoticiasModal() {
  const aberto = useGerenciadorNoticiasAberto();
  // só monta quando abre, assim a lista é recarregada toda vez
  return aberto ? <Conteudo /> : null;
}

function Conteudo() {
  const [noticias, setNoticias] = useState<Noticia[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [editando, setEditando] = useState<number | "nova" | null>(null);

  async function carregar() {
    try {
      setNoticias(await buscarNoticias());
      setErro(null);
    } catch {
      setErro("Não foi possível carregar as notícias");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function excluir(noticia: Noticia) {
    const confirmou = await alerta.confirmar({
      titulo: "Excluir notícia?",
      descricao: `"${noticia.titulo}" será excluída e não poderá ser recuperada.`,
      textoConfirmar: "Excluir",
      alertaPerigo: true,
    });
    if (!confirmou) return;

    try {
      const resposta = await fetch(`/api/noticias/${noticia.idNoticia}`, {
        method: "DELETE",
      });
      if (!resposta.ok) {
        const dados = await resposta.json().catch(() => ({}));
        toast.error(mensagemDoBackend(dados, "Não foi possível excluir"));
        return;
      }
      toast.success("Notícia excluída!");
      setNoticias((atual) =>
        (atual ?? []).filter((n) => n.idNoticia !== noticia.idNoticia),
      );
      setEditando(null);
      avisarNoticiasAtualizadas();
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  }

  function aoSalvar(salva: Noticia) {
    setNoticias((atual) => {
      const lista = atual ?? [];
      return lista.some((n) => n.idNoticia === salva.idNoticia)
        ? lista.map((n) => (n.idNoticia === salva.idNoticia ? salva : n))
        : [salva, ...lista]; // a nova aparece primeiro
    });
    setEditando(null);
    avisarNoticiasAtualizadas();
  }

  return (
    <JanelaEditor
      titulo="Notícias"
      descricao='As mudanças são salvas na hora, sem precisar de "Salvar alterações". A notícia mais nova fica em destaque na homepage.'
      aoFechar={fecharGerenciadorNoticias}
    >
      <button
        type="button"
        onClick={() => setEditando(editando === "nova" ? null : "nova")}
        className={`${editando === "nova" ? null : classeBotaoPrimario} self-start`}
      >
        {editando === "nova" ? null : "Adicionar notícia"}
      </button>

      {editando === "nova" && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <FormularioNoticia
            key="nova"
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
      ) : !noticias ? (
        <p className="text-sm text-zinc-500">Carregando...</p>
      ) : noticias.length === 0 ? (
        <p className="text-sm text-zinc-600">
          Nenhuma notícia cadastrada. Use &quot;Adicionar notícia&quot; para
          criar a primeira.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {noticias.map((noticia) => {
            const aberta = editando === noticia.idNoticia;
            return (
              <li
                key={noticia.idNoticia}
                className="rounded-xl border border-zinc-200 bg-white"
              >
                <div className="flex items-center gap-3 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlImagemNoticia(noticia.imagem)}
                    alt=""
                    className="h-14 w-24 shrink-0 rounded-lg object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {noticia.titulo}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditando(aberta ? null : noticia.idNoticia)
                    }
                    aria-expanded={aberta}
                    className={`${classeLinkAcao} text-red-700`}
                  >
                    {aberta ? "Fechar" : "Editar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => excluir(noticia)}
                    className={`${classeLinkAcao} font-normal text-zinc-600 hover:text-red-700`}
                  >
                    Excluir
                  </button>
                </div>

                {aberta && (
                  <div className="border-t border-zinc-200 bg-zinc-50 p-4">
                    <FormularioNoticia
                      key={noticia.idNoticia}
                      noticia={noticia}
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

interface FormularioProps {
  noticia?: Noticia;
  aoSalvar: (salva: Noticia) => void;
  aoCancelar: () => void;
}

function FormularioNoticia({ noticia, aoSalvar, aoCancelar }: FormularioProps) {
  const [titulo, setTitulo] = useState(noticia?.titulo ?? "");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [previa, setPrevia] = useState<string | null>(null);
  const [erroImagem, setErroImagem] = useState<string | null>(null);
  const [erroTitulo, setErroTitulo] = useState<string | null>(null);
  const [arrastando, setArrastando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // libera a memória da pré-visualização quando troca a imagem ou fecha o formulário
  useEffect(() => {
    if (!arquivo) return;
    const url = URL.createObjectURL(arquivo);
    setPrevia(url);
    return () => URL.revokeObjectURL(url);
  }, [arquivo]);

  function escolher(novo?: File) {
    if (!novo) return;
    const motivo = validarArquivoImagem(novo);
    setErroImagem(motivo);
    if (motivo) return;
    setArquivo(novo);
  }

  function aoEscolherNoComputador(evento: ChangeEvent<HTMLInputElement>) {
    escolher(evento.target.files?.[0]);
    evento.target.value = ""; // deixa escolher o mesmo arquivo de novo
  }

  function aoSoltar(evento: DragEvent<HTMLLabelElement>) {
    evento.preventDefault();
    setArrastando(false);
    escolher(evento.dataTransfer.files?.[0]);
  }

  async function enviar() {
    if (salvando) return;

    const tituloLimpo = titulo.trim();
    const semTitulo = !tituloLimpo;
    const semImagem = !noticia && !arquivo; // ao editar, a imagem atual vale
    const tituloLongo = tituloLimpo.length > tituloMaximoNoticia;

    setErroTitulo(
      semTitulo
        ? "Informe o título"
        : tituloLongo
          ? `Máximo de ${tituloMaximoNoticia} caracteres`
          : null,
    );
    setErroImagem(semImagem ? "Escolha a imagem da notícia" : erroImagem);
    if (semTitulo || semImagem || tituloLongo) return;

    const corpo = new FormData();
    corpo.append("titulo", tituloLimpo);
    if (arquivo) corpo.append("imagem", arquivo);

    setSalvando(true);
    try {
      const resposta = await fetch(
        noticia ? `/api/noticias/${noticia.idNoticia}` : "/api/noticias",
        { method: noticia ? "PATCH" : "POST", body: corpo },
      );
      const dados: unknown = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        toast.error(mensagemDoBackend(dados, "Não foi possível salvar"));
        return;
      }
      toast.success(noticia ? "Notícia atualizada!" : "Notícia adicionada!");
      aoSalvar(dados as Noticia);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    } finally {
      setSalvando(false);
    }
  }

  const imagemMostrada =
    previa ?? (noticia ? urlImagemNoticia(noticia.imagem) : null);
  const idTitulo = `titulo-${noticia?.idNoticia ?? "nova"}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor={idTitulo} className="font-medium">
          Título
        </label>
        <input
          id={idTitulo}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onKeyDown={(e) => {
            // enter dentro do título salva
            if (e.key === "Enter") {
              e.preventDefault();
              enviar();
            }
          }}
          maxLength={tituloMaximoNoticia + 50}
          aria-invalid={erroTitulo ? true : undefined}
          className={classeCampoJanela}
        />
        {erroTitulo && (
          <span className="text-xs text-red-700">{erroTitulo}</span>
        )}
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Imagem</span>

        {/* o <label> abre a janela de arquivos sozinho, sem precisar de .click() por código */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setArrastando(true);
          }}
          onDragLeave={() => setArrastando(false)}
          onDrop={aoSoltar}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-3 text-center text-xs text-zinc-600 focus-within:ring-2 focus-within:ring-red-600/40 ${
            arrastando ? "border-red-500 bg-red-50" : "border-zinc-300 bg-white"
          }`}
        >
          {imagemMostrada && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagemMostrada}
              alt="Pré-visualização da imagem"
              className="max-h-48 w-full rounded-lg object-cover"
            />
          )}
          <span className="font-medium text-zinc-800">
            {imagemMostrada
              ? "Clique ou arraste outra imagem para trocar"
              : "Arraste uma imagem do computador até aqui ou clique para escolher"}
          </span>
          <span className="text-zinc-500">JPG, PNG, WEBP ou GIF, até 5 MB</span>
          <input
            type="file"
            accept={tiposImagemAceitos.join(",")}
            onChange={aoEscolherNoComputador}
            className="sr-only"
          />
        </label>

        {arquivo && (
          <span className="text-xs text-zinc-600">
            Selecionada: {arquivo.name}
          </span>
        )}
        {erroImagem && (
          <span className="text-xs text-red-700">{erroImagem}</span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={enviar}
          disabled={salvando}
          className={classeBotaoPrimario}
        >
          {salvando ? "Salvando..." : "Salvar"}
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
