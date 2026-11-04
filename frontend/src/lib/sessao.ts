import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const chave = new TextEncoder().encode(process.env.JWT_SECRET);

export async function obterSessao() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, chave);
    return { id: Number(payload.sub), funcao: String(payload.funcao ?? "") };
  } catch {
    return null;
  }
}

export async function ehAdministrador() {
  return (await obterSessao())?.funcao === "Administrador";
}
