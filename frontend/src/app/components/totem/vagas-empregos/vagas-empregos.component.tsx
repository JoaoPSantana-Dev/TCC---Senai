import { EstruturaVagasMenuComponent } from "../shared/estrutura-vagas-menu.component";
import { TituloComponent } from "../shared/titulo.component";
import { vagasEmpregos } from "./vagas-empregos.data";

export function VagasEmpregosComponent() {
  return (
    <TituloComponent texto="Oportunidades de emprego">
      <EstruturaVagasMenuComponent itens={vagasEmpregos} />
    </TituloComponent>
  );
}
