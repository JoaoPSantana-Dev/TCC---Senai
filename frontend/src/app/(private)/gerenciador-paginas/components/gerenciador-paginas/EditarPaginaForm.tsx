"use client";

import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { RenderizadorDinamico } from "./RenderizadorDinamico";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface PaginaData {
  nomePagina: string;
  tipoPagina: string;
  conteudo: {
    type: string;
    props: Record<string, unknown>;
  }[];
}

interface EditarPaginaFormProps {
  slug: string;
  dadosIniciais: PaginaData;
}

export function EditarPaginaForm({
  slug,
  dadosIniciais,
}: EditarPaginaFormProps) {
  const router = useRouter();

  const [nomePagina, setNomePagina] = useState(dadosIniciais.nomePagina);
  const [tipoPagina, setTipoPagina] = useState(dadosIniciais.tipoPagina);
  const [conteudo, setConteudo] = useState(dadosIniciais.conteudo);
  const [editando, setEditando] = useState(false);

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
          conteudo,
        }),
      });

      if (!resposta.ok) throw new Error("Erro ao editar página");

      toast.success("Página editada com sucesso!");
      router.push("/gerenciador-paginas");
    } catch {
      toast.error("Falha ao editar a página");
    } finally {
      setEditando(false);
    }
  };

  function atualizarPropriedade(
    index: number,
    propriedade: string,
    valor: string | boolean,
  ) {
    setConteudo((atual) =>
      atual.map((componente, i) =>
        i === index
          ? {
              ...componente,
              props: { ...componente.props, [propriedade]: valor },
            }
          : componente,
      ),
    );
  }

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

            <div className="text-center">
              <Link href={`/gerenciador-paginas`}>Voltar</Link>
            </div>
          </form>
        </section>

        <section>
          <p>Pré-visualização dos componentes</p>
          <div>
            {conteudo.map((componente, index) => (
              <section key={`${componente.type}-${index}`}>
                {componente.type === "LinhaSobre" && (
                  <>
                    <textarea
                      value={String(componente.props.texto ?? "")}
                      onChange={(e) =>
                        atualizarPropriedade(index, "texto", e.target.value)
                      }
                    />

                    <input
                      value={String(componente.props.nomeImagem ?? "")}
                      onChange={(e) =>
                        atualizarPropriedade(
                          index,
                          "nomeImagem",
                          e.target.value,
                        )
                      }
                    />
                    <input
                      value={String(componente.props.alt ?? "")}
                      onChange={(e) =>
                        atualizarPropriedade(index, "alt", e.target.value)
                      }
                    />

                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(componente.props.primeiroEstilo)}
                        onChange={(e) =>
                          atualizarPropriedade(
                            index,
                            "primeiroEstilo",
                            e.target.checked,
                          )
                        }
                      />
                      Inverter os lados
                    </label>
                  </>
                )}

                <RenderizadorDinamico component={componente} />
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
