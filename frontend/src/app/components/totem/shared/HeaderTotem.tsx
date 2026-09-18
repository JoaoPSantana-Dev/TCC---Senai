"use client";

import { usePathname } from "next/navigation";
import { NavbarHamburguer } from "../../shared/NavbarHamburguer";
import { Imagem } from "../../shared/Imagem";
import { useEffect, useState } from "react";

// componente principal do cabeçalho do totem
// exibe a barra superior com utilitários e, dependendo da rota, ajusta o layout para a homepage ou para as páginas internas

export function HeaderTotem() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full text-white border-b-2 border-gray-300 bg-white mb-8">
      {/* informações extras */}
      <div className="flex w-full bg-red-600 gap-2 items-center justify-between px-2">
        <p className="font-semibold text-sm uppercase truncate">
          FIESP CIESP SESI SENAI IRS | F | TW | YT | iN | iNt | wz
        </p>

        <time className="font-semibold text-sm uppercase truncate shrink-0 flex items-center justify-center gap-2">
          <span>{time || "00:00:00"}</span>
          <span>21°</span>
        </time>
      </div>
      {/* informações extras */}

      {/* menu hambúrguer */}
      <nav className="flex text-black">
        {pathname !== "/homepage" && <NavbarHamburguer />}
      </nav>
      {/* menu hambúrguer */}

      {/* logo */}
      <figure className="flex justify-center p-4">
        <Imagem
          nomeImagem="senai-logo.png"
          alt="Imagem do logo SENAI"
          width={200}
          height={200}
        />
      </figure>
      {/* logo */}
    </header>
  );
}
