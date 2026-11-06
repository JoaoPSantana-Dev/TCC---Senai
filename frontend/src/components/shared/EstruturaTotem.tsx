import type { ReactNode } from "react";
import { HeaderTotem } from "./HeaderTotem";
import { Noticias } from "./Noticias";
import { Footer } from "./Footer";

interface EstruturaTotemProps {
  children: ReactNode;
  mostrarNoticias?: boolean;
  ocultarMenu?: boolean;
}

export function EstruturaTotem({
  children,
  mostrarNoticias = true,
  ocultarMenu = false,
}: EstruturaTotemProps) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <HeaderTotem ocultarMenu={ocultarMenu} />

      <main className="flex w-full flex-1 flex-col">{children}</main>

      {mostrarNoticias && <Noticias />}

      <Footer />
    </div>
  );
}
