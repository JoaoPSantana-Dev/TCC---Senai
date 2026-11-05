import { chamarBackend, opcoesCookieSessao } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(requisicao: Request) {
  const corpo = await requisicao.json().catch(() => null);
  if (!corpo?.email || !corpo?.senha) {
    return NextResponse.json(
      { message: "Informe email e senha" },
      { status: 400 },
    );
  }

  const { ok, status, dados } = await chamarBackend("/login", {
    corpo: { email: corpo.email, senha: corpo.senha },
  });
  if (!ok) return NextResponse.json({ message: dados.message }, { status });

  const jar = await cookies();

  // senha certa, mas o usuário tem 2fa: guarda o token certo num cookie que o javascript não lê
  if (dados.precisa2fa) {
    jar.set("pre_2fa", String(dados.tokenTemporario), {
      ...opcoesCookieSessao,
      path: "/api/auth",
      maxAge: 60 * 5,
    });
    return NextResponse.json({ precisa2fa: true });
  }

  jar.set("session", String(dados.tokenAcesso), opcoesCookieSessao);
  return NextResponse.json({ usuario: dados.usuario });
}
