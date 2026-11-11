// dados de um ícone do hugeicons, lista de [tag, atributos], o formato do @hugeicons/core-free-icons
// esse arquivo não usa react, então o editor, a página pública e os testes compartilham as mesmas regras
// o backend tem a versão equivalente em paginas/icone.validacao.ts

export type AtributosIcone = Readonly<Record<string, string | number>>;
export type DadosIcone = readonly (readonly [string, AtributosIcone])[];

export interface IconeEscolhido {
  nome: string;
  dados: DadosIcone;
}

export const tagsIconePermitidas = [
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "ellipse",
] as const;

export const atributosIconePermitidos = [
  "d",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "x",
  "y",
  "x1",
  "y1",
  "x2",
  "y2",
  "width",
  "height",
  "points",
  "fill",
  "stroke",
  "strokeWidth",
  "strokeLinecap",
  "strokeLinejoin",
  "fillRule",
  "clipRule",
  "opacity",
] as const;

const tags: readonly string[] = tagsIconePermitidas;
const atributos: readonly string[] = atributosIconePermitidos;

// deixa tags e atributos da lista
// some "key" e qualquer coisa estranha
export function elementosDoIcone(dados: unknown) {
  const saida: { tag: string; atributos: Record<string, string | number> }[] =
    [];
  if (!Array.isArray(dados)) return saida;

  for (const item of dados) {
    if (!Array.isArray(item) || item.length !== 2) continue;
    const [tag, attrs] = item as [unknown, unknown];
    if (typeof tag !== "string" || !tags.includes(tag)) continue;
    if (typeof attrs !== "object" || attrs === null || Array.isArray(attrs))
      continue;

    const limpos: Record<string, string | number> = {};
    for (const [chave, valor] of Object.entries(attrs)) {
      if (!atributos.includes(chave)) continue;
      if (typeof valor !== "string" && typeof valor !== "number") continue;
      limpos[chave] = valor;
    }
    saida.push({ tag, atributos: limpos });
  }
  return saida;
}

export function ehIconeEscolhido(valor: unknown): valor is IconeEscolhido {
  if (typeof valor !== "object" || valor === null) return false;
  const { nome, dados } = valor as { nome?: unknown; dados?: unknown };
  return (
    typeof nome === "string" &&
    nome.length > 0 &&
    elementosDoIcone(dados).length > 0
  );
}

// dados já limpos, no formato que o backend aceita
export function limparIcone(nome: string, dados: unknown): IconeEscolhido {
  return {
    nome,
    dados: elementosDoIcone(dados).map(
      ({ tag, atributos }) => [tag, atributos] as const,
    ),
  };
}

// mesma regra do backend, devolve a mensagem de erro, ou null se estiver tudo certo
export function validarIconeCampo(valor: unknown): string | null {
  if (valor === undefined || valor === null) return null;
  const invalido = "Ícone inválido";
  if (typeof valor !== "object" || Array.isArray(valor)) return invalido;

  const { nome, dados } = valor as { nome?: unknown; dados?: unknown };
  if (typeof nome !== "string" || !/^[A-Za-z0-9]{1,100}$/.test(nome))
    return invalido;
  if (!Array.isArray(dados) || dados.length === 0 || dados.length > 30)
    return invalido;

  for (const item of dados) {
    if (!Array.isArray(item) || item.length !== 2) return invalido;
    const [tag, attrs] = item as [unknown, unknown];
    if (typeof tag !== "string" || !tags.includes(tag)) return invalido;
    if (typeof attrs !== "object" || attrs === null || Array.isArray(attrs))
      return invalido;

    for (const [chave, valorAtributo] of Object.entries(attrs)) {
      if (chave === "key") continue;
      const tipoOk =
        typeof valorAtributo === "string" || typeof valorAtributo === "number";
      if (
        !atributos.includes(chave) ||
        !tipoOk ||
        String(valorAtributo).length > 2000
      ) {
        return invalido;
      }
    }
  }
  return null;
}

// "Building03Icon" vira "Building 03"
export function rotuloDoIcone(nome: string): string {
  return nome
    .replace(/Icon$/, "")
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Z])/g, "$1 $2");
}
