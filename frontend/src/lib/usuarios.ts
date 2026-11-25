import * as z from "zod";

export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  funcao: string;
  unidade: string;
  totpAtivo: boolean;
}

export const funcoesUsuario = ["Administrador", "Visitante"] as const;
export type FuncaoUsuario = (typeof funcoesUsuario)[number];

// mesmas unidades do cadastro
export const unidades = ["SENAI Mariano Ferraz"];

// se o usuário tem uma unidade que não está na lista, ela continua aparecendo no select
export function opcoesUnidade(atual?: string) {
  return atual && !unidades.includes(atual) ? [atual, ...unidades] : unidades;
}

export const schemaDadosUsuario = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo"),
  email: z.email("Endereço de email inválido"),
  unidade: z.string().min(1, "Unidade é obrigatória"),
});

// chama as rotas /api/usuarios, elas repassam ao backend com o token do cookie
export async function chamarUsuarios(
  caminho: string,
  metodo: "GET" | "PATCH" | "POST" = "GET",
  corpo?: unknown,
) {
  const resposta = await fetch(`/api/usuarios${caminho ? `/${caminho}` : ""}`, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
    cache: "no-store",
  });
  const dados: unknown = await resposta.json().catch(() => ({}));
  return { ok: resposta.ok, dados };
}

// para a busca ignora maiúsculas e acentos
export function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

// iniciais para o avatar com a primeira letra do primeiro e do último nome
export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}
