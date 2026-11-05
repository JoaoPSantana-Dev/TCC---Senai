"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { mensagemDoBackend } from "@/lib/autenticacao";
import { chamarUsuarios, normalizar, type Usuario } from "@/lib/usuarios";
import { FormularioUsuario } from "./FormularioUsuario";
import { MeusDados } from "./MeusDados";

function Selo({
  texto,
  cor,
}: {
  texto: string;
  cor: "vermelho" | "verde" | "cinza";
}) {
  const cores = {
    vermelho: "bg-red-100 text-red-800",
    verde: "bg-green-100 text-green-800",
    cinza: "bg-zinc-100 text-zinc-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${cores[cor]}`}
    >
      {texto}
    </span>
  );
}

export function GerenciadorUsuarios() {
  const [eu, setEu] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const carregar = useCallback(async () => {
    try {
      const [perfil, lista] = await Promise.all([
        chamarUsuarios("eu"),
        chamarUsuarios(""),
      ]);

      if (!perfil.ok || !lista.ok) {
        setErro(
          mensagemDoBackend(
            perfil.ok ? lista.dados : perfil.dados,
            "Não foi possível carregar os usuários",
          ),
        );
        return;
      }

      setEu(perfil.dados as Usuario);
      setUsuarios(lista.dados as Usuario[]);
      setErro(null);
    } catch {
      setErro("Falha ao conectar com o servidor");
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // troca o usuário na lista pela versão atualizada
  function atualizarNaLista(atualizado: Usuario) {
    setUsuarios((atual) =>
      (atual ?? []).map((u) =>
        u.idUsuario === atualizado.idUsuario ? atualizado : u,
      ),
    );
  }

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim());
    if (!usuarios) return [];
    if (!termo) return usuarios;

    return usuarios.filter((u) =>
      normalizar(`${u.nome} ${u.email} ${u.unidade} ${u.funcao}`).includes(
        termo,
      ),
    );
  }, [usuarios, busca]);

  if (erro) {
    return (
      <div
        role="alert"
        className="flex flex-col items-start gap-3 rounded-2xl border-2 border-red-200 p-6"
      >
        <p className="text-red-700">{erro}</p>
        <button
          type="button"
          onClick={carregar}
          className="cursor-pointer rounded-3xl border border-zinc-400 px-5 py-2 hover:bg-zinc-100"
        >
          Tentar de novo
        </button>
      </div>
    );
  }

  if (!eu || !usuarios) return <p className="text-zinc-600">Carregando...</p>;

  return (
    <>
      <MeusDados
        eu={eu}
        aoAtualizar={(atualizado) => {
          setEu(atualizado);
          atualizarNaLista(atualizado);
        }}
      />

      <section aria-labelledby="todos-usuarios" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="todos-usuarios" className="text-lg font-semibold">
              Todos os usuários
            </h2>
            <p className="text-sm text-zinc-600">
              {filtrados.length === usuarios.length
                ? `${usuarios.length} ${usuarios.length === 1 ? "usuário" : "usuários"}`
                : `Mostrando ${filtrados.length} de ${usuarios.length}`}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="busca-usuarios" className="text-sm">
              Buscar
            </label>
            <input
              id="busca-usuarios"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome, email, unidade ou função"
              className="w-72 max-w-full rounded-2xl border border-zinc-400 px-4 py-2 hover:border-zinc-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-zinc-200">
          <table className="w-full text-left">
            <caption className="sr-only">Usuários cadastrados</caption>
            <thead className="bg-zinc-50 text-sm text-zinc-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Nome
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Email
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Unidade
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Função
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  2FA
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200">
              {filtrados.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-zinc-500"
                  >
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}

              {filtrados.map((usuario) => {
                const ehEu = usuario.idUsuario === eu.idUsuario;
                const editando = editandoId === usuario.idUsuario;

                return (
                  <Fragment key={usuario.idUsuario}>
                    <tr className={editando ? "bg-zinc-50" : undefined}>
                      <td className="px-4 py-3">
                        {usuario.nome}
                        {ehEu && (
                          <span className="ml-2 text-sm text-zinc-500">
                            (você)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-zinc-700">
                        {usuario.email}
                      </td>
                      <td className="px-4 py-3 text-zinc-700">
                        {usuario.unidade}
                      </td>
                      <td className="px-4 py-3">
                        <Selo
                          texto={usuario.funcao}
                          cor={
                            usuario.funcao === "Administrador"
                              ? "vermelho"
                              : "cinza"
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Selo
                          texto={usuario.totpAtivo ? "Ativo" : "Não"}
                          cor={usuario.totpAtivo ? "verde" : "cinza"}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        {ehEu ? (
                          <a
                            href="#meus-dados"
                            className="text-sm text-zinc-600 hover:text-red-600"
                          >
                            Editar em &quot;Meus dados&quot;
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setEditandoId(editando ? null : usuario.idUsuario)
                            }
                            aria-expanded={editando}
                            className="cursor-pointer text-sm text-red-600 hover:underline"
                          >
                            {editando ? "Fechar" : "Editar"}
                          </button>
                        )}
                      </td>
                    </tr>

                    {editando && (
                      <tr>
                        <td colSpan={6} className="px-4 pb-4">
                          <FormularioUsuario
                            usuario={usuario}
                            aoSalvar={(atualizado) => {
                              atualizarNaLista(atualizado);
                              setEditandoId(null);
                            }}
                            aoCancelar={() => setEditandoId(null)}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
