import { notFound } from "next/navigation";
import { EditorPuck } from "../../components/EditorPuck";
import { buscarPaginaPorSlug } from "@/lib/paginas";

interface EditarPaginaProps {
  params: Promise<{ slug: string }>;
}

export default async function EditarPagina({ params }: EditarPaginaProps) {
  const { slug } = await params;
  const paginaData = await buscarPaginaPorSlug(slug);

  if (!paginaData) {
    notFound();
  }

  return <EditorPuck slug={slug} dadosIniciais={paginaData} />;
}
