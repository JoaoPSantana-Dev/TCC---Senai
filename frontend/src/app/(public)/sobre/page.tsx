import { notFound } from "next/navigation";
import { RenderizadorDinamico } from "@/app/(private)/paginas/components/paginas/RenderizadorDinamico";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface ComponentePagina {
  type: string;
  props: Record<string, unknown>;
}

interface PaginaSobre {
  nomePagina: string;
  conteudo: ComponentePagina[];
}

async function buscarPaginaSobre(): Promise<PaginaSobre | null> {
  try {
    const resposta = await fetch(`${apiUrl}/paginas/sobre`, {
      cache: "no-store",
    });

    if (!resposta.ok) return null;
    return (await resposta.json()) as PaginaSobre;
  } catch {
    return null;
  }
}

export default async function Sobre() {
  const pagina = await buscarPaginaSobre();

  if (!pagina) notFound();

  return (
    <EstruturaTotem mostrarNoticias={false}>
      <main className="w-full flex-1">
        <Titulo texto={pagina.nomePagina} />
        <div className="mx-auto max-w-6xl w-full p-6 md:p-12 flex flex-col justify-center">
          <section className="flex flex-col gap-6 w-full">
            {pagina.conteudo.map((componente, index) => (
              <RenderizadorDinamico
                key={`${componente.type}-${index}`}
                component={componente}
              />
            ))}
          </section>
        </div>
      </main>
    </EstruturaTotem>
  );
}
