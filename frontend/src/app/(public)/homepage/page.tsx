import {
  conteudoPadraoHomepage,
  tituloPadraoHomepage,
} from "@/app/(public)/homepage/HomepageMenu.data";
import { buscarPaginaPorSlug } from "@/lib/paginas";
import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";

export default async function Homepage() {
  // o menu vem do gerenciador de páginas, se não der, usa o conteúdo de reserva
  const pagina = await buscarPaginaPorSlug("homepage");

  const titulo = pagina?.nomePagina ?? tituloPadraoHomepage;
  const conteudo = pagina?.conteudo ?? conteudoPadraoHomepage;

  return (
    <PaginaRenderizada
      slug="homepage"
      nomePagina={titulo}
      conteudo={conteudo}
    />
  );
}
