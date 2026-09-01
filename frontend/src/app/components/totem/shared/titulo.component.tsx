import type { ReactNode } from "react";

interface TituloProps {
  texto: string;
  children?: ReactNode;
  className?: string;
}

export function TituloComponent({
  texto,
  children,
  className = "",
}: TituloProps) {
  return (
    <section className="min-h-auto flex flex-col items-center justify-center">
      <h1
        className={`text-center text-2xl font-semibold my-2 pb-8 ${className}`}
      >
        {texto}
      </h1>
      {children}
    </section>
  );
}
