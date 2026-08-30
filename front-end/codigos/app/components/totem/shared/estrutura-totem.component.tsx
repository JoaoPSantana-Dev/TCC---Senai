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
    // w-screen h-screen flex flex-col
    <main className="flex min-h-screen w-full flex-col bg-slate-100">
      <HeaderComponent />

      {/* colocar so o children */}
      <div className="flex-1">{children}</div>

      {mostrarNoticias && <NoticiasComponent />}

      <FooterComponent />
    </main>
  );
}
