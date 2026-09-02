import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";
import { SobreComponent } from "@/app/components/totem/sobre/sobre.component";

export default function Sobre() {
  return (
    <EstruturaTotemComponent mostrarNoticias={false}>
      <SobreComponent />
    </EstruturaTotemComponent>
  );
}
