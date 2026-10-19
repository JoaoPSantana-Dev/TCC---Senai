import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { RenderizadorDinamico } from "@/app/(private)/gerenciador-paginas/components/RenderizadorDinamico";
import {
  conteudoPadraoHomepage,
  tituloPadraoHomepage,
} from "@/app/(public)/homepage/HomepageMenu.data";
import { buscarPaginaPorSlug } from "@/lib/paginas";

export default async function Homepage() {
  // o menu vem do gerenciador de páginas, se não der, usa o conteúdo de reserva
  const pagina = await buscarPaginaPorSlug("homepage");

  const titulo = pagina?.nomePagina ?? tituloPadraoHomepage;
  const conteudo = pagina?.conteudo ?? conteudoPadraoHomepage;

  return (
    <EstruturaTotem>
      <Titulo texto={titulo}>
        <nav className="w-full max-w-6xl p-4 rounded-xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {conteudo.map((componente, index) => (
              <li key={`${componente.type}-${index}`}>
                <RenderizadorDinamico componente={componente} />
              </li>
            ))}
          </ul>
        </nav>
      </Titulo>
    </EstruturaTotem>
  );
}
