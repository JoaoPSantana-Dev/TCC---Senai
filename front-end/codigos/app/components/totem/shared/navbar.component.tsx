import { HugeiconsIcon } from "@hugeicons/react";
import { Home07Icon } from "@hugeicons/core-free-icons";

// NavbarComponent
// botão de navegação do totem que representa o menu hambúrguer
// presente nas páginas internas para abrir o menu lateral e manter a navegação acessível em todas as páginas

export function NavbarComponent() {
  return (
    <nav className="flex justify-start text-black ml-4">
      <HugeiconsIcon icon={Home07Icon} size={50} />
    </nav>
  );
}
