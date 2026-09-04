import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { Menu01Icon, ScrollHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function NavbarHamburguerComponent() {
  return (
    <Menu
      customBurgerIcon={<HugeiconsIcon icon={Menu01Icon} />}
      customCrossIcon={<HugeiconsIcon icon={ScrollHorizontalIcon} />}
      width={280}
      noOverlay
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
