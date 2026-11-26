import type { ReactNode } from "react";
import { FieldLabel, type Field } from "@puckeditor/core";
import { LayoutPagina } from "@/components/shared/LayoutPagina";
import { ehIconeEscolhido } from "@/lib/iconeSvg";
import { tiposPagina } from "@/lib/paginas";
import { PainelNoticiasNoEditor } from "./PainelNoticiasNoEditor";
import { PainelVagasNoEditor } from "./PainelVagasNoEditor";
import { SeletorIcone } from "./SeletorIcone";
import {
  registroComponentes,
  type CampoComponente,
} from "./registroComponentes";

// configuração do puck gerada a partir do registroComponentes
// para ter um componente novo no editor, registre em registroComponentes.ts
// ele aparece na lista da esquerda pronto para arrastar

const opcoesSimNao = [
  { label: "Sim", value: true },
  { label: "Não", value: false },
];

// ---------- componentes ----------

function campoParaPuck(campo: CampoComponente): Field {
  const label = campo.ajuda ? `${campo.rotulo} (${campo.ajuda})` : campo.rotulo;

  switch (campo.tipo) {
    case "textarea":
      return { type: "textarea", label };
    case "booleano":
      return { type: "radio", label, options: opcoesSimNao };
    case "select":
      return {
        type: "select",
        label,
        options: (campo.opcoes ?? []).map((opcao) => ({
          label: opcao.rotulo,
          value: opcao.valor,
        })),
      };
    case "icone":
      return {
        type: "custom",
        render: ({
          value,
          onChange,
        }: {
          value: unknown;
          onChange: (valor: unknown) => void;
        }) => (
          <FieldLabel label={label}>
            <SeletorIcone
              valor={ehIconeEscolhido(value) ? value : null}
              onChange={(icone) => onChange(icone)}
            />
          </FieldLabel>
        ),
      };
    default:
      return { type: "text", label };
  }
}

// o puck manda "id" e "puck" junto com as props, os componentes do totem não conhecem isso
function semPropsInternas(props: Record<string, unknown>) {
  const resto = { ...props };
  delete resto.id;
  delete resto.puck;
  delete resto.__vagas;
  delete resto.__noticias;
  return resto;
}

const componentes = Object.fromEntries(
  Object.entries(registroComponentes).map(([tipo, definicao]) => {
    const Componente = definicao.componente;

    return [
      tipo,
      {
        label: definicao.rotulo,
        fields: {
          ...Object.fromEntries(
            definicao.campos.map((campo) => [campo.nome, campoParaPuck(campo)]),
          ),
          // painel para adicionar, editar e excluir as vagas do banco
          // "__vagas" não guarda valor nenhum: é só o lugar onde o painel aparece
          ...(definicao.painelDeVagas
            ? {
                __vagas: {
                  type: "custom",
                  render: () => (
                    <FieldLabel label="Vagas cadastradas">
                      <PainelVagasNoEditor tipo={definicao.painelDeVagas!} />
                    </FieldLabel>
                  ),
                } as Field,
              }
            : {}),
          // painel das notícias, também só um lugar na barra da direita
          // não guarda valor
          ...(definicao.painelDeNoticias
            ? {
                __noticias: {
                  type: "custom",
                  render: () => (
                    <FieldLabel label="Notícias cadastradas">
                      <PainelNoticiasNoEditor />
                    </FieldLabel>
                  ),
                } as Field,
              }
            : {}),
        },
        defaultProps: Object.fromEntries(
          definicao.campos
            .filter((campo) => campo.padrao !== null)
            .map((campo) => [campo.nome, campo.padrao]),
        ),
        render: (props: Record<string, unknown>) => (
          <Componente {...semPropsInternas(props)} />
        ),
      },
    ];
  }),
);

// ---------- raiz, a página em volta dos componentes ----------

interface RaizProps {
  children: ReactNode;
  nomePagina?: string;
  puck?: { metadata?: Record<string, unknown> };
}

// o canvas do puck é um iframe com a largura do tamanho escolhido (1080 ou 768)
// w-screen é 100vw do iframe, então a página sempre acompanha o tamanho escolhido
// o que passa do espaço da barra de rolagem é cortado pelo overflow-x: clip do html (globals.css)
function LarguraTotal({ children }: { children: ReactNode }) {
  return <div className="w-screen max-w-none">{children}</div>;
}

