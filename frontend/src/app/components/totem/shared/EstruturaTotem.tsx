import type { ReactNode } from "react";
import { HeaderTotem } from "@/app/components/totem/shared/HeaderTotem";
import { Noticias } from "@/app/components/totem/shared/Noticias";
import { Footer } from "../../shared/Footer";

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
