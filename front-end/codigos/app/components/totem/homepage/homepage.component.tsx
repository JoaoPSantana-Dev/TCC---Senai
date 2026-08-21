import { HomepageNoticias } from "../shared/homepage-noticias.component";
import { HomepageMenu } from "../shared/homepage-menu.component";

export function HomepageComponent() {
  return (
    <main className="min-h-auto flex flex-col items-center justify-center p-4">
      <h1 className="text-center text-2xl font-semibold my-2 pb-8">
        Bem-vindo ao totem do SENAI Mariano Ferraz!
      </h1>
      <HomepageMenu />
      <HomepageNoticias />
    </main>
  );
}
