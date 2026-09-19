import { NavbarHamburguer } from "@/app/components/shared/NavbarHamburguer";
import { Imagem } from "@/app/components/shared/Imagem";
import {
  Delete02Icon,
  Edit03Icon,
  Plus,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { paginas } from "@/app/components/totem/homepage/HomepageMenu.data";

export default function Paginas() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="w-full flex flex-row bg-white justify-between py-2 border-b-2 border-gray-300 mb-16">
        <NavbarHamburguer className="absolute w-18 h-10 left-6 top-10.5 -translate-y-1/2" />

        <figure className="flex justify-center">
          <Imagem nomeImagem="senai-logo.png" width={200} height={50} />
        </figure>

        <button className="flex pr-10 items-center">
          <HugeiconsIcon
            icon={User02Icon}
            width={40}
            height={40}
            className="self-center cursor-alias"
          />
        </button>
      </header>

      <main className="flex justify-center w-full">
        <section className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-zinc-300">
            <h1 className="text-2xl font-semibold">Gerenciar páginas</h1>

            <button className="flex items-center gap-2 cursor-pointer hover:bg-green-600 rounded-lg text-zinc-700 hover:text-white duration-300 px-2 py-1 text-sm">
              <HugeiconsIcon icon={Plus} size={30} />
              <span>Adicionar nova página</span>
            </button>
          </div>

          <ul className="flex flex-col gap-4 w-full">
            {paginas.map((pagina) => (
              <li
                key={pagina.href}
                className="flex w-full items-center justify-between bg-zinc-50 hover:bg-zinc-100/70 rounded-xl border border-zinc-200 p-4 gap-2"
              >
                <h2 className="font-medium text-zinc-700">{pagina.titulo}</h2>

                <div className="flex items-center gap-2">
                  <button
                    title="Editar"
                    className="p-2 text-zinc-600 cursor-pointer hover:text-blue-600 duration-200"
                  >
                    <HugeiconsIcon icon={Edit03Icon} size={20} />
                  </button>
                  <button
                    title="Excluir"
                    className="p-2 text-zinc-600 cursor-pointer hover:text-red-600 duration-200"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
