"use client";

import { useCallback, useEffect, useState } from "react";
import { mensagemDoBackend } from "@/lib/autenticacao";
import { chamarUsuarios, type Usuario } from "@/lib/usuarios";
import { BarraFiltros } from "./BarraFiltros";
import { ErroLista, EsqueletoLista } from "./EstadosLista";
import { FormularioUsuario } from "./FormularioUsuario";
import { GavetaEdicao } from "./GavetaEdicao";
import { MeusDados } from "./MeusDados";
import { Paginacao } from "./Paginacao";
import { TabelaUsuarios } from "./TabelaUsuarios";
import { useListaUsuarios } from "./useListaUsuarios";
import { classeCartao } from "./estilos";

const SEM_USUARIOS: Usuario[] = [];

function plural(quantidade: number, singular: string, pluralizado: string) {
  return `${quantidade} ${quantidade === 1 ? singular : pluralizado}`;
}

export function GerenciadorUsuarios() {
  const [eu, setEu] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // os hooks precisam rodar antes dos returns antecipados abaixo
  const lista = useListaUsuarios(usuarios ?? SEM_USUARIOS);

  const carregar = useCallback(async () => {
    try {
      const [perfil, todos] = await Promise.all([
        chamarUsuarios("eu"),
        chamarUsuarios(""),
      ]);

      if (!perfil.ok || !todos.ok) {
        setErro(
          mensagemDoBackend(
            perfil.ok ? todos.dados : perfil.dados,
            "Não foi possível carregar os usuários",
          ),
        );
        return;
      }

      setEu(perfil.dados as Usuario);
      setUsuarios(todos.dados as Usuario[]);
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

  if (erro) return <ErroLista mensagem={erro} aoTentarDeNovo={carregar} />;
  if (!eu || !usuarios) return <EsqueletoLista />;

  const emEdicao = usuarios.find((u) => u.idUsuario === editandoId) ?? null;
  const administradores = usuarios.filter(
    (u) => u.funcao === "Administrador",
  ).length;
  const comDoisFatores = usuarios.filter((u) => u.totpAtivo).length;

  return (
    <>
      <section aria-labelledby="todos-usuarios" className="flex flex-col gap-4">
        <div>
          <h2 id="todos-usuarios" className="text-lg font-semibold">
            Todos os usuários
          </h2>
          <p className="text-sm text-zinc-600">
            {plural(usuarios.length, "usuário", "usuários")},{" "}
            {plural(administradores, "administrador", "administradores")},{" "}
            {comDoisFatores} com 2FA ativo
          </p>
        </div>

        <div className={`${classeCartao} overflow-hidden`}>
          <BarraFiltros
            busca={lista.busca}
            aoBuscar={lista.alterarBusca}
            funcao={lista.funcao}
            aoEscolherFuncao={lista.alterarFuncao}
            doisFatores={lista.doisFatores}
            aoEscolher2FA={lista.alterar2FA}
            temFiltros={lista.temFiltros}
            aoLimpar={lista.limparFiltros}
          />

          <TabelaUsuarios
            usuarios={lista.visiveis}
            idLogado={eu.idUsuario}
            idEditando={editandoId}
            ordem={lista.ordem}
            temFiltros={lista.temFiltros}
            aoOrdenar={lista.ordenarPor}
            aoEditar={(usuario) => setEditandoId(usuario.idUsuario)}
            aoLimparFiltros={lista.limparFiltros}
          />

          <Paginacao
            pagina={lista.pagina}
            totalPaginas={lista.totalPaginas}
            total={lista.totalFiltrados}
            inicio={lista.inicio}
            aoMudar={lista.irParaPagina}
          />
        </div>
      </section>

      <MeusDados
        eu={eu}
        aoAtualizar={(atualizado) => {
          setEu(atualizado);
          atualizarNaLista(atualizado);
        }}
      />

      <GavetaEdicao
        aberta={emEdicao !== null}
        titulo="Editar usuário"
        descricao={emEdicao ? `${emEdicao.nome}, ${emEdicao.email}` : undefined}
        aoFechar={() => setEditandoId(null)}
      >
        {emEdicao && (
          <FormularioUsuario
            key={emEdicao.idUsuario}
            usuario={emEdicao}
            aoSalvar={(atualizado) => {
              atualizarNaLista(atualizado);
              setEditandoId(null);
            }}
            aoCancelar={() => setEditandoId(null)}
          />
        )}
      </GavetaEdicao>
    </>
  );
}
