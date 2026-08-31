import { EstruturaVagasMenuComponent } from "../shared/estrutura-vagas-menu.component";
import { TituloComponent } from "../shared/titulo.component";
import { vagasEmprego } from "./vagas-emprego.data";

export function VagasEmpregoComponent() {
  return (
    <TituloComponent texto="Oportunidades de emprego">
      <EstruturaVagasMenuComponent itens={vagasEmprego} />
    </TituloComponent>
  );
}
