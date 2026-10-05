import { User02Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { NavbarHamburguer } from "./NavbarHamburguer";
import { HugeiconsIcon } from "@hugeicons/react";

export function HeaderPrivate() {
  return (
    <header className="w-full flex flex-row bg-white justify-between py-2 border-b-2 border-gray-300 mb-16">
      <NavbarHamburguer className="absolute w-18 h-10 left-6 top-10.5 -translate-y-1/2" />

      <figure className="flex justify-center">
        <Image
          src="/senai-logo.png"
          alt="Logo do SENAI"
          width={200}
          height={50}
          className="w-auto h-auto max-w-full object-contain"
          loading="eager"
        />
      </figure>

      <button className="flex pr-10 items-center">
        <HugeiconsIcon
          icon={User02Icon}
          width={40}
          height={40}
          className="self-center cursor-alias"
        />
      </button>
    </header>
  );
}
