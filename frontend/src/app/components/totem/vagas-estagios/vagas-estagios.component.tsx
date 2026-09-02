import { EstruturaVagasMenuComponent } from "../shared/estrutura-vagas-menu.component";
import { TituloComponent } from "../shared/titulo.component";
import { vagasEstagios } from "./vagas-estagios.data";

export function VagasEstagiosComponent() {
  return (
    <TituloComponent texto="Oportunidades de emprego">
      <EstruturaVagasMenuComponent itens={vagasEstagios} />
    </TituloComponent>
  );
}
