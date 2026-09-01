import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { VagasEstagiosComponent } from "@/app/components/totem/vagas-estagios/vagas-estagios.component";

export default function VagasEmpregos() {
  return (
    <EstruturaTotemComponent>
      <VagasEstagiosComponent />
    </EstruturaTotemComponent>
  );
}
