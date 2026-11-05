import { chamarBackend } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// repassa para o backend "/2fa/<acao>"" anexando o token que está no cookie httpOnly
const acoesPermitidas = {
  status: "GET",
  configurar: "POST",
  ativar: "POST",
  desativar: "POST",
} as const;

type Acao = keyof typeof acoesPermitidas;
type Contexto = { params: Promise<{ acao: string }> };

async function repassar(
  requisicao: Request,
  contexto: Contexto,
  metodo: "GET" | "POST",
) {
  const { acao } = await contexto.params;
  if (!(acao in acoesPermitidas) || acoesPermitidas[acao as Acao] !== metodo) {
    return NextResponse.json(
      { message: "Rota não encontrada" },
      { status: 404 },
    );
  }

  const token = (await cookies()).get("session")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Faça login para continuar" },
      { status: 401 },
    );
  }

  const corpo =
    metodo === "POST" ? await requisicao.json().catch(() => ({})) : undefined;
  const { status, dados } = await chamarBackend(`/2fa/${acao}`, {
    metodo,
    corpo,
    token,
  });
  return NextResponse.json(dados, { status });
}

export function GET(requisicao: Request, contexto: Contexto) {
  return repassar(requisicao, contexto, "GET");
}

export function POST(requisicao: Request, contexto: Contexto) {
  return repassar(requisicao, contexto, "POST");
}
