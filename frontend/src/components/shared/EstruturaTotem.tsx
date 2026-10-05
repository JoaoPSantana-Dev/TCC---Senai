import type { ReactNode } from "react";
import { HeaderTotem } from "./HeaderTotem";
import { Noticias } from "./Noticias";
import { Footer } from "./Footer";

interface EstruturaTotemProps {
  children: ReactNode;
  mostrarNoticias?: boolean;
}

export function EstruturaTotem({
  children,
  mostrarNoticias = true,
}: EstruturaTotemProps) {
  return (
    <main className="w-screen h-screen flex flex-col">
      <HeaderTotem />

      {children}

      {mostrarNoticias && <Noticias />}

      <Footer />
    </main>
  );
}
