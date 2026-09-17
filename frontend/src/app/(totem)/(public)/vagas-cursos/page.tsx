import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { EstruturaVagasMenuComponent } from "@/app/components/totem/shared/estrutura-vagas-menu.component";
import { TituloComponent } from "@/app/components/totem/shared/titulo.component";
import { vagasCursos } from "@/app/components/totem/vagas-cursos/vagas-cursos.data";

export default function VagasCursos() {
  return (
    <EstruturaTotemComponent>
      <TituloComponent texto="Oportunidades de emprego">
        <EstruturaVagasMenuComponent itens={vagasCursos} />
      </TituloComponent>
    </EstruturaTotemComponent>
  );
}
