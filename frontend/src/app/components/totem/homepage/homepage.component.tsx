import { TituloComponent } from "../shared/titulo.component";
import { HomepageMenuComponent } from "./homepage-menu.component";

// HomepageComponent
// página inicial do totem, responsável por reunir as principais ações de navegação e os destaques informativos em uma única tela centralizada

export function HomepageComponent() {
  return (
    <TituloComponent texto="Bem-vindo ao totem do SENAI Mariano Ferraz!">
      <HomepageMenuComponent />
    </TituloComponent>
  );
}
