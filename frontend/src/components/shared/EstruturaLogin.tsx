import type { ReactNode } from "react";
import { ImagemAutenticacao } from "./ImagemAutenticacao";

interface EstruturaLoginProps {
  children: ReactNode;
}

export function EstruturaLogin({ children }: EstruturaLoginProps) {
  return (
    <div className="flex h-screen w-full min-h-screen flex-col">
      <main className="flex flex-1 flex-col md:flex-row">
        <ImagemAutenticacao
          nomeImagem="capa-senai.jpg"
          alt="Foto da entrada da escola SENAI Mariano Ferraz"
        />

        {children}
      </main>
    </div>
  );
}
