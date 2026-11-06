"use client";

import {
  Delete02Icon,
  Edit03Icon,
  ExternalLinkIcon,
  Plus,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { alerta } from "@/lib/alerta";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { apiUrl, mensagemDeErro, type PaginaResumo } from "@/lib/paginas";

export default function Paginas() {
  const [paginas, setPaginas] = useState<PaginaResumo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroAoCarregar, setErroAoCarregar] = useState(false);
  const [excluindoId, setExcluindoId] = useState<number | null>(null);

  const buscarPaginas = useCallback(async () => {
    setCarregando(true);
    setErroAoCarregar(false);

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
      alerta.erro("Não foi possível carregar as páginas");
      setPaginas([]);
      setErroAoCarregar(true);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarPaginas();
  }, [buscarPaginas]);

  const excluirPagina = async (pagina: PaginaResumo) => {
    if (excluindoId !== null) return;

    if (pagina.protegida) {
      alerta.erro("Essa página é usada pelo totem e não pode ser excluída");
      return;
    }

    const confirmou = await alerta.confirmar({
      titulo: "Excluir página?",
      descricao: `A página "${pagina.nomePagina}" será excluída e não poderá ser recuperada`,
      textoConfirmar: "Excluir",
      alertaPerigo: true,
    });
    if (!confirmou) return;

    setExcluindoId(pagina.idPaginas);

    try {
      const resposta = await fetch(`${apiUrl}/paginas/${pagina.idPaginas}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error(
          await mensagemDeErro(resposta, "Falha ao excluir a página"),
        );
      }

      setPaginas((atual) =>
        atual.filter((item) => item.idPaginas !== pagina.idPaginas),
      );
      alerta.sucesso("Página excluída com sucesso!");
    } catch (erro) {
      alerta.erro(
        erro instanceof Error ? erro.message : "Falha ao excluir a página",
      );
    } finally {
      setExcluindoId(null);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="flex justify-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-zinc-300">
            <h1 className="text-2xl font-semibold">Gerenciar páginas</h1>

            <Link
              href="/gerenciador-paginas/nova-pagina"
              className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 rounded-lg text-white duration-300 px-2 py-1 text-sm"
            >
              <HugeiconsIcon icon={Plus} size={30} />
              <p>Adicionar nova página</p>
            </Link>
          </div>

          {carregando ? (
            <p className="text-zinc-500">Carregando páginas...</p>
          ) : erroAoCarregar ? (
            <div className="flex flex-col items-start gap-2">
              <p className="text-red-600">
                Não foi possível carregar as páginas. Verifique se o servidor
                está no ar
              </p>
              <button
                type="button"
                onClick={buscarPaginas}
                className="cursor-pointer text-sm hover:underline text-zinc-700"
              >
                Tentar Novamente
              </button>
            </div>
          ) : paginas.length === 0 ? (
            <p className="text-zinc-500">Nenhuma página encontrada</p>
          ) : (
            <ul className="flex flex-col gap-4 w-full">
              {paginas.map((pagina) => (
                <li
                  key={pagina.idPaginas}
                  className="flex w-full items-center justify-between bg-zinc-50 hover:bg-zinc-100/70 rounded-xl border border-zinc-200 p-4 gap-2"
                >
                  <div className="min-w-0">
                    <h2 className="font-medium text-zinc-700 truncate">
                      {pagina.nomePagina}
                    </h2>
                    <p className="text-zinc-500 text-sm">
                      {pagina.tipoPagina}: "{pagina.slug}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {pagina.tipoPagina === "Totem" && (
                      <Link
                        href={`/${pagina.slug}`}
                        target="_blank"
                        title="Abrir a página no totem"
                        className="p-2 text-zinc-600 cursor-pointer hover:text-yellow-600 duration-200"
                      >
                        <HugeiconsIcon icon={ExternalLinkIcon} size={20} />
                      </Link>
                    )}
                    <Link
                      href={`/gerenciador-paginas/${pagina.slug}/editar-pagina`}
                      title="Editar"
                      className="p-2 text-zinc-600 cursor-pointer hover:text-blue-600 duration-200"
                    >
                      <HugeiconsIcon icon={Edit03Icon} size={20} />
                    </Link>

                    <button
                      type="button"
                      title={
                        pagina.protegida
                          ? "Essa página é usada pelo totem e não pode ser excluída"
                          : "Excluir"
                      }
                      disabled={pagina.protegida || excluindoId !== null}
                      onClick={() => excluirPagina(pagina)}
                      className="p-2 text-zinc-600 cursor-pointer hover:text-red-600 duration-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-zinc-600"
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
