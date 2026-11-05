"use client";

import { User02Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { NavbarHamburguer } from "./NavbarHamburguer";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { BotaoSair } from "./BotaoSair";
import { useEffect, useRef, useState } from "react";

export function HeaderPrivate() {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function fecharMenu(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    }

    function fecharComEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", fecharMenu);
    document.addEventListener("keydown", fecharComEsc);

    return () => {
      document.removeEventListener("mousedown", fecharMenu);
      document.removeEventListener("keydown", fecharComEsc);
    };
  }, []);

  return (
    <header className="w-full flex flex-row bg-white justify-between py-2 border-b-2 border-gray-300 mb-16">
      <NavbarHamburguer className="absolute w-18 h-10 left-6 top-10.5 -translate-y-1/2" />

      <figure className="flex justify-center">
        <Image
          src="/senai-logo.png"
          alt="Logo do SENAI"
          width={200}
          height={50}
          className="w-auto h-auto max-w-full object-contain"
          loading="eager"
        />
      </figure>

      <div
        ref={menuRef}
        className="relative flex flex-row items-center justify-center mr-10 gap-2"
      >
        <p className="text-lg text-zinc-600 font-medium">Seu Nome</p>
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          aria-expanded={menuAberto}
          aria-haspopup="true"
          className="flex items-center justify-center rounded-full bg-zinc-100 border-solid border-zinc-300 border-2 cursor-pointer active:opacity-70 transition-all duration-75 p-2"
        >
          <HugeiconsIcon icon={User02Icon} width={35} height={35} />
        </button>

        {/* Dropdow */}
        {menuAberto && (
          <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-xl shadow-xl border-2 border-zinc-300 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 zoom-in-95">
            {/* Informações do usuário */}
            <div className="flex flex-col items-center py-5 px-4 border-b border-zinc-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-3 border-solid border-zinc-300 border-2">
                <HugeiconsIcon
                  icon={User02Icon}
                  width={35}
                  height={35}
                  className="text-zinc-700"
                />
              </div>
              <p className="font-semibold text-zinc-800">Seu Nome</p>
              <p className="text-sm text-zinc-500">Conta do usuário</p>
            </div>

            {/* Opções */}
            <div className="py-2 flex flex-row items-center">
              <Link
                href="/seguranca"
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-2 px-5 py-3 text-lg text-zinc-800 active:bg-zinc-100 transition-all duration-500 truncate"
              >
                <HugeiconsIcon icon={User02Icon} width={25} height={25} />
                Meu usuário
              </Link>
              <div className="text-center ml-8">
                <BotaoSair />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
