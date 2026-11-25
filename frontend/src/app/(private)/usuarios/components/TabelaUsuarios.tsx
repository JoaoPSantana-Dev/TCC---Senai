"use client";

import type { ReactNode } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, Pencil } from "lucide-react";
import type { Usuario } from "@/lib/usuarios";
import { Avatar, Selo2FA, SeloFuncao } from "./Selos";
import { focoVisivel } from "./estilos";
import type { CampoOrdenacao, Ordenacao } from "./useListaUsuarios";

interface CabecalhoOrdenavelProps {
  campo: CampoOrdenacao;
  ordem: Ordenacao;
  aoOrdenar: (campo: CampoOrdenacao) => void;
  className?: string;
  children: ReactNode;
}

function CabecalhoOrdenavel({
  campo,
  ordem,
  aoOrdenar,
  className = "",
  children,
}: CabecalhoOrdenavelProps) {
  const ativo = ordem.campo === campo;
  const ariaSort = !ativo
    ? "none"
    : ordem.direcao === "asc"
      ? "ascending"
      : "descending";
  const Icone = !ativo
    ? ChevronsUpDown
    : ordem.direcao === "asc"
      ? ChevronUp
      : ChevronDown;

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={`px-4 py-3 font-medium ${className}`}
    >
      <button
        type="button"
        onClick={() => aoOrdenar(campo)}
        className={`inline-flex cursor-pointer items-center gap-1 rounded hover:text-zinc-900 ${focoVisivel}`}
      >
        {children}
        <Icone
          aria-hidden="true"
          className={`size-4 ${ativo ? "text-zinc-900" : "text-zinc-400"}`}
        />
      </button>
    </th>
  );
}

interface TabelaUsuariosProps {
  usuarios: Usuario[];
  idLogado: number;
  idEditando: number | null;
  ordem: Ordenacao;
  temFiltros: boolean;
  aoOrdenar: (campo: CampoOrdenacao) => void;
  aoEditar: (usuario: Usuario) => void;
  aoLimparFiltros: () => void;
}

export function TabelaUsuarios({
  usuarios,
  idLogado,
  idEditando,
  ordem,
  temFiltros,
  aoOrdenar,
  aoEditar,
  aoLimparFiltros,
}: TabelaUsuariosProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <caption className="sr-only">Usuários cadastrados</caption>

        <thead className="bg-zinc-50 text-sm text-zinc-600">
          <tr>
            <CabecalhoOrdenavel campo="nome" ordem={ordem} aoOrdenar={aoOrdenar}>
              Usuário
            </CabecalhoOrdenavel>
            <CabecalhoOrdenavel
              campo="unidade"
              ordem={ordem}
              aoOrdenar={aoOrdenar}
              className="hidden md:table-cell"
            >
              Unidade
            </CabecalhoOrdenavel>
            <CabecalhoOrdenavel
              campo="funcao"
              ordem={ordem}
              aoOrdenar={aoOrdenar}
            >
              Função
            </CabecalhoOrdenavel>
            <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">
              2FA
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200">
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center">
                <p className="font-medium text-zinc-800">
                  Nenhum usuário encontrado
                </p>
                {temFiltros && (
                  <button
                    type="button"
                    onClick={aoLimparFiltros}
                    className={`mt-2 cursor-pointer rounded text-sm font-medium text-red-700 hover:underline ${focoVisivel}`}
                  >
                    Limpar filtros para ver todos
                  </button>
                )}
              </td>
            </tr>
          )}

          {usuarios.map((usuario) => {
            const ehEu = usuario.idUsuario === idLogado;
            const emEdicao = usuario.idUsuario === idEditando;

            return (
              <tr
                key={usuario.idUsuario}
                className={`transition-colors hover:bg-zinc-50 ${emEdicao ? "bg-red-50/60" : ""}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      nome={usuario.nome}
                      administrador={usuario.funcao === "Administrador"}
                    />
                    <div className="min-w-0 max-w-56 lg:max-w-72">
                      <p className="truncate font-medium text-zinc-900">
                        {usuario.nome}
                        {ehEu && (
                          <span className="ml-2 text-sm font-normal text-zinc-500">
                            (você)
                          </span>
                        )}
                      </p>
                      <p className="truncate text-sm text-zinc-600">
                        {usuario.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="hidden px-4 py-3 text-sm text-zinc-700 md:table-cell">
                  {usuario.unidade}
                </td>

                <td className="px-4 py-3">
                  <SeloFuncao funcao={usuario.funcao} />
                </td>

                <td className="hidden px-4 py-3 sm:table-cell">
                  <Selo2FA ativo={usuario.totpAtivo} />
                </td>

                <td className="px-4 py-3 text-right">
                  {ehEu ? (
                    <a
                      href="#meus-dados"
                      className={`rounded text-sm font-medium text-zinc-600 hover:text-red-700 hover:underline ${focoVisivel}`}
                    >
                      Ir para Meus dados
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => aoEditar(usuario)}
                      aria-label={`Editar ${usuario.nome}`}
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 ${focoVisivel}`}
                    >
                      <Pencil aria-hidden="true" className="size-4" />
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
