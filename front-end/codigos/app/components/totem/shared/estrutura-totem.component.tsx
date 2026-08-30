import type { ReactNode } from "react";
import FooterComponent from "@/app/components/shared/footer.component";
import { HeaderComponent } from "@/app/components/totem/shared/header.component";
import { NoticiasComponent } from "@/app/components/totem/shared/noticias.component";

interface EstruturaTotemComponentProps {
  children: ReactNode;
  mostrarNoticias?: boolean;
}

export function EstruturaTotemComponent({
  children,
  mostrarNoticias = true,
}: EstruturaTotemComponentProps) {
  return (
    <main className="w-screen h-screen flex flex-col">
      <HeaderComponent />

      {children}

      {mostrarNoticias && <NoticiasComponent />}

      <FooterComponent />
    </main>
  );
}
