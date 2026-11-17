import type { ComponentePagina } from "./paginas";

// conversão entre o formato que o backend guarda de ComponentePagina[] + campos da página
// e o formato de dados do puck { root: { props }, content: [{ type, props: {id, ... } }] }

export interface RaizPagina {
  nomePagina: string;
  tipoPagina: string;
}

export interface DadosPuck {
  root: { props: Record<string, unknown> };
  content: { type: string; props: { id: string } & Record<string, unknown> }[];
}

interface PaginaParaEditor {
  nomePagina: string;
  tipoPagina: string;
  conteudo: ComponentePagina[];
}

function novoId(tipo: string) {
  return `${tipo}-${globalThis.crypto.randomUUID()}`;
}

// lê as propriedades da raiz com valores seguros, venha o dado do jeito que vier
export function lerRaiz(
  propriedades: Record<string, unknown> | undefined,
): RaizPagina {
  const p = propriedades ?? {};
  return {
    nomePagina: typeof p.nomePagina === "string" ? p.nomePagina : "",
    tipoPagina: typeof p.tipoPagina === "string" ? p.tipoPagina : "",
  };
}

export function paraDadosPuck(pagina: PaginaParaEditor): DadosPuck {
  const raiz = lerRaiz({
    nomePagina: pagina.nomePagina,
    tipoPagina: pagina.tipoPagina,
  });

  return {
    root: { props: { ...raiz } },
    content: pagina.conteudo.map((componente) => ({
      type: componente.type,
      props: { ...componente.props, id: novoId(componente.type) },
    })),
  };
}

interface DadosDoPuck {
  root?: { props?: Record<string, unknown> & Record<string, unknown> };
  content?: { type: string; props: Record<string, unknown> }[];
}

export function doDadosPuck(dados: DadosDoPuck): {
  raiz: RaizPagina;
  conteudo: ComponentePagina[];
} {
  const propriedadesRaiz =
    dados.root?.props ?? (dados.root as Record<string, unknown> | undefined);

  return {
    raiz: lerRaiz(propriedadesRaiz),
    conteudo: (dados.content ?? []).map(({ type, props }) => {
      const resto = { ...props };
      delete resto.id; // o id é só do puck, o backend não tem esse id
      return { type, props: resto };
    }),
  };
}

// texto que muda quando algo editável muda, ignora os ids e é usado para saber se há alterações não salvas
export function assinaturaDados(dados: DadosDoPuck): string {
  return JSON.stringify(doDadosPuck(dados));
}
