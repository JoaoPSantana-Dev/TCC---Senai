import { notFound } from "next/navigation";
import { EditarPaginaForm } from "../../components/EditarPaginaForm";
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

  return <EditarPaginaForm slug={slug} dadosIniciais={paginaData} />;
}
