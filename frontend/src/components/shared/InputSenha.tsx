"use client";

import { useState, type ComponentPropsWithRef } from "react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// campo de senha com botão de mostrar ou ocultar
// aceita tudo que um <input> aceita, então funciona direto com o register() do react-hook-form

type InputSenhaProps = Omit<ComponentPropsWithRef<"input">, "type" | "id"> & {
  id: string;
  rotulo: string;
  erro?: string;
};

export function InputSenha({
  id,
  rotulo,
  erro,
  className = "",
  ...props
}: InputSenhaProps) {
  const [visivel, setVisivel] = useState(false);
  const icon = visivel ? ViewIcon : ViewOffIcon;
  const idErro = `${id}-erro`;

  return (
    <div>
      <label htmlFor={id}>{rotulo}</label>

      <div className="relative">
        <input
          id={id}
          type={visivel ? "text" : "password"}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? idErro : undefined}
          className={`w-full border border-zinc-400 hover:border-zinc-800 px-4 py-3 pr-24 rounded-2xl peer ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisivel((visivel) => !visivel)}
          aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visivel}
          className="absolute inset-y-0 right-4 text-sm text-zinc-600 cursor-pointer peer-placeholder-shown:invisible"
        >
          <HugeiconsIcon icon={icon} />
        </button>
      </div>

      {erro && (
        <p id={idErro} className="text-red-500 text-sm">
          {erro}
        </p>
      )}
    </div>
  );
}
