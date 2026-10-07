import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(requisicao:Request) {
    const {email,senha} = await requisicao.json()

    const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({email, senha}),
    })

    
    const dados = await response.json()

    if (!response.ok){
        return NextResponse.json(
            {Message: dados.Message},
            {status: response.status}) 
    };
    (await cookies()).set("session", dados.tokenAcesso,{
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({usuario:dados.usuario})
}