import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { EstruturaVagasMenuComponent } from "@/app/components/totem/shared/estrutura-vagas-menu.component";
import { TituloComponent } from "@/app/components/totem/shared/titulo.component";
import { vagasEstagios } from "@/app/components/totem/vagas-estagios/vagas-estagios.data";

export default function VagasEmpregos() {
  return (
    <EstruturaTotemComponent>
      <TituloComponent texto="Oportunidades de emprego">
        <EstruturaVagasMenuComponent itens={vagasEstagios} />
      </TituloComponent>
    </EstruturaTotemComponent>
  );
}
