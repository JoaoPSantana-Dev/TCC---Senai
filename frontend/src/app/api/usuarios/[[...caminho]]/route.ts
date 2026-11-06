import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { chamarBackend } from "@/lib/backend";

// repassa para o backend /usuarios/... anexando o token que está no cookie httpOnly
// só as combinações abaixo passam, o backend ainda confere quem é administrador
type Metodo = "GET" | "POST" | "PATCH";

const rotasPermitidas: { metodo: Metodo; caminho: RegExp }[] = [
  { metodo: "GET", caminho: /^$/ }, // lista de usuários
  { metodo: "GET", caminho: /^eu$/ }, // meus dados
  { metodo: "PATCH", caminho: /^eu$/ }, // editar meus dados
  { metodo: "POST", caminho: /^eu\/senha$/ }, // trocar minha senha
  { metodo: "PATCH", caminho: /^\d+$/ }, // editar outro usuário
];

type Contexto = { params: Promise<{ caminho?: string[] }> };

async function repassar(
  requisicao: Request,
  contexto: Contexto,
  metodo: Metodo,
) {
  const { caminho = [] } = await contexto.params;
  const subcaminho = caminho.join("/");

  const permitida = rotasPermitidas.some(
    (rota) => rota.metodo === metodo && rota.caminho.test(subcaminho),
  );
  if (!permitida) {
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
    metodo === "GET" ? undefined : await requisicao.json().catch(() => ({}));
  const { status, dados } = await chamarBackend(
    `/usuarios${subcaminho ? `/${subcaminho}` : ""}`,
    { metodo, corpo, token },
  );

  return NextResponse.json(dados, { status });
}

export function GET(requisicao: Request, contexto: Contexto) {
  return repassar(requisicao, contexto, "GET");
}

export function POST(requisicao: Request, contexto: Contexto) {
  return repassar(requisicao, contexto, "POST");
}

export function PATCH(requisicao: Request, contexto: Contexto) {
  return repassar(requisicao, contexto, "PATCH");
}
