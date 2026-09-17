import { Mapa as MapaTotem } from "@/app/components/totem/mapa/Mapa";
import { EstruturaTotem } from "@/app/components/totem/shared/EstruturaTotem";

export default function Mapa() {
  return (
    <EstruturaTotem mostrarNoticias={false}>
      <MapaTotem />
    </EstruturaTotem>
  );
}
