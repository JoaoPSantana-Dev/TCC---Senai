import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const chave = new TextEncoder().encode(process.env.JWT_SECRET);

const rotasPublicas=["/", "/login", "/cadastro", "/esqueci-senha", "/login/components"]

export async function proxy(requisicao:NextRequest) {

    const caminho = requisicao.nextUrl.pathname;

    if (caminho.startsWith("/_next")|| caminho.includes('.')){
        return NextResponse.next()
    }
    if(rotasPublicas.includes(caminho)){
        
        return NextResponse.next()
    }

    const token = requisicao.cookies.get("session")?.value;

    if(!token){
        return NextResponse.redirect(new URL("/",requisicao.url))
    }
    try{
        await jwtVerify(token, chave);
        return NextResponse.next()
    }
    catch {
        const resposta = NextResponse.redirect(new URL("/", requisicao.url))
        requisicao.cookies.delete("session")
        return resposta;
    }
}

export const config = {
    metcher :["/((?!_next|.*\\..*).*)"],
};