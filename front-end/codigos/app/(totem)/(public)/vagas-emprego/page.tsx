import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { VagasEmpregoComponent } from "@/app/components/totem/vagas-emprego/vagas-emprego.component";

export default function VagasEmprego() {
  return (
    <EstruturaTotemComponent>
      <VagasEmpregoComponent />
    </EstruturaTotemComponent>
  );
}