function RaizDaPagina({ children, nomePagina, puck }: RaizProps) {
  const slug = String(puck?.metadata?.slug ?? "");
  const titulo = nomePagina?.trim() || "Sem nome";

  // "children" é a área onde os componentes são soltos e o Puck renderiza um <div> ali
  // as classes [&>div] repetem no canvas o grid/coluna que a página pública usa na homepage

  if (slug === "homepage") {
    return (
      <LarguraTotal>
        <LayoutPagina slug={slug} nomePagina={titulo} ocultarMenu>
          <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:justify-center [&>div]:gap-6">
            {children}
          </div>
        </LayoutPagina>
      </LarguraTotal>
    );
  }

  if (slug === "descanso") {
    return (
      <LarguraTotal>
        <LayoutPagina slug={slug} nomePagina={titulo} ocultarMenu>
          <div className="flex w-full flex-1 flex-col items-center justify-center [&>div]:flex [&>div]:w-full [&>div]:flex-col [&>div]:items-center [&>div]:justify-center">
            {children}
          </div>
        </LayoutPagina>
      </LarguraTotal>
    );
  }

  return (
    <LarguraTotal>
      <LayoutPagina slug={slug} nomePagina={titulo} ocultarMenu>
        <div className="w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-6">
          {children}
        </div>
      </LayoutPagina>
    </LarguraTotal>
  );
}

// ---------- configuração final ----------

// campos que aparecem no painel da direita quando nenhum componente está selecionado
// na homepage as notícias do destaque do topo não são um bloco, então o painel delas
// fica aqui
// clique em uma área vazia da página (ou em "Página") para abrir
export function criarConfigPuck(slug: string) {
  return {
    components: componentes,
    root: {
      fields: {
        nomePagina: { type: "text", label: "Nome da página" },
        tipoPagina: {
          type: "select",
          label: "Tipo da página",
          options: tiposPagina.map((tipo) => ({ label: tipo, value: tipo })),
        },
        ...(slug === "homepage"
          ? {
              __noticias: {
                type: "custom",
                render: () => (
                  <FieldLabel label="Notícias do destaque">
                    <PainelNoticiasNoEditor />
                  </FieldLabel>
                ),
              } as Field,
            }
          : {}),
      },
      render: RaizDaPagina,
    },
  };
}

// textos da interface do puck em português
export const dicionarioPuck = {
  "header-publish": "Salvar alterações",
  "header-undo": "Desfazer",
  "header-redo": "Refazer",
  "header-toggle-leftsidebar": "Mostrar/ocultar painel da esquerda",
  "header-toggle-rightsidebar": "Mostrar/ocultar painel da direita",
  "header-toggle-menubar": "Mostrar/ocultar barra de menu",
  "action-selectparent": "Selecionar o item pai",
  "action-duplicate": "Duplicar",
  "action-delete": "Excluir",
  "label-page": "Página",
  "label-component": "Componente",
  "outline-empty": "Nenhum item",
  "outline-header-title": "Estrutura",
  "outline-header-collapseall": "Recolher tudo",
  "outline-item-collapse": "Recolher",
  "outline-item-expand": "Expandir",
  "outline-item-duplicate": "Duplicar",
  "outline-item-delete": "Excluir",
  "drawer-category-collapse": "Recolher {title}",
  "drawer-category-expand": "Expandir {title}",
  "drawer-category-other": "Componentes",
  "canvas-noconfig": "Sem configuração para {type}",
  "field-readonly": "Somente leitura",
  "viewport-zoom-in": "Aumentar zoom",
  "viewport-zoom-out": "Diminuir zoom",
  "viewport-zoom-auto": "{zoom}% (automático)",
  "viewport-toggle-menu": "Abrir menu de tamanhos",
  "viewport-switch": "Ver no tamanho {label}",
  "viewport-switch-default": "Trocar tamanho",
  "plugin-blocks": "Componentes",
  "plugin-outline": "Estrutura",
  "plugin-fields": "Campos",
  "plugin-components": "Componentes",
  "layout-maximize": "maximizar",
  "layout-minimize": "minimizar",
  "loader-loading": "carregando",
};
