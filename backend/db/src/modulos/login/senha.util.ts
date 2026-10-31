import { timingSafeEqual } from 'crypto';
import * as bcrypt from 'bcryptjs';

const custo = 12;

// hash falso gasta o mesmo tempo quando o email não existe,
// para não dar para descobrir quais emails estão cadastrados pelo tempo da resposta
const hashFalso = bcrypt.hashSync('senha-que-nunca-sera-usada', custo);

export function gerarHashSenha(senha: string): Promise<string> {
  return bcrypt.hash(senha, custo);
}

export function ehHash(valor: string): boolean {
  return /^\$2[aby]\$\d{2}\$.{53}$/.test(valor);
}

export async function conferirSenha(
  senha: string,
  armazenada: string | null,
): Promise<{ ok: boolean; precisaAtualizar: boolean }> {
  if (!armazenada) {
    await bcrypt.compare(senha, hashFalso);
    return { ok: false, precisaAtualizar: false };
  }

  if (ehHash(armazenada)) {
    return {
      ok: await bcrypt.compare(senha, armazenada),
      precisaAtualizar: false,
    };
  }

  // se a senha for antiga, salva em texto puro, confere e pede para regravar já com hash
  const a = Buffer.from(senha);
  const b = Buffer.from(armazenada);
  const ok = a.length === b.length && timingSafeEqual(a, b);
  return { ok, precisaAtualizar: ok };
}
