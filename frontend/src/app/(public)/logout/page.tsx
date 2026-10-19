import { buscarPaginaPorSlug } from "@/lib/paginas";
import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";
import { buscarItensMenu } from "@/lib/menuTotem";
import { logOut } from "../login/page";
import { conteudoPadraoHomepage, tituloPadraoHomepage } from "../homepage/HomepageMenu.data";

export default async function Logout() {
  // o menu vem do gerenciador de páginas, se não der, usa o conteúdo de reserva
  const [pagina, itensMenu] = await Promise.all([
    buscarPaginaPorSlug("logout"),
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