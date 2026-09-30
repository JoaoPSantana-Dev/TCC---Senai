"use client";

import { HeaderPrivate } from "@/app/components/administrador/shared/HeaderPrivate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// type Pagina = {
//   idPaginas: number;
//   nomePagina: string;
//   tipoPagina: string;
//   componentes?: JSON;
// };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function NovaPagina() {
  const router = useRouter();
  const [nomePagina, setNomePagina] = useState("");
  const [tipoPagina, setTipoPagina] = useState("");
  const [criando, setCriando] = useState(false);

  const novaPagina = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!nomePagina.trim() || !tipoPagina.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setCriando(true);

    try {
      const resposta = await fetch(`${apiUrl}/paginas/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomePagina,
          tipoPagina,
        }),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao criar página");
      }

      toast.success("Página criada com sucesso!");
      router.push("/paginas");
    } catch {
      toast.error("Falha ao criar a página");
    } finally {
      setCriando(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="flex justify-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-zinc-800">
            Criando Página
          </h2>

          <form onSubmit={novaPagina} className="flex flex-col gap-4">
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
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              disabled={criando}
              className="cursor-pointer mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md"
            >
              {criando ? "Criando..." : "Criar página"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
