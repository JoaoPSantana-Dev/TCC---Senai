import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from 'crypto';

// TOTP (RFC 6238) feito só com o módulo crypto do Node, sem dependência externa.
// Compatível com Google Authenticator, Microsoft Authenticator, Authy, 1Password etc.

const alfabetoBase32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const passoSegundos = 30;
const digitos = 6;

export function base32Codificar(dados: Buffer): string {
  let bits = 0;
  let valor = 0;
  let saida = '';

  for (const byte of dados) {
    valor = (valor << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      saida += alfabetoBase32[(valor >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) saida += alfabetoBase32[(valor << (5 - bits)) & 31];

  return saida;
}

export function base32Decodificar(texto: string): Buffer {
  const limpo = texto.replace(/=+$/g, '').replace(/\s+/g, '').toUpperCase();
  let bits = 0;
  let valor = 0;
  const bytes: number[] = [];

  for (const letra of limpo) {
    const indice = alfabetoBase32.indexOf(letra);
    if (indice === -1) throw new Error('Segredo base32 inválido');
    valor = (valor << 5) | indice;
    bits += 5;
    if (bits >= 8) {
      bytes.push((valor >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

export function gerarSegredoTotp(): string {
  return base32Codificar(randomBytes(20));
}

export function passoAtual(agora = Date.now()): number {
  return Math.floor(agora / 1000 / passoSegundos);
}

export function codigoTotp(segredo: string, passo: number): string {
  const contador = Buffer.alloc(8);
  contador.writeBigUInt64BE(BigInt(passo));

  const hmac = createHmac('sha1', base32Decodificar(segredo))
    .update(contador)
    .digest();

  const deslocamento = hmac[hmac.length - 1] & 0x0f;
  const numero =
    ((hmac[deslocamento] & 0x7f) << 24) |
    (hmac[deslocamento + 1] << 16) |
    (hmac[deslocamento + 2] << 8) |
    hmac[deslocamento + 3];

  return String(numero % 10 ** digitos).padStart(digitos, '0');
}

function iguais(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

// aceita o código do passo atual e de 1 passo antes/depois (relógio do celular um pouco fora)
// devolve o passo que bateu, para gravar e impedir que o mesmo código seja usado duas vezes
export function verificarTotp(
  segredo: string,
  codigo: string,
  ultimoPasso: number | null,
  agora = Date.now(),
  janela = 1,
): number | null {
  if (!new RegExp(`^\\d{${digitos}}$`).test(codigo)) return null;

  const atual = passoAtual(agora);
  for (let desvio = -janela; desvio <= janela; desvio++) {
    const passo = atual + desvio;
    if (ultimoPasso !== null && passo <= ultimoPasso) continue;
    if (iguais(codigoTotp(segredo, passo), codigo)) return passo;
  }
  return null;
}

// endereço que o aplicativo autenticador lê pelo QR code
export function montarUriTotp(
  segredo: string,
  conta: string,
  emissor = 'Totem SENAI',
) {
  const rotulo = `${encodeURIComponent(emissor)}:${encodeURIComponent(conta)}`;
  const parametros = new URLSearchParams({
    secret: segredo,
    issuer: emissor,
    algorithm: 'SHA1',
    digits: String(digitos),
    period: String(passoSegundos),
  });
  return `otpauth://totp/${rotulo}?${parametros.toString()}`;
}

// o segredo do TOTP fica criptografado no banco (AES-256-GCM)
function chaveDeCifra(): Buffer {
  const base = process.env.TOTP_CHAVE ?? process.env.JWT_SECRET;
  if (!base)
    throw new Error('Defina TOTP_CHAVE (ou JWT_SECRET) no .env do backend');
  return createHash('sha256').update(base).digest();
}

export function cifrar(texto: string): string {
  const iv = randomBytes(12);
  const cifra = createCipheriv('aes-256-gcm', chaveDeCifra(), iv);
  const conteudo = Buffer.concat([cifra.update(texto, 'utf8'), cifra.final()]);
  return [iv, cifra.getAuthTag(), conteudo]
    .map((parte) => parte.toString('base64url'))
    .join('.');
}

export function decifrar(valor: string): string {
  const [iv, etiqueta, conteudo] = valor
    .split('.')
    .map((parte) => Buffer.from(parte, 'base64url'));
  const decifra = createDecipheriv('aes-256-gcm', chaveDeCifra(), iv);
  decifra.setAuthTag(etiqueta);
  return Buffer.concat([decifra.update(conteudo), decifra.final()]).toString(
    'utf8',
  );
}

// códigos de recuperação de 8 códigos de uso único, só o hash fica no banco
export function gerarCodigosRecuperacao(quantidade = 8): string[] {
  return Array.from({ length: quantidade }, () => {
    const hex = randomBytes(5).toString('hex');
    return `${hex.slice(0, 5)}-${hex.slice(5)}`;
  });
}

export function hashCodigoRecuperacao(codigo: string): string {
  return createHash('sha256')
    .update(codigo.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .digest('hex');
}

// token do link de "esqueci a senha", o banco guarda só o hash
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function gerarToken(): string {
  return randomBytes(32).toString('hex');
}
