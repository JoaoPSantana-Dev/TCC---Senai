"use client";

import { NavbarHamburguer } from "@/app/components/shared/NavbarHamburguer";
import { Imagem } from "@/app/components/shared/Imagem";
import { User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Usuarios() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="w-full flex flex-row bg-white justify-between py-2 border-b-2 border-gray-300 mb-8">
        <NavbarHamburguer className="absolute w-18 h-10 left-6 top-10.5 -translate-y-1/2" />

        <Imagem nomeImagem="senai-logo.png" width={200} height={50} />

        <div className="flex pr-10 items-center">
          <HugeiconsIcon
            icon={User02Icon}
            width={40}
            height={40}
            className="self-center cursor-alias"
          />
        </div>
      </header>

      <main>
        <h1>asdawd</h1>
        <p>asdalwh</p>
      </main>
    </div>
  );
}
