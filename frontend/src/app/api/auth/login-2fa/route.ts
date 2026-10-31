import { chamarBackend, opcoesCookieSessao } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(requisicao: Request) {
  const corpo = await requisicao.json().catch(() => null);
  const jar = await cookies();
  const tokenTemporario = jar.get("pre_2fa")?.value;

  if (!tokenTemporario) {
    return NextResponse.json(
      { message: "Sua verificação expirou. Entre novamente", reiniciar: true },
      { status: 401 },
    );
  }
  if (!corpo?.codigo) {
    return NextResponse.json({ message: "Informe o código" }, { status: 400 });
  }

  const { ok, status, dados } = await chamarBackend("/login/2fa", {
    corpo: { tokenTemporario, codigo: String(corpo.codigo) },
  });

  if (!ok) {
    const expirou = dados.codigo === "PRE_2FA_EXPIRADO";
    if (expirou) jar.delete({ name: "pre_2fa", path: "/api/auth" });
    return NextResponse.json(
      { message: dados.message, reiniciar: expirou },
      { status },
    );
  }

  jar.delete({ name: "pre_2fa", path: "/api/auth" });
  jar.set("session", String(dados.tokenAcesso), opcoesCookieSessao);
  return NextResponse.json({ usuario: dados.usuario });
}
