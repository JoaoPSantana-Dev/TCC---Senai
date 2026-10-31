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

const rotasAdministrador = ["/gerenciador-paginas", "/usuarios"];

export async function proxy(requisicao: NextRequest) {
  const caminho = requisicao.nextUrl.pathname;

  if (caminho.startsWith("/_next") || caminho.includes(".")) {
    return NextResponse.next();
  }
  if (rotasPublicas.includes(caminho)) {
    return NextResponse.next();
  }

  const token = requisicao.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", requisicao.url));
  }
  try {
    const { payload } = await jwtVerify(token, chave);

    const rotaAdministrador = rotasAdministrador.some(
      (rota) => caminho === rota || caminho.startsWith(`${rota}/`),
    );
    if (rotaAdministrador && payload.funcao !== "Administrador") {
      return NextResponse.redirect(new URL("/homepage", requisicao.url));
    }

    return NextResponse.next();
  } catch {
    const resposta = NextResponse.redirect(new URL("/", requisicao.url));
    requisicao.cookies.delete("session");
    return resposta;
  }
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
