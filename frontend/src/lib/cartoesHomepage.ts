import type { ItemMenu } from "./menuTotem";
import type { ComponentePagina } from "./paginas";
import { ehIconeEscolhido } from "./iconeSvg";

// cartões da homepage
// no editor, as páginas que ainda não têm cartão viram cartões de verdade na lista
// arrastáveis, editáveis e que podem ser apagados, em vez de ficarem num bloco fora

const limiteTitulo = 80; // mesmo limite do campo "título" do CartaoMenu
const limiteComponentes = 50;

export function itemParaCartao(item: ItemMenu): ComponentePagina {
  const props: Record<string, unknown> = {
    titulo: item.titulo.slice(0, limiteTitulo),
    href: item.href,
    icone: item.icone,
    somenteAdministrador: item.somenteAdministrador === true,
  };
  if (ehIconeEscolhido(item.iconeEscolhido))
    props.iconeEscolhido = item.iconeEscolhido;

  return { type: "CartaoMenu", props };
}

// cartões que faltam, itens do menu cujo link ainda não aparece em nenhum CartaoMenu da página
// respeita o limite de componentes da página
export function cartoesFaltantes(
  conteudo: ComponentePagina[],
  itens: ItemMenu[],
  limite = limiteComponentes,
): ComponentePagina[] {
  const jaTem = new Set(
    conteudo
      .filter((c) => c.type === "CartaoMenu")
      .map((c) => String(c.props.href)),
  );

  const faltantes: ComponentePagina[] = [];
  for (const item of itens) {
    if (jaTem.has(item.href)) continue;
    jaTem.add(item.href);
    faltantes.push(itemParaCartao(item));
  }

  return faltantes.slice(0, Math.max(0, limite - conteudo.length));
}

// cartões marcados como "só para administradores" não aparecem para os outros
export function filtrarVisiveis(
  conteudo: ComponentePagina[],
  administrador = false,
) {
  return conteudo.filter(
    (componente) =>
      administrador || componente.props.somenteAdministrador !== true,
  );
}
