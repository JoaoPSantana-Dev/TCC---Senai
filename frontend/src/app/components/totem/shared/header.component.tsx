"use client";

import { HeaderLogoComponent } from "./header-logo.component";
import { HeaderBarraUtilitariosComponent } from "./header-barra-utilitarios.component";
import { NavbarComponent } from "./navbar.component";

// HeaderComponent
// componente principal do cabeçalho do totem
// exibe a barra superior com utilitários e, dependendo da rota, ajusta o layout para a homepage ou para as páginas internas

export function HeaderComponent() {
  return (
    <header className="relative w-full text-white border-b-2 border-gray-300 bg-white mb-8">
      <HeaderBarraUtilitariosComponent />

      <NavbarComponent />

      <HeaderLogoComponent />
    </header>
  );
}
