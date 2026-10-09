import { notFound } from "next/navigation";
import { toast } from "sonner";
import { EditarPaginaForm } from "../../components/EditarPaginaForm";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface EditarPaginaProps {
  params: Promise<{ slug: string }>;
}

interface PaginaData {
  nomePagina: string;
  tipoPagina: string;
  conteudo: {
    type: string;
    props: Record<string, any>;
  }[];
}

async function buscarDadosDaPagina(slug: string): Promise<PaginaData | null> {
  try {
    const resposta = await fetch(`${apiUrl}/paginas/${slug}`, {
      next: { revalidate: 0 },
    });

    if (!resposta.ok) return null;
    return await resposta.json();
  } catch {
    toast.error("Erro ao carregar os dados da página");
    return null;
  }
}

export default async function EditarPagina({ params }: EditarPaginaProps) {
  const { slug } = await params;
  const paginaData = await buscarDadosDaPagina(slug);

  if (!paginaData) {
    notFound();
  }

  return <EditarPaginaForm slug={slug} dadosIniciais={paginaData} />;
}
