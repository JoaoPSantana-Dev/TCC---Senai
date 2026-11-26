import { ehAdministrador } from "@/lib/sessao";
import { redirect } from "next/navigation";
import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { GerenciadorUsuarios } from "./components/GerenciadorUsuarios";

export default async function Usuarios() {
  // o proxy.ts já barra quem não é administrador, mas aqui é a segunda camada
  if (!(await ehAdministrador())) redirect("/homepage");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <HeaderPrivate />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Usuários</h1>
          <p className="mt-1 text-zinc-600">
            Veja, busque e edite as pessoas que têm conta no sistema
          </p>
        </div>

        <GerenciadorUsuarios />
      </main>
    </div>
  );
}
