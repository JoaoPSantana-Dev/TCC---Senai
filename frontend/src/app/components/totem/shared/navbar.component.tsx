import { usePathname } from "next/navigation";
import { NavbarHamburguerComponent } from "./navbar-hamburguer.component";

// NavbarComponent
// botão de navegação do totem que representa o menu hambúrguer
// presente nas páginas internas para abrir o menu lateral e manter a navegação acessível em todas as páginas

export function NavbarComponent() {
  const pathname = usePathname();

  return (
    <nav className="flex text-black">
      {pathname !== "/homepage" && <NavbarHamburguerComponent />}
    </nav>
  );
}
