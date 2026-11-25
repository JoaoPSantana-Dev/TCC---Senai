import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

//=============================================================================
//traz o "JWT_SECRET" do .env, criptografa e usa a string

const chave = new TextEncoder().encode(process.env.JWT_SECRET);

//=============================================================================
//mostra as rotas que podem ser acessada sem o token
const rotasPublicas = [
  "/",
  "/login",
  "/cadastro",
  "/esqueci-senha",
  "/login/components",
];
const prefixosPublicos = ["/api/auth/"]; // login, 2fa e logout
const rotasAdministrador = ["/gerenciador-paginas", "/usuarios"];

//=============================================================================
//mostra a pagina que será redirecionado quando possuir o token

const rotaPadraoPrivada = "/homepage";

//=============================================================================
//verifica se o usuario tem ou nao o token
async function possuiToken(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, chave);
    // o token curto do 2FA tipo "2fa" não vale como sessão
    if (payload.tipo !== "sessao") return null;

    return payload;
  } catch {
    return null;
  }
}
//============================================================================
export async function proxy(requisicao: NextRequest) {
  //============================================================================
  // armazena todas as url do site
  const caminho = requisicao.nextUrl.pathname;
  const ehApi = caminho.startsWith("/api/");

  //============================================================================
  //se tiver esses caminhos não será necessario ter token
  if (caminho.startsWith("/_next") || caminho.includes(".")) {
    return NextResponse.next();
  }

  if (prefixosPublicos.some((prefixo) => caminho.startsWith(prefixo))) {
    return NextResponse.next();
  }

  //============================================================================
  //algumas verificaçãos
  const token = requisicao.cookies.get("session")?.value; //armazena token/cookie

  const sessao = await possuiToken(token); //valida se tem ou não o token

  const rotaPublica = rotasPublicas.includes(caminho); //adiciona rotas que não precisa de token para acessar

  //============================================================================
  //checa se o usuário tem o token e está acessando uma rota que não pode com o token
  if (sessao && rotaPublica) {
    return NextResponse.redirect(new URL(rotaPadraoPrivada, requisicao.url));
  }

  //============================================================================
  // deixa passar as rotas públicas
  if (rotaPublica) {
    return NextResponse.next();
  }

  //============================================================================
  //retorna para rotas públicas caso não tenha feito o login
  if (!sessao) {
    const resposta = ehApi
      ? NextResponse.json(
          { message: "Faça login para continuar" },
          { status: 401 },
        )
      : NextResponse.redirect(new URL("/", requisicao.url));

    if (token) {
      //deleta token experados
      resposta.cookies.delete("session");
    }
    return resposta;
  }
  const rotaAdministrador = rotasAdministrador.some(
    (rota) => caminho === rota || caminho.startsWith(`${rota}/`),
  );
  if (rotaAdministrador && sessao.funcao !== "Administrador") {
    return NextResponse.redirect(new URL("/homepage", requisicao.url));
  }

  return NextResponse.next();

  //=============================================================================
} //se tiver esses caminhos não será necessário ter token
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
