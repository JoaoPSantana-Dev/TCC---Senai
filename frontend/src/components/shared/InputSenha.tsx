"use client";

import { useState, type ComponentProps } from "react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type InputSenhaProps = Omit<ComponentProps<"input">, "type">;

export function InputSenha({ className, ...props }: InputSenhaProps) {
  const [visivel, setVisivel] = useState(false);
  const icon = visivel ? ViewOffIcon : ViewIcon;

  return (
    <div className="relative">
      <input
        {...props}
        type={visivel ? "text" : "password"}
        className={`${className ?? ""} peer w-full pr-12`}
      />
      <button
        type="button"
        onClick={() => setVisivel((visivel) => !visivel)}
        aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={visivel}
        className="flex items-center px-4 text-zinc-600 rounded-r-2xl absolute inset-y-0 right-0 peer-placeholder-shown:invisible"
      >
        <HugeiconsIcon icon={icon} />
      </button>
    </div>
  );
}
