"use client";

import { usePathname } from "next/navigation";
import { HeaderLogo } from "./header-logo.component";
import { HeaderBarraUtilitarios } from "./header-barra-utilitarios.component";
import { NavbarComponent } from "./navbar.component";

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
