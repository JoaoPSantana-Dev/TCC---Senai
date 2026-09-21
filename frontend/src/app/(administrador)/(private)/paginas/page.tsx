"use client";

import { Delete02Icon, Edit03Icon, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HeaderPrivate } from "@/app/components/administrador/shared/HeaderPrivate";

type Pagina = {
  idPaginas: number;
  nomePagina: string;
  tipoPagina: string;
  componentes?: JSON;
  href: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function Paginas() {
  const [paginas, setPaginas] = useState<Pagina[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscarPaginas = async () => {
    try {
      const resposta = await fetch(`${apiUrl}/paginas`, {
        cache: "no-store",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao buscar páginas");
      }

      const dados = await resposta.json();
      setPaginas(Array.isArray(dados) ? dados : []);
    } catch {
      toast.error("Não foi possível carregar as páginas");
      setPaginas([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarPaginas();
  }, []);

  const excluirPagina = async (id: number) => {
    try {
      const resposta = await fetch(`${apiUrl}/paginas/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir página");
      }

      setPaginas((atual) => atual.filter((pagina) => pagina.idPaginas !== id));
      toast.success("Página excluída com sucesso!");
    } catch {
      toast.error("Falha ao excluir a página");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="flex justify-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-zinc-300">
            <h1 className="text-2xl font-semibold">Gerenciar páginas</h1>

            {/* esse botão de adicionar página tá meio feio */}
            <Link
              href="/paginas/nova-pagina"
              className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 rounded-lg text-white duration-300 px-2 py-1 text-sm"
            >
              <HugeiconsIcon icon={Plus} size={30} />
              <p>Adicionar nova página</p>
            </Link>
          </div>

          {carregando ? (
            <p className="text-zinc-500">Carregando páginas...</p>
          ) : paginas.length === 0 ? (
            <p className="text-zinc-500">Nenhuma página encontrada</p>
          ) : (
            <ul className="flex flex-col gap-4 w-full">
              {paginas.map((pagina) => (
                <li
                  key={pagina.idPaginas}
                  className="flex w-full items-center justify-between bg-zinc-50 hover:bg-zinc-100/70 rounded-xl border border-zinc-200 p-4 gap-2"
                >
                  <div>
                    <h2 className="font-medium text-zinc-700">
                      {pagina.nomePagina}
                    </h2>
                    <p className="text-zinc-500">{pagina.tipoPagina}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/paginas/${pagina.idPaginas}/editar-pagina`}
                      // pretendo editar esse title pra ficar personalizado e bonitinho
                      title="Editar"
                      className="p-2 text-zinc-600 cursor-pointer hover:text-blue-600 duration-200"
                    >
                      <HugeiconsIcon icon={Edit03Icon} size={20} />
                    </Link>

                    <button
                      // pretendo editar esse title pra ficar personalizado e bonitinho
                      type="button"
                      title="Excluir"
                      // pretendo colocar um alerta de confirmar exclusão
                      onClick={() => excluirPagina(pagina.idPaginas)}
                      className="p-2 text-zinc-600 cursor-pointer hover:text-red-600 duration-200"
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
