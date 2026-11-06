import type { ReactNode } from "react";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";

// a "moldura" padrão de cada tipo de página
// é usada pela página pública PaginaRenderizada e pelo canvas do editor puck
// então o que se vê no editor é o mesmo layout que vai para o totem

interface LayoutPaginaProps {
  slug: string;
  nomePagina: string;
  children: ReactNode;
  ocultarMenu?: boolean; // para esconder o menu hambúrguer
}

export function LayoutPagina({
  slug,
  nomePagina,
  children,
  ocultarMenu = false,
}: LayoutPaginaProps) {
  if (slug === "descanso") {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        {children}
      </main>
    );
  }

  if (slug === "homepage") {
    return (
      <EstruturaTotem ocultarMenu>
        <Titulo texto={nomePagina}>
          <nav className="w-full max-w-6xl p-4 rounded-xl">{children}</nav>
        </Titulo>
      </EstruturaTotem>
    );
  }

  return (
    <EstruturaTotem mostrarNoticias={false} ocultarMenu={ocultarMenu}>
      <Titulo texto={nomePagina} />
      <div className="flex flex-col justify-center max-w-6xl w-full p-6 md:p-12 mx-auto">
        <section className="flex flex-col gap-6 w-full">{children}</section>
      </div>
    </EstruturaTotem>
  );
}
