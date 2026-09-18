import { usePathname } from "next/navigation";
import { NavbarHamburguer } from "./NavbarHamburguer";

// botão de navegação do totem que representa o menu hambúrguer
// presente nas páginas internas para abrir o menu lateral e manter a navegação acessível em todas as páginas

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex text-black">
      {pathname !== "/homepage" && <NavbarHamburguer />}
    </nav>
  );
}
