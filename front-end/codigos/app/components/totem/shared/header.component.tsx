"use client";

import { usePathname } from "next/navigation";
import { HeaderLogo } from "./header-logo.component";
import { HeaderBarraUtilitarios } from "./header-barra-utilitarios.component";
import { NavbarComponent } from "./navbar.component";

// HeaderComponent
// componente principal do cabeçalho do totem
// exibe a barra superior com utilitários e, dependendo da rota, ajusta o layout para a homepage ou para as páginas internas

export function HeaderComponent() {
  const pathname = usePathname();

  return (
    <header className="w-full text-white border-b-2 border-gray-300">
      <HeaderBarraUtilitarios />
      <div
        className={
          pathname === "/homepage"
            ? "flex text-black justify-center items-center bg-white p-4"
            : "grid grid-cols-3 text-black justify-center items-center bg-white p-4"
        }
      >
        {pathname !== "/homepage" && <NavbarComponent />}
        <HeaderLogo />
      </div>
    </header>
  );
}
