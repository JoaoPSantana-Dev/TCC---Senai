// editor de vagas de emprego, estágio e cursos
// aqui são os campos de cada tipo, as regras de validações,
// as regras que são as mesmas dos dtos do backend e o token do administrador na rota /api/paginas/vagas

export type TipoVaga = "emprego" | "estagio" | "curso";
export type RegistroVaga = Record<string, unknown>;

export interface CampoVaga {
  nome: string;
  rotulo: string;
  tipo: "texto" | "textarea";
  obrigatorio: boolean;
  maximo: number;
}

export interface ConfigVaga {
  tipo: TipoVaga;
  caminhoBackend: string; // rota pública do backend, a mesma que o painel do totem lê
  idCampo: string;
  campoTitulo: string;
  campoSubtitulo: string;
  campos: CampoVaga[];
  nomeSingular: string; // "vaga", "curso"
  textoNovo: string;
  textoVazio: string;
}

const curto = 191;
const longo = 5000;

function campoVaga(
  nome: string,
  rotulo: string,
  obrigatorio: boolean,
  tipo: CampoVaga["tipo"] = "texto",
): CampoVaga {
  return {
    nome,
    rotulo,
    tipo,
    obrigatorio,
    maximo: tipo === "textarea" ? longo : curto,
  };
}

function camposDeVaga(campoArea: string): CampoVaga[] {
  return [
    campoVaga("cargo", "Cargo", true),
    campoVaga("nomeEmpresa", "Empresa", true),
    campoVaga(campoArea, "Área da vaga", true),
    campoVaga("salario", "Salário", true),
    campoVaga("localizacao", "Localização", true),
    campoVaga("contato", "Contato", true),
    campoVaga("requisitos", "Requisitos", true, "textarea"),
    campoVaga("beneficios", "Benefícios", true, "textarea"),
    campoVaga("descricao", "Descrição", true, "textarea"),
  ];
}

export const tiposDeVaga: Record<TipoVaga, ConfigVaga> = {
  emprego: {
    tipo: "emprego",
    caminhoBackend: "/vagas-emprego",
    idCampo: "idEmprego",
    campoTitulo: "cargo",
    campoSubtitulo: "nomeEmpresa",
    campos: camposDeVaga("areaEmprego"),
    nomeSingular: "vaga",
    textoNovo: "Adicionar vaga",
    textoVazio: "Nenhuma vaga de emprego cadastrada.",
  },
  estagio: {
    tipo: "estagio",
    caminhoBackend: "/vagas-estagio",
    idCampo: "idEstagio",
    campoTitulo: "cargo",
    campoSubtitulo: "nomeEmpresa",
    campos: camposDeVaga("areaEstagio"),
    nomeSingular: "vaga",
    textoNovo: "Adicionar vaga",
    textoVazio: "Nenhuma vaga de estágio cadastrada.",
  },
  curso: {
    tipo: "curso",
    caminhoBackend: "/vagas-curso",
    idCampo: "idCurso",
    campoTitulo: "nomeCurso",
    campoSubtitulo: "areaCurso",
    campos: [
      campoVaga("nomeCurso", "Nome do curso", true),
      campoVaga("areaCurso", "Área", false),
      campoVaga("cargaHoraria", "Carga horária", false),
      campoVaga("turno", "Turno", false),
      campoVaga("contato", "Contato", false),
      campoVaga("descricao", "Descrição", false, "textarea"),
      campoVaga("requisitos", "Requisitos", false, "textarea"),
    ],
    nomeSingular: "curso",
    textoNovo: "Adicionar curso",
    textoVazio: "Nenhum curso cadastrado.",
  },
};

export function ehTipoVaga(valor: unknown): valor is TipoVaga {
  return valor === "emprego" || valor === "estagio" || valor === "curso";
}

function texto(valor: unknown): string {
  return valor === null || valor === undefined ? "" : String(valor).trim();
}

// ---------- itens da lista ----------

export const idDoRegistro = (config: ConfigVaga, registro: RegistroVaga) =>
  Number(registro[config.idCampo]);

export const tituloDoItem = (config: ConfigVaga, registro: RegistroVaga) =>
  texto(registro[config.campoTitulo]) || "(sem título)";

export const subtituloDoItem = (config: ConfigVaga, registro: RegistroVaga) =>
  texto(registro[config.campoSubtitulo]);

// troca o item pelo salvo ou se for novo coloca no fim
export function atualizarLista(
  config: ConfigVaga,
  lista: RegistroVaga[],
  salvo: RegistroVaga,
) {
  const id = idDoRegistro(config, salvo);
  return lista.some((item) => idDoRegistro(config, item) === id)
    ? lista.map((item) => (idDoRegistro(config, item) === id ? salvo : item))
    : [...lista, salvo];
}

export function removerDaLista(
  config: ConfigVaga,
  lista: RegistroVaga[],
  id: number,
) {
  return lista.filter((item) => idDoRegistro(config, item) !== id);
}

// valores do formulário tudo texto, campo vazio do banco vira ""
export function valoresIniciais(config: ConfigVaga, registro?: RegistroVaga) {
  return Object.fromEntries(
    config.campos.map((c) => [c.nome, texto(registro?.[c.nome])]),
  );
}

export function validarVaga(
  config: ConfigVaga,
  valores: Record<string, string>,
) {
  const erros: Record<string, string> = {};

  for (const campo of config.campos) {
    const valor = (valores[campo.nome] ?? "").trim();

    if (!valor) {
      if (campo.obrigatorio) erros[campo.nome] = "Campo obrigatório";
    } else if (valor.length > campo.maximo) {
      erros[campo.nome] =
        `Máximo de ${campo.maximo} caracteres (agora: ${valor.length})`;
    }
  }
  return erros;
}

// o que vai para o backend, textos sem espaços nas pontas, campo opcional apagado vai como ""
export function corpoParaEnviar(
  config: ConfigVaga,
  valores: Record<string, string>,
) {
  return Object.fromEntries(
    config.campos.map((c) => [c.nome, (valores[c.nome] ?? "").trim()]),
  );
}

// ---------- rota /api/vagas ----------

// devolve o caminho no backend, ou null se a combinação de método e caminho não é permitida
export function resolverRotaVagas(
  metodo: string,
  subcaminho: string,
): string | null {
  const [tipo, id, ...resto] = subcaminho.split("/");
  if (resto.length > 0 || !ehTipoVaga(tipo)) return null;

  const base = tiposDeVaga[tipo].caminhoBackend;
  if (id === undefined)
    return metodo === "GET" || metodo === "POST" ? base : null;
  if (!/^\d+$/.test(id)) return null;
  return metodo === "PATCH" || metodo === "DELETE" ? `${base}/${id}` : null;
}

export async function chamarVagas(
  caminho: string,
  metodo: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  corpo?: unknown,
) {
  const resposta = await fetch(`/api/paginas/vagas/${caminho}`, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
    cache: "no-store",
  });
  const dados: unknown = await resposta.json().catch(() => ({}));
  return { ok: resposta.ok, dados };
}

// atualizar a pré-visualização do editor
export const eventoVagasAtualizadas = "vagas-atualizadas";

export function avisarVagasAtualizadas(caminhoBackend: string) {
  window.dispatchEvent(
    new CustomEvent(eventoVagasAtualizadas, {
      detail: { caminho: caminhoBackend },
    }),
  );
}
