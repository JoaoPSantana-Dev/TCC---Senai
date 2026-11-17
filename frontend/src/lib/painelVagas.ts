export type Registro = Record<string, unknown>;
 
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
 
  // filtro (opcionais)
  campoArea?: string; // campo usado nos chips de área (ex.: "areaEmprego")
  camposBusca?: string[]; // campos considerados na busca por texto
  placeholderBusca?: string; // texto do campo de busca
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
 
// o menu de vagas lista pelo campo "cargo", copiamos o título de cada tipo para esse campo
export function paraLista(
  registros: Registro[],
  campoTitulo: string,
): ItemLista[] {
  return registros.map((registro) => ({
    ...registro,
    cargo: valorDoCampo(registro, campoTitulo),
  }));
}
 
// remove acentos e ignora maiúsculas/minúsculas: "estagio" encontra "Estágio"
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
 
// áreas distintas encontradas nos registros, em ordem alfabética
export function areasDisponiveis(
  registros: Registro[],
  campoArea?: string,
): string[] {
  if (!campoArea) return [];
  const unicas = new Set<string>();
  for (const registro of registros) {
    const area = valorDoCampo(registro, campoArea);
    if (area) unicas.add(area);
  }
  return Array.from(unicas).sort((a, b) => a.localeCompare(b, "pt-BR"));
}
 
// aplica busca por texto + área
export function filtrarRegistros(
  registros: Registro[],
  {
    busca,
    area,
    campoArea,
    camposBusca,
  }: {
    busca: string;
    area: string | null;
    campoArea?: string;
    camposBusca: string[];
  },
): Registro[] {
  const termo = normalizar(busca);
 
  return registros.filter((registro) => {
    const bateArea =
      !area || !campoArea || valorDoCampo(registro, campoArea) === area;
 
    const bateBusca =
      termo === "" ||
      camposBusca.some((campo) =>
        normalizar(valorDoCampo(registro, campo)).includes(termo),
      );
 
    return bateArea && bateBusca;
  });
}
 