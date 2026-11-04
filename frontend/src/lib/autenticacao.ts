import * as z from "zod";

export const limiteSenha = 72; // o backend (bcrypt) ignora o que passar disso

// mesma regra do backend, senha-forte.decorator.ts
export const regrasSenha = [
  {
    id: "tamanho",
    texto: "Pelo menos 8 caracteres",
    valida: (s: string) => s.length >= 8,
  },
  {
    id: "letra",
    texto: "Uma letra",
    valida: (s: string) => /[A-Za-z]/.test(s),
  },
  { id: "numero", texto: "Um número", valida: (s: string) => /\d/.test(s) },
];

export const schemaSenhaForte = z
  .string()
  .min(8, "A senha precisa ter no mínimo 8 caracteres")
  .max(limiteSenha, `A senha pode ter no máximo ${limiteSenha} caracteres`)
  .regex(/[A-Za-z]/, "A senha precisa ter pelo menos uma letra")
  .regex(/\d/, "A senha precisa ter pelo menos um número");

// o Nest manda "message" como texto ou, nos erros de validação, como lista de textos
export function mensagemDoBackend(dados: unknown, padrao: string): string {
  const mensagem = (dados as { message?: unknown } | null)?.message;
  if (Array.isArray(mensagem) && mensagem.length > 0)
    return mensagem.map(String).join("; ");
  if (typeof mensagem === "string" && mensagem) return mensagem;
  return padrao;
}
