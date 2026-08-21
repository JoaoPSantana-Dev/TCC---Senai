import { HomepageMenuComponent } from "./homepage-menu.component";
import { NoticiasComponent } from "./noticias.component";

// HomepageComponent
// página inicial do totem, responsável por reunir as principais ações de navegação e os destaques informativos em uma única tela centralizada

export function HomepageComponent() {
  return (
    <main className="min-h-auto flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-semibold my-2 pb-8">
        Bem-vindo ao totem do SENAI Mariano Ferraz!
      </h1>
      <HomepageMenuComponent />
      <NoticiasComponent />
    </main>
  );
}
