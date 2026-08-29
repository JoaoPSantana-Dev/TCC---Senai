import { TituloComponent } from "../shared/titulo.component";
import { VagasEmpregoMenuComponent } from "./vagas-emprego-menu.component";

export function VagasEmpregoComponent() {
  return (
    <TituloComponent texto="Oportunidades de emprego">
      <VagasEmpregoMenuComponent />
    </TituloComponent>
  );
}
