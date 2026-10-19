import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


//=============================================================================
//tras o "JWT_SECRET" do .env e criptografa e usa a string 

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

//=============================================================================
//mostra a pagina que sera redirecionado quando possuir o token

const rotaPadraoPrivada = "/homepage"

//=============================================================================
//verifica se o usuario tem ou nao o token
async function possuiToken(token?:string) {
  if(!token) return false
  try {
    await jwtVerify(token, chave);
    return true;
  }catch{
    return false
  }
}
//============================================================================
export async function proxy(requisicao: NextRequest) {

//============================================================================  
// armazena todas as url do site
  const caminho = requisicao.nextUrl.pathname;

//============================================================================
//se tever esses caminhos nao sera necessario ter token 
  if (caminho.startsWith("/_next") || caminho.includes(".")) {
    return NextResponse.next();
  }

//============================================================================
//algumas verificaçãos
  const token = requisicao.cookies.get("session")?.value;//armazena token/cookie

  const logado = await possuiToken(token);//valida se tem ou nao o token

  const rotaPublica = rotasPublicas.includes(caminho)//adiciona rotas que nao precisa de token para acessar

//============================================================================
//checa se o usuario tem o token e esta acessado uma rota que nao pode com o tokem
  if (logado && rotaPublica) {
    return NextResponse.redirect(new URL(rotaPadraoPrivada,requisicao.url))
  }

//============================================================================
// dexa passar as rotas publicas
  if (rotaPublica){
    return NextResponse.next();
  }

//============================================================================
//retorna para rotas publicas caso nao tenha feito o login   
  if(!logado) {
    const resposta = NextResponse.redirect(new URL("/", requisicao.url));
    if(token){//deleta token experados
      resposta.cookies.delete("session");
    }  
    return resposta;
  }

//=============================================================================  
}//se tever esses caminhos nao sera necessario ter token 
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};