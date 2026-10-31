import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const chave = new TextEncoder().encode(process.env.JWT_SECRET);

const rotasPublicas = [
  "/",
  "/login",
  "/cadastro",
  "/esqueci-senha",
  "/login/components",
];
const prefixosPublicos = ["/api/auth/"]; // login, 2fa e logout
const rotasAdministrador = ["/gerenciador-paginas", "/usuarios"];

export async function proxy(requisicao: NextRequest) {
  const caminho = requisicao.nextUrl.pathname;
  const ehApi = caminho.startsWith("/api/");

  if (caminho.startsWith("/_next") || caminho.includes(".")) {
    return NextResponse.next();
  }
  if (
    rotasPublicas.includes(caminho) ||
    prefixosPublicos.some((prefixo) => caminho.startsWith(prefixo))
  ) {
    return NextResponse.next();
  }

  const recusar = () =>
    ehApi
      ? NextResponse.json(
          { message: "Faça login para continuar" },
          { status: 401 },
        )
      : NextResponse.redirect(new URL("/", requisicao.url));

  const token = requisicao.cookies.get("session")?.value;
  if (!token) return recusar();

  try {
    const { payload } = await jwtVerify(token, chave);

    // o token curto do 2FA tipo "2fa" não vale como sessão
    if (payload.tipo !== "sessao") throw new Error("token não é de sessão");

    const rotaAdministrador = rotasAdministrador.some(
      (rota) => caminho === rota || caminho.startsWith(`${rota}/`),
    );
    if (rotaAdministrador && payload.funcao !== "Administrador") {
      return NextResponse.redirect(new URL("/homepage", requisicao.url));
    }

    return NextResponse.next();
  } catch {
    const resposta = recusar();
    requisicao.cookies.delete("session"); // apaga o cookie inválido na resposta
    return resposta;
  }
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
