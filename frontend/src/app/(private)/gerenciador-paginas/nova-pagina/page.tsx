"use client";

import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  apiUrl,
  criarSlug,
  limiteNomePagina,
  mensagemDeErro,
  tiposPagina,
  validarDadosBasicos,
} from "@/lib/paginas";

export default function NovaPagina() {
  const router = useRouter();
  const [criando, setCriando] = useState(false);

  const [nomePagina, setNomePagina] = useState("");
  const [tipoPagina, setTipoPagina] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const slug = criarSlug(nomePagina);

  const novaPagina = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (criando) return;

    const erroDeValidacao = validarDadosBasicos({
      nomePagina,
      tipoPagina,
      slug,
    });

    if (erroDeValidacao) {
      setErro(erroDeValidacao);
      toast.error(erroDeValidacao);
      return;
    }

    setErro(null);
    setCriando(true);

    try {
      const resposta = await fetch(`${apiUrl}/paginas/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomePagina,
          tipoPagina,
          slug,
          conteudo: [],
        }),
      });

      if (!resposta.ok) {
        throw new Error(
          await mensagemDeErro(resposta, "Falha ao criar a página"),
        );
      }

      toast.success("Página criada com sucesso!");
      router.push(`/gerenciador-paginas/${slug}/editar-pagina`);
    } catch (erroDaRequisicao) {
      const mensagem =
        erroDaRequisicao instanceof Error
          ? erroDaRequisicao.message
          : "Falha ao criar a página";
      setErro(mensagem);
      toast.error(mensagem);
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

          <form
            onSubmit={novaPagina}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="nomePagina"
                className="text-sm font-medium text-zinc-700"
              >
                Nome da página
              </label>
              <input
                required
                id="nomePagina"
                name="nomePagina"
                type="text"
                maxLength={limiteNomePagina}
                value={nomePagina}
                onChange={(e) => setNomePagina(e.target.value)}
                placeholder="Exemplo: Homepage, Vagas de Emprego"
                aria-describedby="endereco-pagina"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p id="endereco-pagina" className="text-sm text-zinc-500">
                Endereço da página:{" "}
                <span className="font-mono">{slug ? `/${slug}` : "—"}</span>
              </p>
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
                {tiposPagina.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            {erro && (
              <p role="alert" className="text-sm text-red-600">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={criando}
              className="cursor-pointer mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {criando ? "Criando..." : "Criar página"}
            </button>

            <div className="text-center">
              <Link href={`/gerenciador-paginas`}>Voltar</Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
