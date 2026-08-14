"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ImagemComponent from "../../administrador/imagem.component";

export function HeaderComponent() {
  const pathname = usePathname();

  // esse código é para caso o endpoint seja "/homepage"
  if (pathname === "/homepage") {
    return (
      <>
        <header className="w-full text-white flex flex-col">
          <div className="flex flex-row w-screen bg-red-600 pl-2 gap-2 justify-between pr-2">
            <span className="flex">
              <h1>FIESP CIESP SESI SENAI IRS | F | TW | YT | iN | iNt | wz</h1>
            </span>

            <span className="flex items-end justify-end">
              <h1>16:00 21°</h1>
            </span>
          </div>

          <div className="flex flex-col items-center">
            <figure className="flex justify-center">
              <ImagemComponent
                nomeImagem="senai-logo.png"
                alt="Imagem do logo SENAI"
                width={200}
                height={200}
              />
            </figure>
          </div>
        </header>
      </>
    );
  }

  // esse código é para todas as outras páginas que usarem o header e que não sejam o "/homepage"
  return (
    <>
      <header className="w-full text-white flex flex-row bg-red-600">
        <Link href="/homepage">MENU</Link>
        <h1>aaaa</h1>
      </header>
    </>
  );
}
