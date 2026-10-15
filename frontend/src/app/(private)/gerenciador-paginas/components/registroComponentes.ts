import type { ComponentType } from "react";
import { LinhaSobre } from "@/components/shared/LinhaSobre";
import { TelaDescanso } from "@/app/(public)/descanso/components/TelaDescanso";
import {
  CartaoMenu,
  iconesMenu,
} from "@/app/(public)/homepage/components/CartaoMenu";
import { type ComponentePagina, limiteComponentes } from "@/lib/paginas";

// registro dos componentes que podem ser usados nas páginas
// para colocar um componente novo no gerenciador:
// - adicione ele aqui (rótulo, componente e campos que podem ser editados)
// - adicione o mesmo componente em backend/db/src/tables/paginas/paginas.constantes.ts (schemaComponentes)

export type TipoCampo = "texto" | "textarea" | "booleano" | "select";

export interface OpcaoCampo {
  valor: string;
  rotulo: string;
}

export interface CampoComponente {
  nome: string;
  rotulo: string;
  tipo: TipoCampo;
  padrao: string | boolean;
  obrigatorio?: boolean;
  maximo?: number;
  opcoes?: OpcaoCampo[];
  ajuda?: string;
  formato?: "caminho";
}

export interface DefinicaoComponente {
  rotulo: string;
  componente: ComponentType<any>;
  campos: CampoComponente[];
}

// imagens que existem na pasta /public e podem ser usadas nas páginas
const imagens: OpcaoCampo[] = [
  { valor: "senai-logo.png", rotulo: "senai-logo.png" },
  { valor: "senai-mariano-ferraz.png", rotulo: "senai-mariano-ferraz.png" },
  { valor: "tubarao.png", rotulo: "tubarao.png" },
];

const opcoesIcones: OpcaoCampo[] = Object.entries(iconesMenu).map(
  ([valor, { rotulo }]) => ({ valor, rotulo }),
);

export const registroComponentes: Record<string, DefinicaoComponente> = {
  LinhaSobre: {
    rotulo: "Linha com texto e imagem",
    componente: LinhaSobre,
    campos: [
      {
        nome: "texto",
        rotulo: "Texto",
        tipo: "textarea",
        obrigatorio: true,
        maximo: 1000,
        padrao: "",
      },
      {
        nome: "nomeImagem",
        rotulo: "Imagem",
        tipo: "select",
        obrigatorio: true,
        opcoes: imagens,
        padrao: imagens[0].valor,
      },
      {
        nome: "alt",
        rotulo: "Descrição da imagem",
        tipo: "texto",
        maximo: 200,
        padrao: "",
      },
      {
        nome: "primeiroEstilo",
        rotulo: "Texto à esquerda e imagem à direita (desmarque para inverter)",
        tipo: "booleano",
        padrao: true,
      },
    ],
  },

  TelaDescanso: {
    rotulo: "Tela de descanso",
    componente: TelaDescanso,
    campos: [
      {
        nome: "titulo",
        rotulo: "Título",
        tipo: "texto",
        obrigatorio: true,
        maximo: 150,
        padrao: "",
      },
      {
        nome: "nomeImagem",
        rotulo: "Imagem",
        tipo: "select",
        obrigatorio: true,
        opcoes: imagens,
        padrao: imagens[0].valor,
      },
      {
        nome: "alt",
        rotulo: "Descrição da imagem (acessibilidade)",
        tipo: "texto",
        maximo: 200,
        padrao: "",
      },
      {
        nome: "textoBotao",
        rotulo: "Texto do botão",
        tipo: "texto",
        obrigatorio: true,
        maximo: 60,
        padrao: "Clique para começar",
      },
      {
        nome: "destino",
        rotulo: "Para onde o botão leva",
        tipo: "texto",
        obrigatorio: true,
        maximo: 200,
        formato: "caminho",
        ajuda: "Caminho interno da página. Exemplo: /homepage",
        padrao: "/homepage",
      },
    ],
  },

  CartaoMenu: {
    rotulo: "Cartão do menu",
    componente: CartaoMenu,
    campos: [
      {
        nome: "titulo",
        rotulo: "Título",
        tipo: "texto",
        obrigatorio: true,
        maximo: 80,
        padrao: "",
      },
      {
        nome: "href",
        rotulo: "Link do cartão",
        tipo: "texto",
        obrigatorio: true,
        maximo: 200,
        formato: "caminho",
        ajuda: "Caminho interno da página, ex.: /sobre",
        padrao: "/",
      },
      {
        nome: "icone",
        rotulo: "Ícone",
        tipo: "select",
        obrigatorio: true,
        opcoes: opcoesIcones,
        padrao: opcoesIcones[0].valor,
      },
    ],
  },
};

// Criação e validação de componentes, usadas pelo formulário de edição
export function criarComponentePadrao(tipo: string): ComponentePagina {
  const definicao = registroComponentes[tipo];
  const props: Record<string, unknown> = {};

  for (const campo of definicao?.campos ?? []) {
    props[campo.nome] = campo.padrao;
  }

  return { type: tipo, props };
}

const regexCaminho = /^\/[A-Za-z0-9\-_/]*$/;

export function validarCampo(
  campo: CampoComponente,
  valor: unknown,
): string | null {
  if (campo.tipo === "booleano") {
    return typeof valor === "boolean" ? null : "Valor inválido";
  }

  const texto = typeof valor === "string" ? valor.trim() : "";

  if (!texto) return campo.obrigatorio ? "Campo obrigatório" : null;

  if (campo.maximo && texto.length > campo.maximo) {
    return `Máximo de ${campo.maximo} caracteres`;
  }

  if (
    campo.tipo === "select" &&
    !campo.opcoes?.some((opcao) => opcao.valor === texto)
  ) {
    return "Selecione uma opção válida";
  }

  if (campo.formato === "caminho" && !regexCaminho?.test(texto)) {
    return 'Use um caminho interno que comece com "/". Exemplo: /homepage';
  }

  return null;
}

export type ErrosCampos = Record<string, string>;

export interface ErrosConteudo {
  geral: string[];
  // índice do componente = erros por campo. A chave "_tipo" é para tipo desconhecido
  porComponente: Record<number, ErrosCampos>;
  temErros: boolean;
}

export function validarConteudo(conteudo: ComponentePagina[]): ErrosConteudo {
  const geral: string[] = [];
  const porComponente: Record<number, ErrosCampos> = {};

  if (conteudo.length > limiteComponentes) {
    geral.push(`A página pode ter no máximo ${limiteComponentes} componentes`);
  }

  conteudo.forEach((componente, indice) => {
    const definicao = registroComponentes[componente.type];

    if (!definicao) {
      porComponente[indice] = {
        _tipo: `Componente "${componente.type}" não existe mais. Remova para conseguir salvar`,
      };
      return;
    }

    const erros: ErrosCampos = {};
    for (const campo of definicao.campos) {
      const erro = validarCampo(campo, componente.props[campo.nome]);
      if (erro) erros[campo.nome] = erro;
    }

    if (Object.keys(erros).length > 0) porComponente[indice] = erros;
  });

  return {
    geral,
    porComponente,
    temErros: geral.length > 0 || Object.keys(porComponente).length > 0,
  };
}

// tira espaços das pontas dos textos antes de enviar pro backend
export function normalizarConteudo(
  conteudo: ComponentePagina[],
): ComponentePagina[] {
  return conteudo.map((componente) => ({
    type: componente.type,
    props: Object.fromEntries(
      Object.entries(componente.props).map(([nome, valor]) => [
        nome,
        typeof valor === "string" ? valor.trim() : valor,
      ]),
    ),
  }));
}
