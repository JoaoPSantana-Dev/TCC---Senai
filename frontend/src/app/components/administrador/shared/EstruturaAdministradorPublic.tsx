import type { ReactNode } from "react";
import { Footer } from "../../shared/Footer";
import { ImagemAutenticacao } from "./ImagemAutenticacao";

interface EstruturaAdministradorPublicProps {
  children: ReactNode;
}

export function EstruturaAdministradorPublic({
  children,
}: EstruturaAdministradorPublicProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden min-h-screen flex-col">
      <main className="flex flex-1 flex-col md:flex-row">
        <ImagemAutenticacao
          nomeImagem="tubarao.png"
          alt="Foto da entrada da escola SENAI Mariano Ferraz"
        />

        {children}
      </main>

      <Footer />
    </div>
  );
}
