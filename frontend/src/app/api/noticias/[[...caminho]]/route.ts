import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiUrl } from "@/lib/paginas";

// usada pelo painel de notícias do editor para enviar a imagem
// repassa ao backend com o token do cookie httpOnly sem o navegador não ver o token
// POST /api/noticias, PATCH e DELETE /api/noticias/<id>
// o corpo do POST/PATCH é multipart/form-data com titulo + imagem
// não colocar Content-Type aqui, o fetch define sozinho com o "boundary"
// limite de 5mb
type Metodo = "POST" | "PATCH" | "DELETE";
type Contexto = { params: Promise<{ caminho?: string[] }> };

async function repassar(
  requisicao: Request,
  contexto: Contexto,
  metodo: Metodo,
) {
  const { caminho = [] } = await contexto.params;
  const [id, ...resto] = caminho;

  const rotaValida =
    resto.length === 0 &&
    (metodo === "POST" ? id === undefined : /^\d+$/.test(id ?? ""));
  if (!rotaValida) {
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

  let corpo: FormData | undefined;
  if (metodo !== "DELETE") {
    try {
      corpo = await requisicao.formData();
    } catch {
      return NextResponse.json({ message: "Envio inválido" }, { status: 400 });
    }
  }

  try {
    const resposta = await fetch(`${apiUrl}/noticias${id ? `/${id}` : ""}`, {
      method: metodo,
      headers: { Authorization: `Bearer ${token}` },
      body: corpo,
      cache: "no-store",
    });
    const dados = await resposta.json().catch(() => ({}));
    return NextResponse.json(dados, { status: resposta.status });
  } catch {
    return NextResponse.json(
      { message: "Falha ao conectar com o servidor" },
      { status: 502 },
    );
  }
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
