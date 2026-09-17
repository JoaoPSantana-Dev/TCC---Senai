import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { EstruturaVagasMenuComponent } from "@/app/components/totem/shared/estrutura-vagas-menu.component";
import { TituloComponent } from "@/app/components/totem/shared/titulo.component";
import { vagasEmpregos } from "@/app/components/totem/vagas-empregos/vagas-empregos.data";

export default function VagasEmpregos() {
  return (
    <EstruturaTotemComponent>
      <TituloComponent texto="Oportunidades de emprego">
        <EstruturaVagasMenuComponent itens={vagasEmpregos} />
      </TituloComponent>
    </EstruturaTotemComponent>
  );
}
