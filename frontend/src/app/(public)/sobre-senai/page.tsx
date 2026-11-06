import { buscarPaginaPorSlug } from "@/lib/paginas";
import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";
import { buscarItensMenu } from "@/lib/menuTotem";
import { ehAdministrador } from "@/lib/sessao";
import { conteudoPadraoHomepage } from "../homepage/HomepageMenu.data";

export default async function SobreSenai() {
    const administrador = await ehAdministrador();
    const [pagina, itensMenu] = await Promise.all([
        buscarPaginaPorSlug("sobre-senai"),
        buscarItensMenu(administrador),
    ]);

    return (
        <PaginaRenderizada
          slug="homepage"
          nomePagina="Sobre o SENAI"
          conteudo={pagina?.conteudo ?? conteudoPadraoHomepage}
          cartoesAutomaticos={itensMenu}
        />
      );
}