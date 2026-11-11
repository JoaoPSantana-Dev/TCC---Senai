// valida o ícone que o editor guarda dentro de um componente
// só aceita tags e atributos de SVG da lista abaixo
// o frontend tem a mesma regra em frontend/src/lib/iconeSvg.ts no validarIconeCampo.

const tagsIcone = [
  'path',
  'circle',
  'rect',
  'line',
  'polyline',
  'polygon',
  'ellipse',
];

const atributosIcone = [
  'd',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'width',
  'height',
  'points',
  'fill',
  'stroke',
  'strokeWidth',
  'strokeLinecap',
  'strokeLinejoin',
  'fillRule',
  'clipRule',
  'opacity',
];

// devolve a mensagem de erro, ou null se o ícone está certo
export function validarIcone(icone: unknown): string | null {
  const invalido = 'ícone inválido';
  if (typeof icone !== 'object' || icone === null || Array.isArray(icone))
    return invalido;

  const { nome, dados } = icone as { nome?: unknown; dados?: unknown };
  if (typeof nome !== 'string' || !/^[A-Za-z0-9]{1,100}$/.test(nome))
    return invalido;
  if (!Array.isArray(dados) || dados.length === 0 || dados.length > 30)
    return invalido;

  for (const item of dados as unknown[]) {
    if (!Array.isArray(item) || item.length !== 2) return invalido;
    const [tag, atributos] = item as [unknown, unknown];
    if (typeof tag !== 'string' || !tagsIcone.includes(tag)) return invalido;
    if (
      typeof atributos !== 'object' ||
      atributos === null ||
      Array.isArray(atributos)
    ) {
      return invalido;
    }

    for (const [chave, valor] of Object.entries(atributos)) {
      if (chave === 'key') continue;
      const tipoOk = typeof valor === 'string' || typeof valor === 'number';
      if (
        !atributosIcone.includes(chave) ||
        !tipoOk ||
        String(valor).length > 2000
      ) {
        return `${invalido} (atributo não permitido: "${chave}")`;
      }
    }
  }
  return null;
}
