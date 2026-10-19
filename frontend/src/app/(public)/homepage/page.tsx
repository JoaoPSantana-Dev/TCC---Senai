import {
  conteudoPadraoHomepage,
  tituloPadraoHomepage,
} from "@/app/(public)/homepage/HomepageMenu.data";
import { buscarPaginaPorSlug } from "@/lib/paginas";
import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";
import { buscarItensMenu } from "@/lib/menuTotem";

export default async function Homepage() {
  // o menu vem do gerenciador de páginas, se não der, usa o conteúdo de reserva
  const [pagina, itensMenu] = await Promise.all([
    buscarPaginaPorSlug("homepage"),
    buscarItensMenu(),
  ]);

  return (
    <PaginaRenderizada
      slug="homepage"
      nomePagina={pagina?.nomePagina ?? tituloPadraoHomepage}
      conteudo={pagina?.conteudo ?? conteudoPadraoHomepage}
      cartoesAutomaticos={itensMenu}
    />
  );
}
