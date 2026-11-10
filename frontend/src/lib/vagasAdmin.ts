// gerenciador de vagas, o que cada tipo de emprego, estágio ou curso tem de campos e as regras de validação
// as regras são as mesmas dos DTOs do backend

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
  rotuloAba: string;
  idCampo: string;
  campoTitulo: string;
  colunas: { rotulo: string; campo: string }[];
  campos: CampoVaga[];
  textoNovo: string; // botão
  tituloNovo: string; // título do formulário de criação
  nomeSingular: string; // "vaga de emprego", "curso"
  artigoExcluida: "excluída" | "excluído";
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
    rotuloAba: "Vagas de emprego",
    idCampo: "idEmprego",
    campoTitulo: "cargo",
    colunas: [
      { rotulo: "Cargo", campo: "cargo" },
      { rotulo: "Empresa", campo: "nomeEmpresa" },
      { rotulo: "Área", campo: "areaEmprego" },
    ],
    campos: camposDeVaga("areaEmprego"),
    textoNovo: "Adicionar vaga",
    tituloNovo: "Nova vaga de emprego",
    nomeSingular: "vaga",
    artigoExcluida: "excluída",
    textoVazio: "Nenhuma vaga de emprego cadastrada.",
  },
  estagio: {
    tipo: "estagio",
    rotuloAba: "Vagas de estágio",
    idCampo: "idEstagio",
    campoTitulo: "cargo",
    colunas: [
      { rotulo: "Cargo", campo: "cargo" },
      { rotulo: "Empresa", campo: "nomeEmpresa" },
      { rotulo: "Área", campo: "areaEstagio" },
    ],
    campos: camposDeVaga("areaEstagio"),
    textoNovo: "Adicionar vaga",
    tituloNovo: "Nova vaga de estágio",
    nomeSingular: "vaga",
    artigoExcluida: "excluída",
    textoVazio: "Nenhuma vaga de estágio cadastrada.",
  },
  curso: {
    tipo: "curso",
    rotuloAba: "Cursos",
    idCampo: "idCurso",
    campoTitulo: "nomeCurso",
    colunas: [
      { rotulo: "Curso", campo: "nomeCurso" },
      { rotulo: "Área", campo: "areaCurso" },
      { rotulo: "Turno", campo: "turno" },
    ],
    campos: [
      campoVaga("nomeCurso", "Nome do curso", true),
      campoVaga("areaCurso", "Área", false),
      campoVaga("cargaHoraria", "Carga horária", false),
      campoVaga("turno", "Turno", false),
      campoVaga("contato", "Contato", false),
      campoVaga("descricao", "Descrição", false, "textarea"),
      campoVaga("requisitos", "Requisitos", false, "textarea"),
    ],
    textoNovo: "Adicionar curso",
    tituloNovo: "Novo curso",
    nomeSingular: "curso",
    artigoExcluida: "excluído",
    textoVazio: "Nenhum curso cadastrado.",
  },
};

export const ordemDosTipos: TipoVaga[] = ["emprego", "estagio", "curso"];

export function ehTipoVaga(valor: unknown): valor is TipoVaga {
  return valor === "emprego" || valor === "estagio" || valor === "curso";
}

function texto(valor: unknown): string {
  return valor === null || valor === undefined ? "" : String(valor);
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

// ---------- rotas /api/vagas usadas pela rota do Next e pelos testes ----------

const destinosBackend: Record<TipoVaga, string> = {
  emprego: "/vagas-emprego",
  estagio: "/vagas-estagio",
  curso: "/vagas-curso",
};

// devolve o caminho no backend, ou null se a combinação de método e caminho não é permitida
export function resolverRotaVagas(
  metodo: string,
  subcaminho: string,
): string | null {
  const [tipo, id, ...resto] = subcaminho.split("/");
  if (resto.length > 0 || !ehTipoVaga(tipo)) return null;

  const base = destinosBackend[tipo];
  if (id === undefined)
    return metodo === "GET" || metodo === "POST" ? base : null;
  if (!/^\d+$/.test(id)) return null;
  return metodo === "PATCH" || metodo === "DELETE" ? `${base}/${id}` : null;
}

// chama as rotas /api/vagas, elas repassam ao backend com o token do cookie
export async function chamarVagas(
  caminho: string,
  metodo: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  corpo?: unknown,
) {
  const resposta = await fetch(`/api/vagas/${caminho}`, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
    cache: "no-store",
  });
  const dados: unknown = await resposta.json().catch(() => ({}));
  return { ok: resposta.ok, dados };
}
