import {
  apiUrl,
  type ComponentePagina,
  type IconeMenu,
  type PaginaResumo,
} from "./paginas";

export interface ItemMenu {
  titulo: string;
  href: string;
  icone: string; // chave de iconesMenu em CartaoMenu.tsx
  iconeEscolhido?: IconeMenu | null; // chave de ícones do banco
  ordem?: number;
}

// páginas que o totem usa por trás e que não são destino de navegação
const slugsForaDoMenu = ["homepage", "descanso"];

// rotas fixas do frontend que não existem no banco, então não aparecem sozinhas
export const rotasFixasTotem: ItemMenu[] = [
  { titulo: "Mapa da escola", href: "/mapa", icone: "mapa" },
  { titulo: "Vagas de emprego", href: "/vagas-empregos", icone: "emprego" },
  { titulo: "Vagas de estágio", href: "/vagas-estagios", icone: "estagio" },
  { titulo: "Cursos", href: "/vagas-cursos", icone: "curso" },
];

export const rotasPrivadas: ItemMenu[] = [
  {
    titulo: "Gerenciador de páginas",
    href: "/gerenciador-paginas",
    icone: "info",
  },
  { titulo: "Usuários", href: "/usuarios", icone: "info" },
];

function itensReserva(administrador: boolean) {
  return administrador
    ? [...rotasFixasTotem, ...rotasPrivadas]
    : rotasFixasTotem;
}

// ícone das páginas que já existem, as novas usam "info"
// para escolher o ícone no editor, o banco precisa guardar esse campo
const iconePorSlug: Record<string, string> = {
  sobre: "info",
  "sobre-senai-mariano-ferraz": "predio",
  "horario-aulas": "relogio",
  biblioteca: "biblioteca",
};

export function montarItensMenu(
  paginas: PaginaResumo[],
  administrador = false,
): ItemMenu[] {
  const dasPaginas: ItemMenu[] = paginas
    .filter(
      (pagina) =>
        !slugsForaDoMenu.includes(pagina.slug) &&
        pagina.mostrarNoMenu !== false,
    )
    .filter(
      (pagina) =>
        pagina.tipoPagina === "Totem" ||
        (administrador && pagina.tipoPagina === "Administrador"),
    )
    .map((pagina) => ({
      titulo: pagina.nomePagina,
      href: `/${pagina.slug}`,
      icone: iconePorSlug[pagina.slug] ?? "info",
      iconeEscolhido: pagina.iconeMenu,
      ordem: pagina.ordemMenu ?? 0,
    }));

  const fixas = [...rotasFixasTotem, ...(administrador ? rotasPrivadas : [])];

  return [...fixas, ...dasPaginas].sort(
    (a, b) =>
      (a.ordem ?? 0) - (b.ordem ?? 0) ||
      a.titulo.localeCompare(b.titulo, "pt-BR"),
  );
}

// funciona no servidor e no navegador
// se a API estiver fora do ar, sobram só as rotas fixas
// as páginas do banco também não abririam sem a API
export async function buscarItensMenu(
  administrador = false,
): Promise<ItemMenu[]> {
  try {
    const resposta = await fetch(`${apiUrl}/paginas`, { cache: "no-store" });
    if (!resposta.ok) return itensReserva(administrador);

    const dados = await resposta.json();
    return montarItensMenu(Array.isArray(dados) ? dados : [], administrador);
  } catch {
    return itensReserva(administrador);
  }
}

export async function buscarItensMenuNoNavegador(): Promise<ItemMenu[]> {
  try {
    const resposta = await fetch("/api/menu", { cache: "no-store" });
    if (!resposta.ok) return rotasFixasTotem;
    return await resposta.json();
  } catch {
    return rotasFixasTotem;
  }
}

// itens que a homepage ainda não tem como CartaoMenu no conteúdo salvo
export function itensForaDoConteudo(
  conteudo: ComponentePagina[],
  itens: ItemMenu[],
): ItemMenu[] {
  const jaNaHomepage = new Set(
    conteudo
      .filter((componente) => componente.type === "CartaoMenu")
      .map((componente) => componente.props.href),
  );

  return itens.filter((item) => !jaNaHomepage.has(item.href));
}
