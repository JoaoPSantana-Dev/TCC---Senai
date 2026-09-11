import type { ReactNode } from "react";
import { FooterComponent } from "../../shared/footer.component";
import { ImagemAutenticacaoComponent } from "./imagem-autenticacao.component";

interface EstruturaAdministradorPublicComponentProps {
  children: ReactNode;
}

export function EstruturaAdministradorPublicComponent({
  children,
}: EstruturaAdministradorPublicComponentProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden min-h-screen flex-col">
      <main className="flex flex-1 flex-col md:flex-row">
        <ImagemAutenticacaoComponent
          nomeImagem="tubarao.png"
          alt="Foto da entrada da escola SENAI Mariano Ferraz"
        />

        {children}
      </main>

      <FooterComponent />
    </div>
  );
}
