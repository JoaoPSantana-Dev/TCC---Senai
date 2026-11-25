// lógica do painel de vagas de emprego, estágio e cursos

export type Registro = Record<string, unknown>;

// ícone que aparece antes de cada informação da linha
export type IconeMeta = "empresa" | "local" | "turno" | "carga";

export interface CampoPainel {
  rotulo: string;
  campo: string;
}

export interface MetaPainel {
  campo: string;
  icone: IconeMeta;
}

export interface ConfigPainel {
  caminho: string; // rota do backend
  campoId: string; // campo com o id do registro
  campoTitulo: string; // título de cada linha da lista
  campoMarca: string; // texto cujas iniciais aparecem no quadrado à esquerda
  meta: MetaPainel[]; // informações curtas embaixo do título como empresa, local, turno...
  campoDestaque?: string; // aparece em vermelho à direita
  campoArea?: string; // etiqueta à direita e filtro por área
  detalhes: CampoPainel[]; // o que aparece quando a linha é aberta
  nomeSingular: string; // "vaga", "curso"
  nomePlural: string; // "vagas", "cursos"
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

// minúsculo e sem acento, para a busca achar "estagio" em "Estágio"
export function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// "Tech Solutions" vira "TS", "senai" vira "S"
export function iniciaisDaMarca(texto: string) {
  const partes = texto.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  return partes
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

// id estável para a chave e para saber qual linha está aberta
export function idDoItem(
  config: ConfigPainel,
  registro: Registro,
  indice: number,
) {
  return valorDoCampo(registro, config.campoId) || `item-${indice}`;
}

// áreas diferentes que existem na lista, sem repetir "TI" e "ti"
export function areasDisponiveis(registros: Registro[], campoArea?: string) {
  if (!campoArea) return [];

  const vistas = new Map<string, string>();
  for (const registro of registros) {
    const area = valorDoCampo(registro, campoArea);
    if (area && !vistas.has(normalizar(area)))
      vistas.set(normalizar(area), area);
  }
  return [...vistas.values()].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function filtrarRegistros(
  registros: Registro[],
  config: ConfigPainel,
  busca: string,
  area: string,
) {
  const termo = normalizar(busca.trim());
  const areaEscolhida = normalizar(area);

  return registros.filter((registro) => {
    if (
      areaEscolhida &&
      config.campoArea &&
      normalizar(valorDoCampo(registro, config.campoArea)) !== areaEscolhida
    ) {
      return false;
    }
    if (!termo) return true;

    const campos = [
      config.campoTitulo,
      config.campoDestaque,
      config.campoArea,
      ...config.meta.map((m) => m.campo),
    ];
    const texto = campos
      .filter((campo): campo is string => Boolean(campo))
      .map((campo) => valorDoCampo(registro, campo))
      .join(" ");

    return normalizar(texto).includes(termo);
  });
}
