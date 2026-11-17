// lógica do painel de vagas de emprego, estágio e cursos

export type Registro = Record<string, unknown>;

// item da lista
// o registro do banco + o "cargo" que o menu de vagas usa como título
export type ItemLista = Registro & { cargo: string };

export interface CampoPainel {
  rotulo: string;
  campo: string;
}

export interface ConfigPainel {
  caminho: string; // rota do backend
  campoTitulo: string; // campo que aparece como título de cada item da lista
  destaques: CampoPainel[]; // linhas grandes no topo do detalhe
  detalhes: CampoPainel[]; // demais linhas
  textoSelecionar: string; // mostrado enquanto nada está selecionado
  textoVazio: string; // mostrado quando o banco não tem nenhum item
}

// texto do campo, ou "" se estiver vazio/nulo
export function valorDoCampo(registro: Registro | null, campo: string): string {
  const valor = registro?.[campo];
  return valor === null || valor === undefined ? "" : String(valor).trim();
}

export function linhasPreenchidas(
  registro: Registro | null,
  campos: CampoPainel[],
) {
  return campos
    .map(({ rotulo, campo }) => ({
      rotulo,
      campo,
      valor: valorDoCampo(registro, campo),
    }))
    .filter((linha) => linha.valor !== "");
}

// o menu de vagas lista pelo campo "cargo"
// copia o título de cada tipo para esse campo
export function paraLista(
  registros: Registro[],
  campoTitulo: string,
): ItemLista[] {
  return registros.map((registro) => ({
    ...registro,
    cargo: valorDoCampo(registro, campoTitulo),
  }));
}
