"use client";

import { usePathname } from "next/navigation";
import { HeaderLogoComponent } from "./header-logo.component";
import { HeaderBarraUtilitariosComponent } from "./header-barra-utilitarios.component";
import { NavbarComponent } from "./navbar.component";
import Link from "next/link";

// HeaderComponent
// componente principal do cabeçalho do totem
// exibe a barra superior com utilitários e, dependendo da rota, ajusta o layout para a homepage ou para as páginas internas

export function HeaderComponent() {
  const pathname = usePathname();

  return (
    <header className="w-full text-white border-b-2 border-gray-300">
      <HeaderBarraUtilitariosComponent />
      <div
        className={
          pathname === "/homepage"
            ? "flex text-black justify-center items-center bg-white p-4"
            : "grid grid-cols-3 text-black justify-center items-center bg-white p-4"
        }
      >
        {pathname !== "/homepage" && (
          <Link href={"/homepage"} className="max-w-20">
            <NavbarComponent />
          </Link>
        )}
        <HeaderLogoComponent />
      </div>
    </header>
  );
}
