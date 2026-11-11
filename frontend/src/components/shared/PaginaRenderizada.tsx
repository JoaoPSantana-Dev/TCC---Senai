import { RenderizadorDinamico } from "@/app/(private)/gerenciador-paginas/components/RenderizadorDinamico";
import type { ComponentePagina } from "@/lib/paginas";
import { itensForaDoConteudo, type ItemMenu } from "@/lib/menuTotem";
import { CartaoMenu } from "@/app/(public)/homepage/components/CartaoMenu";
import { LayoutPagina } from "./LayoutPagina";
import { filtrarVisiveis } from "@/lib/cartoesHomepage";

interface PaginaRenderizadaProps {
  slug: string;
  nomePagina: string;
  conteudo: ComponentePagina[];
  cartoesAutomaticos?: ItemMenu[]; // só a homepage usa
  administrador?: boolean; // mostra os cartões marcados como só para administrador
}

// página pública do totem, a moldura vem do LayoutPagina que é a mesma do editor
export function PaginaRenderizada({
  slug,
  nomePagina,
  conteudo,
  cartoesAutomaticos,
  administrador = false,
}: PaginaRenderizadaProps) {
  const itens = filtrarVisiveis(conteudo, administrador).map(
    (componente, index) => ({
      chave: `${componente.type}-${index}`,
      componente,
    }),
  );

  if (slug === "homepage") {
    const extras = itensForaDoConteudo(conteudo, cartoesAutomaticos ?? []);

    return (
      <LayoutPagina slug={slug} nomePagina={nomePagina}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {itens.map(({ chave, componente }) => (
            <li key={chave}>
              <RenderizadorDinamico componente={componente} />
            </li>
          ))}

          {extras.map((item) => (
            <li key={item.href}>
              <CartaoMenu
                titulo={item.titulo}
                href={item.href}
                icone={item.icone}
                iconeEscolhido={item.iconeEscolhido}
              />
            </li>
          ))}
        </ul>
      </LayoutPagina>
    );
  }

  return (
    <LayoutPagina slug={slug} nomePagina={nomePagina}>
      {itens.map(({ chave, componente }) => (
        <RenderizadorDinamico key={chave} componente={componente} />
      ))}
    </LayoutPagina>
  );
}
