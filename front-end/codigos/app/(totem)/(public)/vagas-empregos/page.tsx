import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { VagasEmpregosComponent } from "@/app/components/totem/vagas-empregos/vagas-empregos.component";

export default function VagasEmpregos() {
  return (
    <EstruturaTotemComponent>
      <VagasEmpregosComponent />
    </EstruturaTotemComponent>
  );
}
