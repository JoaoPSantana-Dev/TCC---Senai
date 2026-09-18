import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

import { Menu01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type NavbarHamburguerProps = {
  className?: string;
};

export function NavbarHamburguer({
  className = "absolute w-18 h-10 left-9 top-17 -translate-y-1/2",
}: NavbarHamburguerProps) {
  return (
    <Menu
      customBurgerIcon={<HugeiconsIcon icon={Menu01Icon} />}
      customCrossIcon={<HugeiconsIcon icon={ArrowLeft01Icon} />}
      width={280}
      burgerButtonClassName={className}
    >
      <Link className="menu-item" href={"/homepage"}>
        Homepage
      </Link>
      <Link className="menu-item" href={"/sobre"}>
        Sobre o SENAI
      </Link>
      <Link className="menu-item" href={"/horario-aulas"}>
        Horário de Aulas
      </Link>
      <Link className="menu-item" href={"/vagas-empregos"}>
        Vagas de Emprego
      </Link>
    </Menu>
  );
}
