import { apiUrl } from "./paginas";

// usado só nas rotas /api de servidor: chama o Nest com o token da sessão quando houver
export async function chamarBackend(
  caminho: string,
  opcoes: { metodo?: "GET" | "POST"; corpo?: unknown; token?: string } = {},
) {
  const { metodo = "POST", corpo, token } = opcoes;

  const resposta = await fetch(`${apiUrl}${caminho}`, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
    cache: "no-store",
  });

  const dados = (await resposta.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  return { ok: resposta.ok, status: resposta.status, dados };
}

export const opcoesCookieSessao = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 dias igual no JWT
};
