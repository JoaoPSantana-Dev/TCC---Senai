import { useMemo, useState } from "react";
import { normalizar, type FuncaoUsuario, type Usuario } from "@/lib/usuarios";

// busca, filtros, ordenação e paginação da lista de usuários

export const usuariosPorPagina = 8;

export type CampoOrdenacao = "nome" | "unidade" | "funcao";
export type FiltroFuncao = "todas" | FuncaoUsuario;
export type Filtro2FA = "todos" | "ativo" | "desativado";
export interface Ordenacao {
  campo: CampoOrdenacao;
  direcao: "asc" | "desc";
}

export function useListaUsuarios(usuarios: Usuario[]) {
  const [busca, setBusca] = useState("");
  const [funcao, setFuncao] = useState<FiltroFuncao>("todas");
  const [doisFatores, setDoisFatores] = useState<Filtro2FA>("todos");
  const [ordem, setOrdem] = useState<Ordenacao>({
    campo: "nome",
    direcao: "asc",
  });
  const [paginaPedida, setPaginaPedida] = useState(1);

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim());

    return usuarios.filter((u) => {
      if (funcao !== "todas" && u.funcao !== funcao) return false;
      if (doisFatores === "ativo" && !u.totpAtivo) return false;
      if (doisFatores === "desativado" && u.totpAtivo) return false;
      if (!termo) return true;

      return normalizar(
        `${u.nome} ${u.email} ${u.unidade} ${u.funcao}`,
      ).includes(termo);
    });
  }, [usuarios, busca, funcao, doisFatores]);

  const ordenados = useMemo(() => {
    const fator = ordem.direcao === "asc" ? 1 : -1;
    const comparar = (a: string, b: string) =>
      a.localeCompare(b, "pt-BR", { sensitivity: "base" });

    return [...filtrados].sort(
      (a, b) =>
        fator * comparar(a[ordem.campo], b[ordem.campo]) ||
        comparar(a.nome, b.nome),
    );
  }, [filtrados, ordem]);

  // se a lista encolher pelo filtro ou edição, a página nunca passa do fim
  const totalPaginas = Math.max(
    1,
    Math.ceil(ordenados.length / usuariosPorPagina),
  );
  const pagina = Math.min(paginaPedida, totalPaginas);
  const inicio = (pagina - 1) * usuariosPorPagina;
  const visiveis = ordenados.slice(inicio, inicio + usuariosPorPagina);

  const temFiltros =
    busca !== "" || funcao !== "todas" || doisFatores !== "todos";

  // qualquer mudança de filtro volta para a primeira página
  function alterarBusca(valor: string) {
    setBusca(valor);
    setPaginaPedida(1);
  }
  function alterarFuncao(valor: FiltroFuncao) {
    setFuncao(valor);
    setPaginaPedida(1);
  }
  function alterar2FA(valor: Filtro2FA) {
    setDoisFatores(valor);
    setPaginaPedida(1);
  }
  function limparFiltros() {
    setBusca("");
    setFuncao("todas");
    setDoisFatores("todos");
    setPaginaPedida(1);
  }

  // clicar na coluna ordenada inverte a direção, em outra coluna começa crescente
  function ordenarPor(campo: CampoOrdenacao) {
    setOrdem((atual) => ({
      campo,
      direcao:
        atual.campo === campo && atual.direcao === "asc" ? "desc" : "asc",
    }));
  }

  return {
    busca,
    funcao,
    doisFatores,
    ordem,
    pagina,
    totalPaginas,
    totalFiltrados: ordenados.length,
    inicio,
    visiveis,
    temFiltros,
    alterarBusca,
    alterarFuncao,
    alterar2FA,
    limparFiltros,
    ordenarPor,
    irParaPagina: setPaginaPedida,
  };
}
