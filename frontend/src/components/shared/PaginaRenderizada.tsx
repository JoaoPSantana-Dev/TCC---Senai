import { RenderizadorDinamico } from "@/app/(private)/gerenciador-paginas/components/RenderizadorDinamico";
import type { ComponentePagina } from "@/lib/paginas";
import { itensForaDoConteudo, type ItemMenu } from "@/lib/menuTotem";
import { CartaoMenu } from "@/app/(public)/homepage/components/CartaoMenu";
import { LayoutPagina } from "./LayoutPagina";

interface PaginaRenderizadaProps {
  slug: string;
  nomePagina: string;
  conteudo: ComponentePagina[];
  cartoesAutomaticos?: ItemMenu[]; // só a homepage usa
}

// página pública do totem, a moldura vem do LayoutPagina que é a mesma do editor
export function PaginaRenderizada({
  slug,
  nomePagina,
  conteudo,
  cartoesAutomaticos,
}: PaginaRenderizadaProps) {
  const itens = conteudo.map((componente, index) => ({
    chave: `${componente.type}-${index}`,
    componente,
  }));

  if (slug === "homepage") {
    const extras = itensForaDoConteudo(conteudo, cartoesAutomaticos ?? []);

    return (
      <LayoutPagina slug={slug} nomePagina={nomePagina}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* primeiro os cartões gerados a partir das páginas cadastradas */}

          {extras.map((item) => (
            <li key={item.href}>
              <CartaoMenu
                titulo={item.titulo}
                href={item.href}
                icone={item.icone}
              />
            </li>
          ))}

          {/* depois os componentes do editor, na ordem da lista */}
          {itens.map(({ chave, componente }) => (
            <li key={chave}>
              <RenderizadorDinamico componente={componente} />
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
