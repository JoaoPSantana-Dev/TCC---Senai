// regras compartilhadas dos dtos e service
// o frontend tem uma cópia dessas regras em
// frontend/src/lib/paginas.ts e frontend/src/app/(private)/gerenciador-paginas/components/registroComponentes.tsx
// se mudar algo aqui, lembre de mudar lá também

export const tiposPagina = ['Administrador', 'Totem'] as const;

// letras minúsculas, números e hífen. Sem hífen no começo/fim e sem "--"
export const regexSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const limiteSlug = 100;
export const limiteNomePagina = 100;
export const limiteComponentes = 50;

// slugs que já são rotas fixas do frontend
export const slugsReservados: readonly string[] = [
  'login',
  'cadastro',
  'esqueci-senha',
  'gerenciador-paginas',
  'usuarios',
  'mapa',
  'vagas-empregos',
  'vagas-estagios',
  'vagas-cursos',
  'api',
  'pre-visualizacao-pagina',
];

// páginas que o totem busca pelo slug (se forem apagadas, tudo explode)
export const slugsDoSistema: readonly string[] = [
  'sobre',
  'descanso',
  'homepage',
];

const iconesMenu = [
  'info',
  'predio',
  'relogio',
  'mapa',
  'emprego',
  'estagio',
  'curso',
  'biblioteca',
] as const;

export type TipoCampo = 'string' | 'boolean';

export interface CampoSchema {
  tipo: TipoCampo;
  obrigatorio?: boolean;
  max?: number;
  opcoes?: readonly string[];
  formato?: 'caminho' | 'arquivo-imagem';
}

// componentes que existem e quais propriedades cada um aceita
// quando criar um componente novo no frontend, crie ele aqui também
export const schemaComponentes: Record<string, Record<string, CampoSchema>> = {
  LinhaSobre: {
    texto: { tipo: 'string', obrigatorio: true, max: 1000 },
    nomeImagem: {
      tipo: 'string',
      obrigatorio: true,
      formato: 'arquivo-imagem',
    },
    alt: { tipo: 'string', max: 200 },
    primeiroEstilo: { tipo: 'boolean', obrigatorio: true },
  },
  TelaDescanso: {
    titulo: { tipo: 'string', obrigatorio: true, max: 150 },
    nomeImagem: {
      tipo: 'string',
      obrigatorio: true,
      formato: 'arquivo-imagem',
    },
    alt: { tipo: 'string', max: 200 },
    textoBotao: { tipo: 'string', obrigatorio: true, max: 60 },
    destino: {
      tipo: 'string',
      obrigatorio: true,
      max: 200,
      formato: 'caminho',
    },
  },
  CartaoMenu: {
    titulo: { tipo: 'string', obrigatorio: true, max: 80 },
    href: { tipo: 'string', obrigatorio: true, max: 200, formato: 'caminho' },
    icone: { tipo: 'string', obrigatorio: true, opcoes: iconesMenu },
  },
};

export const tiposComponentes = Object.keys(schemaComponentes);

const regexCaminho = /^\/[A-Za-z0-9\-_/]*$/;
const regexArquivoImagem = /^[A-Za-z0-9._-]+\.(png|jpe?g|webp|svg|gif)$/i;

// devolve a lista de erros das props de apenas um componente
export function validarPropsComponente(
  tipo: string,
  props: Record<string, unknown>,
  posicao: number,
): string[] {
  const schema = schemaComponentes[tipo];
  const prefixo = `Componente ${posicao + 1} (${tipo})`;

  if (!schema) return [`${prefixo}: tipo de componente desconhecido`];

  const erros: string[] = [];

  for (const nome of Object.keys(props)) {
    if (!(nome in schema)) {
      erros.push(`${prefixo}: propriedade "${nome}" não é permitida`);
    }
  }

  for (const [nome, campo] of Object.entries(schema)) {
    const valor = props[nome];

    if (campo.tipo === 'boolean') {
      if (valor === undefined && campo.obrigatorio) {
        erros.push(`${prefixo}: "${nome}" é obrigatório`);
      } else if (valor !== undefined && typeof valor !== 'boolean') {
        erros.push(`${prefixo}: "${nome}" deve ser verdadeiro ou falso`);
      }
      continue;
    }

    if (valor === undefined || valor === null || valor === '') {
      if (campo.obrigatorio) erros.push(`${prefixo}: "${nome}" é obrigatório`);
      continue;
    }

    if (typeof valor !== 'string') {
      erros.push(`${prefixo}: "${nome}" deve ser um texto`);
      continue;
    }

    if (campo.obrigatorio && valor.trim() === '') {
      erros.push(`${prefixo}: "${nome}" é obrigatório`);
    }
    if (campo.max && valor.length > campo.max) {
      erros.push(
        `${prefixo}: "${nome}" deve ter no máximo ${campo.max} caracteres`,
      );
    }
    if (campo.opcoes && !campo.opcoes.includes(valor)) {
      erros.push(
        `${prefixo}: "${nome}" deve ter um desses valores: ${campo.opcoes.join(', ')}`,
      );
    }
    if (campo.formato === 'caminho' && !regexCaminho.test(valor)) {
      erros.push(
        `${prefixo}: "${nome}" deve ser um caminho interno que comece com "/"`,
      );
    }
    if (campo.formato === 'arquivo-imagem' && !regexArquivoImagem.test(valor)) {
      erros.push(
        `${prefixo}: "${nome}" deve ser o nome de um arquivo de imagem (ex.: foto.png)`,
      );
    }
  }

  return erros;
}
