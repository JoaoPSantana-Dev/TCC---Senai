"use client";

import "@puckeditor/core/puck.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Puck, type Config, type Data } from "@puckeditor/core";
import { toast } from "sonner";
import { alerta } from "@/lib/alerta";
import {
  apiUrl,
  mensagemDeErro,
  validarDadosBasicos,
  type ComponentePagina,
  type PaginaCompleta,
} from "@/lib/paginas";
import {
  assinaturaDados,
  doDadosPuck,
  paraDadosPuck,
  type IconeDoMenu,
} from "@/lib/puckDados";
import {
  normalizarConteudo,
  registroComponentes,
  validarConteudo,
  type ErrosConteudo,
} from "./registroComponentes";
import { configPuck, dicionarioPuck } from "./PuckConfig";

type DadosIniciais = PaginaCompleta & {
  iconeMenu?: IconeDoMenu | null;
  ordemMenu?: number;
  mostrarNoMenu?: boolean;
};

interface EditorPuckProps {
  slug: string;
  dadosIniciais: DadosIniciais;
}

function listarErros(conteudo: ComponentePagina[], erros: ErrosConteudo) {
  const linhas = [...erros.geral];

  for (const [indice, porCampo] of Object.entries(erros.porComponente)) {
    const posicao = Number(indice);
    const componente = conteudo[posicao];
    const definicao = registroComponentes[componente.type];

    for (const [nome, mensagem] of Object.entries(porCampo)) {
      const rotulo = definicao?.campos.find(
        (campo) => campo.nome === nome,
      )?.rotulo;
      linhas.push(
        `${definicao?.rotulo ?? componente.type} ${posicao + 1}${rotulo ? ` - ${rotulo}` : ""}: ${mensagem}`,
      );
    }
  }
  return linhas;
}

export function EditorPuck({ slug, dadosIniciais }: EditorPuckProps) {
  const router = useRouter();

  // o puck só lê os dados na primeira vez, guardamos aqui para não pegar os ids de novo
  const [dadosPuck] = useState(() => paraDadosPuck(dadosIniciais));
  const salvoRef = useRef(assinaturaDados(dadosPuck));
  const salvandoRef = useRef(false);
  const [alterado, setAlterado] = useState(false);

  // avisa ao fechar a aba com alterações não salvas
  useEffect(() => {
    if (!alterado) return;

    const avisar = (evento: BeforeUnloadEvent) => evento.preventDefault();
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [alterado]);

  async function voltar() {
    if (alterado) {
      const sair = await alerta.confirmar({
        titulo: "Sair sem salvar?",
        descricao:
          "Você tem alterações não salvas. Se sair agora, elas serão perdidas.",
        textoConfirmar: "Sair sem salvar",
        textoCancelar: "Continuar editando",
        alertaPerigo: true,
      });
      if (!sair) return;
    }
    router.push("/gerenciador-paginas");
  }

  async function publicar(dados: Data) {
    if (salvandoRef.current) return;

    const { raiz, conteudo } = doDadosPuck(
      dados as unknown as Parameters<typeof doDadosPuck>[0],
    );

    const erroBasico = validarDadosBasicos({
      nomePagina: raiz.nomePagina,
      tipoPagina: raiz.tipoPagina,
    });
    if (erroBasico) {
      toast.error(erroBasico);
      return;
    }

    const erros = validarConteudo(conteudo);
    if (erros.temErros) {
      const linhas = listarErros(conteudo, erros);
      const resto = linhas.length > 3 ? ` (e mais ${linhas.length - 3})` : "";
      toast.error("Corrija antes de salvar", {
        description: linhas.slice(0, 3).join(" • ") + resto,
      });
      return;
    }

    salvandoRef.current = true;
    try {
      const resposta = await fetch(
        `${apiUrl}/paginas/${encodeURIComponent(slug)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nomePagina: raiz.nomePagina.trim(),
            tipoPagina: raiz.tipoPagina,
            conteudo: normalizarConteudo(conteudo),
            iconeMenu: raiz.iconeMenu,
            ordemMenu: raiz.ordemMenu,
            mostrarNoMenu: raiz.mostrarNoMenu,
          }),
        },
      );

      if (!resposta.ok) {
        throw new Error(
          await mensagemDeErro(resposta, "Falha ao editar a página"),
        );
      }

      salvoRef.current = assinaturaDados(
        dados as unknown as Parameters<typeof assinaturaDados>[0],
      );
      setAlterado(false);
      toast.success("Página salva com sucesso!");
      router.refresh();
    } catch (erro) {
      toast.error(
        erro instanceof Error ? erro.message : "Falha ao editar a página",
      );
    } finally {
      salvandoRef.current = false;
    }
  }

  return (
    <Puck
      config={configPuck as unknown as Config}
      data={dadosPuck as unknown as Data}
      metadata={{ slug }}
      headerTitle={`Editando: ${dadosIniciais.nomePagina}`}
      headerPath={`/${slug}`}
      dictionary={dicionarioPuck}
      viewports={[
        {
          width: 1080,
          height: "auto",
          icon: "Monitor",
          label: "Totem (1080 px)",
        },
        {
          width: 768,
          height: "auto",
          icon: "Tablet",
          label: "Tablet (768 px)",
        },
        {
          width: 360,
          height: "auto",
          icon: "Smartphone",
          label: "Celular (360 px)",
        },
      ]}
      onChange={(dados) =>
        setAlterado(
          assinaturaDados(
            dados as unknown as Parameters<typeof assinaturaDados>[0],
          ) !== salvoRef.current,
        )
      }
      onPublish={publicar}
      overrides={{
        headerActions: ({ children }) => (
          <>
            {alterado && (
              <span className="text-sm text-amber-700">
                Alterações não salvas
              </span>
            )}
            <button
              type="button"
              onClick={voltar}
              className="cursor-pointer rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100"
            >
              Voltar
            </button>
            {children}
          </>
        ),
      }}
    />
  );
}
