import { notFound } from "next/navigation";
import { buscarPaginaPorSlug } from "@/lib/paginas";
import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";
import { ehAdministrador } from "@/lib/sessao";

interface PaginaDinamicaProps {
  params: Promise<{ slug: string }>;
}

// mostra no totem qualquer página criada no gerenciador
export default async function PaginaDinamica({ params }: PaginaDinamicaProps) {
  const { slug } = await params;
  const pagina = await buscarPaginaPorSlug(slug);

  // páginas do tipo "Administrador" não aparecem para o usuário totem
  if (!pagina) notFound();
  if (pagina.tipoPagina !== "Totem" && !(await ehAdministrador())) notFound();

  return (
    <PaginaRenderizada
      slug={slug}
      nomePagina={pagina.nomePagina}
      conteudo={pagina.conteudo}
    />
  );
}
