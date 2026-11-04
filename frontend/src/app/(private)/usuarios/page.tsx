import { ehAdministrador } from "@/lib/sessao";
import { redirect } from "next/navigation";
import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { GerenciadorUsuarios } from "./components/GerenciadorUsuarios";

export default async function Usuarios() {
  // o proxy.ts já barra quem não é administrador, mas aqui é a segunda camada
  if (!(await ehAdministrador())) redirect("/homepage");

  return (
    <div className="w-screen h-screen flex flex-col">
      <HeaderPrivate />

      <main className="w-full max-w-5xl mx-auto px-6 pb-16 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-zinc-800">Usuários</h1>
        <GerenciadorUsuarios />
      </main>
    </div>
  );
}
