"use client";

import { HeaderLogo } from "./HeaderLogo";
import { HeaderBarraUtilitarios } from "./HeaderBarraUtilitarios";
import { Navbar } from "./Navbar";

// componente principal do cabeçalho do totem
// exibe a barra superior com utilitários e, dependendo da rota, ajusta o layout para a homepage ou para as páginas internas

export function Header() {
  return (
    <header className="relative w-full text-white border-b-2 border-gray-300 bg-white mb-8">
      <HeaderBarraUtilitarios />

      <Navbar />

      <HeaderLogo />
    </header>
  );
}
