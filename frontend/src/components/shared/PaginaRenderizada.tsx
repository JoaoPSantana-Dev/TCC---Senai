import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { RenderizadorDinamico } from "@/app/(private)/gerenciador-paginas/components/RenderizadorDinamico";
import type { ComponentePagina } from "@/lib/paginas";
import { itensForaDoConteudo, type ItemMenu } from "@/lib/menuTotem";
import { CartaoMenu } from "@/app/(public)/homepage/components/CartaoMenu";

interface PaginaRenderizadaProps {
  slug: string;
  nomePagina: string;
  conteudo: ComponentePagina[];
  previsualizacao?: boolean;
  cartoesAutomaticos?: ItemMenu[];
}

export function PaginaRenderizada({
  slug,
  nomePagina,
  conteudo,
  previsualizacao = false,
  cartoesAutomaticos,
}: PaginaRenderizadaProps) {
  const itens = conteudo.map((componente, index) => ({
    chave: `${componente.type}-${index}`,
    componente,
  }));

  if (slug === "descanso") {
    return (
      <main
        className={`flex w-full flex-col items-center justify-center ${previsualizacao ? "py-12" : "min-h-screen"}`}
      >
        {itens.map(({ chave, componente }) => (
          <RenderizadorDinamico key={chave} componente={componente} />
        ))}
      </main>
    );
  }

  if (slug === "homepage") {
    const extras = itensForaDoConteudo(conteudo, cartoesAutomaticos ?? []);
    return (
      <EstruturaTotem>
        <Titulo texto={nomePagina}>
          <nav className="w-full max-w-6xl p-4 rounded-xl">
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
                  />
                </li>
              ))}
            </ul>
          </nav>
        </Titulo>
      </EstruturaTotem>
    );
  }

  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto={nomePagina} />
      <div className="flex flex-col justify-center max-w-6xl w-full p-6 md:p-12 mx-auto">
        <section className="flex flex-col gap-6 w-full">
          {itens.map(({ chave, componente }) => (
            <RenderizadorDinamico key={chave} componente={componente} />
          ))}
        </section>
      </div>
    </EstruturaTotem>
  );
}
