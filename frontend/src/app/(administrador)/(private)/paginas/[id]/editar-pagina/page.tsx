"use client";

import { HeaderPrivate } from "@/app/components/administrador/shared/HeaderPrivate";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

type Pagina = {
  idPaginas: number;
  nomePagina: string;
  tipoPagina: string;
  componentes?: JSON;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface EditarPaginaProps {
  params: Promise<{ id: string }>;
}

export default function EditarPagina({ params }: EditarPaginaProps) {
  const { id } = use(params);
  const [nomePagina, setNomePagina] = useState("");
  const [tipoPagina, setTipoPagina] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDadosDaPagina = async () => {
      try {
        const resposta = await fetch(`${apiUrl}/paginas/${id}`);
        if (!resposta.ok) throw new Error();

        const dados: Pagina = await resposta.json();

        setNomePagina(dados.nomePagina);
        setTipoPagina(dados.tipoPagina);
      } catch {
        toast.error("Erro ao carregar os dados da página");
      } finally {
        setCarregando(false);
      }
    };

    if (id) {
      buscarDadosDaPagina();
    }
  }, [id]);

  const editarPagina = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!nomePagina.trim() || !tipoPagina.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    try {
      const resposta = await fetch(`${apiUrl}/paginas/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomePagina,
          tipoPagina,
        }),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao editar página");
      }

      toast.success("Página editada com sucesso!");
    } catch {
      toast.error("Falha ao editar a página");
    }
  };

  if (carregando) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-zinc-600">
        <p>Carregando dados da página...</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="flex justify-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-zinc-800">
            Editando página "{id}"
          </h2>

          <form onSubmit={editarPagina} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Nome da página
              </label>
              <input
                type="text"
                value={nomePagina}
                onChange={(e) => setNomePagina(e.target.value)}
                placeholder="Exemplo: Homepage, Vagas de Emprego"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Tipo da página
              </label>
              <input
                type="text"
                value={tipoPagina}
                onChange={(e) => setTipoPagina(e.target.value)}
                placeholder="Administrador ou Totem"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md"
            >
              Salvar alterações
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
