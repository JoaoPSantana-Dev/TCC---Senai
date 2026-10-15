import { notFound } from "next/navigation";
import { RenderizadorDinamico } from "@/app/(private)/gerenciador-paginas/components/RenderizadorDinamico";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { buscarPaginaPorSlug } from "@/lib/paginas";

interface PaginaDinamicaProps {
  params: Promise<{ slug: string }>;
}

// mostra no totem qualquer página criada no gerenciador
export default async function PaginaDinamica({ params }: PaginaDinamicaProps) {
  const { slug } = await params;
  const pagina = await buscarPaginaPorSlug(slug);

  // páginas do tipo "Administrador" não aparecem no totem
  if (!pagina || pagina.tipoPagina !== "Totem") notFound();

  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto={pagina.nomePagina} />
      <div className="flex flex-col justify-center max-w-6xl w-full p-6 md:p-12 mx-auto">
        <section className="flex flex-col gap-6 w-full">
          {pagina.conteudo.map((componente, index) => (
            <RenderizadorDinamico
              key={`${componente.type}-${index}`}
              componente={componente}
            />
          ))}
        </section>
      </div>
    </EstruturaTotem>
  );
}
