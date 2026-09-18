import { NavbarHamburguer } from "@/app/components/shared/NavbarHamburguer";
import { Imagem } from "@/app/components/shared/Imagem";
import { User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Paginas() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="w-full flex flex-row bg-white justify-between py-2 border-b-2 border-gray-300 mb-8">
        <NavbarHamburguer className="absolute w-18 h-10 left-6 top-10.5 -translate-y-1/2" />

        <figure className="flex justify-center">
          <Imagem nomeImagem="senai-logo.png" width={200} height={50} />
        </figure>

        <div className="flex pr-10 items-center">
          <HugeiconsIcon
            icon={User02Icon}
            width={40}
            height={40}
            className="self-center cursor-alias"
          />
        </div>
      </header>

      <main className="flex justify-center items-center w-full">
        <section className="grid grid-cols-3 bg-white w-1/3 md:w-2/3">
          <div className="flex flex-col justify-center">
            <h1>Nome</h1>
            <p>asdalwh</p>
          </div>
          <div className="flex flex-col justify-center">
            <h1>Tipo</h1>
            <p>asdalwh</p>
          </div>
          <div className="flex flex-col justify-center">
            <h1>Opções</h1>
            <p>asdalwh</p>
          </div>
        </section>
      </main>
    </div>
  );
}
