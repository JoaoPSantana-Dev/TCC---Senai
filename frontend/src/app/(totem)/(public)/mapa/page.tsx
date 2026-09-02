import { MapaComponent } from "@/app/components/totem/mapa/mapa.component";
import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";

export default function Mapa() {
  return (
    <EstruturaTotemComponent mostrarNoticias={false}>
      <MapaComponent />
    </EstruturaTotemComponent>
  );
}
