"use client";

import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

import { Menu01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useState } from "react";
import {
  buscarItensMenuNoNavegador,
  rotasFixasTotem,
  type ItemMenu,
} from "@/lib/menuTotem";

type NavbarHamburguerProps = {
  className?: string;
};

export function NavbarHamburguer({
  className = "absolute top-1/2 left-6 h-10 w-18 -translate-y-1/2 text-black",
}: NavbarHamburguerProps) {
  const [itens, setItens] = useState<ItemMenu[]>(rotasFixasTotem);

  const carregar = useCallback(async () => {
    setItens(await buscarItensMenuNoNavegador());
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <Menu
      customBurgerIcon={<HugeiconsIcon icon={Menu01Icon} />}
      customCrossIcon={<HugeiconsIcon icon={ArrowLeft01Icon} />}
      width={280}
      burgerButtonClassName={className}
      // atualiza a lista toda vez que o menu abre
      onStateChange={(estado) => {
        if (estado.isOpen) carregar();
      }}
    >
      <Link href={"/homepage"}>Homepage</Link>
      {itens.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.titulo}
        </Link>
      ))}
    </Menu>
  );
}
