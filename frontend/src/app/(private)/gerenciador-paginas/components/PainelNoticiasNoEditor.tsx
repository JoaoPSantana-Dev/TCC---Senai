"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import { toast } from "sonner";
import { alerta } from "@/lib/alerta";
import { mensagemDoBackend } from "@/lib/autenticacao";
import { useRascunho } from "@/lib/rascunhoEditor";
import {
  avisarNoticiasAtualizadas,
  buscarNoticias,
  tiposImagemAceitos,
  tituloMaximoNoticia,
  urlImagemNoticia,
  validarArquivoImagem,
  type Noticia,
} from "@/lib/noticias";

// painel que aparece na barra da direita do editor quando o bloco "Carrossel de notícias" está selecionado
// lista, adiciona, edita e exclui as notícias
// a imagem é escolhida ou arrastada do computador
// as notícias são gravadas na hora e não precisam do botão "Salvar alterações" da página

const classeCampo =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900";

export function PainelNoticiasNoEditor() {
  const [noticias, setNoticias] = useState<Noticia[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  // guardado fora do componente
  // o puck fecha o painel ao clicar fora do bloco
  const [aberto, setAberto] = useRascunho<number | "nova" | null>(
    "noticias:aberto",
    () => null,
  );

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
      setAberto(null);
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
        : [salva, ...lista]; // a nova aparece primeiro, igual no totem
    });
    setAberto(null);
    avisarNoticiasAtualizadas();
  }

  return (
    <div className="flex flex-col gap-3 text-zinc-900">
      <p className="text-xs text-zinc-500">
        As notícias são salvas na hora, sem precisar de &quot;Salvar
        alterações&quot;. A mais nova fica em destaque na homepage
      </p>

      <button
        type="button"
        onClick={() => setAberto(aberto === "nova" ? null : "nova")}
        className="cursor-pointer self-start rounded-full bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
      >
        {aberto === "nova" ? "Fechar" : "Adicionar notícia"}
      </button>

      {aberto === "nova" && (
        <FormularioNoticia
          key="nova"
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
      ) : !noticias ? (
        <p className="text-sm text-zinc-500">Carregando...</p>
      ) : noticias.length === 0 ? (
        <p className="text-sm text-zinc-500">Nenhuma notícia cadastrada.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {noticias.map((noticia) => (
            <li
              key={noticia.idNoticia}
              className="rounded-lg border border-zinc-200 bg-white"
            >
              <div className="flex items-center gap-3 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlImagemNoticia(noticia.imagem)}
                  alt=""
                  className="h-12 w-20 shrink-0 rounded object-cover"
                />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {noticia.titulo}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setAberto(
                      aberto === noticia.idNoticia ? null : noticia.idNoticia,
                    )
                  }
                  className="cursor-pointer text-sm text-blue-700 hover:underline"
                >
                  {aberto === noticia.idNoticia ? "Fechar" : "Editar"}
                </button>
                <button
                  type="button"
                  onClick={() => excluir(noticia)}
                  className="cursor-pointer text-sm text-red-700 hover:underline"
                >
                  Excluir
                </button>
              </div>

              {aberto === noticia.idNoticia && (
                <div className="border-t border-zinc-200 p-2">
                  <FormularioNoticia
                    key={noticia.idNoticia}
                    noticia={noticia}
                    aoSalvar={aoSalvar}
                    aoCancelar={() => setAberto(null)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface FormularioProps {
  noticia?: Noticia;
  aoSalvar: (salva: Noticia) => void;
  aoCancelar: () => void;
}

function FormularioNoticia({ noticia, aoSalvar, aoCancelar }: FormularioProps) {
  const [rascunho, setRascunho, descartarRascunho] = useRascunho<{
    titulo: string;
    arquivo: File | null;
  }>(`noticias:${noticia?.idNoticia ?? "nova"}`, () => ({
    titulo: noticia?.titulo ?? "",
    arquivo: null,
  }));
  const { titulo, arquivo } = rascunho;
  const setTitulo = (novo: string) =>
    setRascunho((atual) => ({ ...atual, titulo: novo }));
  const setArquivo = (novo: File | null) =>
    setRascunho((atual) => ({ ...atual, arquivo: novo }));
  const [previa, setPrevia] = useState<string | null>(null);
  const [erroImagem, setErroImagem] = useState<string | null>(null);
  const [erroTitulo, setErroTitulo] = useState<string | null>(null);
  const [arrastando, setArrastando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  function aoSoltar(evento: DragEvent<HTMLDivElement>) {
    evento.preventDefault();
    setArrastando(false);
    escolher(evento.dataTransfer.files?.[0]);
  }

  function aoTeclar(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      inputRef.current?.click();
    }
  }

  async function enviar() {
    if (salvando) return;

    const tituloLimpo = titulo.trim();
    const semTitulo = !tituloLimpo;
    const semImagem = !noticia && !arquivo; // ao editar, a imagem atual vale
    setErroTitulo(
      semTitulo
        ? "Informe o título"
        : tituloLimpo.length > tituloMaximoNoticia
          ? `Máximo de ${tituloMaximoNoticia} caracteres`
          : null,
    );
    setErroImagem(semImagem ? "Escolha a imagem da notícia" : erroImagem);
    if (semTitulo || semImagem || tituloLimpo.length > tituloMaximoNoticia)
      return;

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
      descartarRascunho();
      aoSalvar(dados as Noticia);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    } finally {
      setSalvando(false);
    }
  }

  // enter dentro do título salva
  function aoTeclarNoFormulario(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key === "Enter" && evento.target instanceof HTMLInputElement) {
      evento.preventDefault();
      enviar();
    }
  }

  const imagemMostrada =
    previa ?? (noticia ? urlImagemNoticia(noticia.imagem) : null);

  return (
    <div onKeyDown={aoTeclarNoFormulario} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Título
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          maxLength={tituloMaximoNoticia + 50}
          className={classeCampo}
        />
        {erroTitulo && (
          <span className="text-xs text-red-700">{erroTitulo}</span>
        )}
      </label>

      <div className="flex flex-col gap-1 text-sm">
        Imagem
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={aoTeclar}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastando(true);
          }}
          onDragLeave={() => setArrastando(false)}
          onDrop={aoSoltar}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-3 text-center text-xs text-zinc-600 ${
            arrastando
              ? "border-red-500 bg-red-50"
              : "border-zinc-300 bg-zinc-50"
          }`}
        >
          {imagemMostrada ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagemMostrada}
              alt="Pré-visualização da imagem"
              className="max-h-40 w-full rounded object-cover"
            />
          ) : null}
          <span>
            {imagemMostrada
              ? "Clique ou arraste outra imagem para trocar"
              : "Arraste uma imagem do computador até aqui ou clique para escolher"}
          </span>
          <span className="text-zinc-400">JPG, PNG, WEBP ou GIF, até 5 MB</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={tiposImagemAceitos.join(",")}
          onChange={aoEscolherNoComputador}
          className="hidden"
        />
        {erroImagem && (
          <span className="text-xs text-red-700">{erroImagem}</span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={enviar}
          disabled={salvando}
          className="cursor-pointer rounded-full bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => {
            descartarRascunho();
            aoCancelar();
          }}
          disabled={salvando}
          className="cursor-pointer rounded-full border border-zinc-300 px-4 py-1.5 text-sm hover:bg-zinc-100"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
