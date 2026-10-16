// página setup com tipos, constantes e funções compartilhadas do gerenciador de páginas.
// as regras de slug e tipo abaixo têm uma cópia no backend em
// backend/db/src/tables/paginas/paginas.constantes.ts
// se mudar aqui, vê se muda lá também

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const tiposPagina = ["Administrador", "Totem"] as const;
export type TipoPagina = (typeof tiposPagina)[number];

export const limiteNomePagina = 100;
export const limiteSlug = 100;
export const limiteComponentes = 50;

export const regexSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// slugs que já são rotas fixas do frontend
export const slugsReservados: readonly string[] = [
  "login",
  "cadastro",
  "esqueci-senha",
  "gerenciador-paginas",
  "usuarios",
  "mapa",
  "vagas-empregos",
  "vagas-estagios",
  "vagas-cursos",
  "api",
];

export interface ComponentePagina {
  type: string;
  props: Record<string, unknown>;
}

// caso o item do (GET /paginas) não traz o conteúdo
export interface PaginaResumo {
  idPaginas: number;
  slug: string;
  nomePagina: string;
  tipoPagina: string;
  protegida: boolean;
}

// página completa (GET /paginas/:slug)
export interface PaginaCompleta {
  idPaginas: number;
  slug: string;
  nomePagina: string;
  tipoPagina: string;
  conteudo: ComponentePagina[];
}

export function criarSlug(nomePagina: string) {
  return nomePagina
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, limiteSlug)
    .replace(/-+$/g, "");
}

// valida os dados básicos da página e devolve a mensagem do primeiro erro ou null
export function validarDadosBasicos(dados: {
  nomePagina: string;
  tipoPagina: string;
  slug?: string;
}): string | null {
  const nome = dados.nomePagina.trim();

  if (!nome) return "O nome da página é obrigatório";
  if (nome.length > limiteNomePagina) {
    return `O nome da página deve ter no máximo ${limiteNomePagina} caracteres`;
  }

  if (!tiposPagina.includes(dados.tipoPagina as TipoPagina)) {
    return "Selecione o tipo da página";
  }

  if (dados.slug !== undefined) {
    if (!dados.slug) {
      return "O nome precisa ter pelo menos uma letra ou número para gerar o endereço da página";
    }
    if (!regexSlug.test(dados.slug)) {
      return "O endereço da página só pode ter letras minúsculas, números e hífens";
    }
    if (slugsReservados.includes(dados.slug)) {
      return `O endereço "/${dados.slug}" é reservado pelo sistema, escolha outro nome`;
    }
  }

  return null;
}

// pega a mensagem de erro que o backend devolveu
export async function mensagemDeErro(resposta: Response, padrao: string) {
  try {
    const dados = await resposta.json();
    const mensagem = dados?.message;

    if (Array.isArray(mensagem) && mensagem.length > 0) {
      return mensagem.map(String).join("; ");
    }
    if (typeof mensagem === "string" && mensagem) return mensagem;
  } catch {
    // resposta sem JSON usa a mensagem padrão
  }

  return padrao;
}

// busca uma página pelo slug e devolve null se não existir ou se a API estiver fora do ar
export async function buscarPaginaPorSlug(
  slug: string,
): Promise<PaginaCompleta | null> {
  try {
    const resposta = await fetch(
      `${apiUrl}/paginas/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );

    if (!resposta.ok) return null;

    const pagina = (await resposta.json()) as PaginaCompleta;
    return {
      ...pagina,
      conteudo: Array.isArray(pagina.conteudo) ? pagina.conteudo : [],
    };
  } catch {
    return null;
  }
}
