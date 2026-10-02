import { HeaderPrivate } from "@/app/components/administrador/shared/HeaderPrivate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { RenderizadorDinamico } from "../../shared/RenderizadorDinamico";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// interface EditarPaginaProps {
//   params: Promise<{ slug: string }>;
// }

interface PaginaData {
  nomePagina: string;
  conteudo: {
    type: string;
    props: Record<string, any>;
  }[];
}

interface EditarPaginaFormProps {
  slug: string;
  dadosIniciais: PaginaData;
}

// async function buscarDadosDaPagina(slug: string): Promise<PaginaData | null> {
//   try {
//     const resposta = await fetch(`${apiUrl}/paginas/${slug}`, {
//       next: { revalidate: 60 },
//     });

//     if (!resposta.ok) return null;
//     return await resposta.json();
//   } catch {
//     toast.error("Erro ao carregar os dados da página");
//   } finally {
//     setCarregando(false);
//   }
// }

export function EditarPaginaForm({
  slug,
  dadosIniciais,
}: EditarPaginaFormProps) {
  //   const { slug } = await params;
  //   const paginaData = await buscarDadosDaPagina(slug);
  const router = useRouter();

  const [nomePagina, setNomePagina] = useState(dadosIniciais.nomePagina);
  const [tipoPagina, setTipoPagina] = useState("");
  const [editando, setEditando] = useState(false);
  //   const [carregando, setCarregando] = useState(true);

  //   if (!paginaData) {
  //     notFound();
  //   }

  const editarPagina = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!nomePagina.trim() || !tipoPagina.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setEditando(true);

    try {
      const resposta = await fetch(`${apiUrl}/paginas/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomePagina,
          tipoPagina,
        }),
      });

      if (!resposta.ok) throw new Error("Erro ao editar página");

      toast.success("Página editada com sucesso!");
      router.push("/paginas");
    } catch {
      toast.error("Falha ao editar a página");
    } finally {
      setEditando(false);
    }
  };

  //   if (carregando) {
  //     return (
  //       <div className="w-screen h-screen flex items-center justify-center text-zinc-600">
  //         <p>Carregando dados da página...</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="flex justify-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-zinc-800">
            Editando a página "{slug}"
          </h2>

          <form onSubmit={editarPagina} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="nomePagina"
                className="text-sm font-medium text-zinc-700"
              >
                Nome da página
              </label>
              <input
                required
                type="text"
                value={nomePagina}
                onChange={(e) => setNomePagina(e.target.value)}
                placeholder="Exemplo: Homepage, Vagas de Emprego"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="tipoPagina"
                className="text-sm font-medium text-zinc-700"
              >
                Tipo da página
              </label>
              <select
                required
                id="tipoPagina"
                name="tipoPagina"
                value={tipoPagina}
                onChange={(e) => setTipoPagina(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Selecione o tipo da página
                </option>
                <option value="Administrador">Administrador</option>
                <option value="Totem">Totem</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={editando}
              className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              {editando ? "Salvando..." : "Salvar alterações"}
            </button>

            <button>
              <Link href={`/paginas`}>Voltar</Link>
            </button>
          </form>
        </section>

        <section>
          <p>Pré-visualização dos componentes</p>
          <div>
            {dadosIniciais.conteudo?.map((componente, index) => (
              <RenderizadorDinamico key={index} component={componente} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
