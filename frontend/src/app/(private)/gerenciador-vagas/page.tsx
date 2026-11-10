import Link from "next/link";
import { redirect } from "next/navigation";
import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { ehAdministrador } from "@/lib/sessao";
import { ehTipoVaga } from "@/lib/vagasAdmin";
import { GerenciadorVagas } from "./components/GerenciadorVagas";

export default async function GerenciadorVagasPagina({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  // o proxy.ts já barra quem não é administrador; aqui é a segunda camada
  if (!(await ehAdministrador())) redirect("/homepage");

  const { tipo } = await searchParams;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <HeaderPrivate />

      <main className="w-full max-w-6xl mx-auto px-6 pb-16 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-zinc-800">
            Gerenciador de vagas
          </h1>
          <Link
            href="/gerenciador-paginas"
            className="text-sm text-zinc-600 hover:text-red-600"
          >
            ← Gerenciador de páginas
          </Link>
        </div>

        <GerenciadorVagas tipoInicial={ehTipoVaga(tipo) ? tipo : "emprego"} />
      </main>
    </div>
  );
}
