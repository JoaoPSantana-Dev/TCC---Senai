import { EstruturaVagasMenuComponent } from "../shared/estrutura-vagas-menu.component";
import { TituloComponent } from "../shared/titulo.component";
import { vagasCursos } from "./vagas-cursos.data";

export function VagasCursosComponent() {
  return (
    <TituloComponent texto="Oportunidades de emprego">
      <EstruturaVagasMenuComponent itens={vagasCursos} />
    </TituloComponent>
  );
}
