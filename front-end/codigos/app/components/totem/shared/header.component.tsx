"use client";

import { usePathname } from "next/navigation";
import ImagemComponent from "../../administrador/imagem.component";
import { NavbarComponent } from "./navbar.component";

export function HeaderComponent() {
  const pathname = usePathname();
  const currentDateTime = new Date();
  const hora = currentDateTime.getHours();
  const minutos = currentDateTime.getMinutes();
  const segundos = currentDateTime.getSeconds();

  // esse código é para caso o endpoint seja "/homepage"
  if (pathname === "/homepage") {
    return (
      <>
        <header className="w-full text-white">
          <div className="flex w-full bg-red-600 gap-2 items-center justify-between pl-2 pr-2">
            <p className="font-semibold text-sm uppercase truncate">
              <h1>FIESP CIESP SESI SENAI IRS | F | TW | YT | iN | iNt | wz</h1>
            </p>

            <time className="font-semibold text-sm uppercase truncate shrink-0 flex items-center justify-center gap-2">
              <p>
                {hora}:{minutos}:{segundos}
              </p>

              <p>21°</p>
            </time>
          </div>

          <div className="flex text-black justify-center items-center bg-white p-4">
            <figure className="justify-self-center">
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
      <header className="w-full text-white">
        <div className="flex w-full bg-red-600 gap-2 items-center justify-between pl-2 pr-2">
          <p className="font-semibold text-sm uppercase truncate">
            <h1>FIESP CIESP SESI SENAI IRS | F | TW | YT | iN | iNt | wz</h1>
          </p>

          <time className="font-semibold text-sm uppercase truncate shrink-0 flex items-center justify-center gap-2">
            <p>
              {hora}:{minutos}:{segundos}
            </p>

            <p>21°</p>
          </time>
        </div>

        <div className="grid grid-cols-3 text-black justify-center items-center bg-white p-4">
          <NavbarComponent />

          <figure className="justify-self-center">
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
