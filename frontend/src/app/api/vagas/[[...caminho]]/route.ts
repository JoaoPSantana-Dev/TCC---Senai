import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { chamarBackend } from "@/lib/backend";
import { resolverRotaVagas } from "@/lib/vagasAdmin";

// repassa para o backend /vagas-emprego, /vagas-estagio, /vagas-curso com o token do cookie httpOnly.
// só passam listar e criar em /api/vagas/<tipo>, e editar e apagar em /api/vagas/<tipo>/<id>.
// o backend ainda confere que quem escreve é administrador.
type Metodo = "GET" | "POST" | "PATCH" | "DELETE";
type Contexto = { params: Promise<{ caminho?: string[] }> };

async function repassar(
  requisicao: Request,
  contexto: Contexto,
  metodo: Metodo,
) {
  const { caminho = [] } = await contexto.params;
  const destino = resolverRotaVagas(metodo, caminho.join("/"));

  if (!destino) {
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
    metodo === "POST" || metodo === "PATCH"
      ? await requisicao.json().catch(() => ({}))
      : undefined;

  const { status, dados } = await chamarBackend(destino, {
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

export function PATCH(requisicao: Request, contexto: Contexto) {
  return repassar(requisicao, contexto, "PATCH");
}

export function DELETE(requisicao: Request, contexto: Contexto) {
  return repassar(requisicao, contexto, "DELETE");
}
