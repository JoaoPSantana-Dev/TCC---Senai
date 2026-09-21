import { HeaderPrivate } from "@/app/components/administrador/shared/HeaderPrivate";
import { useState } from "react";
import { toast } from "sonner";

type Pagina = {
  idPaginas: number;
  nomePagina: string;
  tipoPagina: string;
  componentes?: JSON;
  href: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function EditarPagina() {
  const [paginas, setPaginas] = useState<Pagina[]>([]);

  const editarPagina = async (id: number) => {
    try {
      const resposta = await fetch(`${apiUrl}/paginas/${id}`, {
        method: "PATCH",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao editar página");
      }

      setPaginas((atual) => atual.filter((pagina) => pagina.idPaginas !== id));
      toast.success("Página editada com sucesso!");
    } catch {
      toast.error("Falha ao editar a página");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="flex justify-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm"></section>
      </main>
    </div>
  );
}
